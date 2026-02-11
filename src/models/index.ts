/**
 * Barrel export for database models.
 *
 * Import from "~/models" instead of individual files:
 *   import { Admin, GalleryImage, Visitor } from "~/models";
 */

export { default as Admin } from "./admin";
export type { IAdmin } from "./admin";

export { default as GalleryImage } from "./gallery";
export type { IGalleryImage } from "./gallery";

export { Visitor } from "./visitor";
export type { IVisitor } from "./visitor";
