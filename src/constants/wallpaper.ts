/** IANA timezone for wallpaper "today" (India Standard Time). */
export const WALLPAPER_TIMEZONE = "Asia/Kolkata" as const;

/** iPhone 15 Pro lock-screen canvas (portrait Super Retina XDR). */
export const WALLPAPER_SIZE = {
  width: 1179,
  height: 2556,
} as const;

/** Safe-area insets as fractions of canvas height (lock screen clock / home indicator). */
export const WALLPAPER_SAFE_AREA = {
  top: 0.28,
  bottom: 0.12,
} as const;

export const WALLPAPER_COLORS = {
  background: "#000000",
  inactive: "#3f3f46",
  training: "#6ef0a5",
  rest: "#5b8fd4",
  text: "#fafafa",
  muted: "#52525b",
} as const;

/** Packed matrix — 15 circles per row, rows grow through the year. */
export const WALLPAPER_GRID = {
  columns: 15,
  /** Dot diameter as a fraction of the cell size. */
  dotScale: 0.68,
} as const;
