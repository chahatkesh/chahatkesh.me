import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import ExperienceGalleryImage from "~/models/experience-gallery";
import { requireAuth } from "~/lib/auth";
import { createExperienceGalleryImageSchema } from "~/lib/validations";

// GET - Fetch gallery images for a specific experience (public)
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { success: false, error: "Experience slug is required" },
      { status: 400 },
    );
  }

  try {
    await dbConnect();

    const images = await ExperienceGalleryImage.find({
      experienceSlug: slug,
    })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error("Error fetching experience gallery:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch images" },
      { status: 500 },
    );
  }
}

// POST - Add a new image to an experience gallery (protected)
export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();

    const body = await request.json();
    const parsed = createExperienceGalleryImageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    // Place the new image at the end of the existing order
    const count = await ExperienceGalleryImage.countDocuments({
      experienceSlug: parsed.data.experienceSlug,
    });

    const newImage = await ExperienceGalleryImage.create({
      ...parsed.data,
      order: count,
    });

    return NextResponse.json(
      { success: true, data: newImage },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding experience gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add image" },
      { status: 500 },
    );
  }
}
