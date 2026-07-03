/**
 * Mermaid diagram helpers shared across API handlers and UI.
 */

/**
 * Build a URL-safe slug from a diagram title.
 * Falls back to "diagram" when the title has no valid slug characters.
 */
export function slugifyDiagramTitle(title: string): string {
  const normalized = title
    .toLowerCase()
    .replace(/\./g, "-")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  return normalized || "diagram";
}

/**
 * Public share path for a saved Mermaid diagram page.
 */
export function getDiagramSharePath(slug: string): string {
  return `/diagrams/${encodeURIComponent(slug)}`;
}
