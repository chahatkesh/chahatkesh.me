import { NextResponse } from "next/server";
import {
  LLM_MARKDOWN_HEADERS,
  getWritingEntries,
  getWritingEntry,
} from "~/lib/writing";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const entries = await getWritingEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const entry = await getWritingEntry(slug);

  if (!entry || entry.draft) {
    return new NextResponse("Writing not found.\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new NextResponse(entry.markdown, { headers: LLM_MARKDOWN_HEADERS });
}
