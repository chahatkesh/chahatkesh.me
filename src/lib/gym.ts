/**
 * Pure helpers for the gym tracker: date normalization, volume math and
 * summary aggregation shared by API routes and chart components.
 */

import {
  GYM_WEEK_HISTORY,
  MUSCLE_GROUPS,
  WEEKLY_DURATION_GOAL,
  WEEKLY_SESSION_GOAL,
} from "~/constants/gym";
import type { MuscleGroup } from "~/constants/gym";
import type {
  GymDaySummary,
  GymGroupStat,
  GymSummary,
  GymWeekSummary,
  WorkoutSetEntry,
} from "~/types/gym";

const MS_PER_DAY = 86_400_000;

/** Fields needed for volume math — works for both API and mongoose shapes. */
type VolumeExercise = {
  group: MuscleGroup;
  sets?: number;
  reps?: number;
  weight?: number;
  setDetails?: WorkoutSetEntry[];
};

/** Parses a YYYY-MM-DD string in local time to avoid UTC drift. */
export function parseGymDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** Formats a Date to YYYY-MM-DD in local time. */
export function formatGymDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Collapses any date input to UTC midnight so one document maps to one day. */
export function toUtcDayStart(input: string | Date): Date {
  if (typeof input === "string") {
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(input);
    if (match) {
      return new Date(
        Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])),
      );
    }
  }
  const parsed = new Date(input);
  return new Date(
    Date.UTC(
      parsed.getUTCFullYear(),
      parsed.getUTCMonth(),
      parsed.getUTCDate(),
    ),
  );
}

/** Serializes a stored Date back to the YYYY-MM-DD form the client expects. */
export function toIsoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

export function diffInDays(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY);
}

/** Monday of the calendar week that contains `date` (local time). */
export function startOfWeek(date: Date): Date {
  const day = date.getDay(); // 0 Sun … 6 Sat
  const offset = day === 0 ? -6 : 1 - day;
  return addDays(date, offset);
}

