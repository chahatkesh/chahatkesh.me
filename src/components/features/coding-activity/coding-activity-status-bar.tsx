"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GITHUB_CONTRIBUTION_COLORS } from "~/constants/brand";
import { API_ROUTES, LEETCODE_STALE_TIME_MS } from "~/constants";
import { fetcher } from "~/lib/fetcher";
import { cn } from "~/lib/utils";

import type { CodingActivityData, HoveredDay } from "./types";
import { EMPTY_CELL_COLOR, GITHUB_ACCENT } from "./constants";
import { buildStatusBarView, parseIsoDateList } from "./lib";
import { ActivityTooltip } from "./activity-tooltip";

const ZERO_CONTRIBUTION_DATES = parseIsoDateList(
  process.env.NEXT_PUBLIC_CODING_ACTIVITY_ZERO_DATES,
);

const BAR_COLORS = [...GITHUB_CONTRIBUTION_COLORS];

const CodingActivityStatusBar = () => {
  const [hovered, setHovered] = useState<HoveredDay>(null);

  const { data, isLoading } = useQuery<CodingActivityData>({
    queryKey: ["coding-activity"],
    queryFn: () => fetcher<CodingActivityData>(API_ROUTES.CODING_ACTIVITY),
    staleTime: LEETCODE_STALE_TIME_MS,
  });

  const view = useMemo(() => {
    if (!data || data.availableYears.length === 0) return null;
    return buildStatusBarView(data, ZERO_CONTRIBUTION_DATES);
  }, [data]);

  const dismissTooltip = useCallback(() => setHovered(null), []);

  const handleBarEnter = useCallback(
    (
      event:
        | React.MouseEvent<HTMLDivElement>
        | React.FocusEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>,
      day: { date: string; github: number; leetcode: number },
    ) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setHovered({
        date: day.date,
        github: day.github,
        leetcode: day.leetcode,
        rect,
      });
    },
    [],
  );

  if (isLoading || !view) {
    return (
      <div aria-hidden>
        <div className="mb-3 flex items-center justify-between">
          <div className="h-4 w-28 animate-pulse rounded bg-muted/60" />
          <div className="h-4 w-16 animate-pulse rounded bg-muted/60" />
        </div>
        <div className="h-10 animate-pulse rounded-md bg-muted/50" />
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="h-3 w-16 animate-pulse rounded bg-muted/40" />
          <div className="h-3 w-20 animate-pulse rounded bg-muted/40" />
          <div className="h-3 w-10 animate-pulse rounded bg-muted/40" />
        </div>
      </div>
    );
  }

  return (
    <div aria-label="Coding activity over the last 90 days">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-tight">
          Coding Activity
        </h2>
        <span
          className={cn(
            "text-sm font-medium",
            !view.isBuildingToday && "text-muted-foreground",
          )}
          style={view.isBuildingToday ? { color: GITHUB_ACCENT } : undefined}
        >
          {view.isBuildingToday ? "Building" : "Resting"}
        </span>
      </div>

      <div className="flex h-10 items-stretch gap-px sm:gap-0.5">
        {view.days.map((day) => (
          <div
            key={day.date}
            role="presentation"
            tabIndex={0}
            className="min-w-0 flex-1 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            style={{
              backgroundColor: BAR_COLORS[day.level] ?? EMPTY_CELL_COLOR,
              cursor: "pointer",
            }}
            onMouseEnter={(event) => handleBarEnter(event, day)}
            onMouseLeave={dismissTooltip}
            onFocus={(event) => handleBarEnter(event, day)}
            onBlur={dismissTooltip}
            onTouchStart={(event) => handleBarEnter(event, day)}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
        <span className="shrink-0">90 days ago</span>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="shrink-0 tabular-nums">
            {view.activeDays}/{view.totalDays} days
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <span className="shrink-0">Today</span>
      </div>

      <ActivityTooltip hovered={hovered} onDismiss={dismissTooltip} />
    </div>
  );
};

export default CodingActivityStatusBar;
