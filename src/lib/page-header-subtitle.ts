/** Max length for visible page-header subtitles across the site. */
export const PAGE_HEADER_SUBTITLE_MAX = 72;

/** Shared text limits for stack pages and previews. */
export const STACK_TEXT_LIMITS = {
  cardPreview: 120,
  metaDescription: 160,
  ogSubtitle: 96,
  ogDescription: 160,
} as const;

/**
 * Trim text at a word boundary without cutting mid-word.
 */
export function clipAtWord(text: string, maxLength: number): string {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length <= maxLength) return trimmed;

  const clipped = trimmed.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(" ");
  const base =
    lastSpace > maxLength * 0.6 ? clipped.slice(0, lastSpace) : clipped;

  return `${base.trim()}…`;
}

/**
 * First sentence of text for page headers.
 * Source copy should stay within PAGE_HEADER_SUBTITLE_MAX — no truncation.
 */
export function pageHeaderSubtitle(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";

  return (
    trimmed.match(/^[^.!?\n]+[.!?]?/)?.[0]?.trim() ??
    trimmed.split("\n")[0].trim()
  );
}
