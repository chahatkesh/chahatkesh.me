import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/mongodb";
import GalleryImage from "~/models/gallery";

// GET - Fetch all gallery images
export async function GET() {
  try {
    await connectDB();
    
    const images = await GalleryImage.find({})
      .sort({ createdAt: -1 })
      .lean();

    // Sort by date in descending order (newest first) on the server
    const sortedImages = images.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json({
      success: true,
      data: sortedImages,
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

// POST - Create new gallery image
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { title, location, date, aspectRatio, imageUrl, publicId, isFeatured } = body;

    // Validation
    if (!title || !location || !date || !imageUrl || !publicId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newImage = await GalleryImage.create({
      title,
      location,
      date,
      aspectRatio: aspectRatio || "square",
      imageUrl,
      publicId,
      isFeatured: isFeatured || false,
      order: 0,
    });

    return NextResponse.json({
      success: true,
      data: newImage,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create image" },
      { status: 500 }
    );
  }
}
