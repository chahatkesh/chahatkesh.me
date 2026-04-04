import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import ExperienceGalleryImage from "~/models/experience-gallery";
import { cloudinary } from "~/lib/cloudinary";
import { requireAuth } from "~/lib/auth";
import { updateExperienceGalleryImageSchema } from "~/lib/validations";

type Params = { params: Promise<{ id: string }> };

// PATCH - Update caption or display order (protected)
export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    const body = await request.json();
    const parsed = updateExperienceGalleryImageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const updated = await ExperienceGalleryImage.findByIdAndUpdate(
      id,
      parsed.data,
      { new: true },
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Image not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating experience gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update image" },
      { status: 500 },
    );
  }
}

// DELETE - Remove image and its Cloudinary asset (protected)
export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    const image = await ExperienceGalleryImage.findById(id);

    if (!image) {
      return NextResponse.json(
        { success: false, error: "Image not found" },
        { status: 404 },
      );
    }

    // Remove from Cloudinary first to avoid orphaned assets
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    await image.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting experience gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete image" },
      { status: 500 },
    );
  }
}
