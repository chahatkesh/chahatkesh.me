/**
 * Brand colors and visual identity tokens.
 * These are the single source of truth for brand-related colors
 * used across components, OG images, and third-party integrations.
 */

/** Primary brand accent color (HSL values for Tailwind CSS variable) */
export const BRAND_ACCENT_HSL = "182.7 100.0% 35.5%";

/** Primary brand accent color (hex for OG images and third-party libs) */
export const BRAND_ACCENT_HEX = "#00adb5";

/** Brand color palette for GitHub contribution graph */
export const GITHUB_CONTRIBUTION_COLORS = [
  "#1b1b1b",
  "#006064",
  "#00838f",
  "#0097a7",
  "#00adb5",
] as const;

/** Background color (hex for OG images) */
export const BACKGROUND_HEX = "#000000";

/** Decorative gradient colors used in project cards */
export const DECORATIVE_COLORS = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
} as const;
