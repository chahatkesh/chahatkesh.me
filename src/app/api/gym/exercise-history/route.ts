import { NextResponse } from "next/server";

import { requireAuth } from "~/lib/auth";
import { toIsoDay } from "~/lib/gym";
import dbConnect from "~/lib/mongodb";
import { Workout } from "~/models";
import type { IWorkout } from "~/models";
import type { ExerciseHistoryEntry } from "~/types/gym";

const LOOKBACK_SESSIONS = 90;

/** Last-used numbers per exercise so the logger can prefill on tap. */
export async function GET() {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const workouts = await Workout.find({})
      .sort({ date: -1 })
      .limit(LOOKBACK_SESSIONS)
      .lean<IWorkout[]>();

    const history = new Map<string, ExerciseHistoryEntry>();

    // Descending order means the first hit for a name is already the newest.
    for (const workout of workouts) {
      const lastPerformed = toIsoDay(new Date(workout.date));
      for (const exercise of workout.exercises ?? []) {
        if (history.has(exercise.name)) continue;
        history.set(exercise.name, {
          name: exercise.name,
          group: exercise.group,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
          setDetails: exercise.setDetails?.length
            ? exercise.setDetails.map((set) => ({
                reps: set.reps,
                weight: set.weight,
              }))
            : undefined,
          cardioType: exercise.cardioType,
          distanceKm: exercise.distanceKm,
          durationMin: exercise.durationMin,
          lastPerformed,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: Array.from(history.values()),
    });
  } catch (error) {
    console.error("Error fetching exercise history:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch exercise history" },
      { status: 500 },
    );
  }
}
