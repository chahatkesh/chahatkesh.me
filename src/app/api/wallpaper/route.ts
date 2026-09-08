import { NextResponse } from "next/server";

import { loadGymSummary } from "~/lib/gym-data";
import { generateWallpaperImageResponse } from "~/lib/wallpaper-image";
import { buildWallpaperLayout } from "~/lib/wallpaper";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const NO_STORE = "public, no-store, no-cache, must-revalidate";

export async function GET() {
  try {
    const summary = await loadGymSummary();
    const layout = buildWallpaperLayout(summary);
    const image = generateWallpaperImageResponse(layout);

    return new NextResponse(await image.arrayBuffer(), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": NO_STORE,
      },
    });
  } catch (error) {
    console.error("Error generating wallpaper:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate wallpaper" },
      { status: 500, headers: { "Cache-Control": NO_STORE } },
    );
  }
}
