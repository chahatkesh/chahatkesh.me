import { FETCH_TIMEOUT_MS } from "~/constants/limits";

const LOCATION_MAX_LENGTH = 220;
export const UNKNOWN_PLACE_LOCATION = "Unknown location";

const NOMINATIM_USER_AGENT =
  "chahatkesh.me/1.0 (contact: ckesharwani4@gmail.com)";

type NominatimAddress = {
  city?: string;
  town?: string;
  village?: string;
  municipality?: string;
  county?: string;
  state_district?: string;
  state?: string;
  country?: string;
};

type NominatimReverseResponse = {
  display_name?: string;
  address?: NominatimAddress;
};

type ResolvePlaceLocationInput = {
  location?: string;
  latitude: number;
  longitude: number;
};

function normalizeLocation(value: string): string {
  return value.replace(/\s+/g, " ").trim().slice(0, LOCATION_MAX_LENGTH);
}

type CoordinatePair = {
  latitude: number;
  longitude: number;
};

function parseCoordinatePair(value: string): CoordinatePair | null {
  const parts = value
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

  return { latitude, longitude };
}

export function isCoordinatePairLocation(value: string): boolean {
  return parseCoordinatePair(value) !== null;
}

function compactUnique(parts: Array<string | undefined>): string[] {
  const seen = new Set<string>();

  return parts
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part))
    .filter((part) => {
      const key = part.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function buildLocationFromAddress(address?: NominatimAddress): string {
  if (!address) return "";

  const locality =
    address.city ??
    address.town ??
    address.village ??
    address.municipality ??
    address.county;

  const region = address.state_district ?? address.state;

  return compactUnique([locality, region, address.country]).join(", ");
}

async function reverseGeocodeWithNominatim(
  latitude: number,
  longitude: number,
): Promise<string | null> {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  url.searchParams.set("zoom", "10");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("accept-language", "en");

  const response = await fetch(url.toString(), {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "User-Agent": NOMINATIM_USER_AGENT,
      Referer: "https://chahatkesh.me",
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!response.ok) return null;

  const data = (await response.json()) as NominatimReverseResponse;
  const bestAddress = normalizeLocation(buildLocationFromAddress(data.address));
  if (bestAddress) return bestAddress;

  const displayName = normalizeLocation(data.display_name ?? "");
  return displayName || null;
}

export async function resolvePlaceLocation({
  location,
  latitude,
  longitude,
}: ResolvePlaceLocationInput): Promise<string> {
  const manualLocation = normalizeLocation(location ?? "");
  if (manualLocation && !isCoordinatePairLocation(manualLocation)) {
    return manualLocation;
  }

  try {
    const geocoded = await reverseGeocodeWithNominatim(latitude, longitude);
    if (geocoded) return geocoded;
  } catch (error) {
    console.error("Failed to reverse geocode place coordinates:", error);
  }

  return UNKNOWN_PLACE_LOCATION;
}
