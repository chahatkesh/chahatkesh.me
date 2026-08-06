/**
 * Zod schemas for API request / response validation.
 * Centralizes all validation logic so API routes stay lean.
 */

import { z } from "zod/v4";

import {
  CARDIO_TYPES,
  MAX_SETS_PER_EXERCISE,
  MUSCLE_GROUPS,
} from "~/constants/gym";

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(100, "Username too long"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(200, "Password too long"),
});

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export const galleryAspectRatioSchema = z.enum([
  "square",
  "portrait",
  "landscape",
  "big-square",
]);

export const createGalleryImageSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(300, "Location too long"),
  date: z.string().min(1, "Date is required"),
  aspectRatio: galleryAspectRatioSchema.default("square"),
  imageUrl: z.url("Invalid image URL"),
  publicId: z.string().min(1, "Cloudinary public ID is required"),
  isFeatured: z.boolean().default(false),
});

export const updateGalleryImageSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  location: z.string().min(1).max(300).optional(),
  date: z.string().min(1).optional(),
  aspectRatio: galleryAspectRatioSchema.optional(),
  isFeatured: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});

// ---------------------------------------------------------------------------
// Experience Gallery
// ---------------------------------------------------------------------------

export const createExperienceGalleryImageSchema = z.object({
  experienceSlug: z.string().min(1, "Experience slug is required"),
  imageUrl: z.url("Invalid image URL"),
  publicId: z.string().min(1, "Cloudinary public ID is required"),
  caption: z.string().max(500, "Caption too long").optional(),
});

export const updateExperienceGalleryImageSchema = z.object({
  caption: z.string().max(500, "Caption too long").optional(),
  order: z.number().int().min(0).optional(),
});

export const uploadFileSchema = z.object({
  file: z.string().min(1, "No file provided"),
});

// ---------------------------------------------------------------------------
// Shared Files (generic file uploads with shareable URLs)
// ---------------------------------------------------------------------------

export const createSharedFileSchema = z.object({
  fileName: z
    .string()
    .min(1, "File name is required")
    .max(300, "File name too long"),
  fileUrl: z.url("Invalid file URL"),
  publicId: z.string().min(1, "Cloudinary public ID is required"),
  format: z.string().max(50).optional().default(""),
  bytes: z.number().int().min(0).optional().default(0),
  resourceType: z.string().max(20).optional().default("auto"),
});

export const updateSharedFileSchema = z.object({
  fileName: z
    .string()
    .min(1, "File name is required")
    .max(300, "File name too long"),
});

// ---------------------------------------------------------------------------
// Mermaid Diagram Pages
// ---------------------------------------------------------------------------

export const createDiagramSchema = z.object({
  title: z.string().min(1, "Title is required").max(160, "Title is too long"),
  mermaidCode: z
    .string()
    .min(1, "Mermaid code is required")
    .max(50_000, "Mermaid code is too long"),
});

export const updateDiagramSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(160).optional(),
    mermaidCode: z
      .string()
      .min(1, "Mermaid code is required")
      .max(50_000, "Mermaid code is too long")
      .optional(),
  })
  .refine(
    (value) => value.title !== undefined || value.mermaidCode !== undefined,
    {
      message: "At least one field is required",
    },
  );

// ---------------------------------------------------------------------------
// Markdown Gist Pages
// ---------------------------------------------------------------------------

export const createGistSchema = z.object({
  title: z.string().min(1, "Title is required").max(180, "Title is too long"),
  markdownContent: z
    .string()
    .min(1, "Markdown content is required")
    .max(150_000, "Markdown content is too long"),
});

export const updateGistSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(180).optional(),
    markdownContent: z
      .string()
      .min(1, "Markdown content is required")
      .max(150_000, "Markdown content is too long")
      .optional(),
  })
  .refine(
    (value) => value.title !== undefined || value.markdownContent !== undefined,
    {
      message: "At least one field is required",
    },
  );

// ---------------------------------------------------------------------------
// Visited Places
// ---------------------------------------------------------------------------

const visitedAtSchema = z
  .string()
  .min(1, "Visit date is required")
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Visit date is invalid",
  });

export const createPlaceSchema = z.object({
  name: z.string().min(1, "Name is required").max(140, "Name is too long"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(220, "Location is too long"),
  shortNote: z.string().max(320, "Short note is too long").optional(),
  visitedAt: visitedAtSchema,
  latitude: z.coerce
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z.coerce
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
});

export const updatePlaceSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(140).optional(),
    location: z.string().min(1, "Location is required").max(220).optional(),
    shortNote: z.string().max(320, "Short note is too long").optional(),
    visitedAt: visitedAtSchema.optional(),
    latitude: z.coerce.number().min(-90).max(90).optional(),
    longitude: z.coerce.number().min(-180).max(180).optional(),
  })
  .refine(
    (value) =>
      value.name !== undefined ||
      value.location !== undefined ||
      value.shortNote !== undefined ||
      value.visitedAt !== undefined ||
      value.latitude !== undefined ||
      value.longitude !== undefined,
    {
      message: "At least one field is required",
    },
  );

