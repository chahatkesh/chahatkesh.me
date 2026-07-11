import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "~/lib/auth";
import {
  isCoordinatePairLocation,
  resolvePlaceLocation,
  UNKNOWN_PLACE_LOCATION,
} from "~/lib/place-location";

function parseCoordinate(value: string | null): number {
  return Number(value);
}

function isValidLatitude(value: number): boolean {
  return Number.isFinite(value) && value >= -90 && value <= 90;
}

function isValidLongitude(value: number): boolean {
  return Number.isFinite(value) && value >= -180 && value <= 180;
}

export async function GET(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  const latitude = parseCoordinate(
    request.nextUrl.searchParams.get("latitude"),
  );
  const longitude = parseCoordinate(
    request.nextUrl.searchParams.get("longitude"),
  );

  if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
    return NextResponse.json(
      {
        success: false,
        error: "Valid latitude and longitude are required",
      },
      { status: 400 },
    );
  }

  try {
    const location = await resolvePlaceLocation({
      latitude,
      longitude,
    });

    if (
      location === UNKNOWN_PLACE_LOCATION ||
      isCoordinatePairLocation(location)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not detect a location name from these coordinates",
        },
        { status: 422 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        location,
      },
    });
  } catch (error) {
    console.error("Failed to reverse geocode place:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to resolve location from coordinates",
      },
      { status: 500 },
    );
  }
}
