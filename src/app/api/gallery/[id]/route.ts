import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/mongodb";
import GalleryImage from "~/models/gallery";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET - Fetch single gallery image
export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
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

// PUT - Update gallery image
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    const body = await request.json();
    const { title, location, date, aspectRatio, isFeatured, order } = body;

    const updatedImage = await GalleryImage.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(location && { location }),
        ...(date && { date }),
        ...(aspectRatio && { aspectRatio }),
        ...(typeof isFeatured === "boolean" && { isFeatured }),
        ...(typeof order === "number" && { order }),
      },
      { new: true, runValidators: true },
    );

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

// DELETE - Delete gallery image
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
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
