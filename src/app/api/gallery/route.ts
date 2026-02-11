import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import GalleryImage from "~/models/gallery";
import { requireAuth } from "~/lib/auth";
import { createGalleryImageSchema } from "~/lib/validations";

// GET - Fetch all gallery images (public)
export async function GET() {
  try {
    await dbConnect();

    const images = await GalleryImage.find({})
      .sort({ date: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch images" },
      { status: 500 },
    );
  }
}

// POST - Create new gallery image (protected)
export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();

    const body = await request.json();
    const parsed = createGalleryImageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const newImage = await GalleryImage.create({
      ...parsed.data,
      order: 0,
    });

    return NextResponse.json(
      { success: true, data: newImage },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create image" },
      { status: 500 },
    );
  }
}
