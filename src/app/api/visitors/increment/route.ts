import { NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import { Visitor } from "~/models/visitor";

// This ensures the route is not statically optimized
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI environment variable is not defined");
      return NextResponse.json(
        { error: "Database configuration error" },
        { status: 500 },
      );
    }

    await dbConnect();

    // Find the visitor document, or create one if it doesn't exist
    const visitorData = await Visitor.findOne({});

    if (visitorData) {
      // Increment the existing count
      visitorData.count += 1;
      visitorData.lastUpdated = new Date();
      await visitorData.save();

      // Add cache-control headers to prevent caching
      return NextResponse.json(
        { count: visitorData.count },
        {
          status: 200,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      );
    } else {
      // Create a new document with initial count of 1
      const newVisitor = await Visitor.create({
        count: 1,
        lastUpdated: new Date(),
      });
      return NextResponse.json({ count: newVisitor.count }, { status: 200 });
    }
  } catch (error) {
    console.error("Error updating visitor count:", error);
    return NextResponse.json(
      { error: "Failed to update visitor count" },
      { status: 500 },
    );
  }
}
