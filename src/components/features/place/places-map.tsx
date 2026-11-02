"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import useSWR from "swr";
import Map, { Marker, type MapRef } from "react-map-gl/maplibre";
import { MapPinned } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { MotionDiv } from "~/components/shared";
import { Button, Skeleton } from "~/components/ui";
import { API_ROUTES, BRAND_ACCENT_HEX } from "~/constants";
import { useColorScheme, type ColorScheme } from "~/hooks/use-color-scheme";
import { simpleFetcher as fetcher } from "~/lib/fetcher";
import { cn } from "~/lib/utils";
import type { PlaceListApiResponse, VisitedPlace } from "~/types/places";
import styles from "./places-map.module.css";

const MAP_STYLE_BASE: Record<ColorScheme, string> = {
  dark: "https://api.maptiler.com/maps/dataviz-dark/style.json?key=",
  light: "https://api.maptiler.com/maps/dataviz/style.json?key=",
};

const MAP_OVERLAY: Record<ColorScheme, string> = {
  dark: `radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.04) 0%, transparent 46%),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.24) 100%)`,
  light: `radial-gradient(circle at 20% 0%, rgba(0, 116, 122, 0.07) 0%, transparent 46%),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.35) 0%, rgba(24, 24, 27, 0.05) 100%)`,
};

const MAP_PALETTE: Record<
  ColorScheme,
  {
    background: string;
    land: string;
    water: string;
    halo: string;
    label: string;
    accentStrong: string;
    accentMedium: string;
    accentSoft: string;
  }
> = {
  dark: {
    background: "#000000",
    land: "#0b0d0e",
    water: "#101314",
    halo: "#000000",
    label: withAlpha(BRAND_ACCENT_HEX, 0.78),
    accentStrong: withAlpha(BRAND_ACCENT_HEX, 0.86),
    accentMedium: withAlpha(BRAND_ACCENT_HEX, 0.56),
    accentSoft: withAlpha(BRAND_ACCENT_HEX, 0.34),
  },
  light: {
    background: "#ffffff",
    land: "#e7e8ec",
    water: "#d5e4e6",
    halo: "#ffffff",
    label: "#0a5c62",
    accentStrong: "#0c6e75",
    accentMedium: "#3d8f96",
    accentSoft: "#7eb4b8",
  },
};

function withAlpha(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const isShort = normalized.length === 3;

  const red = parseInt(
    isShort ? `${normalized[0]}${normalized[0]}` : normalized.slice(0, 2),
    16,
  );
  const green = parseInt(
    isShort ? `${normalized[1]}${normalized[1]}` : normalized.slice(2, 4),
    16,
  );
  const blue = parseInt(
    isShort ? `${normalized[2]}${normalized[2]}` : normalized.slice(4, 6),
    16,
  );

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function applyOutlineTheme(mapRef: MapRef | null, scheme: ColorScheme) {
  const map = mapRef?.getMap();
  if (!map) return;

  const palette = MAP_PALETTE[scheme];

  const style = map.getStyle();
  const layers = style?.layers ?? [];

  const isWaterLayer = (id: string) =>
    /water|ocean|sea|lake|river|bathymetry/i.test(id);
  const isBoundaryLayer = (id: string) =>
    /boundary|admin|country|state|coast|shore|disputed/i.test(id);
  const isRoadLayer = (id: string) =>
    /road|street|highway|path|rail|bridge|tunnel/i.test(id);
  const isLabelLayer = (id: string) =>
    /label|name|poi|place|settlement|airport|transit|village|city|town/i.test(
      id,
    );
  const isPoiLabelLayer = (id: string) =>
    /poi|airport|transit|housenumber|road_number|road-shield|bus|rail/i.test(
      id,
    );

  for (const layer of layers) {
    try {
      if (layer.type === "symbol" || isLabelLayer(layer.id)) {
        if (isPoiLabelLayer(layer.id)) {
          map.setLayoutProperty(layer.id, "visibility", "none");
          continue;
        }

        map.setPaintProperty(layer.id, "text-color", palette.label);
        map.setPaintProperty(layer.id, "text-halo-color", palette.halo);
        map.setPaintProperty(layer.id, "text-halo-width", 1);
        map.setPaintProperty(layer.id, "text-opacity", 0.88);
        map.setPaintProperty(layer.id, "icon-opacity", 0.42);
        continue;
      }

      if (
        layer.type === "circle" ||
        layer.type === "heatmap" ||
        layer.type === "fill-extrusion" ||
        layer.type === "raster"
      ) {
        map.setLayoutProperty(layer.id, "visibility", "none");
        continue;
      }

      if (layer.type === "background") {
        map.setPaintProperty(layer.id, "background-color", palette.background);
        continue;
      }

      if (layer.type === "fill") {
        map.setPaintProperty(
          layer.id,
          "fill-color",
          isWaterLayer(layer.id) ? palette.water : palette.land,
        );
        map.setPaintProperty(
          layer.id,
          "fill-opacity",
          isWaterLayer(layer.id) ? 0.72 : 0.88,
        );
        continue;
      }

      if (layer.type === "line") {
        if (isBoundaryLayer(layer.id)) {
          map.setPaintProperty(layer.id, "line-color", palette.accentStrong);
          map.setPaintProperty(layer.id, "line-opacity", 0.92);
        } else if (isRoadLayer(layer.id)) {
          map.setPaintProperty(layer.id, "line-color", palette.accentMedium);
          map.setPaintProperty(layer.id, "line-opacity", 0.78);
        } else {
          map.setPaintProperty(layer.id, "line-color", palette.accentSoft);
          map.setPaintProperty(layer.id, "line-opacity", 0.7);
        }
      }
    } catch {
      // Some imported styles lock specific properties; ignore those layers.
    }
  }
}

function formatVisitDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function fitToPlaces(mapRef: MapRef | null, places: VisitedPlace[]) {
  if (!mapRef || places.length === 0) return;

  if (places.length === 1) {
    mapRef.flyTo({
      center: [places[0].longitude, places[0].latitude],
      zoom: 5,
      duration: 900,
    });
    return;
  }

  const latitudes = places.map((place) => place.latitude);
  const longitudes = places.map((place) => place.longitude);

  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);

  mapRef.fitBounds(
    [
      [minLongitude, minLatitude],
      [maxLongitude, maxLatitude],
    ],
    {
      padding: 96,
      duration: 1000,
      maxZoom: 4.5,
    },
  );
}