/** Short range label for a Mon–Sun week, e.g. "Mar 3–9". */
export function formatWeekRange(startIso: string, endIso: string): string {
  const start = parseGymDate(startIso);
  const end = parseGymDate(endIso);
  const sameMonth = start.getMonth() === end.getMonth();
  const startLabel = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const endLabel = sameMonth
    ? String(end.getDate())
    : end.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${startLabel}–${endLabel}`;
}

/** Total kilograms moved by one exercise. Cardio contributes no volume. */
export function exerciseVolume(exercise: VolumeExercise): number {
  if (exercise.group === "cardio") return 0;

  if (exercise.setDetails?.length) {
    return exercise.setDetails.reduce(
      (total, set) => total + set.reps * set.weight,
      0,
    );
  }

  const sets = exercise.sets ?? 0;
  const reps = exercise.reps ?? 0;
  const weight = exercise.weight ?? 0;
  return sets * reps * weight;
}

export function sessionVolume(exercises: VolumeExercise[]): number {
  return exercises.reduce((total, item) => total + exerciseVolume(item), 0);
}

export function sessionGroupVolume(
  exercises: VolumeExercise[],
): Partial<Record<MuscleGroup, number>> {
  const totals: Partial<Record<MuscleGroup, number>> = {};
  for (const exercise of exercises) {
    const volume = exerciseVolume(exercise);
    if (volume <= 0) continue;
    totals[exercise.group] = (totals[exercise.group] ?? 0) + volume;
  }
  return totals;
}

export function sessionGroupExerciseCount(
  exercises: VolumeExercise[],
): Partial<Record<MuscleGroup, number>> {
  const totals: Partial<Record<MuscleGroup, number>> = {};
  for (const exercise of exercises) {
    totals[exercise.group] = (totals[exercise.group] ?? 0) + 1;
  }
  return totals;
}

/** Counts consecutive days ending at `today` (or yesterday, if today is unlogged). */
function computeStreaks(sortedDates: string[]): {
  current: number;
  best: number;
} {
  if (sortedDates.length === 0) return { current: 0, best: 0 };

  let best = 1;
  let run = 1;
  for (let i = 1; i < sortedDates.length; i += 1) {
    const gap = diffInDays(
      parseGymDate(sortedDates[i - 1]),
      parseGymDate(sortedDates[i]),
    );
    run = gap === 1 ? run + 1 : 1;
    if (run > best) best = run;
  }

  const today = parseGymDate(formatGymDate(new Date()));
  const last = parseGymDate(sortedDates[sortedDates.length - 1]);
  const daysSinceLast = diffInDays(last, today);

  // A streak stays alive until the day after the last session has fully passed.
  let current = 0;
  if (daysSinceLast <= 1) {
    current = 1;
    for (let i = sortedDates.length - 1; i > 0; i -= 1) {
      const gap = diffInDays(
        parseGymDate(sortedDates[i - 1]),
        parseGymDate(sortedDates[i]),
      );
      if (gap !== 1) break;
      current += 1;
    }
  }

  return { current, best };
}

/**
 * Builds the last `weekCount` Mon–Sun weeks ending at the current calendar week.
 * Future days inside the current week are ignored so progress stays honest mid-week.
 */
export function buildWeekHistory(
  days: GymDaySummary[],
  weekCount = GYM_WEEK_HISTORY,
): GymWeekSummary[] {
  const todayIso = formatGymDate(new Date());
  const today = parseGymDate(todayIso);
  const currentWeekStart = startOfWeek(today);
  const byDate = new Map(days.map((day) => [day.date, day]));

  const weeks: GymWeekSummary[] = [];

  for (let i = weekCount - 1; i >= 0; i -= 1) {
    const start = addDays(currentWeekStart, -7 * i);
    const end = addDays(start, 6);
    const startIso = formatGymDate(start);
    const endIso = formatGymDate(end);

    const groups = new Set<MuscleGroup>();
    let sessions = 0;
    let durationMin = 0;
    let volume = 0;

    for (let offset = 0; offset < 7; offset += 1) {
      const iso = formatGymDate(addDays(start, offset));
      if (iso > todayIso) continue;

      const day = byDate.get(iso);
      // Rest days keep the streak elsewhere but never count as training sessions.
      if (!day || day.isRestDay || day.groups.length === 0) continue;

      sessions += 1;
      durationMin += day.durationMin;
      volume += day.volume;
      day.groups.forEach((group) => groups.add(group));
    }

    weeks.push({
      start: startIso,
      end: endIso,
      sessions,
      groups: MUSCLE_GROUPS.filter((group) => groups.has(group)),
      durationMin,
      volume,
      isCurrent: i === 0,
    });
  }

  return weeks;
}

export function buildGymSummary(days: GymDaySummary[]): GymSummary {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const trainingDays = sorted.filter(
    (day) => !day.isRestDay && day.groups.length > 0,
  );
  // Logged days (train + intentional rest) keep the streak; unlogged gaps break it.
  const streakDays = sorted.filter(
    (day) => day.isRestDay || day.groups.length > 0,
  );
  const { current, best } = computeStreaks(streakDays.map((day) => day.date));

  const today = parseGymDate(formatGymDate(new Date()));
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const weeks = buildWeekHistory(sorted);
  const currentWeek = weeks[weeks.length - 1];

  let sessionsThisMonth = 0;
  for (const day of trainingDays) {
    const parsed = parseGymDate(day.date);
    if (parsed >= monthStart && parsed <= today) sessionsThisMonth += 1;
  }

  const groupStats: GymGroupStat[] = MUSCLE_GROUPS.map((group) => ({
    group,
    sessions: trainingDays.filter((day) => day.groups.includes(group)).length,
    volume: trainingDays.reduce(
      (total, day) => total + (day.groupVolume[group] ?? 0),
      0,
    ),
  }));

  const availableYears = Array.from(
    new Set(sorted.map((day) => Number(day.date.slice(0, 4)))),
  ).sort((a, b) => b - a);

  return {
    days: sorted,
    availableYears,
    latestDate: sorted.length > 0 ? sorted[sorted.length - 1].date : null,
    totalSessions: trainingDays.length,
    currentStreak: current,
    bestStreak: best,
    sessionsThisWeek: currentWeek?.sessions ?? 0,
    durationThisWeek: currentWeek?.durationMin ?? 0,
    sessionsThisMonth,
    groupsThisWeek: currentWeek?.groups ?? [],
    weeklyGoal: WEEKLY_SESSION_GOAL,
    weeklyDurationGoal: WEEKLY_DURATION_GOAL,
    weeks,
    totalVolume: trainingDays.reduce((total, day) => total + day.volume, 0),
    totalDurationMin: trainingDays.reduce(
      (total, day) => total + day.durationMin,
      0,
    ),
    groupStats,
  };
}

/** Parts for stats UI where the unit should render quieter than the value. */
export function formatTrainingTimeParts(totalMin: number): {
  value: string;
  unit: string;
  /** Present when duration spans hours and leftover minutes. */
  secondary?: { value: string; unit: string };
} {
  const minutes = Math.max(0, Math.round(totalMin));
  if (minutes < 60) return { value: String(minutes), unit: "min" };

  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (remainder === 0) return { value: String(hours), unit: "h" };
  return {
    value: String(hours),
    unit: "h",
    secondary: { value: String(remainder), unit: "min" },
  };
}

/** Short human label for accumulated training minutes, e.g. "6h 30min". */
export function formatTrainingTime(totalMin: number): string {
  const minutes = Math.max(0, Math.round(totalMin));
  if (minutes < 60) return `${minutes}min`;

  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (remainder === 0) return `${hours}h`;
  return `${hours}h ${remainder}min`;
}

/** Maps a day's training load onto the 0-4 heatmap ramp. Rest days use a separate color. */
export function classifyGymLevel(
  groupCount: number,
  durationMin: number,
  isRestDay = false,
): 0 | 1 | 2 | 3 | 4 {
  if (isRestDay || groupCount === 0) return 0;
  const score = groupCount + Math.floor(durationMin / 30);
  if (score <= 1) return 1;
  if (score <= 3) return 2;
  if (score <= 5) return 3;
  return 4;
}

/** True when the day was intentionally logged (train or rest). */
export function isLoggedGymDay(
  day: Pick<GymDaySummary, "groups" | "isRestDay">,
): boolean {
  return Boolean(day.isRestDay) || day.groups.length > 0;
}
