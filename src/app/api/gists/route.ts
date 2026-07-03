import { randomBytes } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import Gist from "~/models/gist";
import { requireAuth } from "~/lib/auth";
import { createGistSchema } from "~/lib/validations";

function isDuplicateSlugError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11_000
  );
}

async function createGistWithUniqueSlug(
  title: string,
  markdownContent: string,
) {
  const createSlug = () => randomBytes(24).toString("hex");

  for (let attempt = 0; attempt < 100; attempt += 1) {
    const slug = createSlug();

    try {
      return await Gist.create({ title, slug, markdownContent });
    } catch (error) {
      if (isDuplicateSlugError(error)) {
        continue;
      }
      throw error;
    }
  }

  throw new Error("Could not generate a unique slug for this document");
}

// GET - List all gists/documents (protected)
export async function GET() {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();

    const gists = await Gist.find({})
      .sort({ updatedAt: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: gists });
  } catch (error) {
    console.error("Error fetching gists:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch documents" },
      { status: 500 },
    );
  }
}

// POST - Create a gist/document page (protected)
export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();

    const body = await request.json();
    const parsed = createGistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const created = await createGistWithUniqueSlug(
      parsed.data.title,
      parsed.data.markdownContent,
    );

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("Error creating gist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create document" },
      { status: 500 },
    );
  }
}
