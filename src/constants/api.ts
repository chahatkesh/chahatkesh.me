/**
 * API endpoint constants.
 * Centralizes all API routes to prevent hardcoded strings across components.
 */

// Internal API routes
export const API_ROUTES = {
  SPOTIFY_NOW_PLAYING: "/api/spotify/now-playing",
  LEETCODE_STATS: "/api/leetcode/stats",
  CODING_ACTIVITY: "/api/coding-activity",
  VISITORS_INCREMENT: "/api/visitors/increment",
  VISITORS: "/api/visitors",
  GALLERY: "/api/gallery",
  AUTH_LOGIN: "/api/auth/login",
  /** Returns the URL for fetching experience gallery images by slug */
  EXPERIENCE_GALLERY: (slug: string) =>
    `/api/experience/gallery?slug=${encodeURIComponent(slug)}`,
  /** Proxies an external Open Graph preview image through our own origin */
  OG_IMAGE: (src: string) => `/api/og-image?src=${encodeURIComponent(src)}`,
} as const;

// External API routes
export const EXTERNAL_APIS = {
  GITHUB_CONTRIBUTIONS: (username: string) =>
    `https://github-contributions-api.jogruber.de/v4/${username}`,
} as const;
