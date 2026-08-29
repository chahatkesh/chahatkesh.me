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
import { LocalTime } from "~/components/features/links/local-time";
import { cn } from "~/lib/utils";

const statLinkClassName =
  "inline-flex items-center gap-1.5 text-[13px] text-muted-foreground/75 transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm";

/** `min-h` reserves the loaded height so the hero does not reflow on fetch. */
const statsRowClassName =
  "flex min-h-5 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] text-muted-foreground/75 md:text-sm";

function StatSeparator() {
  return (
    <span aria-hidden className="text-border/80">
      ·
    </span>
  );
}

/**
 * Uses the cached `/api/coding-activity` response (shared with the status bar)
 * for GitHub totals instead of hitting the third-party contributions API
 * from the browser.
 */
const LinkStats = ({ className }: { className?: string }) => {
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

  const loading = ghLoading || lcLoading;
  const totalContributions = activity?.githubTotalContributions ?? 0;
  const showLeetcode = Boolean(leetcode && leetcode.totalSolved > 0);

  return (
    <div
      className={cn(statsRowClassName, className)}
      aria-busy={loading}
      aria-label={loading ? "Loading stats" : undefined}
    >
      {loading ? (
        <>
          <Skeleton className="h-3.5 w-[9.5rem] rounded" />
          <Skeleton className="h-3.5 w-20 rounded" />
        </>
      ) : (
        <>
          <a
            href={config.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className={statLinkClassName}
          >
            <FaGithub className="size-3.5 shrink-0" aria-hidden />
            <span>
              <span className="tabular-nums text-foreground/90">
                {totalContributions.toLocaleString()}
              </span>{" "}
              contributions
            </span>
          </a>

          {showLeetcode && (
            <>
              <StatSeparator />
              <a
                href={`https://leetcode.com/u/${config.author.leetcode}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode profile"
                className={statLinkClassName}
              >
                <SiLeetcode className="size-3.5 shrink-0" aria-hidden />
                <span>
                  <span className="tabular-nums text-foreground/90">
                    {leetcode!.totalSolved.toLocaleString()}
                  </span>{" "}
                  solved
                </span>
              </a>
            </>
          )}
        </>
      )}

      <span className="md:hidden">
        <StatSeparator />
      </span>
      <LocalTime className="md:hidden" />
    </div>
  );
};

export default LinkStats;
