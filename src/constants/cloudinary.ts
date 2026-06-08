/**
 * Centralized Cloudinary configuration for admin upload widgets.
 *
 * Keeps the upload preset, folder names, and per-context widget option
 * presets in a single place so they stay consistent across admin pages.
 */

import type { CloudinaryUploadWidgetOptions } from "next-cloudinary";

/** Upload preset used by all CldUploadWidget instances. */
export const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "portfolio_gallery";

/** Cloudinary destination folders, grouped by feature. */
export const CLOUDINARY_FOLDERS = {
  FILES: "portfolio/files",
  GALLERY: "portfolio/gallery",
  EXPERIENCE: (gallerySlug: string) => `portfolio/experience/${gallerySlug}`,
} as const;

/** 10MB image size limit. */
const IMAGE_MAX_FILE_SIZE = 10_000_000;
/** 20MB general file size limit. */
const FILE_MAX_FILE_SIZE = 20_000_000;

const IMAGE_FORMATS = ["jpg", "jpeg", "png", "webp"];

/**
 * CldUploadWidget `options` presets for each upload context.
 * Use the matching preset to avoid duplicating widget configuration.
 */
export const CLOUDINARY_UPLOAD_OPTIONS = {
  /** Single image upload for the public gallery. */
  GALLERY: {
    folder: CLOUDINARY_FOLDERS.GALLERY,
    maxFiles: 1,
    resourceType: "image",
    clientAllowedFormats: IMAGE_FORMATS,
    maxFileSize: IMAGE_MAX_FILE_SIZE,
  } satisfies CloudinaryUploadWidgetOptions,
  /** Single file (image/doc/etc.) upload for shared files. */
  FILES: {
    folder: CLOUDINARY_FOLDERS.FILES,
    maxFiles: 1,
    resourceType: "auto",
    clientAllowedFormats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "gif",
      "svg",
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "txt",
      "csv",
      "zip",
    ],
    maxFileSize: FILE_MAX_FILE_SIZE,
  } satisfies CloudinaryUploadWidgetOptions,
  /** Multi-image upload for an experience/company gallery. */
  EXPERIENCE: (gallerySlug: string): CloudinaryUploadWidgetOptions => ({
    folder: CLOUDINARY_FOLDERS.EXPERIENCE(gallerySlug),
    multiple: true,
    maxFiles: 20,
    resourceType: "image",
    clientAllowedFormats: IMAGE_FORMATS,
    maxFileSize: IMAGE_MAX_FILE_SIZE,
  }),
};
