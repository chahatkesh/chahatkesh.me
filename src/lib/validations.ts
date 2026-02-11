/**
 * Zod schemas for API request / response validation.
 * Centralizes all validation logic so API routes stay lean.
 */

import { z } from "zod/v4";

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

export const uploadFileSchema = z.object({
  file: z.string().min(1, "No file provided"),
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
