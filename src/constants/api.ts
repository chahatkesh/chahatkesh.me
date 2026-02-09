/**
 * API endpoint constants.
 * Centralizes all API routes to prevent hardcoded strings across components.
 */

// Internal API routes
export const API_ROUTES = {
  SPOTIFY_NOW_PLAYING: "/api/spotify/now-playing",
  VISITORS_INCREMENT: "/api/visitors/increment",
  VISITORS: "/api/visitors",
  GALLERY: "/api/gallery",
  AUTH_LOGIN: "/api/auth/login",
} as const;

// External API routes
export const EXTERNAL_APIS = {
  GITHUB_CONTRIBUTIONS: (username: string) =>
    `https://github-contributions-api.jogruber.de/v4/${username}`,
} as const;
