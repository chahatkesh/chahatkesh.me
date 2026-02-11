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
