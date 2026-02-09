/**
 * Gallery-related type definitions.
 * Single source of truth for gallery data structures used across
 * gallery components, admin pages, and API responses.
 */

/** Raw gallery image as stored in the database / returned by the API */
export interface GalleryImage {
  _id: string;
  title: string;
  location: string;
  date: string;
  aspectRatio: GalleryAspectRatio;
  imageUrl: string;
  publicId: string;
  isFeatured: boolean;
  order: number;
}

/** Transformed gallery item for UI rendering */
export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  date: string;
  src: string;
  className?: string;
  aspectRatio?: GalleryAspectRatio;
  isFeatured?: boolean;
}

/** Valid aspect ratio options for gallery images */
export type GalleryAspectRatio =
  | "square"
  | "portrait"
  | "landscape"
  | "big-square";

/** API response shape for gallery endpoints */
export interface GalleryApiResponse {
  success: boolean;
  data: GalleryImage[];
}

/** Transform a raw GalleryImage (API) into a UI GalleryItem */
export function toGalleryItem(image: GalleryImage): GalleryItem {
  return {
    id: image._id,
    title: image.title,
    location: image.location,
    date: image.date,
    src: image.imageUrl,
    aspectRatio: image.aspectRatio,
    isFeatured: image.isFeatured,
  };
}
