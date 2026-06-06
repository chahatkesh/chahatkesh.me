/**
 * Shared-file type definitions.
 * Single source of truth for the generic file-upload feature used by the
 * admin dashboard and its API routes.
 */

/** Raw shared file as stored in the database / returned by the API */
export interface SharedFile {
  _id: string;
  fileName: string;
  fileUrl: string;
  publicId: string;
  format: string;
  bytes: number;
  resourceType: string;
  createdAt: string;
  updatedAt: string;
}

/** API response shape for shared-file endpoints */
export interface SharedFileApiResponse {
  success: boolean;
  data: SharedFile[];
}
