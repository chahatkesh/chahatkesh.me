/**
 * Numeric limits and magic numbers.
 * Centralizes all threshold values used across the UI.
 */

// Project display limits
export const MAX_FEATURED_PROJECTS = 4;
export const MAX_VISIBLE_FEATURES_FEATURED = 3;
export const MAX_VISIBLE_FEATURES = 5;
export const MAX_VISIBLE_STACKS_FEATURED = 3;
export const MAX_VISIBLE_STACKS = 5;
export const MAX_RELATED_PROJECTS = 3;

// Experience display limits
export const MAX_DISPLAYED_EXPERIENCES = 4;

// Polling & timeout intervals (ms)
export const SPOTIFY_POLL_INTERVAL_MS = 30_000;
export const FETCH_TIMEOUT_MS = 5_000;
export const SWR_DEDUPING_INTERVAL_MS = 10_000;
export const SWR_ERROR_RETRY_COUNT = 3;
export const SWR_ERROR_RETRY_INTERVAL_MS = 5_000;

// Carousel scroll
export const CAROUSEL_SCROLL_AMOUNT = 340;
export const TIMELINE_SCROLL_AMOUNT = 150;

// OG Image
export const OG_DESCRIPTION_MAX_LENGTH = 150;
export const OG_MAX_TAGS = 5;

// GitHub calendar
export const GITHUB_CALENDAR_FONT_SIZE = 12;
export const GITHUB_CALENDAR_BLOCK_SIZE = 12;

// Marquee
export const MARQUEE_SPEED = 20;

// Image sizes
export const EXPERIENCE_LOGO_SIZE = {
  mobile: 60,
  desktop: 72,
} as const;
