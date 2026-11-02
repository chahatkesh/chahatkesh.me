import {
  buildGymSummary,
  sessionGroupVolume,
  sessionVolume,
  toIsoDay,
} from "~/lib/gym";
import dbConnect from "~/lib/mongodb";
import { Workout } from "~/models";
import type { IWorkout } from "~/models";
import type { GymDaySummary, GymSummary } from "~/types/gym";

/** Maps stored workouts to chart-ready day summaries (no exercise names). */
export async function loadGymDaySummaries(): Promise<GymDaySummary[] | null> {
  const connection = await dbConnect();
  if (!connection) return null;

  const workouts = await Workout.find({}).sort({ date: 1 }).lean<IWorkout[]>();

  return workouts.map((workout) => ({
    date: toIsoDay(new Date(workout.date)),
    groups: workout.isRestDay ? [] : (workout.groups ?? []),
    durationMin: workout.isRestDay ? 0 : (workout.durationMin ?? 0),
    volume: workout.isRestDay ? 0 : sessionVolume(workout.exercises ?? []),
    groupVolume: workout.isRestDay
      ? {}
      : sessionGroupVolume(workout.exercises ?? []),
    isRestDay: Boolean(workout.isRestDay),
  }));
}

/** Loads all workout days and builds the public dashboard summary. */
export async function loadGymSummary(): Promise<GymSummary> {
  const days = await loadGymDaySummaries();
  return buildGymSummary(days ?? []);
}
