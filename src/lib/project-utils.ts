/**
 * Shared project utilities.
 * Centralizes helpers that were duplicated across project components.
 */

import { type StaticImageData } from "next/image";
import { FRONTEND_STACKS, BACKEND_DEVOPS, LANGUAGES_TOOLS } from "~/data/stack";

/** Resolve a cover image to its string src, whether it's a URL string or StaticImageData */
export function getImageSrc(cover: string | StaticImageData): string {
  return typeof cover === "string" ? cover : cover.src;
}

/** Merged lookup of all tech stacks for icon resolution */
export const ALL_STACKS = {
  ...LANGUAGES_TOOLS,
  ...FRONTEND_STACKS,
  ...BACKEND_DEVOPS,
} as const;
