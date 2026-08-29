/**
 * Gym tracker types shared by admin CRUD, the summary API and public charts.
 */

import type { CardioType, MuscleGroup } from "~/constants/gym";

export interface WorkoutSetEntry {
  reps: number;
  weight: number;
}

export interface WorkoutExercise {
  /** Catalog exercise id when linked; present after seed / new logs. */
  exerciseId?: string;
  group: MuscleGroup;
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  setDetails?: WorkoutSetEntry[];
  cardioType?: CardioType;
  distanceKm?: number;
  durationMin?: number;
}

export interface WorkoutSession {
  _id: string;
  /** ISO date string (YYYY-MM-DD) for the training day. */
  date: string;
  groups: MuscleGroup[];
  durationMin?: number;
  exercises: WorkoutExercise[];
  /** Intentional rest — keeps the streak, distinct from an unlogged miss. */
  isRestDay?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutListApiResponse {
  success: boolean;
  data: WorkoutSession[];
}

export interface WorkoutItemApiResponse {
  success: boolean;
  data: WorkoutSession;
}

/** Compact per-day record consumed by every public chart. */
export interface GymDaySummary {
  date: string;
  groups: MuscleGroup[];
  durationMin: number;
  volume: number;
  /** Kilograms moved per muscle group, needed for the windowed volume radar. */
  groupVolume: Partial<Record<MuscleGroup, number>>;
  /** Exercise entries per muscle group, for the windowed exercises radar. */
  groupExerciseCount: Partial<Record<MuscleGroup, number>>;
  /** Intentional rest — keeps the streak, distinct from an unlogged miss. */
  isRestDay?: boolean;
}

export interface GymGroupStat {
  group: MuscleGroup;
  sessions: number;
  volume: number;
}

/** One Mon–Sun calendar week of ring metrics. */
export interface GymWeekSummary {
  /** Monday (YYYY-MM-DD). */
  start: string;
  /** Sunday (YYYY-MM-DD). */
  end: string;
  sessions: number;
  groups: MuscleGroup[];
  durationMin: number;
  volume: number;
  isCurrent: boolean;
}

export interface GymSummary {
  days: GymDaySummary[];
  availableYears: number[];
  latestDate: string | null;
  totalSessions: number;
  currentStreak: number;
  bestStreak: number;
  sessionsThisWeek: number;
  durationThisWeek: number;
  sessionsThisMonth: number;
  groupsThisWeek: MuscleGroup[];
  weeklyGoal: number;
  weeklyDurationGoal: number;
  /** Oldest → newest, length = GYM_WEEK_HISTORY. */
  weeks: GymWeekSummary[];
  totalVolume: number;
  totalDurationMin: number;
  groupStats: GymGroupStat[];
}

export interface GymSummaryApiResponse {
  success: boolean;
  data: GymSummary;
}

/** Last logged numbers for an exercise, used to prefill the admin logger. */
export interface ExerciseHistoryEntry {
  name: string;
  group: MuscleGroup;
  sets?: number;
  reps?: number;
  weight?: number;
  /** Present when the last log used per-set entries. */
  setDetails?: WorkoutSetEntry[];
  cardioType?: CardioType;
  distanceKm?: number;
  durationMin?: number;
  lastPerformed: string;
}

export interface ExerciseHistoryApiResponse {
  success: boolean;
  data: ExerciseHistoryEntry[];
}

/** Admin-managed exercise catalog entry. */
export interface GymExercise {
  _id: string;
  name: string;
  group: MuscleGroup;
  sortOrder: number;
  /** Workout sessions that reference this exercise (blocks delete when > 0). */
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GymExerciseListApiResponse {
  success: boolean;
  data: GymExercise[];
}

export interface GymExerciseItemApiResponse {
  success: boolean;
  data: GymExercise;
}

/** Date-only progress photo for the public gym page. */
export interface GymProgressPhoto {
  _id: string;
  date: string;
  imageUrl: string;
  publicId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GymProgressPhotoListApiResponse {
  success: boolean;
  data: GymProgressPhoto[];
}

export interface GymProgressPhotoItemApiResponse {
  success: boolean;
  data: GymProgressPhoto;
}

export function toGymProgressPhoto(photo: GymProgressPhoto): {
  id: string;
  date: string;
  src: string;
} {
  return {
    id: photo._id,
    date: photo.date,
    src: photo.imageUrl,
  };
}
