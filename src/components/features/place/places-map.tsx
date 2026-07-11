"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import useSWR from "swr";
import Map, { Marker, type MapRef } from "react-map-gl/maplibre";
import { MapPinned } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { MotionDiv } from "~/components/shared";
import { Button } from "~/components/ui";
import { API_ROUTES, BRAND_ACCENT_HEX } from "~/constants";
import { simpleFetcher as fetcher } from "~/lib/fetcher";
import { cn } from "~/lib/utils";
import type { PlaceListApiResponse, VisitedPlace } from "~/types/places";
import styles from "./places-map.module.css";

const MAPTILER_STYLE_BASE =
  "https://api.maptiler.com/maps/dataviz-dark/style.json?key=";

const MAP_THEME_OVERLAY = `
  radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.04) 0%, transparent 46%),
  linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.24) 100%)
`;

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

function applyOutlineTheme(mapRef: MapRef | null) {
  const map = mapRef?.getMap();
  if (!map) return;

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

  const accentStrong = withAlpha(BRAND_ACCENT_HEX, 0.86);
  const accentMedium = withAlpha(BRAND_ACCENT_HEX, 0.56);
  const accentSoft = withAlpha(BRAND_ACCENT_HEX, 0.34);
  const labelColor = withAlpha(BRAND_ACCENT_HEX, 0.78);

  for (const layer of layers) {
    try {
      if (layer.type === "symbol" || isLabelLayer(layer.id)) {
        if (isPoiLabelLayer(layer.id)) {
          map.setLayoutProperty(layer.id, "visibility", "none");
          continue;
        }

        map.setPaintProperty(layer.id, "text-color", labelColor);
        map.setPaintProperty(layer.id, "text-halo-color", "#050607");
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
        map.setPaintProperty(layer.id, "background-color", "#070707");
        continue;
      }

      if (layer.type === "fill") {
        map.setPaintProperty(
          layer.id,
          "fill-color",
          isWaterLayer(layer.id) ? "#101314" : "#0b0d0e",
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
          map.setPaintProperty(layer.id, "line-color", accentStrong);
          map.setPaintProperty(layer.id, "line-opacity", 0.92);
        } else if (isRoadLayer(layer.id)) {
          map.setPaintProperty(layer.id, "line-color", accentMedium);
          map.setPaintProperty(layer.id, "line-opacity", 0.78);
        } else {
          map.setPaintProperty(layer.id, "line-color", accentSoft);
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

  const mapTilerKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
  const mapStyle = mapTilerKey ? `${MAPTILER_STYLE_BASE}${mapTilerKey}` : null;

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
      <div className="flex h-dvh w-full items-center justify-center bg-background px-5">
        <div className="h-20 w-20 animate-spin rounded-full border-2 border-border border-t-ring" />
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
        style={{ background: MAP_THEME_OVERLAY }}
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
          applyOutlineTheme(mapRef.current);
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
                  "group relative flex size-8 items-center justify-center transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                  isActive ? "-translate-y-0.5 scale-105" : "hover:scale-105",
                )}
              >
                <span
                  className={cn(
                    "relative flex size-7 items-center justify-center rounded-[58%_58%_58%_6%] border border-ring/65 bg-[#0b0e0f] shadow-[0_10px_22px_rgba(0,0,0,0.5)] rotate-[-45deg]",
                    isActive && "border-ring/85 bg-[#111416]",
                  )}
                >
                  <span className="size-2.5 rounded-full border border-black/35 bg-ring/90 rotate-[45deg]" />
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
          className="pointer-events-none absolute z-20 rounded-xl border border-white/10 bg-black/76 px-3 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.36)] backdrop-blur-sm"
          style={{
            left: tooltipPosition.left,
            top: tooltipPosition.top,
            width: tooltipPosition.width,
          }}
        >
          <p className="text-sm font-semibold leading-tight tracking-tight text-zinc-100 sm:text-base">
            {activePlace.name}
          </p>
          <p className="mt-1 text-[11px] font-medium tracking-wide text-zinc-400">
            {formatVisitDate(activePlace.visitedAt)} · {activePlace.location}
          </p>
          {activePlace.shortNote ? (
            <p className="mt-2 max-h-14 overflow-hidden text-xs leading-relaxed text-zinc-300 sm:text-sm">
              {activePlace.shortNote}
            </p>
          ) : null}
        </MotionDiv>
      ) : null}
    </div>
  );
}
