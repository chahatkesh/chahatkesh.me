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
  FILES: "/api/files",
  DIAGRAMS: "/api/diagrams",
  DIAGRAM_BY_ID: (id: string) => `/api/diagrams/${encodeURIComponent(id)}`,
  GISTS: "/api/gists",
  GIST_BY_ID: (id: string) => `/api/gists/${encodeURIComponent(id)}`,
  PLACES: "/api/places",
  PLACE_BY_ID: (id: string) => `/api/places/${encodeURIComponent(id)}`,
  PLACE_REVERSE_GEOCODE: "/api/places/reverse-geocode",
  GYM: "/api/gym",
  GYM_BY_ID: (id: string) => `/api/gym/${encodeURIComponent(id)}`,
  GYM_SUMMARY: "/api/gym/summary",
  GYM_EXERCISE_HISTORY: "/api/gym/exercise-history",
  GYM_EXERCISES: "/api/gym/exercises",
  GYM_EXERCISE_BY_ID: (id: string) =>
    `/api/gym/exercises/${encodeURIComponent(id)}`,
  GYM_PHOTOS: "/api/gym/photos",
  GYM_PHOTO_BY_ID: (id: string) => `/api/gym/photos/${encodeURIComponent(id)}`,
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
