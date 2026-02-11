import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import GalleryImage from "~/models/gallery";
import { cloudinary } from "~/lib/cloudinary";
import { requireAuth } from "~/lib/auth";
import { updateGalleryImageSchema } from "~/lib/validations";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET - Fetch single gallery image (public)
export async function GET(request: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;

    const image = await GalleryImage.findById(id).lean();

    if (!image) {
      return NextResponse.json(
        { success: false, error: "Image not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: image,
    });
  } catch (error) {
    console.error("Error fetching gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch image" },
      { status: 500 },
    );
  }
}

// PUT - Update gallery image (protected)
export async function PUT(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    const body = await request.json();
    const parsed = updateGalleryImageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const updatedImage = await GalleryImage.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    });

    if (!updatedImage) {
      return NextResponse.json(
        { success: false, error: "Image not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedImage,
    });
  } catch (error) {
    console.error("Error updating gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update image" },
      { status: 500 },
    );
  }
}

// DELETE - Delete gallery image (protected)
export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    const image = await GalleryImage.findById(id);

    if (!image) {
      return NextResponse.json(
        { success: false, error: "Image not found" },
        { status: 404 },
      );
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(image.publicId);
    } catch (cloudinaryError) {
      console.error("Error deleting from Cloudinary:", cloudinaryError);
      // Continue with database deletion even if Cloudinary fails
    }

    // Delete from database
    await GalleryImage.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete image" },
      { status: 500 },
    );
  }
}
