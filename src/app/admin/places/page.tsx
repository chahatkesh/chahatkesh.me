"use client";

import { useEffect, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { Loader2, MapPinned, Pencil, Trash2 } from "lucide-react";
import {
  AdminConfirmDialog,
  AdminErrorState,
  AdminListCard,
  AdminListCreateTile,
  AdminListMeta,
  AdminLoadingState,
  AdminPageHeader,
  ProtectedRoute,
  adminListDangerActionClassName,
  adminListIconActionClassName,
} from "~/components/admin";
import { Button, Input, Label } from "~/components/ui";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { API_ROUTES } from "~/constants";
import { formatDate } from "~/lib/date-utils";
import { ADMIN_SWR_CONFIG, adminFetcher } from "~/lib/fetcher";
import type { PlaceListApiResponse, VisitedPlace } from "~/types/places";

const BREADCRUMBS = [
  { name: "Admin", url: "/admin" },
  { name: "Places", url: "/admin/places" },
];

type PlaceFormState = {
  name: string;
  visitedAt: string;
  latitude: string;
  longitude: string;
  shortNote: string;
};

const createInitialFormState = (): PlaceFormState => ({
  name: "",
  visitedAt: new Date().toISOString().split("T")[0],
  latitude: "",
  longitude: "",
  shortNote: "",
});

function toInputDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
}

function parseCoordinatePair(
  rawValue: string,
): { latitude: string; longitude: string } | null {
  const parts = rawValue
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length !== 2) return null;

  const [latitudeRaw, longitudeRaw] = parts;
  const latitude = Number(latitudeRaw);
  const longitude = Number(longitudeRaw);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  if (latitude < -90 || latitude > 90) return null;
  if (longitude < -180 || longitude > 180) return null;

  return {
    latitude: latitudeRaw,
    longitude: longitudeRaw,
  };
}

function parseCoordinates(
  latitudeRaw: string,
  longitudeRaw: string,
): { latitude: number; longitude: number } | null {
  const latitude = Number(latitudeRaw);
  const longitude = Number(longitudeRaw);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  if (latitude < -90 || latitude > 90) return null;
  if (longitude < -180 || longitude > 180) return null;

  return { latitude, longitude };
}

type LocationStatus = "idle" | "loading" | "ready" | "error";

type PlaceReverseGeocodeApiResponse = {
  success?: boolean;
  data?: {
    location?: string;
  };
  error?: string;
};

