import {
  WALLPAPER_COLORS,
  WALLPAPER_GRID,
  WALLPAPER_SAFE_AREA,
  WALLPAPER_SIZE,
  WALLPAPER_TIMEZONE,
} from "~/constants/wallpaper";
import {
  addDays,
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
}

export interface WallpaperStreakLabel {
  value: number;
  x: number;
  y: number;
  width: number;
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
 * Builds a 15-across matrix of days from Jan 1 through today (IST).
 * Future days are omitted entirely.
 */
export function buildWallpaperLayout(
  summary: GymSummary,
  referenceDate = new Date(),
): WallpaperLayout {
  const { width, height } = WALLPAPER_SIZE;
  const todayIso = formatGymDateInTimeZone(referenceDate);
  const year = Number(todayIso.slice(0, 4));
  const dayByDate = new Map(summary.days.map((day) => [day.date, day]));

  const start = parseGymDate(`${year}-01-01`);
  const today = parseGymDate(todayIso);
  const daysThroughToday = Math.max(
    0,
    Math.round((today.getTime() - start.getTime()) / 86_400_000) + 1,
  );

  const cols = WALLPAPER_GRID.columns;
  const rows = Math.max(1, Math.ceil(daysThroughToday / cols));

  const safeTop = height * WALLPAPER_SAFE_AREA.top;
  const safeBottom = height * WALLPAPER_SAFE_AREA.bottom;
  const usableHeight = height - safeTop - safeBottom;
  const maxGridWidth = width * 0.9;
  const labelHeight = width * 0.075;
  let cell = maxGridWidth / cols;
  let labelGap = cell * 1.25;
  const measureBlock = () => rows * cell + labelGap + labelHeight;
  if (measureBlock() > usableHeight * 0.92) {
    const scale = (usableHeight * 0.92) / measureBlock();
    cell *= scale;
    labelGap *= scale;
  }
  const radius = (cell * WALLPAPER_GRID.dotScale) / 2;
  const gridWidth = cell * cols;
  const gridHeight = cell * rows;
  const blockHeight = gridHeight + labelGap + labelHeight;
  const originX = (width - gridWidth) / 2 + cell / 2;
  const originY = safeTop + (usableHeight - blockHeight) / 2 + cell / 2;

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
    },
  };
}

/** Builds the public wallpaper URL for iPhone Shortcuts. */
export function buildWallpaperUrl(origin: string): string {
  return new URL("/api/wallpaper", origin).toString();
}
