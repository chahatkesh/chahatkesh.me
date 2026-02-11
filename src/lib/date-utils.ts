import config from "~/config";

/**
 * Format date string to human-readable format
 * Handles both "Month DD, YYYY" and "YYYY-MM-DD" formats
 */
export function formatDate(dateString: string): string {
  // If already in readable format (e.g., "June 26, 2025"), return as is
  if (dateString.match(/^[A-Za-z]+\s+\d{1,2},\s+\d{4}$/)) {
    return dateString;
  }

  // If in ISO format (YYYY-MM-DD), convert to readable format
  try {
    const date = new Date(dateString + "T00:00:00"); // Add time to avoid timezone shift
    return date.toLocaleDateString(config.seo.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString; // Return original if parsing fails
  }
}

/**
 * Parse a date string in "MMM YYYY" format (e.g., "Oct 2025") to a Date object.
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

  const parts = dateStr.trim().split(" ");
  if (parts.length !== 2) return new Date("");

  const [monthStr, yearStr] = parts;
  const year = parseInt(yearStr, 10);
  const month = MONTH_MAP[monthStr.toLowerCase()];

  if (month === undefined || isNaN(year)) return new Date("");
  return new Date(year, month, 1);
}

/**
 * Calculate human-readable duration between two "MMM YYYY" dates.
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
