import mongoose from "mongoose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { requireAuth } from "~/lib/auth";
import { resolveWorkoutExercises } from "~/lib/gym-exercises";
import { toIsoDay, toUtcDayStart } from "~/lib/gym";
import dbConnect from "~/lib/mongodb";
import { revalidateGymCache } from "~/lib/revalidate";
import { updateWorkoutSchema } from "~/lib/validations";
import { Workout } from "~/models";
import type { IWorkout } from "~/models";

type Params = { params: Promise<{ id: string }> };

function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Workout not found" },
        { status: 404 },
      );
    }

    const parsed = updateWorkoutSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const { date, ...rest } = parsed.data;
    const update: Record<string, unknown> = { ...rest };
    if (date !== undefined) update.date = toUtcDayStart(date);

    // Switching to rest clears training payload so charts stay consistent.
    if (rest.isRestDay === true) {
      update.groups = [];
      update.exercises = [];
      update.durationMin = 0;
    } else if (rest.exercises !== undefined && rest.exercises.length > 0) {
      const resolved = await resolveWorkoutExercises(rest.exercises);
      if (resolved.error) {
        return NextResponse.json(
          { success: false, error: resolved.error },
          { status: 400 },
        );
      }
      update.exercises = resolved.exercises;
    }

    const updated = await Workout.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean<IWorkout>();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Workout not found" },
        { status: 404 },
      );
    }

    revalidateGymCache();
    return NextResponse.json({
      success: true,
      data: { ...updated, date: toIsoDay(new Date(updated.date)) },
    });
  } catch (error) {
    console.error("Error updating workout:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update workout" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Workout not found" },
        { status: 404 },
      );
    }

    const deleted = await Workout.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Workout not found" },
        { status: 404 },
      );
    }

    revalidateGymCache();
    return NextResponse.json({
      success: true,
      message: "Workout deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting workout:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete workout" },
      { status: 500 },
    );
  }
}
