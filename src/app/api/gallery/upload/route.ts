import { type NextRequest, NextResponse } from "next/server";
import { cloudinary } from "~/lib/cloudinary";
import { requireAuth } from "~/lib/auth";
import { uploadFileSchema } from "~/lib/validations";

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    const body = await request.json();
    const parsed = uploadFileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(parsed.data.file, {
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
