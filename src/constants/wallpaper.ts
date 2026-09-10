/** IANA timezone for wallpaper "today" (India Standard Time). */
export const WALLPAPER_TIMEZONE = "Asia/Kolkata" as const;

/**
 * iPhone 15 Pro portrait canvas.
 * Apple: 6.1" Super Retina XDR, 2556×1179 @ 460 ppi, 3× (393×852 pt).
 */
export const WALLPAPER_SIZE = {
  width: 1179,
  height: 2556,
} as const;

export const WALLPAPER_POINTS = {
  width: 393,
  height: 852,
  scale: 3,
  /** Continuous display corner radius on 14 Pro / 15 / 15 Pro. */
  cornerRadius: 55,
} as const;

/**
 * Lock-screen chrome in points — not UIKit safe-area (59 / 34).
 * Default date + ~96pt time sit under the 126×37pt Dynamic Island.
 * Flashlight / camera (~50pt) sit above the 34pt home indicator.
 * iOS 26 can stretch the clock into empty space above the subject.
 */
export const WALLPAPER_LOCK_SCREEN = {
  /** Content starts below date + default clock, with air. */
  top: 248,
  /** Above iOS 18/26 controls + home indicator. */
  bottom: 152,
  /** Inside 55pt continuous corners. */
  side: 32,
  island: { top: 11, width: 126, height: 37 },
  dateTop: 54,
  timeTop: 74,
  timeSize: 92,
  controls: { top: 766, inset: 46, size: 50 },
  homeIndicator: { bottom: 8, width: 134, height: 5 },
} as const;

export const WALLPAPER_TYPE = {
  streakSize: 40,
  captionSize: 11,
  labelGap: 22,
  captionGap: 6,
} as const;

export const WALLPAPER_COLORS = {
  background: "#000000",
  /** Quiet enough that empty days recede on OLED / Always-On. */
  inactive: "#1f1f21",
  training: "#6ef0a5",
  rest: "#5b8fd4",
  text: "#f5f5f7",
  muted: "#636366",
  todayRing: "#d4d4d8",
} as const;

/** Inclusive rolling window: today plus the previous 364 days. */
export const WALLPAPER_LOOKBACK_DAYS = 365;

/** Packed matrix — 15-across keeps a portrait year readable at lock-screen size. */
export const WALLPAPER_GRID = {
  columns: 15,
  /** Diameter as a fraction of cell size; air between dots avoids a grey slab. */
  dotScale: 0.58,
} as const;

export function wallpaperPx(points: number): number {
  return points * WALLPAPER_POINTS.scale;
}