// ---------------------------------------------------------------------------
// Gym workouts
// ---------------------------------------------------------------------------

const workoutDateSchema = z
  .string()
  .min(1, "Workout date is required")
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Workout date is invalid",
  });

const workoutSetSchema = z.object({
  reps: z.coerce.number().min(0, "Reps cannot be negative").max(1_000),
  weight: z.coerce.number().min(0, "Weight cannot be negative").max(1_000),
});

const workoutExerciseSchema = z.object({
  exerciseId: z.string().optional(),
  group: z.enum(MUSCLE_GROUPS),
  name: z
    .string()
    .min(1, "Exercise name is required")
    .max(80, "Exercise name is too long"),
  sets: z.coerce.number().min(0).max(50).optional(),
  reps: z.coerce.number().min(0).max(1_000).optional(),
  weight: z.coerce.number().min(0).max(1_000).optional(),
  setDetails: z
    .array(workoutSetSchema)
    .max(
      MAX_SETS_PER_EXERCISE,
      `A maximum of ${MAX_SETS_PER_EXERCISE} sets can be logged per exercise`,
    )
    .optional(),
  cardioType: z.enum(CARDIO_TYPES).optional(),
  distanceKm: z.coerce.number().min(0).max(1_000).optional(),
  durationMin: z.coerce.number().min(0).max(1_440).optional(),
});

export const createExerciseSchema = z.object({
  name: z
    .string()
    .min(1, "Exercise name is required")
    .max(80, "Exercise name is too long"),
  group: z.enum(MUSCLE_GROUPS),
  sortOrder: z.coerce.number().min(0).max(10_000).optional(),
});

export const updateExerciseSchema = z
  .object({
    name: z
      .string()
      .min(1, "Exercise name is required")
      .max(80, "Exercise name is too long")
      .optional(),
    group: z.enum(MUSCLE_GROUPS).optional(),
    sortOrder: z.coerce.number().min(0).max(10_000).optional(),
  })
  .refine(
    (value) =>
      value.name !== undefined ||
      value.group !== undefined ||
      value.sortOrder !== undefined,
    { message: "At least one field is required" },
  );

export const createWorkoutSchema = z
  .object({
    date: workoutDateSchema,
    groups: z.array(z.enum(MUSCLE_GROUPS)).default([]),
    durationMin: z.coerce
      .number({ error: "Duration is required" })
      .min(0, "Duration cannot be negative")
      .max(1_440, "Duration cannot exceed 24 hours"),
    exercises: z.array(workoutExerciseSchema).max(60).default([]),
    isRestDay: z.boolean().optional().default(false),
  })
  .superRefine((value, ctx) => {
    if (value.isRestDay) return;
    if (value.durationMin < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["durationMin"],
        message: "Duration must be at least 1 minute",
      });
    }
    if (value.groups.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["groups"],
        message: "Select at least one muscle group",
      });
    }
  })
  .transform((value) => {
    if (!value.isRestDay) return value;
    return {
      ...value,
      isRestDay: true,
      groups: [],
      exercises: [],
      durationMin: 0,
    };
  });

export const updateWorkoutSchema = z
  .object({
    date: workoutDateSchema.optional(),
    groups: z.array(z.enum(MUSCLE_GROUPS)).optional(),
    durationMin: z.coerce
      .number({ error: "Duration is required" })
      .min(0, "Duration cannot be negative")
      .max(1_440, "Duration cannot exceed 24 hours")
      .optional(),
    exercises: z.array(workoutExerciseSchema).max(60).optional(),
    isRestDay: z.boolean().optional(),
  })
  .refine(
    (value) =>
      value.date !== undefined ||
      value.groups !== undefined ||
      value.durationMin !== undefined ||
      value.exercises !== undefined ||
      value.isRestDay !== undefined,
    {
      message: "At least one field is required",
    },
  )
  .superRefine((value, ctx) => {
    if (value.isRestDay === true) return;
    if (value.durationMin !== undefined && value.durationMin < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["durationMin"],
        message: "Duration must be at least 1 minute",
      });
    }
  });

// ---------------------------------------------------------------------------
// Gym progress photos
// ---------------------------------------------------------------------------

const gymProgressPhotoDateSchema = z
  .string()
  .min(1, "Date is required")
  .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: "Date must be YYYY-MM-DD",
  });

export const createGymProgressPhotoSchema = z.object({
  date: gymProgressPhotoDateSchema,
  imageUrl: z.url("Invalid image URL"),
  publicId: z.string().min(1, "Cloudinary public ID is required"),
});

export const updateGymProgressPhotoSchema = z.object({
  date: gymProgressPhotoDateSchema.optional(),
  imageUrl: z.url("Invalid image URL").optional(),
  publicId: z.string().min(1, "Cloudinary public ID is required").optional(),
});

// ---------------------------------------------------------------------------
// API response helpers
// ---------------------------------------------------------------------------

/** Standard success response */
export function apiSuccess<T>(data: T, status = 200) {
  return { body: { success: true as const, data }, status };
}

/** Standard error response */
export function apiError(error: string, status = 400) {
  return { body: { success: false as const, error }, status };
}
