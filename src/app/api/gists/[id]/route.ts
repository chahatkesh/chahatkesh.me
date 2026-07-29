import { type NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "~/lib/mongodb";
import Gist from "~/models/gist";
import { requireAuth } from "~/lib/auth";
import { updateGistSchema } from "~/lib/validations";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET - Fetch a single gist/document by id (protected)
export async function GET(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Document not found" },
        { status: 404 },
      );
    }

    const gist = await Gist.findById(id).lean();

    if (!gist) {
      return NextResponse.json(
        { success: false, error: "Document not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: gist });
  } catch (error) {
    console.error("Error fetching gist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch document" },
      { status: 500 },
    );
  }
}

// PATCH - Update a gist/document by id (protected)
export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Document not found" },
        { status: 404 },
      );
    }

    const body = await request.json();
    const parsed = updateGistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const updated = await Gist.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Document not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating gist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update document" },
      { status: 500 },
    );
  }
}

// DELETE - Remove a gist/document by id (protected)
export async function DELETE(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Document not found" },
        { status: 404 },
      );
    }

    const removed = await Gist.findByIdAndDelete(id);

    if (!removed) {
      return NextResponse.json(
        { success: false, error: "Document not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting gist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete document" },
      { status: 500 },
    );
  }
}
