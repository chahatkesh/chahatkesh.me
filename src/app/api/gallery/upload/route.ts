import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { file } = body;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "portfolio/gallery",
      resource_type: "auto",
      transformation: [
        { width: 1200, height: 1600, crop: "limit", quality: "auto" },
      ],
    });

    return NextResponse.json({
      success: true,
      data: {
        url: uploadResponse.secure_url,
        publicId: uploadResponse.public_id,
      },
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
