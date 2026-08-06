/**
 * Barrel export for shared types.
 *
 * Import from "~/types" instead of individual files:
 *   import type { ConfigProps, GalleryImage } from "~/types";
 */

export type { Theme, ConfigProps } from "./config";
export type {
  GalleryImage,
  GalleryItem,
  GalleryAspectRatio,
  GalleryApiResponse,
} from "./gallery";
export { toGalleryItem } from "./gallery";

export type {
  DiagramPage,
  DiagramListApiResponse,
  DiagramItemApiResponse,
} from "./diagrams";

export type {
  GistDocument,
  GistListApiResponse,
  GistItemApiResponse,
} from "./gists";

export type {
  VisitedPlace,
  PlaceListApiResponse,
  PlaceItemApiResponse,
} from "./places";

export type {
  WorkoutSetEntry,
  WorkoutExercise,
  WorkoutSession,
  WorkoutListApiResponse,
  WorkoutItemApiResponse,
  GymDaySummary,
  GymGroupStat,
  GymWeekSummary,
  GymSummary,
  GymSummaryApiResponse,
  ExerciseHistoryEntry,
  ExerciseHistoryApiResponse,
  GymExercise,
  GymExerciseListApiResponse,
  GymExerciseItemApiResponse,
  GymProgressPhoto,
  GymProgressPhotoListApiResponse,
  GymProgressPhotoItemApiResponse,
} from "./gym";
export { toGymProgressPhoto } from "./gym";