export function PlacesMap() {
  const { data, error, isLoading, mutate } = useSWR<PlaceListApiResponse>(
    API_ROUTES.PLACES,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    },
  );

  const mapRef = useRef<MapRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasFittedBoundsRef = useRef(false);
  const searchParams = useSearchParams();

  const [isMapReady, setIsMapReady] = useState(false);
  const [hoveredPlaceId, setHoveredPlaceId] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    left: number;
    top: number;
    width: number;
  } | null>(null);
  const [manualSelectedPlaceId, setManualSelectedPlaceId] = useState<
    string | null
  >(null);

  const mapScheme = useColorScheme();
  const mapTilerKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
  const mapStyle = mapTilerKey
    ? `${MAP_STYLE_BASE[mapScheme]}${mapTilerKey}`
    : null;

  const places = useMemo(() => data?.data ?? [], [data?.data]);
  const requestedPlaceId = searchParams.get("place");

  const selectedPlaceId = useMemo(() => {
    if (manualSelectedPlaceId) return manualSelectedPlaceId;
    if (!requestedPlaceId) return null;

    return places.some((place) => place._id === requestedPlaceId)
      ? requestedPlaceId
      : null;
  }, [manualSelectedPlaceId, requestedPlaceId, places]);

  const activePlace = useMemo(() => {
    if (!hoveredPlaceId) return null;
    return places.find((place) => place._id === hoveredPlaceId) ?? null;
  }, [hoveredPlaceId, places]);

  const setTooltipFromPoint = (
    point: { x: number; y: number },
    hasShortNote: boolean,
  ) => {
    if (!containerRef.current) {
      setTooltipPosition(null);
      return;
    }

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const cardWidth = Math.min(320, Math.max(220, containerWidth - 24));
    const estimatedHeight = hasShortNote ? 124 : 92;

    let left = point.x + 16;
    if (left + cardWidth > containerWidth - 8) {
      left = point.x - cardWidth - 16;
    }
    left = Math.max(8, Math.min(left, containerWidth - cardWidth - 8));

    let top = point.y - estimatedHeight - 14;
    if (top < 8) {
      top = point.y + 14;
    }
    top = Math.max(8, Math.min(top, containerHeight - estimatedHeight - 8));

    setTooltipPosition({ left, top, width: cardWidth });
  };

  const handleHoverMove = (
    event: MouseEvent<HTMLButtonElement>,
    place: VisitedPlace,
  ) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;

    setTooltipFromPoint(
      {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      },
      Boolean(place.shortNote),
    );
  };

  const handleFocusHover = (place: VisitedPlace) => {
    setHoveredPlaceId(place._id);

    const map = mapRef.current?.getMap();
    if (!map) return;

    const point = map.project([place.longitude, place.latitude]);
    setTooltipFromPoint({ x: point.x, y: point.y }, Boolean(place.shortNote));
  };

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !isMapReady) return;

    const paint = () => applyOutlineTheme(mapRef.current, mapScheme);
    paint();
    map.on("style.load", paint);
    return () => {
      map.off("style.load", paint);
    };
  }, [isMapReady, mapScheme]);

  useEffect(() => {
    if (!isMapReady || hasFittedBoundsRef.current || places.length === 0)
      return;

    fitToPlaces(mapRef.current, places);
    hasFittedBoundsRef.current = true;
  }, [isMapReady, places]);

  useEffect(() => {
    if (!selectedPlaceId || !isMapReady) return;

    const selected = places.find((place) => place._id === selectedPlaceId);
    if (!selected) return;

    mapRef.current?.flyTo({
      center: [selected.longitude, selected.latitude],
      zoom: Math.max(mapRef.current.getZoom(), 5),
      duration: 850,
    });
  }, [selectedPlaceId, places, isMapReady]);

  if (isLoading) {
    return (
      <div className="relative h-dvh w-full overflow-hidden bg-background">
        <Skeleton className="h-full w-full rounded-none" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />
        <div className="absolute bottom-6 left-1/2 z-20 flex w-[min(90vw,20rem)] -translate-x-1/2 flex-col items-center gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-56" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-3 bg-background px-6 text-center">
        <p className="text-base font-medium">Failed to load places map.</p>
        <p className="max-w-xl text-sm text-muted-foreground">
          Please check your connection and try again.
        </p>
        <Button variant="outline" onClick={() => mutate()}>
          Retry
        </Button>
      </div>
    );
  }

  if (!data?.success || places.length === 0) {
    return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-3 bg-background px-6 text-center">
        <MapPinned className="size-7 text-muted-foreground" />
        <p className="text-base font-medium">No places published yet.</p>
        <p className="max-w-xl text-sm text-muted-foreground">
          Add your first location from the admin panel and it will appear here.
        </p>
      </div>
    );
  }

  if (!mapStyle) {
    return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-3 bg-background px-6 text-center">
        <MapPinned className="size-7 text-muted-foreground" />
        <p className="text-base font-medium">Map configuration is missing.</p>
        <p className="max-w-xl text-sm text-muted-foreground">
          Add NEXT_PUBLIC_MAPTILER_API_KEY in your environment to render the
          interactive map.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-dvh w-full overflow-hidden bg-background",
        styles.canvas,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: MAP_OVERLAY[mapScheme] }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />

      <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 w-[min(90vw,34rem)] -translate-x-1/2 text-center sm:bottom-4">
        <h2 className="truncate text-sm font-semibold text-foreground sm:text-base">
          Places I've Explored
        </h2>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          Tracing my journey, one destination at a time -{" "}
          <Link
            href="/"
            className="pointer-events-auto font-semibold text-ring no-underline transition-colors hover:text-ring/80"
          >
            chahatkesh.me
          </Link>
          .
        </p>
      </div>

      <Map
        ref={mapRef}
        mapStyle={mapStyle}
        initialViewState={{
          latitude: 20.5937,
          longitude: 78.9629,
          zoom: 1.2,
        }}
        onLoad={() => {
          setIsMapReady(true);
          applyOutlineTheme(mapRef.current, mapScheme);
        }}
        attributionControl={false}
        reuseMaps
        style={{ width: "100%", height: "100%" }}
      >
        {places.map((place) => {
          const isActive =
            place._id === hoveredPlaceId || place._id === selectedPlaceId;

          return (
            <Marker
              key={place._id}
              longitude={place.longitude}
              latitude={place.latitude}
              anchor="bottom"
            >
              <button
                type="button"
                onMouseEnter={(event) => {
                  setHoveredPlaceId(place._id);
                  handleHoverMove(event, place);
                }}
                onMouseMove={(event) => handleHoverMove(event, place)}
                onMouseLeave={() => {
                  setHoveredPlaceId(null);
                  setTooltipPosition(null);
                }}
                onFocus={() => handleFocusHover(place)}
                onBlur={() => {
                  setHoveredPlaceId(null);
                  setTooltipPosition(null);
                }}
                onClick={() => {
                  setManualSelectedPlaceId(place._id);
                  handleFocusHover(place);
                }}
                aria-label={`View ${place.name}`}
                className={cn(
                  "group relative flex size-8 items-center justify-center transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive ? "-translate-y-0.5 scale-105" : "hover:scale-105",
                )}
              >
                <span
                  className={cn(
                    "relative flex size-7 items-center justify-center rounded-[58%_58%_58%_6%] border border-ring/65 bg-background shadow-[0_10px_22px_rgba(0,0,0,0.28)] rotate-[-45deg]",
                    isActive && "border-ring bg-card",
                  )}
                >
                  <span className="size-2.5 rounded-full border border-background/50 bg-ring rotate-[45deg]" />
                </span>
              </button>
            </Marker>
          );
        })}
      </Map>

      {activePlace && tooltipPosition ? (
        <MotionDiv
          key={activePlace._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="pointer-events-none absolute z-20 rounded-xl border border-border bg-popover/95 px-3 py-2 text-popover-foreground shadow-lg backdrop-blur-sm"
          style={{
            left: tooltipPosition.left,
            top: tooltipPosition.top,
            width: tooltipPosition.width,
          }}
        >
          <p className="text-sm font-semibold leading-tight tracking-tight text-foreground sm:text-base">
            {activePlace.name}
          </p>
          <p className="mt-1 text-[11px] font-medium tracking-wide text-muted-foreground">
            {formatVisitDate(activePlace.visitedAt)} · {activePlace.location}
          </p>
          {activePlace.shortNote ? (
            <p className="mt-2 max-h-14 overflow-hidden text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {activePlace.shortNote}
            </p>
          ) : null}
        </MotionDiv>
      ) : null}
    </div>
  );
}
