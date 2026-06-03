"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ActivityCalendar } from "react-activity-calendar";
import {
  API_ROUTES,
  LEETCODE_STALE_TIME_MS,
  LEETCODE_CALENDAR_FONT_SIZE,
  LEETCODE_CALENDAR_BLOCK_SIZE,
} from "~/constants";
import { LEETCODE_CALENDAR_COLORS } from "~/constants/brand";
import { fetcher } from "~/lib/fetcher";
import { type LeetCodeStats as LeetCodeStatsData } from "~/lib/leetcode";
import { type LeetCodeCalendar } from "~/lib/leetcode";

const DIFFICULTY_CONFIG = [
  { key: "easy" as const, label: "Easy", color: "text-green-500" },
  { key: "medium" as const, label: "Med", color: "text-amber-500" },
  { key: "hard" as const, label: "Hard", color: "text-red-500" },
];

const LeetCodeStats = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  const { data: stats } = useQuery<LeetCodeStatsData>({
    queryKey: ["leetcode-stats"],
    queryFn: () => fetcher<LeetCodeStatsData>(API_ROUTES.LEETCODE_STATS),
    staleTime: LEETCODE_STALE_TIME_MS,
  });

  const { data: calendar, isLoading: calendarLoading } =
    useQuery<LeetCodeCalendar>({
      queryKey: ["leetcode-calendar"],
      queryFn: () => fetcher<LeetCodeCalendar>(API_ROUTES.LEETCODE_CALENDAR),
      staleTime: LEETCODE_STALE_TIME_MS,
    });

  if (!isClient || calendarLoading) {
    return (
      <div className="w-full" aria-label="LeetCode activity graph">
        <div className="h-32 animate-pulse bg-muted/50 rounded-lg" />
      </div>
    );
  }

  if (!calendar || calendar.days.length === 0) return null;

  return (
    <div className="w-full" aria-label="LeetCode activity graph">
      <ActivityCalendar
        data={calendar.days}
        colorScheme="dark"
        fontSize={LEETCODE_CALENDAR_FONT_SIZE}
        blockSize={LEETCODE_CALENDAR_BLOCK_SIZE}
        theme={{
          dark: [...LEETCODE_CALENDAR_COLORS],
        }}
        labels={{
          totalCount: "{{count}} submissions in the last year",
        }}
      />

      {stats && stats.totalSolved > 0 && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
          <span>
            <span className="font-semibold text-foreground tabular-nums">
              {stats.totalSolved}
            </span>{" "}
            solved
          </span>
          <span className="text-border">|</span>
          {DIFFICULTY_CONFIG.map(({ key, label, color }) => (
            <span key={key}>
              <span className={`font-semibold tabular-nums ${color}`}>
                {stats[key]}
              </span>{" "}
              {label}
            </span>
          ))}
          <span className="text-border">|</span>
          <span>
            Rank{" "}
            <span className="font-semibold text-foreground tabular-nums">
              #{stats.ranking.toLocaleString()}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default LeetCodeStats;
