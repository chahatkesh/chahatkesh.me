import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import Place from "~/models/place";
import { requireAuth } from "~/lib/auth";
import {
  publicListCacheControl,
  revalidatePlacesCache,
} from "~/lib/revalidate";
import { createPlaceSchema } from "~/lib/validations";
import {
  isCoordinatePairLocation,
  resolvePlaceLocation,
  UNKNOWN_PLACE_LOCATION,
} from "~/lib/place-location";

// Public places list updates less frequently; cache briefly at the edge.
export const revalidate = 120;

// GET - Fetch all visited places (public)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const places = await Place.find({})
      .sort({ visitedAt: -1, createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: places,
      },
      {
        headers: {
          "Cache-Control": publicListCacheControl(
            request,
            "public, s-maxage=120, stale-while-revalidate=600",
          ),
        },
      },
    );
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch places" },
      { status: 500 },
    );
  }
}

// POST - Create a visited place (protected)
export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();

    const body = (await request.json()) as Record<string, unknown>;
    const providedLocationRaw =
      typeof body.location === "string" ? body.location : "";
    const providedLocation = isCoordinatePairLocation(providedLocationRaw)
      ? ""
      : providedLocationRaw;

    const latitude = Number(body.latitude);
    const longitude = Number(body.longitude);

    const resolvedLocation =
      Number.isFinite(latitude) && Number.isFinite(longitude)
        ? await resolvePlaceLocation({
            location: providedLocation,
            latitude,
            longitude,
          })
        : providedLocation.trim() || UNKNOWN_PLACE_LOCATION;

    const parsed = createPlaceSchema.safeParse({
      ...body,
      location: resolvedLocation,
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const created = await Place.create({
      ...parsed.data,
      shortNote: parsed.data.shortNote?.trim() ?? "",
    });

    revalidatePlacesCache();

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("Error creating place:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create place" },
      { status: 500 },
    );
  }
}