function AdminPlacesContent() {
  const { data, error, isLoading } = useSWR<PlaceListApiResponse>(
    API_ROUTES.PLACES,
    adminFetcher,
    ADMIN_SWR_CONFIG,
  );

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<VisitedPlace | null>(null);
  const [formData, setFormData] = useState<PlaceFormState>(
    createInitialFormState(),
  );
  const [detectedLocation, setDetectedLocation] = useState("");
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<VisitedPlace | null>(null);

  const locationLookupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const locationLookupAbortRef = useRef<AbortController | null>(null);
  const locationLookupRequestIdRef = useRef(0);

  const clearScheduledLocationLookup = () => {
    if (!locationLookupTimeoutRef.current) return;
    clearTimeout(locationLookupTimeoutRef.current);
    locationLookupTimeoutRef.current = null;
  };

  const abortLocationLookup = () => {
    if (!locationLookupAbortRef.current) return;
    locationLookupAbortRef.current.abort();
    locationLookupAbortRef.current = null;
  };

  const resetDetectedLocation = (
    nextLocation = "",
    nextStatus: LocationStatus = nextLocation ? "ready" : "idle",
  ) => {
    locationLookupRequestIdRef.current += 1;
    clearScheduledLocationLookup();
    abortLocationLookup();
    setDetectedLocation(nextLocation);
    setLocationStatus(nextStatus);
  };

  const lookupLocationForCoordinates = (
    latitudeRaw: string,
    longitudeRaw: string,
  ) => {
    const coordinates = parseCoordinates(latitudeRaw, longitudeRaw);

    locationLookupRequestIdRef.current += 1;
    const requestId = locationLookupRequestIdRef.current;

    clearScheduledLocationLookup();
    abortLocationLookup();

    if (!coordinates) {
      setDetectedLocation("");
      setLocationStatus("idle");
      return;
    }

    setLocationStatus("loading");

    locationLookupTimeoutRef.current = setTimeout(async () => {
      const abortController = new AbortController();
      locationLookupAbortRef.current = abortController;

      const searchParams = new URLSearchParams({
        latitude: String(coordinates.latitude),
        longitude: String(coordinates.longitude),
      });

      try {
        const response = await fetch(
          `${API_ROUTES.PLACE_REVERSE_GEOCODE}?${searchParams.toString()}`,
          {
            cache: "no-store",
            signal: abortController.signal,
          },
        );

        const result =
          (await response.json()) as PlaceReverseGeocodeApiResponse;

        if (
          !response.ok ||
          !result.success ||
          typeof result.data?.location !== "string"
        ) {
          throw new Error(result.error ?? "Failed to detect location");
        }

        if (locationLookupRequestIdRef.current !== requestId) return;

        setDetectedLocation(result.data.location);
        setLocationStatus("ready");
      } catch (lookupError) {
        if (abortController.signal.aborted) return;
        if (locationLookupRequestIdRef.current !== requestId) return;

        console.error(
          "Failed to detect location from coordinates:",
          lookupError,
        );
        setDetectedLocation("");
        setLocationStatus("error");
      } finally {
        if (locationLookupAbortRef.current === abortController) {
          locationLookupAbortRef.current = null;
        }
      }
    }, 350);
  };

  useEffect(() => {
    return () => {
      clearScheduledLocationLookup();
      abortLocationLookup();
    };
  }, []);

  const openCreateSheet = () => {
    setEditingPlace(null);
    setFormData(createInitialFormState());
    resetDetectedLocation();
    setIsSheetOpen(true);
  };

  const openEditSheet = (place: VisitedPlace) => {
    const trimmedLocation = place.location.trim();
    const shouldResolveOnOpen =
      !trimmedLocation ||
      Boolean(parseCoordinatePair(trimmedLocation)) ||
      trimmedLocation.toLowerCase() === "unknown location";
    const initialLocation = shouldResolveOnOpen ? "" : trimmedLocation;

    setEditingPlace(place);
    setFormData({
      name: place.name,
      visitedAt: toInputDate(place.visitedAt),
      latitude: String(place.latitude),
      longitude: String(place.longitude),
      shortNote: place.shortNote ?? "",
    });
    resetDetectedLocation(initialLocation, initialLocation ? "ready" : "idle");

    if (shouldResolveOnOpen) {
      lookupLocationForCoordinates(
        String(place.latitude),
        String(place.longitude),
      );
    }

    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
    setEditingPlace(null);
    setFormData(createInitialFormState());
    resetDetectedLocation();
  };

  const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextLatitude = event.target.value;

    setFormData((current) => ({
      ...current,
      latitude: nextLatitude,
    }));

    lookupLocationForCoordinates(nextLatitude, formData.longitude);
  };

  const handleLongitudeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nextLongitude = event.target.value;

    setFormData((current) => ({
      ...current,
      longitude: nextLongitude,
    }));

    lookupLocationForCoordinates(formData.latitude, nextLongitude);
  };

  const handleLatitudePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
  ) => {
    const pastedValue = event.clipboardData.getData("text");
    const coordinates = parseCoordinatePair(pastedValue);

    if (!coordinates) return;

    event.preventDefault();
    setFormData((current) => ({
      ...current,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    }));

    lookupLocationForCoordinates(coordinates.latitude, coordinates.longitude);
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const coordinates = parseCoordinates(formData.latitude, formData.longitude);

    if (!coordinates) {
      alert("Latitude and longitude must be valid numbers.");
      return;
    }

    if (
      locationStatus !== "ready" ||
      !detectedLocation ||
      Boolean(parseCoordinatePair(detectedLocation))
    ) {
      alert("Please wait for location detection before saving.");
      return;
    }

    setIsSaving(true);

    const payload = {
      name: formData.name.trim(),
      location: detectedLocation,
      visitedAt: formData.visitedAt,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      shortNote: formData.shortNote.trim() || undefined,
    };

    try {
      const response = await fetch(
        editingPlace
          ? API_ROUTES.PLACE_BY_ID(editingPlace._id)
          : API_ROUTES.PLACES,
        {
          method: editingPlace ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (!response.ok || !result?.success) {
        alert(result?.error ?? "Failed to save place. Please try again.");
        return;
      }

      await mutate(API_ROUTES.PLACES);
      closeSheet();
    } catch (submitError) {
      console.error("Failed to save place:", submitError);
      alert("Failed to save place. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget._id);
    try {
      const response = await fetch(API_ROUTES.PLACE_BY_ID(deleteTarget._id), {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Failed to delete place. Please try again.");
        return;
      }

      await mutate(API_ROUTES.PLACES);
    } catch (deleteError) {
      console.error("Failed to delete place:", deleteError);
      alert("Failed to delete place. Please try again.");
    } finally {
      setDeletingId(null);
      setDeleteTarget(null);
    }
  };

  if (isLoading) {
    return <AdminLoadingState breadcrumbs={BREADCRUMBS} />;
  }

  if (error || !data?.success) {
    return (
      <AdminErrorState
        breadcrumbs={BREADCRUMBS}
        errorMessage="Failed to load places. Please refresh and try again."
      />
    );
  }

  const places = data.data ?? [];
  const isLocationReady =
    locationStatus === "ready" && detectedLocation.trim().length > 0;

  const locationHelperText =
    locationStatus === "loading"
      ? "Resolving location from coordinates..."
      : locationStatus === "error"
        ? "Could not detect location. Adjust coordinates and try again."
        : locationStatus === "ready"
          ? "Location detected. You can save this place now."
          : "Enter valid latitude and longitude to detect location.";

  return (
    <div className="space-y-8">
      <AdminPageHeader
        breadcrumbs={BREADCRUMBS}
        title="Places Map"
        subtitle="Add visited places and show them on your public map."
      />

      <div className="space-y-3">
        <AdminListCreateTile label="Add place" onClick={openCreateSheet} />

        {places.map((place, index) => {
          const isDeleting = deletingId === place._id;
          const pinPreview = `${place.latitude.toFixed(4)}, ${place.longitude.toFixed(4)}`;

          return (
            <AdminListCard
              key={place._id}
              index={index}
              disabled={isDeleting}
              href={`/places?place=${encodeURIComponent(place._id)}`}
              icon={<MapPinned className="size-5" strokeWidth={1.75} />}
              title={place.name}
              meta={
                <AdminListMeta
                  items={[
                    formatDate(place.visitedAt),
                    place.location,
                    pinPreview,
                  ]}
                />
              }
              actions={
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditSheet(place)}
                    disabled={isDeleting}
                    className={adminListIconActionClassName}
                    aria-label="Edit place"
                    title="Edit"
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDeleteTarget(place)}
                    disabled={isDeleting}
                    aria-label="Delete place"
                    title="Delete"
                    className={adminListDangerActionClassName}
                  >
                    {isDeleting ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="size-3.5" />
                    )}
                  </Button>
                </>
              }
            />
          );
        })}
      </div>

      <Sheet
        open={isSheetOpen}
        onOpenChange={(open) => {
          if (!open) closeSheet();
          else setIsSheetOpen(true);
        }}
      >
        <SheetContent
          side="right"
          className="w-full overflow-y-auto sm:max-w-xl"
        >
          <SheetHeader>
            <SheetTitle>{editingPlace ? "Edit Place" : "Add Place"}</SheetTitle>
            <SheetDescription>
              Enter the place details and exact coordinates for the public map
              pin.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={submitForm} className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="place-name">Name *</Label>
              <Input
                id="place-name"
                placeholder="e.g., Marina Bay Sands"
                value={formData.name}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                required
                disabled={isSaving}
                className="border-border bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="place-location">Detected Location *</Label>
              <Input
                id="place-location"
                placeholder="Will appear once valid coordinates are entered"
                value={detectedLocation}
                readOnly
                disabled={isSaving}
                className="border-border bg-card"
              />
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {locationStatus === "loading" ? (
                  <Loader2 className="size-3 animate-spin" />
                ) : null}
                {locationHelperText}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="place-visited-at">Visited Date *</Label>
              <Input
                id="place-visited-at"
                type="date"
                value={formData.visitedAt}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    visitedAt: event.target.value,
                  }))
                }
                required
                disabled={isSaving}
                className="border-border bg-card [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="place-latitude">Latitude *</Label>
                <Input
                  id="place-latitude"
                  type="number"
                  step="any"
                  min={-90}
                  max={90}
                  placeholder="e.g., 1.2834"
                  value={formData.latitude}
                  onPaste={handleLatitudePaste}
                  onChange={handleLatitudeChange}
                  required
                  disabled={isSaving}
                  className="border-border bg-card"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="place-longitude">Longitude *</Label>
                <Input
                  id="place-longitude"
                  type="number"
                  step="any"
                  min={-180}
                  max={180}
                  placeholder="e.g., 103.8607"
                  value={formData.longitude}
                  onChange={handleLongitudeChange}
                  required
                  disabled={isSaving}
                  className="border-border bg-card"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="place-short-note">Short Note</Label>
              <textarea
                id="place-short-note"
                value={formData.shortNote}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    shortNote: event.target.value,
                  }))
                }
                placeholder="A short memory or context about this place"
                maxLength={320}
                rows={4}
                disabled={isSaving}
                className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
              />
              <p className="text-xs text-muted-foreground">
                {formData.shortNote.length}/320
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={closeSheet}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving || !isLocationReady}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Saving...
                  </>
                ) : editingPlace ? (
                  "Update Place"
                ) : (
                  "Create Place"
                )}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      <AdminConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete place?"
        description={
          deleteTarget
            ? `This will permanently delete \"${deleteTarget.name}\" from your places map.`
            : ""
        }
        confirmLabel="Delete Place"
        onConfirm={confirmDelete}
        confirmDisabled={!deleteTarget || deletingId === deleteTarget?._id}
        loading={Boolean(deleteTarget && deletingId === deleteTarget._id)}
      />
    </div>
  );
}

export default function AdminPlacesPage() {
  return (
    <ProtectedRoute>
      <AdminPlacesContent />
    </ProtectedRoute>
  );
}
