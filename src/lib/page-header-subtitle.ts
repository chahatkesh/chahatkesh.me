/**
 * First sentence of text, trimmed to a page-header-friendly length.
 * Matches the short two-beat subtitle style used on index pages.
 */
export function pageHeaderSubtitle(text: string, maxLength = 72): string {
  const trimmed = text.trim();
  if (!trimmed) return "";

  const firstSentence = trimmed.match(/^[^.!?]+[.!?]?/)?.[0]?.trim() ?? trimmed;

  if (firstSentence.length <= maxLength) return firstSentence;

  const clipped = firstSentence.slice(0, maxLength - 1).trim();
  return `${clipped}…`;
}
