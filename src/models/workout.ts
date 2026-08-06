import mongoose from "mongoose";

import {
  CARDIO_TYPES,
  MAX_SETS_PER_EXERCISE,
  MUSCLE_GROUPS,
} from "~/constants/gym";
import type { CardioType, MuscleGroup } from "~/constants/gym";

export interface IWorkoutSet {
  reps: number;
  weight: number;
}

export interface IWorkoutExercise {
  /** Links to the Exercise catalog document when available. */
  exerciseId?: mongoose.Types.ObjectId;
  group: MuscleGroup;
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  /** Present only when the uniform sets/reps/weight row was expanded. */
  setDetails?: IWorkoutSet[];
  cardioType?: CardioType;
  distanceKm?: number;
  durationMin?: number;
}

export interface IWorkout extends mongoose.Document {
  date: Date;
  groups: MuscleGroup[];
  durationMin: number;
  exercises: IWorkoutExercise[];
  /** Intentional rest — keeps the streak, distinct from an unlogged miss. */
  isRestDay: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSetSchema = new mongoose.Schema<IWorkoutSet>(
  {
    reps: { type: Number, required: true, min: 0, max: 1_000 },
    weight: { type: Number, required: true, min: 0, max: 1_000 },
  },
  { _id: false },
);

const WorkoutExerciseSchema = new mongoose.Schema<IWorkoutExercise>(
  {
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
    },
    group: {
      type: String,
      required: [true, "Exercise muscle group is required"],
      enum: MUSCLE_GROUPS,
    },
    name: {
      type: String,
      required: [true, "Exercise name is required"],
      trim: true,
      maxlength: 80,
    },
    sets: { type: Number, min: 0, max: 50 },
    reps: { type: Number, min: 0, max: 1_000 },
    weight: { type: Number, min: 0, max: 1_000 },
    setDetails: {
      type: [WorkoutSetSchema],
      default: undefined,
      validate: {
        validator: (value?: IWorkoutSet[]) =>
          value === undefined || value.length <= MAX_SETS_PER_EXERCISE,
        message: `A maximum of ${MAX_SETS_PER_EXERCISE} sets can be logged per exercise`,
      },
    },
    cardioType: { type: String, enum: CARDIO_TYPES },
    distanceKm: { type: Number, min: 0, max: 1_000 },
    durationMin: { type: Number, min: 0, max: 1_440 },
  },
  { _id: false },
);

const WorkoutSchema = new mongoose.Schema<IWorkout>(
  {
    date: {
      type: Date,
      required: [true, "Workout date is required"],
      unique: true,
    },
    groups: {
      type: [{ type: String, enum: MUSCLE_GROUPS }],
      default: [],
    },
    durationMin: {
      type: Number,
      required: [true, "Duration is required"],
      min: [0, "Duration cannot be negative"],
      max: 1_440,
    },
    exercises: { type: [WorkoutExerciseSchema], default: [] },
    isRestDay: { type: Boolean, default: false },
  },
  { timestamps: true },
);

WorkoutSchema.index({ date: -1 });

// Next.js HMR keeps the first compiled model; drop it so schema changes apply.
if (mongoose.models.Workout) {
  mongoose.deleteModel("Workout");
}

const Workout = mongoose.model<IWorkout>("Workout", WorkoutSchema);

export default Workout;
