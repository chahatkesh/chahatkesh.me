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

/** @deprecated Use `getBasePath` instead */
export const BasePath = (path: string) => `https://${config.domainName}${path}`;

export const getBasePath = (path: string) =>
  `https://${config.domainName}${path}`;
