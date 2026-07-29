import config from "~/config";

/**
 * Format date string to human-readable format
 * Handles both "Month DD, YYYY" and "YYYY-MM-DD" formats
 */
export function formatDate(dateString: string): string {
  const normalized = dateString.trim();

  // If already in readable format (e.g., "June 26, 2025"), return as is
  if (normalized.match(/^[A-Za-z]+\s+\d{1,2},\s+\d{4}$/)) {
    return normalized;
  }

  const source = /^\d{4}-\d{2}-\d{2}$/.test(normalized)
    ? `${normalized}T00:00:00`
    : normalized;

  const date = new Date(source);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleDateString(config.seo.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Parse a date string in "MMM YYYY" or "MMM DD, YYYY" format to a Date object.
 * Also handles "present" as the current date.
 */
const MONTH_MAP: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

export function parseMonthYear(dateStr: string): Date {
  if (dateStr.toLowerCase() === "present") {
    return new Date();
  }

  const match = dateStr
    .trim()
    .match(/^([A-Za-z]{3})\s+(?:(\d{1,2}),\s+)?(\d{4})$/);
  if (!match) return new Date("");

  const [, monthStr, dayStr, yearStr] = match;
  const year = parseInt(yearStr, 10);
  const month = MONTH_MAP[monthStr.toLowerCase()];
  const day = dayStr ? parseInt(dayStr, 10) : 1;

  if (month === undefined || isNaN(year) || day < 1 || day > 31) {
    return new Date("");
  }

  const date = new Date(year, month, day);
  return date.getMonth() === month ? date : new Date("");
}

/**
 * Calculate human-readable duration between two supported experience dates.
 * Example: "Oct 2025" to "present" → "4 months"
 */
/**
 * Format a date into a relative time string (e.g., "5m ago", "3h ago").
 * Falls back to "Mon DD" format for dates older than 7 days.
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function calculateDuration(startDate: string, endDate: string): string {
  const start = parseMonthYear(startDate);
  const end = parseMonthYear(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "Invalid date";
  }

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (months < 1) return "< 1 month";
  if (months === 1) return "1 month";
  if (months < 12) return `${months} months`;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) return years === 1 ? "1 year" : `${years} years`;
  return `${years} ${years === 1 ? "year" : "years"} ${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
}
