import { NextResponse } from "next/server";
import { LLM_MARKDOWN_HEADERS, getWritingEntries } from "~/lib/writing";

export const dynamic = "force-static";

export async function GET() {
  const writing = await getWritingEntries();
  const body = writing
    .map((entry) => entry.markdown.trimEnd())
    .join("\n\n---\n\n");

  return new NextResponse(`${body}\n`, { headers: LLM_MARKDOWN_HEADERS });
}
