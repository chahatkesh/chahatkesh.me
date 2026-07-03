import { randomBytes } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import Diagram from "~/models/diagram";
import { requireAuth } from "~/lib/auth";
import { createDiagramSchema } from "~/lib/validations";

function isDuplicateSlugError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11_000
  );
}

async function createDiagramWithUniqueSlug(title: string, mermaidCode: string) {
  const createSlug = () => randomBytes(24).toString("hex");

  for (let attempt = 0; attempt < 100; attempt += 1) {
    const slug = createSlug();

    try {
      return await Diagram.create({ title, slug, mermaidCode });
    } catch (error) {
      if (isDuplicateSlugError(error)) {
        continue;
      }
      throw error;
    }
  }

  throw new Error("Could not generate a unique slug for this diagram");
}

// GET - List all diagrams (protected)
export async function GET() {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();

    const diagrams = await Diagram.find({})
      .sort({ updatedAt: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: diagrams });
  } catch (error) {
    console.error("Error fetching diagrams:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch diagrams" },
      { status: 500 },
    );
  }
}

// POST - Create a diagram page (protected)
export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();

    const body = await request.json();
    const parsed = createDiagramSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const created = await createDiagramWithUniqueSlug(
      parsed.data.title,
      parsed.data.mermaidCode,
    );

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("Error creating diagram:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create diagram" },
      { status: 500 },
    );
  }
}
