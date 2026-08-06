import mongoose from "mongoose";

import { MUSCLE_GROUPS } from "~/constants/gym";
import type { MuscleGroup } from "~/constants/gym";

export interface IExercise extends mongoose.Document {
  name: string;
  group: MuscleGroup;
  /** Stable order within a muscle group for the logger chips. */
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExerciseSchema = new mongoose.Schema<IExercise>(
  {
    name: {
      type: String,
      required: [true, "Exercise name is required"],
      trim: true,
      maxlength: 80,
    },
    group: {
      type: String,
      required: [true, "Exercise muscle group is required"],
      enum: MUSCLE_GROUPS,
    },
    sortOrder: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

ExerciseSchema.index({ group: 1, name: 1 }, { unique: true });
ExerciseSchema.index({ group: 1, sortOrder: 1 });

// Next.js HMR keeps the first compiled model; drop it so schema changes apply.
if (mongoose.models.Exercise) {
  mongoose.deleteModel("Exercise");
}

const Exercise = mongoose.model<IExercise>("Exercise", ExerciseSchema);

export default Exercise;
