import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { requireAuth } from "~/lib/auth";
import { resolveWorkoutExercises } from "~/lib/gym-exercises";
import { toIsoDay, toUtcDayStart } from "~/lib/gym";
import dbConnect from "~/lib/mongodb";
import { revalidateGymCache } from "~/lib/revalidate";
import { createWorkoutSchema } from "~/lib/validations";
import { Workout } from "~/models";
import type { IWorkout } from "~/models";

const RECENT_LIMIT = 120;

export async function GET() {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const workouts = await Workout.find({})
      .sort({ date: -1 })
      .limit(RECENT_LIMIT)
      .lean<IWorkout[]>();

    return NextResponse.json({
      success: true,
      data: workouts.map((workout) => ({
        ...workout,
        date: toIsoDay(new Date(workout.date)),
      })),
    });
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch workouts" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const parsed = createWorkoutSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const date = toUtcDayStart(parsed.data.date);
    const isRestDay = Boolean(parsed.data.isRestDay);

    let exercises = parsed.data.exercises;
    if (!isRestDay && exercises.length > 0) {
      const resolved = await resolveWorkoutExercises(exercises);
      if (resolved.error) {
        return NextResponse.json(
          { success: false, error: resolved.error },
          { status: 400 },
        );
      }
      exercises = resolved.exercises;
    }

    // One document per training day: re-logging the same date updates it.
    const saved = await Workout.findOneAndUpdate(
      { date },
      {
        $set: {
          date,
          groups: isRestDay ? [] : parsed.data.groups,
          durationMin: isRestDay ? 0 : parsed.data.durationMin,
          exercises: isRestDay ? [] : exercises,
          isRestDay,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    ).lean<IWorkout>();

    revalidateGymCache();
    return NextResponse.json(
      {
        success: true,
        data: saved
          ? { ...saved, date: toIsoDay(new Date(saved.date)) }
          : saved,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error saving workout:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save workout" },
      { status: 500 },
    );
  }
}
