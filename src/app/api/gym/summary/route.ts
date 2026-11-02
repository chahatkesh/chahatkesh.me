import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { buildGymSummary } from "~/lib/gym";
import { loadGymSummary } from "~/lib/gym-data";
import { publicListCacheControl } from "~/lib/revalidate";
import type { GymSummary } from "~/types/gym";

export const revalidate = 300;

const EMPTY_SUMMARY: GymSummary = buildGymSummary([]);

export async function GET(request: NextRequest) {
  // Read outside the try so Next's dynamic-rendering bailout isn't swallowed.
  const cacheControl = publicListCacheControl(
    request,
    "public, s-maxage=300, stale-while-revalidate=900",
  );

  try {
    const data = await loadGymSummary();
    return NextResponse.json(
      { success: true, data },
      { headers: { "Cache-Control": cacheControl } },
    );
  } catch (error) {
    console.error("Error building gym summary:", error);
    return NextResponse.json({ success: true, data: EMPTY_SUMMARY });
  }
}
