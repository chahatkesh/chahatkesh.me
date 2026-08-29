import type { CardioType, MuscleGroup } from "~/constants/gym";

/** Draft exercise held in the logger form; numbers stay strings while editing. */
export interface ExerciseDraft {
  /** Stable key for React lists, not persisted. */
  key: string;
  /** Catalog document id. */
  exerciseId: string;
  group: MuscleGroup;
  name: string;
  sets: string;
  reps: string;
  weight: string;
  expanded: boolean;
  setDetails: Array<{ reps: string; weight: string }>;
  cardioType: CardioType;
  distanceKm: string;
  durationMin: string;
}

export interface WorkoutDraft {
  date: string;
  groups: MuscleGroup[];
  durationMin: string;
  exercises: ExerciseDraft[];
  isRestDay: boolean;
}
