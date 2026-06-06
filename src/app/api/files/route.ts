import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import SharedFile from "~/models/shared-file";
import { requireAuth } from "~/lib/auth";
import { createSharedFileSchema } from "~/lib/validations";

// GET - List all shared files (protected: admin-only listing)
export async function GET() {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();

    const files = await SharedFile.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: files,
    });
  } catch (error) {
    console.error("Error fetching shared files:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch files" },
      { status: 500 },
    );
  }
}

// POST - Save a newly uploaded shared file (protected)
export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();

    const body = await request.json();
    const parsed = createSharedFileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const newFile = await SharedFile.create(parsed.data);

    return NextResponse.json({ success: true, data: newFile }, { status: 201 });
  } catch (error) {
    console.error("Error saving shared file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save file" },
      { status: 500 },
    );
  }
}
