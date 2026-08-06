import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import GymProgressPhoto from "~/models/gym-progress-photo";
import { requireAuth } from "~/lib/auth";
import { publicListCacheControl, revalidateGymCache } from "~/lib/revalidate";
import { createGymProgressPhotoSchema } from "~/lib/validations";

export const revalidate = 60;

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const photos = await GymProgressPhoto.find({})
      .sort({ date: -1, createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: photos,
      },
      {
        headers: {
          "Cache-Control": publicListCacheControl(
            request,
            "public, s-maxage=60, stale-while-revalidate=300",
          ),
        },
      },
    );
  } catch (error) {
    console.error("Error fetching gym progress photos:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch progress photos" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();

    const body = await request.json();
    const parsed = createGymProgressPhotoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const photo = await GymProgressPhoto.create(parsed.data);

    revalidateGymCache();

    return NextResponse.json({ success: true, data: photo }, { status: 201 });
  } catch (error) {
    console.error("Error creating gym progress photo:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create progress photo" },
      { status: 500 },
    );
  }
}
