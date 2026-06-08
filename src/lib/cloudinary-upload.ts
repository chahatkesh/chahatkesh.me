import type { CloudinaryUploadWidgetResults } from "next-cloudinary";

/** Normalized fields extracted from a successful Cloudinary upload. */
export interface CloudinaryUploadResult {
  imageUrl: string;
  publicId: string;
  originalFilename?: string;
  format?: string;
  bytes?: number;
  resourceType?: string;
}

/**
 * Safely extract the commonly used fields from a CldUploadWidget success
 * result. Returns `null` when the result has no usable `info` payload.
 */
export function parseCloudinaryUploadResult(
  result: CloudinaryUploadWidgetResults,
): CloudinaryUploadResult | null {
  if (!result.info || typeof result.info === "string") return null;

  const info = result.info;
  return {
    imageUrl: info.secure_url,
    publicId: info.public_id,
    originalFilename: info.original_filename,
    format: info.format,
    bytes: info.bytes,
    resourceType: info.resource_type,
  };
}
