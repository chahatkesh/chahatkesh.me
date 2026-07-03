import { type NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "~/lib/mongodb";
import Diagram from "~/models/diagram";
import { requireAuth } from "~/lib/auth";
import { updateDiagramSchema } from "~/lib/validations";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET - Fetch a single diagram by id (protected)
export async function GET(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Diagram not found" },
        { status: 404 },
      );
    }

    const diagram = await Diagram.findById(id).lean();

    if (!diagram) {
      return NextResponse.json(
        { success: false, error: "Diagram not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: diagram });
  } catch (error) {
    console.error("Error fetching diagram:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch diagram" },
      { status: 500 },
    );
  }
}

// PATCH - Update a diagram by id (protected)
export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Diagram not found" },
        { status: 404 },
      );
    }

    const body = await request.json();
    const parsed = updateDiagramSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const updated = await Diagram.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Diagram not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating diagram:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update diagram" },
      { status: 500 },
    );
  }
}

// DELETE - Remove a diagram by id (protected)
export async function DELETE(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Diagram not found" },
        { status: 404 },
      );
    }

    const removed = await Diagram.findByIdAndDelete(id);

    if (!removed) {
      return NextResponse.json(
        { success: false, error: "Diagram not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Diagram deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting diagram:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete diagram" },
      { status: 500 },
    );
  }
}
