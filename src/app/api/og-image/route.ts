import { NextResponse, type NextRequest } from "next/server";
import { isPublicHttpUrl } from "~/lib/og";

/** Cache proxied preview images for a day at the edge/CDN. */
export const revalidate = 86400;

const USER_AGENT =
  "Mozilla/5.0 (compatible; PortfolioOGBot/1.0; +https://chahatkesh.me)";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function fallbackPreviewResponse(src: string): NextResponse {
  let host = "External Link";

  try {
    host = new URL(src).hostname.replace(/^www\./, "");
  } catch {
    // keep default host label
  }

  const safeHost = escapeXml(host);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Preview unavailable">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1020"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="40" y="40" width="1120" height="550" rx="24" fill="none" stroke="#334155" stroke-opacity="0.8"/>
  <text x="80" y="285" fill="#94a3b8" font-size="36" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif">Preview unavailable</text>
  <text x="80" y="350" fill="#e2e8f0" font-size="52" font-weight="700" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif">${safeHost}</text>
  <text x="80" y="412" fill="#94a3b8" font-size="28" font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif">Open link to view content</text>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control":
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

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
      return fallbackPreviewResponse(src);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) {
      return fallbackPreviewResponse(src);
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
    return fallbackPreviewResponse(src);
  }
}
