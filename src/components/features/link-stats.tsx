"use client";

import { GitCommit, Code2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import config from "~/config";
import { API_ROUTES, EXTERNAL_APIS, LEETCODE_STALE_TIME_MS } from "~/constants";
import { fetcher } from "~/lib/fetcher";
import { type LeetCodeStats } from "~/lib/leetcode";

type ContributionsResponse = {
  total: Record<string, number>;
};

const LinkStats = () => {
  const { data: totalContributions = 0, isLoading: ghLoading } = useQuery({
    queryKey: ["github-contributions", config.author.github],
    queryFn: async () => {
      const data = await fetcher<ContributionsResponse>(
        EXTERNAL_APIS.GITHUB_CONTRIBUTIONS(config.author.github),
      );
      return Object.values(data.total || {}).reduce(
        (sum, yearContributions) => sum + (yearContributions || 0),
        0,
      );
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: leetcode, isLoading: lcLoading } = useQuery<LeetCodeStats>({
    queryKey: ["leetcode-stats"],
    queryFn: () => fetcher<LeetCodeStats>(API_ROUTES.LEETCODE_STATS),
    staleTime: LEETCODE_STALE_TIME_MS,
  });

  if (ghLoading && lcLoading) {
    return (
      <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4 animate-pulse">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 bg-muted rounded" />
          <div className="h-4 w-12 bg-muted rounded" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 bg-muted rounded" />
          <div className="h-4 w-12 bg-muted rounded" />
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
        <GitCommit className="size-4" />
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
          <Code2 className="size-4" />
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
