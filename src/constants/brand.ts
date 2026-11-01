/**
 * Brand colors and visual identity tokens.
 * These are the single source of truth for brand-related colors
 * used across components, OG images, and third-party integrations.
 */

/** Primary brand accent color (HSL values for Tailwind CSS variable) */
export const BRAND_ACCENT_HSL = "182.7 100.0% 35.5%";

/** Primary brand accent color (hex for OG images and third-party libs) */
export const BRAND_ACCENT_HEX = "#00adb5";

/**
 * GitHub contribution ramp. Values are CSS variables so the same cells
 * follow the system color scheme without a second render.
 */
export const GITHUB_CONTRIBUTION_COLORS = [
  "var(--contrib-github-0)",
  "var(--contrib-github-1)",
  "var(--contrib-github-2)",
  "var(--contrib-github-3)",
  "var(--contrib-github-4)",
] as const;

/** LeetCode activity ramp. See GITHUB_CONTRIBUTION_COLORS. */
export const LEETCODE_CALENDAR_COLORS = [
  "var(--contrib-leetcode-0)",
  "var(--contrib-leetcode-1)",
  "var(--contrib-leetcode-2)",
  "var(--contrib-leetcode-3)",
  "var(--contrib-leetcode-4)",
] as const;

/** Background color (hex for OG images) */
export const BACKGROUND_HEX = "#000000";

/** Decorative gradient colors used in project cards */
export const DECORATIVE_COLORS = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
} as const;
