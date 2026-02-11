/**
 * Shared Cloudinary configuration.
 * Single source of truth for Cloudinary SDK setup used across API routes.
 */

import { v2 as cloudinary } from "cloudinary";

// Configure once — reused by all API handlers
cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };
