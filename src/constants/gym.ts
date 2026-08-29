/**
 * Gym tracker constants: muscle groups, colors and goals.
 * Shared by the admin logger, API validation and charts.
 * Exercise names live in the Exercise collection (admin-managed).
 */

export const MUSCLE_GROUPS = [
  "chest",
  "back",
  "shoulders",
  "biceps",
  "triceps",
  "legs",
  "core",
  "cardio",
] as const;

export type MuscleGroup = (typeof MUSCLE_GROUPS)[number];

export const MUSCLE_GROUP_LABELS: Record<MuscleGroup, string> = {
  chest: "Chest",
  back: "Back",
  shoulders: "Shoulders",
  biceps: "Biceps",
  triceps: "Triceps",
  legs: "Legs",
  core: "Core",
  cardio: "Cardio",
};

/** Distinct hues that stay legible on the near-black background. */
export const MUSCLE_GROUP_COLORS: Record<MuscleGroup, string> = {
  chest: "#ff6b6b",
  back: "#845ef7",
  shoulders: "#4dabf7",
  biceps: "#f2b84b",
  triceps: "#ff922b",
  legs: "#51cf66",
  core: "#f06595",
  cardio: "#00d3d9",
};

/** Intensity ramp for the gym activity heatmap, mirrors GITHUB_CONTRIBUTION_COLORS shape. */
export const GYM_ACTIVITY_COLORS = [
  "#1b1b1b",
  "#0b3d2e",
  "#148f5c",
  "#37c47f",
  "#6ef0a5",
] as const;

/** Logged rest-day cell — calm blue, distinct from the green training ramp and empty gray. */
export const GYM_REST_DAY_COLOR = "#5b8fd4";

export const CARDIO_TYPES = ["run", "cycle", "swim", "walk"] as const;
export type CardioType = (typeof CARDIO_TYPES)[number];

export const CARDIO_TYPE_LABELS: Record<CardioType, string> = {
  run: "Run",
  cycle: "Cycle",
  swim: "Swim",
  walk: "Walk",
};

/** Target training sessions per week, drives the Sessions ring. */
export const WEEKLY_SESSION_GOAL = 6;

/** Target training minutes per week, drives the Time ring. */
export const WEEKLY_DURATION_GOAL = 450;

/** How many calendar weeks to surface in the ring history strip. */
export const GYM_WEEK_HISTORY = 12;

/** Upper bound for the per-set expanded editor. */
export const MAX_SETS_PER_EXERCISE = 4;

/** Trailing window for the per-group consistency strips. */
export const GYM_STRIP_DAYS = 90;

export const WEIGHT_UNIT = "kg" as const;
