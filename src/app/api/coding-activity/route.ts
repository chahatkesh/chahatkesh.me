import { NextResponse } from "next/server";
import { getLeetCodeSubmissionCounts } from "~/lib/leetcode";
import { EXTERNAL_APIS } from "~/constants";
import config from "~/config";

export const revalidate = 3600;

/** Raw shape returned by the GitHub contributions proxy (jogruber API). */
type GithubContributionsResponse = {
  total: Record<string, number>;
  contributions: Array<{ date: string; count: number; level: number }>;
};

/**
 * Per-day activity counts for both sources, keyed by `YYYY-MM-DD`. Only days
 * that actually have activity are included; the client treats missing days as
 * zero. The client filters this data by year and builds the heatmap itself, so
 * it can size the intensity levels relative to whichever range is in view.
 */
export type CodingActivityData = {
  githubCountByDate: Record<string, number>;
  leetcodeCountByDate: Record<string, number>;
  /** Years that have any activity, most recent first. */
  availableYears: number[];
  /** Most recent day to display (today, as a UTC `YYYY-MM-DD` string). */
  latestDate: string;
};

/** Formats a Date as a UTC `YYYY-MM-DD` string. */
function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const EMPTY_RESPONSE: CodingActivityData = {
  githubCountByDate: {},
  leetcodeCountByDate: {},
  availableYears: [],
  latestDate: toIsoDate(new Date()),
};

export async function GET() {
  try {
    const [githubResponse, leetcodeCountByDate] = await Promise.all([
      fetch(EXTERNAL_APIS.GITHUB_CONTRIBUTIONS(config.author.github), {
        next: { revalidate: 3600 },
      }),
      getLeetCodeSubmissionCounts(config.author.leetcode),
    ]);

    if (!githubResponse.ok) {
      throw new Error(`GitHub API error: ${githubResponse.status}`);
    }
    const githubJson =
      (await githubResponse.json()) as GithubContributionsResponse;

    const latestDate = toIsoDate(new Date());

    // GitHub returns the entire calendar year, including future days with a
    // zero count, so keep only real activity up to and including today.
    const githubCounts: Record<string, number> = {};
    for (const day of githubJson.contributions) {
      if (day.count > 0 && day.date <= latestDate) {
        githubCounts[day.date] = day.count;
      }
    }

    const leetcodeCounts: Record<string, number> = {};
    for (const [date, count] of Object.entries(leetcodeCountByDate)) {
      if (count > 0 && date <= latestDate) {
        leetcodeCounts[date] = count;
      }
    }

    const years = new Set<number>();
    for (const date of Object.keys(githubCounts)) {
      years.add(Number(date.slice(0, 4)));
    }
    for (const date of Object.keys(leetcodeCounts)) {
      years.add(Number(date.slice(0, 4)));
    }
    const availableYears = [...years].sort((a, b) => b - a);

    const result: CodingActivityData = {
      githubCountByDate: githubCounts,
      leetcodeCountByDate: leetcodeCounts,
      availableYears,
      latestDate,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Coding activity API error:", error);
    return NextResponse.json(EMPTY_RESPONSE);
  }
}
