import mongoose from "mongoose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { requireAuth } from "~/lib/auth";
import {
  countExerciseUsage,
  serializeExercise,
  syncWorkoutExerciseLabels,
} from "~/lib/gym-exercises";
import dbConnect from "~/lib/mongodb";
import { updateExerciseSchema } from "~/lib/validations";
import { Exercise } from "~/models";
import type { MuscleGroup } from "~/constants/gym";

type Params = { params: Promise<{ id: string }> };

type LeanExercise = {
  _id: mongoose.Types.ObjectId;
  name: string;
  group: MuscleGroup;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

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
        { success: false, error: "Exercise not found" },
        { status: 404 },
      );
    }

    const parsed = updateExerciseSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const existing = await Exercise.findById(id).lean<LeanExercise | null>();
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Exercise not found" },
        { status: 404 },
      );
    }

    const nextName =
      parsed.data.name !== undefined ? parsed.data.name.trim() : existing.name;
    const nextGroup = parsed.data.group ?? existing.group;

    if (nextName !== existing.name || nextGroup !== existing.group) {
      const conflict = await Exercise.findOne({
        _id: { $ne: id },
        group: nextGroup,
        name: nextName,
      }).lean();
      if (conflict) {
        return NextResponse.json(
          {
            success: false,
            error: `"${nextName}" already exists in ${nextGroup}`,
          },
          { status: 409 },
        );
      }
    }

    const updated = await Exercise.findByIdAndUpdate(
      id,
      {
        ...(parsed.data.name !== undefined ? { name: nextName } : {}),
        ...(parsed.data.group !== undefined ? { group: nextGroup } : {}),
        ...(parsed.data.sortOrder !== undefined
          ? { sortOrder: parsed.data.sortOrder }
          : {}),
      },
      { new: true, runValidators: true },
    ).lean<LeanExercise | null>();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Exercise not found" },
        { status: 404 },
      );
    }

    if (nextName !== existing.name || nextGroup !== existing.group) {
      await syncWorkoutExerciseLabels(updated._id, {
        name: nextName,
        group: nextGroup,
      });
    }

    const usageCount = await countExerciseUsage(updated);

    return NextResponse.json({
      success: true,
      data: serializeExercise(updated, usageCount),
    });
  } catch (error) {
    console.error("Error updating exercise:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update exercise" },
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
        { success: false, error: "Exercise not found" },
        { status: 404 },
      );
    }

    const existing = await Exercise.findById(id).lean<LeanExercise | null>();
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Exercise not found" },
        { status: 404 },
      );
    }

    const usageCount = await countExerciseUsage(existing);
    if (usageCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot delete "${existing.name}" — it appears in ${usageCount} logged session${usageCount === 1 ? "" : "s"}`,
        },
        { status: 409 },
      );
    }

    await Exercise.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting exercise:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete exercise" },
      { status: 500 },
    );
  }
}
