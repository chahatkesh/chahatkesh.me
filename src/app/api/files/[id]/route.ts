import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import SharedFile from "~/models/shared-file";
import { cloudinary } from "~/lib/cloudinary";
import { requireAuth } from "~/lib/auth";
import { updateSharedFileSchema } from "~/lib/validations";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// PATCH - Rename a shared file (protected)
export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    const body = await request.json();
    const parsed = updateSharedFileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const updated = await SharedFile.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error renaming shared file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to rename file" },
      { status: 500 },
    );
  }
}

// DELETE - Delete a shared file (protected)
export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    const file = await SharedFile.findById(id);

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 },
      );
    }

    // Delete from Cloudinary. Non-image assets (pdf/zip/docs) are stored as
    // "raw", so pass the stored resource type to destroy the right asset.
    try {
      const resourceType =
        file.resourceType === "auto" ? "image" : file.resourceType;
      await cloudinary.uploader.destroy(file.publicId, {
        resource_type: resourceType,
      });
    } catch (cloudinaryError) {
      console.error("Error deleting from Cloudinary:", cloudinaryError);
      // Continue with database deletion even if Cloudinary fails
    }

    await SharedFile.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting shared file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete file" },
      { status: 500 },
    );
  }
}
