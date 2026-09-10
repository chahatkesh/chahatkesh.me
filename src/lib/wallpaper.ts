import {
  WALLPAPER_COLORS,
  WALLPAPER_GRID,
  WALLPAPER_LOCK_SCREEN,
  WALLPAPER_LOOKBACK_DAYS,
  WALLPAPER_SIZE,
  WALLPAPER_TIMEZONE,
  WALLPAPER_TYPE,
  wallpaperPx,
} from "~/constants/wallpaper";
import {
  addDays,
  diffInDays,
  formatGymDate,
  isLoggedGymDay,
  parseGymDate,
} from "~/lib/gym";
import type { GymDaySummary, GymSummary } from "~/types/gym";

export type WallpaperDayState = "training" | "rest" | "inactive";

export interface WallpaperDayDot {
  date: string;
  state: WallpaperDayState;
  color: string;
  x: number;
  y: number;
  radius: number;
  isToday: boolean;
}

export interface WallpaperStreakLabel {
  value: number;
  x: number;
  y: number;
  width: number;
  numberSize: number;
  captionSize: number;
  gap: number;
}

export interface WallpaperLayout {
  width: number;
  height: number;
  dots: WallpaperDayDot[];
  streak: WallpaperStreakLabel;
}

/** Formats a Date as YYYY-MM-DD in IST for wallpaper day boundaries. */
export function formatGymDateInTimeZone(
  date: Date,
  timeZone: string = WALLPAPER_TIMEZONE,
): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    return formatGymDate(date);
  }

  return `${year}-${month}-${day}`;
}

function classifyWallpaperDay(
  day: GymDaySummary | undefined,
): WallpaperDayState {
  if (day && isLoggedGymDay(day)) {
    return day.isRestDay ? "rest" : "training";
  }
  return "inactive";
}

function colorForState(state: WallpaperDayState): string {
  if (state === "training") return WALLPAPER_COLORS.training;
  if (state === "rest") return WALLPAPER_COLORS.rest;
  return WALLPAPER_COLORS.inactive;
}

/**
 * Builds a 15-across matrix of the last 365 days through today (IST).
 * Future days are omitted. Today's cell gets a ring so the incomplete
 * last row reads as the current day, not a clipped grid.
 */
export function buildWallpaperLayout(
  summary: GymSummary,
  referenceDate = new Date(),
): WallpaperLayout {
  const { width, height } = WALLPAPER_SIZE;
  const todayIso = formatGymDateInTimeZone(referenceDate);
  const dayByDate = new Map(summary.days.map((day) => [day.date, day]));

  const today = parseGymDate(todayIso);
  const start = addDays(today, -(WALLPAPER_LOOKBACK_DAYS - 1));
  const daysThroughToday = Math.max(1, diffInDays(start, today) + 1);

  const cols = WALLPAPER_GRID.columns;
  const rows = Math.max(1, Math.ceil(daysThroughToday / cols));

  const safeTop = wallpaperPx(WALLPAPER_LOCK_SCREEN.top);
  const safeBottom = wallpaperPx(WALLPAPER_LOCK_SCREEN.bottom);
  const side = wallpaperPx(WALLPAPER_LOCK_SCREEN.side);
  const usableWidth = width - side * 2;
  const usableHeight = height - safeTop - safeBottom;

  const numberSize = wallpaperPx(WALLPAPER_TYPE.streakSize);
  const captionSize = wallpaperPx(WALLPAPER_TYPE.captionSize);
  const captionGap = wallpaperPx(WALLPAPER_TYPE.captionGap);
  const labelGap = wallpaperPx(WALLPAPER_TYPE.labelGap);
  const labelHeight = numberSize + captionGap + captionSize;

  const availableGridHeight = Math.max(
    1,
    usableHeight - labelGap - labelHeight,
  );
  const cell = Math.min(usableWidth / cols, availableGridHeight / rows);
  const radius = (cell * WALLPAPER_GRID.dotScale) / 2;
  const gridWidth = cell * cols;
  const gridHeight = cell * rows;
  const blockHeight = gridHeight + labelGap + labelHeight;

  // Pin the subject low so the lock-screen clock can sit in the black above.
  const blockTop = height - safeBottom - blockHeight;
  const originX = (width - gridWidth) / 2 + cell / 2;
  const originY = blockTop + cell / 2;

  const dots: WallpaperDayDot[] = [];

  for (let index = 0; index < daysThroughToday; index += 1) {
    const iso = formatGymDate(addDays(start, index));
    if (iso > todayIso) break;

    const col = index % cols;
    const row = Math.floor(index / cols);
    const state = classifyWallpaperDay(dayByDate.get(iso));

    dots.push({
      date: iso,
      state,
      color: colorForState(state),
      x: originX + col * cell,
      y: originY + row * cell,
      radius,
      isToday: iso === todayIso,
    });
  }

  const lastDotY = dots.length > 0 ? originY + (rows - 1) * cell : originY;

  return {
    width,
    height,
    dots,
    streak: {
      value: summary.currentStreak,
      x: (width - gridWidth) / 2,
      y: lastDotY + cell / 2 + labelGap,
      width: gridWidth,
      numberSize,
      captionSize,
      gap: captionGap,
    },
  };
}

/** Builds the public wallpaper URL for iPhone Shortcuts. */
export function buildWallpaperUrl(origin: string): string {
  return new URL("/api/wallpaper", origin).toString();
}
