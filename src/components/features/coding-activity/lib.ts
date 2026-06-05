import type {
  CodingActivityData,
  CodingActivityView,
  ActivityRange,
} from "./types";
import { LAST_YEAR } from "./types";

/** Parses a `YYYY-MM-DD` string into a local Date (matches the calendar lib). */
export function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** Formats a local Date as a `YYYY-MM-DD` string. */
export function formatIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Maps a daily count to a 0-4 heatmap level relative to the busiest day. */
export function classifyIntensityLevel(
  count: number,
  busiestDayCount: number,
): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (busiestDayCount <= 0) return 1;
  const ratio = count / busiestDayCount;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

/** Week column index for a date within a range starting at `startIso`. */
export function getWeekIndexForDate(startIso: string, dateIso: string): number {
  const start = parseIsoDate(startIso);
  const target = parseIsoDate(dateIso);
  const dayOffset = Math.round(
    (target.getTime() - start.getTime()) / 86_400_000,
  );
  return Math.floor((start.getDay() + dayOffset) / 7);
}

/**
 * Builds the full view model from raw API data and selected range.
 * Pure function, safe for use inside `useMemo`.
 */
export function buildActivityView(
  data: CodingActivityData,
  range: ActivityRange,
): CodingActivityView {
  let startIso: string;
  let endIso: string;
  let label: string;

  if (range === LAST_YEAR) {
    const start = parseIsoDate(data.latestDate);
    start.setFullYear(start.getFullYear() - 1);
    start.setDate(start.getDate() + 1);
    startIso = formatIsoDate(start);
    endIso = data.latestDate;
    label = "the last year";
  } else {
    startIso = `${range}-01-01`;
    endIso = `${range}-12-31`;
    label = String(range);
  }

  const perDay: Array<{ date: string; github: number; leetcode: number }> = [];
  let githubTotal = 0;
  let leetcodeTotal = 0;
  let busiestDayCount = 0;
  let githubBusiest = 0;
  let leetcodeBusiest = 0;

  const cursor = parseIsoDate(startIso);
  const end = parseIsoDate(endIso);
  while (cursor <= end) {
    const date = formatIsoDate(cursor);
    const github = data.githubCountByDate[date] ?? 0;
    const leetcode = data.leetcodeCountByDate[date] ?? 0;
    githubTotal += github;
    leetcodeTotal += leetcode;
    busiestDayCount = Math.max(busiestDayCount, github + leetcode);
    githubBusiest = Math.max(githubBusiest, github);
    leetcodeBusiest = Math.max(leetcodeBusiest, leetcode);
    perDay.push({ date, github, leetcode });
    cursor.setDate(cursor.getDate() + 1);
  }

  const calendarData = perDay.map(({ date, github, leetcode }) => ({
    date,
    count: github + leetcode,
    level: classifyIntensityLevel(github + leetcode, busiestDayCount),
  }));

  const countsByDate = new Map<string, { github: number; leetcode: number }>();
  for (const { date, github, leetcode } of perDay) {
    countsByDate.set(date, { github, leetcode });
  }

  const weeks = Math.ceil(
    (parseIsoDate(startIso).getDay() + perDay.length) / 7,
  );

  return {
    calendarData,
    countsByDate,
    githubBusiest,
    leetcodeBusiest,
    githubTotal,
    leetcodeTotal,
    weeks,
    label,
    startIso,
    endIso,
  };
}
