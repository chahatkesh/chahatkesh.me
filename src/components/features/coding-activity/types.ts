/** Formats a Date as a UTC `YYYY-MM-DD` string. */
export type CodingActivityData = {
  githubCountByDate: Record<string, number>;
  leetcodeCountByDate: Record<string, number>;
  /** Years that have any activity, most recent first. */
  availableYears: number[];
  /** Most recent day to display (today, as a UTC `YYYY-MM-DD` string). */
  latestDate: string;
  /** Lifetime GitHub contribution total from the contributions API. */
  githubTotalContributions: number;
};

/** Default range: the trailing 12 months rather than a fixed calendar year. */
export const LAST_YEAR = "last" as const;
export type ActivityRange = typeof LAST_YEAR | number;

export type DayCounts = { github: number; leetcode: number };

export type CodingActivityView = {
  calendarData: Array<{
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
  }>;
  countsByDate: Map<string, DayCounts>;
  githubBusiest: number;
  leetcodeBusiest: number;
  githubTotal: number;
  leetcodeTotal: number;
  weeks: number;
  label: string;
  startIso: string;
  endIso: string;
};

export type HoveredDay = {
  date: string;
  github: number;
  leetcode: number;
  rect: DOMRect;
} | null;

export const STATUS_BAR_DAYS = 90;

export type StatusBarDay = {
  date: string;
  github: number;
  leetcode: number;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type StatusBarView = {
  days: StatusBarDay[];
  activeDays: number;
  totalDays: number;
  isBuildingToday: boolean;
};
