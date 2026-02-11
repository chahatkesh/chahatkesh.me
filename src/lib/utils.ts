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
