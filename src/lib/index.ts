/**
 * Barrel export for commonly-used library utilities.
 *
 * Import from "~/lib" instead of individual files:
 *   import { cn, fetcher, formatDate } from "~/lib";
 */

// Utility functions
export { cn, formatDate, getBasePath } from "./utils";

// Fetcher utilities
export { fetcher, postFetcher } from "./fetcher";

// Date utilities
export {
  formatDate as formatDateString,
  formatRelativeDate,
  parseMonthYear,
  calculateDuration,
} from "./date-utils";

// GitHub utilities
export {
  getLatestCommits,
  getRepoStats,
  getRepoLanguages,
  getCommitCount,
} from "./github";
export type { RepoStats } from "./github";

// SEO utilities
export {
  getSEOTags,
  renderSchemaTags,
  renderOrganizationSchema,
  renderBreadcrumbSchema,
} from "./seo";

// Project utilities
export { getImageSrc, ALL_STACKS } from "./project-utils";

// Auth
export {
  createSession,
  verifySession,
  getSession,
  setSessionCookie,
  clearSessionCookie,
  requireAuth,
} from "./auth";

// Database
export { default as dbConnect } from "./mongodb";

// Cloudinary
export { cloudinary } from "./cloudinary";

// Validations
export {
  loginSchema,
  createGalleryImageSchema,
  updateGalleryImageSchema,
  uploadFileSchema,
  apiSuccess,
  apiError,
} from "./validations";
