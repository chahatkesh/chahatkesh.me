import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  buildGymSummary,
  sessionGroupExerciseCount,
  sessionGroupVolume,
  sessionVolume,
  toIsoDay,
} from "~/lib/gym";
import dbConnect from "~/lib/mongodb";
import { publicListCacheControl } from "~/lib/revalidate";
import { Workout } from "~/models";
import type { IWorkout } from "~/models";
import type { GymDaySummary, GymSummary } from "~/types/gym";

export const revalidate = 300;

const EMPTY_SUMMARY: GymSummary = buildGymSummary([]);

export async function GET(request: NextRequest) {
  // Read outside the try so Next's dynamic-rendering bailout isn't swallowed.
  const cacheControl = publicListCacheControl(
    request,
    "public, s-maxage=300, stale-while-revalidate=900",
  );

  try {
    const connection = await dbConnect();
    if (!connection) {
      return NextResponse.json({ success: true, data: EMPTY_SUMMARY });
    }

    const workouts = await Workout.find({})
      .sort({ date: 1 })
      .lean<IWorkout[]>();

    // Only derived aggregates leave the server; exercise names stay private.
    const days: GymDaySummary[] = workouts.map((workout) => ({
      date: toIsoDay(new Date(workout.date)),
      groups: workout.isRestDay ? [] : (workout.groups ?? []),
      durationMin: workout.isRestDay ? 0 : (workout.durationMin ?? 0),
      volume: workout.isRestDay ? 0 : sessionVolume(workout.exercises ?? []),
      groupVolume: workout.isRestDay
        ? {}
        : sessionGroupVolume(workout.exercises ?? []),
      groupExerciseCount: workout.isRestDay
        ? {}
        : sessionGroupExerciseCount(workout.exercises ?? []),
      isRestDay: Boolean(workout.isRestDay),
    }));

    return NextResponse.json(
      { success: true, data: buildGymSummary(days) },
      { headers: { "Cache-Control": cacheControl } },
    );
  } catch (error) {
    console.error("Error building gym summary:", error);
    return NextResponse.json({ success: true, data: EMPTY_SUMMARY });
  }
}
