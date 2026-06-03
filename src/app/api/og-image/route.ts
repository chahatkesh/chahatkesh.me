import { NextResponse, type NextRequest } from "next/server";
import { isPublicHttpUrl } from "~/lib/og";

/** Cache proxied preview images for a day at the edge/CDN. */
export const revalidate = 86400;

const USER_AGENT =
  "Mozilla/5.0 (compatible; PortfolioOGBot/1.0; +https://chahatkesh.me)";

/**
 * Streams an external preview image through our own origin. This lets us render
 * Open Graph images from arbitrary domains with `next/image` without having to
 * allowlist every possible host in `next.config`.
 *
 * Usage: `/api/og-image?src=<absolute https image url>`
 */
export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src");

  if (!src) {
    return new NextResponse("Missing src parameter", { status: 400 });
  }

  if (!isPublicHttpUrl(src)) {
    return new NextResponse("Invalid or disallowed src parameter", {
      status: 400,
    });
  }

  const target = new URL(src);

  try {
    const response = await fetch(target, {
      headers: { "user-agent": USER_AGENT },
      next: { revalidate },
    });

    if (!response.ok) {
      return new NextResponse("Failed to fetch image", { status: 404 });
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) {
      return new NextResponse("Not an image", { status: 415 });
    }

    const body = await response.arrayBuffer();

    return new NextResponse(body, {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control":
          "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error(`OG image proxy error for ${src}:`, error);
    return new NextResponse("Failed to fetch image", { status: 502 });
  }
}
