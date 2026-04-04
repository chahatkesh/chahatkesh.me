import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";
import config from "~/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString(config.seo.language, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const getBasePath = (path: string) =>
  `https://${config.domainName}${path}`;

/**
 * Generate a URL-safe slug from an employer name and role.
 * Use this when adding new experiences to data/experience.ts to ensure
 * a consistent naming convention.
 *
 * @example
 * generateExperienceSlug("Zenbase Technologies", "Founding Engineer (Frontend)")
 * // → "zenbase-technologies-founding-engineer-frontend"
 *
 * NOTE: Never change an existing slug — it's a stable public URL.
 */
export function generateExperienceSlug(employer: string, role: string): string {
  return `${employer}-${role}`
    .toLowerCase()
    .replace(/\./g, "-") // treat dots as word separators (e.g. Annam.ai → annam-ai)
    .replace(/[^a-z0-9\s-]/g, "") // strip remaining special chars
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
