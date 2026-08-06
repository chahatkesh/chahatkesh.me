import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import GymProgressPhoto from "~/models/gym-progress-photo";
import { cloudinary } from "~/lib/cloudinary";
import { requireAuth } from "~/lib/auth";
import { revalidateGymCache } from "~/lib/revalidate";
import { updateGymProgressPhotoSchema } from "~/lib/validations";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;

    const photo = await GymProgressPhoto.findById(id).lean();

    if (!photo) {
      return NextResponse.json(
        { success: false, error: "Photo not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: photo,
    });
  } catch (error) {
    console.error("Error fetching gym progress photo:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch progress photo" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    const body = await request.json();
    const parsed = updateGymProgressPhotoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const updatedPhoto = await GymProgressPhoto.findByIdAndUpdate(
      id,
      parsed.data,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedPhoto) {
      return NextResponse.json(
        { success: false, error: "Photo not found" },
        { status: 404 },
      );
    }

    revalidateGymCache();

    return NextResponse.json({
      success: true,
      data: updatedPhoto,
    });
  } catch (error) {
    console.error("Error updating gym progress photo:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update progress photo" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    const photo = await GymProgressPhoto.findById(id);

    if (!photo) {
      return NextResponse.json(
        { success: false, error: "Photo not found" },
        { status: 404 },
      );
    }

    try {
      await cloudinary.uploader.destroy(photo.publicId);
    } catch (cloudinaryError) {
      console.error("Error deleting from Cloudinary:", cloudinaryError);
    }

    await GymProgressPhoto.findByIdAndDelete(id);

    revalidateGymCache();

    return NextResponse.json({
      success: true,
      message: "Photo deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting gym progress photo:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete progress photo" },
      { status: 500 },
    );
  }
}
