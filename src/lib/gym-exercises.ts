/**
 * Server helpers for the admin exercise catalog: usage counts, workout linking,
 * and resolving catalog ids when logging sessions.
 */

import mongoose from "mongoose";

import { Exercise, Workout } from "~/models";
import type { IExercise } from "~/models";
import type { MuscleGroup } from "~/constants/gym";
import type { GymExercise } from "~/types/gym";

type LeanExercise = {
  _id: mongoose.Types.ObjectId;
  name: string;
  group: MuscleGroup;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

type WorkoutExerciseInput = {
  exerciseId?: string;
  group: MuscleGroup;
  name: string;
  [key: string]: unknown;
};

/** Sessions that reference an exercise by id or legacy name+group. */
export async function countExerciseUsage(
  exercise: Pick<IExercise, "_id" | "name" | "group">,
): Promise<number> {
  return Workout.countDocuments({
    $or: [
      { "exercises.exerciseId": exercise._id },
      {
        exercises: {
          $elemMatch: {
            name: exercise.name,
            group: exercise.group,
            $or: [{ exerciseId: { $exists: false } }, { exerciseId: null }],
          },
        },
      },
    ],
  });
}

export async function buildExerciseUsageMap(
  exercises: LeanExercise[],
): Promise<Map<string, number>> {
  const result = new Map<string, number>();
  await Promise.all(
    exercises.map(async (exercise) => {
      result.set(String(exercise._id), await countExerciseUsage(exercise));
    }),
  );
  return result;
}

export function serializeExercise(
  exercise: LeanExercise,
  usageCount = 0,
): GymExercise {
  return {
    _id: String(exercise._id),
    name: exercise.name,
    group: exercise.group,
    sortOrder: exercise.sortOrder,
    usageCount,
    createdAt: exercise.createdAt.toISOString(),
    updatedAt: exercise.updatedAt.toISOString(),
  };
}

/**
 * Resolve catalog ids and snap name/group to the Exercise document.
 * Returns an error message when an id is missing or unknown.
 */
export async function resolveWorkoutExercises<T extends WorkoutExerciseInput>(
  exercises: T[],
): Promise<{ exercises: T[]; error?: string }> {
  if (exercises.length === 0) return { exercises };

  const ids = [
    ...new Set(
      exercises
        .map((exercise) => exercise.exerciseId)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  const byId = new Map<string, LeanExercise>();
  if (ids.length > 0) {
    const invalid = ids.find((id) => !mongoose.Types.ObjectId.isValid(id));
    if (invalid) {
      return { exercises, error: "One or more exercises are invalid" };
    }

    const docs = await Exercise.find({ _id: { $in: ids } }).lean<
      LeanExercise[]
    >();
    for (const doc of docs) byId.set(String(doc._id), doc);
  }

  const unresolvedPairs: Array<{ group: MuscleGroup; name: string }> = [];
  for (const exercise of exercises) {
    if (exercise.exerciseId) continue;
    unresolvedPairs.push({ group: exercise.group, name: exercise.name });
  }

  const byPair = new Map<string, LeanExercise>();
  if (unresolvedPairs.length > 0) {
    const docs = await Exercise.find({
      $or: unresolvedPairs.map((pair) => ({
        group: pair.group,
        name: pair.name,
      })),
    }).lean<LeanExercise[]>();
    for (const doc of docs) {
      byPair.set(`${doc.group}::${doc.name}`, doc);
    }
  }

  const resolved: T[] = [];
  for (const exercise of exercises) {
    let catalog: LeanExercise | undefined;
    if (exercise.exerciseId) {
      catalog = byId.get(exercise.exerciseId);
      if (!catalog) {
        return {
          exercises,
          error: `Exercise "${exercise.name}" was not found in the catalog`,
        };
      }
    } else {
      catalog = byPair.get(`${exercise.group}::${exercise.name}`);
    }

    if (!catalog) {
      return {
        exercises,
        error: `Exercise "${exercise.name}" is not in the catalog. Add it first.`,
      };
    }

    resolved.push({
      ...exercise,
      exerciseId: String(catalog._id),
      name: catalog.name,
      group: catalog.group,
    });
  }

  return { exercises: resolved };
}

/** Cascade catalog renames / group moves onto linked workout rows. */
export async function syncWorkoutExerciseLabels(
  exerciseId: string | mongoose.Types.ObjectId,
  patch: { name?: string; group?: MuscleGroup },
): Promise<void> {
  if (patch.name === undefined && patch.group === undefined) return;

  const set: Record<string, string> = {};
  if (patch.name !== undefined) set["exercises.$[ex].name"] = patch.name;
  if (patch.group !== undefined) set["exercises.$[ex].group"] = patch.group;

  await Workout.updateMany(
    { "exercises.exerciseId": exerciseId },
    { $set: set },
    { arrayFilters: [{ "ex.exerciseId": exerciseId }] },
  );
}
