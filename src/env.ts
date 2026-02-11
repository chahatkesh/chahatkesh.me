/**
 * Runtime environment variable validation.
 *
 * Validates all required environment variables at application startup
 * so missing / misconfigured values fail fast instead of causing
 * cryptic errors deep in API handlers.
 *
 * Usage:
 *   import { env } from "~/env";
 *   env.MONGODB_URI   // string – guaranteed to exist at runtime
 */

import { z } from "zod/v4";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const serverSchema = z.object({
  /** MongoDB connection string */
  MONGODB_URI: z.url("MONGODB_URI must be a valid connection string"),

  /** Secret used to sign JWT tokens — MUST be set in production */
  JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 characters"),

  /** Spotify OAuth credentials */
  SPOTIFY_CLIENT_ID: z.string().optional(),
  SPOTIFY_CLIENT_SECRET: z.string().optional(),
  SPOTIFY_REFRESH_TOKEN: z.string().optional(),

  /** GitHub personal access token (optional – increases rate limit) */
  GITHUB_TOKEN: z.string().optional(),

  /** Cloudinary credentials */
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),

  /** Node environment */
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().optional(),
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string().optional(),
  NEXT_PUBLIC_CLARITY_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const processEnv = {
  // Server
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  // Client
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  NEXT_PUBLIC_CLARITY_PROJECT_ID: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
};

// Merge schemas
const envSchema = serverSchema.merge(clientSchema);

type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  // Skip validation during build or when explicitly opted out
  if (
    process.env.SKIP_ENV_VALIDATION === "true" ||
    process.env.NEXT_PHASE === "phase-production-build"
  ) {
    return processEnv as unknown as Env;
  }

  const parsed = envSchema.safeParse(processEnv);

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      z.prettifyError(parsed.error),
    );
    throw new Error(
      "Invalid environment variables. Check server logs for details.",
    );
  }

  return parsed.data;
}

export const env = validateEnv();
