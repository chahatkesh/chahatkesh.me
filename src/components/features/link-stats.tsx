"use client";

import { FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import config from "~/config";
import { Skeleton } from "~/components/ui";
import { API_ROUTES, LEETCODE_STALE_TIME_MS } from "~/constants";
import { fetcher } from "~/lib/fetcher";
import { type LeetCodeStats } from "~/lib/leetcode";
import type { CodingActivityData } from "~/components/features/coding-activity/types";

/**
 * Uses the cached `/api/coding-activity` response (shared with the status bar)
 * for GitHub totals instead of hitting the third-party contributions API
 * from the browser.
 */
const LinkStats = () => {
  const { data: activity, isLoading: ghLoading } = useQuery({
    queryKey: ["coding-activity"],
    queryFn: () => fetcher<CodingActivityData>(API_ROUTES.CODING_ACTIVITY),
    staleTime: LEETCODE_STALE_TIME_MS,
  });

  const { data: leetcode, isLoading: lcLoading } = useQuery<LeetCodeStats>({
    queryKey: ["leetcode-stats"],
    queryFn: () => fetcher<LeetCodeStats>(API_ROUTES.LEETCODE_STATS),
    staleTime: LEETCODE_STALE_TIME_MS,
  });

  const totalContributions = activity?.githubTotalContributions ?? 0;

  if (ghLoading && lcLoading) {
    return (
      <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
        </div>
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-4">
      <a
        href={config.social.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <FaGithub className="size-4" />
        <span className="font-semibold">
          {totalContributions.toLocaleString()}
        </span>
        <span>Contributions</span>
      </a>
      {leetcode && leetcode.totalSolved > 0 && (
        <a
          href={`https://leetcode.com/u/${config.author.leetcode}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LeetCode profile"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <SiLeetcode className="size-4" />
          <span className="font-semibold">
            {leetcode.totalSolved.toLocaleString()}
          </span>
          <span>Solved</span>
        </a>
      )}
    </div>
  );
};

export default LinkStats;
