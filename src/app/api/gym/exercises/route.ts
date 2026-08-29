import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Types } from "mongoose";

import { requireAuth } from "~/lib/auth";
import { buildExerciseUsageMap, serializeExercise } from "~/lib/gym-exercises";
import dbConnect from "~/lib/mongodb";
import { createExerciseSchema } from "~/lib/validations";
import { Exercise } from "~/models";
import type { MuscleGroup } from "~/constants/gym";

type LeanExercise = {
  _id: Types.ObjectId;
  name: string;
  group: MuscleGroup;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export async function GET() {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const exercises = await Exercise.find({})
      .sort({ group: 1, sortOrder: 1, name: 1 })
      .lean<LeanExercise[]>();

    const usageMap = await buildExerciseUsageMap(exercises);

    return NextResponse.json({
      success: true,
      data: exercises.map((exercise) =>
        serializeExercise(exercise, usageMap.get(String(exercise._id)) ?? 0),
      ),
    });
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch exercises" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) return auth.response;

  try {
    await dbConnect();
    const parsed = createExerciseSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const name = parsed.data.name.trim();
    const { group } = parsed.data;

    const existing = await Exercise.findOne({ group, name }).lean();
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: `"${name}" already exists in ${group}`,
        },
        { status: 409 },
      );
    }

    let sortOrder = parsed.data.sortOrder;
    if (sortOrder === undefined) {
      const last = await Exercise.findOne({ group })
        .sort({ sortOrder: -1 })
        .select("sortOrder")
        .lean<{ sortOrder: number } | null>();
      sortOrder = (last?.sortOrder ?? -1) + 1;
    }

    const created = await Exercise.create({ name, group, sortOrder });

    return NextResponse.json(
      {
        success: true,
        data: serializeExercise(
          {
            _id: created._id,
            name: created.name,
            group: created.group,
            sortOrder: created.sortOrder,
            createdAt: created.createdAt,
            updatedAt: created.updatedAt,
          },
          0,
        ),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating exercise:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create exercise" },
      { status: 500 },
    );
  }
}
