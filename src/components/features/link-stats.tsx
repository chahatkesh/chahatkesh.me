"use client";

import { GitCommit } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import config from "~/config";
import { EXTERNAL_APIS } from "~/constants";
import { fetcher } from "~/lib/fetcher";

type ContributionsResponse = {
  total: Record<string, number>;
};

const LinkStats = () => {
  const { data: totalContributions = 0, isLoading } = useQuery({
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
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex gap-4 animate-pulse">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 bg-muted rounded" />
          <div className="h-4 w-12 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
      <GitCommit className="size-4" />
      <span className="font-semibold">
        {totalContributions.toLocaleString()}
      </span>
      <span>Contributions</span>
    </div>
  );
};

export default LinkStats;
