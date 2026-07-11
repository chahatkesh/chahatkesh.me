import { type NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "~/lib/mongodb";
import Place from "~/models/place";
import { requireAuth } from "~/lib/auth";
import { revalidatePlacesCache } from "~/lib/revalidate";
import { updatePlaceSchema } from "~/lib/validations";
import {
  isCoordinatePairLocation,
  resolvePlaceLocation,
  UNKNOWN_PLACE_LOCATION,
} from "~/lib/place-location";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET - Fetch a single place by id (public)
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Place not found" },
        { status: 404 },
      );
    }

    const place = await Place.findById(id).lean();

    if (!place) {
      return NextResponse.json(
        { success: false, error: "Place not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: place });
  } catch (error) {
    console.error("Error fetching place:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch place" },
      { status: 500 },
    );
  }
}

// PATCH - Update a place by id (protected)
export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Place not found" },
        { status: 404 },
      );
    }

    const existingPlace = await Place.findById(id).lean();

    if (!existingPlace) {
      return NextResponse.json(
        { success: false, error: "Place not found" },
        { status: 404 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;

    const hasOwn = Object.prototype.hasOwnProperty;
    const hasLocation = hasOwn.call(body, "location");
    const hasLatitude = hasOwn.call(body, "latitude");
    const hasLongitude = hasOwn.call(body, "longitude");

    const providedLocation =
      typeof body.location === "string" ? body.location.trim() : "";
    const hasCoordinateLocation =
      providedLocation.length > 0 && isCoordinatePairLocation(providedLocation);
    const shouldDeriveLocation =
      (hasLocation &&
        (providedLocation.length === 0 || hasCoordinateLocation)) ||
      (!hasLocation && (hasLatitude || hasLongitude));

    if (shouldDeriveLocation) {
      const latitude = hasLatitude
        ? Number(body.latitude)
        : Number(existingPlace.latitude);
      const longitude = hasLongitude
        ? Number(body.longitude)
        : Number(existingPlace.longitude);

      if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
        body.location = await resolvePlaceLocation({
          latitude,
          longitude,
        });
      } else if (hasLocation) {
        body.location = UNKNOWN_PLACE_LOCATION;
      }
    } else if (
      hasLocation &&
      providedLocation.length > 0 &&
      !hasCoordinateLocation
    ) {
      body.location = providedLocation;
    }

    const parsed = updatePlaceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const updated = await Place.findByIdAndUpdate(
      id,
      {
        ...parsed.data,
        ...(parsed.data.shortNote !== undefined
          ? { shortNote: parsed.data.shortNote.trim() }
          : {}),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Place not found" },
        { status: 404 },
      );
    }

    revalidatePlacesCache();

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating place:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update place" },
      { status: 500 },
    );
  }
}

// DELETE - Remove a place by id (protected)
export async function DELETE(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Place not found" },
        { status: 404 },
      );
    }

    const removed = await Place.findByIdAndDelete(id);

    if (!removed) {
      return NextResponse.json(
        { success: false, error: "Place not found" },
        { status: 404 },
      );
    }

    revalidatePlacesCache();

    return NextResponse.json({
      success: true,
      message: "Place deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting place:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete place" },
      { status: 500 },
    );
  }
}
