/**
 * Server-side helpers for extracting Open Graph preview images from external
 * websites. Used to render rich link previews (e.g. the "What I'm Building
 * Right Now" cards on the about page).
 */

/** Cache fetched markup for a day; preview images rarely change. */
const REVALIDATE_SECONDS = 60 * 60 * 24;

/** A browser-like user agent so sites return their full social meta tags. */
const USER_AGENT =
  "Mozilla/5.0 (compatible; PortfolioOGBot/1.0; +https://chahatkesh.me)";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Rejects URLs that point at non-public hosts (localhost, loopback, private
 * ranges). Guards against misconfigured `og:image` tags (some sites ship a
 * `http://localhost:3000/...` preview) and against SSRF when proxying.
 */
export function isPublicHttpUrl(value: string): boolean {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") return false;

  const host = url.hostname.toLowerCase();

  if (
    host === "localhost" ||
    host === "0.0.0.0" ||
    host === "::1" ||
    host.endsWith(".local")
  ) {
    return false;
  }

  // IPv4 private / loopback / link-local ranges.
  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const [a, b] = ipv4.slice(1).map(Number);
    if (a === 127 || a === 10) return false;
    if (a === 192 && b === 168) return false;
    if (a === 172 && b >= 16 && b <= 31) return false;
    if (a === 169 && b === 254) return false;
  }

  return true;
}

/** Minimal HTML entity decoding for attribute values (mainly `&amp;` in URLs). */
function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#38;/g, "&")
    .replace(/&#x26;/gi, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/**
 * Pulls the `content` value of a `<meta>` tag matched by its `property` or
 * `name` attribute, regardless of attribute order.
 */
function extractMetaContent(html: string, key: string): string | null {
  const escaped = escapeRegExp(key);
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${escaped}["'][^>]*content=["']([^"']+)["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${escaped}["']`,
      "i",
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

/**
 * Fetches a page and returns the absolute URL of its best preview image
 * (`og:image`, falling back to `twitter:image`), or `null` if none is found.
 */
export async function getOgImageUrl(pageUrl: string): Promise<string | null> {
  try {
    const response = await fetch(pageUrl, {
      headers: {
        "user-agent": USER_AGENT,
        accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return null;

    const html = await response.text();

    const rawImage =
      extractMetaContent(html, "og:image") ??
      extractMetaContent(html, "og:image:url") ??
      extractMetaContent(html, "og:image:secure_url") ??
      extractMetaContent(html, "twitter:image") ??
      extractMetaContent(html, "twitter:image:src");

    if (!rawImage) return null;

    // Resolve protocol-relative and relative URLs against the page origin.
    const absolute = new URL(
      decodeHtmlEntities(rawImage.trim()),
      pageUrl,
    ).toString();

    // Skip previews that resolve to localhost / private hosts (commonly a
    // misconfigured tag); the card falls back to text-only in that case.
    return isPublicHttpUrl(absolute) ? absolute : null;
  } catch (error) {
    console.error(`Failed to fetch OG image for ${pageUrl}:`, error);
    return null;
  }
}
