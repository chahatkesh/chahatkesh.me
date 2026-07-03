/**
 * Markdown gist/document helpers shared by APIs and UI.
 */

/**
 * Build a URL-safe slug from a gist title.
 * Falls back to "gist" when the title has no valid slug characters.
 */
export function slugifyGistTitle(title: string): string {
  const normalized = title
    .toLowerCase()
    .replace(/\./g, "-")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);

  return normalized || "gist";
}

/**
 * Public share path for a saved markdown gist/document.
 */
export function getGistSharePath(slug: string): string {
  return `/gists/${encodeURIComponent(slug)}`;
}
