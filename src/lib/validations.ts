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
// Markdown Gist/Document Pages
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
