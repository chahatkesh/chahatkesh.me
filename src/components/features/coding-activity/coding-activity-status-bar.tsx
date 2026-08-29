"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "~/components/ui";
import { GITHUB_CONTRIBUTION_COLORS } from "~/constants/brand";
import { API_ROUTES, LEETCODE_STALE_TIME_MS } from "~/constants";
import { fetcher } from "~/lib/fetcher";
import { cn } from "~/lib/utils";
import { SectionLabel } from "~/components/shared";

import type { CodingActivityData, HoveredDay } from "./types";
import { EMPTY_CELL_COLOR, GITHUB_ACCENT } from "./constants";
import { buildStatusBarView, parseIsoDateList } from "./lib";
import { ActivityTooltip } from "./activity-tooltip";

const ZERO_CONTRIBUTION_DATES = parseIsoDateList(
  process.env.NEXT_PUBLIC_CODING_ACTIVITY_ZERO_DATES,
);

const BAR_COLORS = [...GITHUB_CONTRIBUTION_COLORS];

function ActivityCaption({
  activeDays,
  totalDays,
  isBuildingToday,
}: {
  activeDays: number;
  totalDays: number;
  isBuildingToday: boolean;
}) {
  return (
    <figcaption className="mt-3">
      <SectionLabel
        label="Coding activity"
        asCaption
        value={`${activeDays}/${totalDays} days`}
        trailing={
          <span
            className={cn(
              "shrink-0 text-[11px] font-medium",
              !isBuildingToday && "text-muted-foreground",
            )}
            style={isBuildingToday ? { color: GITHUB_ACCENT } : undefined}
          >
            {isBuildingToday ? "Building" : "Resting"}
          </span>
        }
      />
    </figcaption>
  );
}

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
      <div aria-busy="true">
        <div className="flex h-10 items-stretch gap-px overflow-hidden sm:gap-0.5">
          <Skeleton className="h-full w-full rounded-sm" />
        </div>
        <div className="mt-3 flex items-center gap-3 px-1">
          <Skeleton className="h-3 w-24 shrink-0" />
          <div className="h-px min-w-3 flex-1 bg-border/60" />
          <Skeleton className="h-3 w-16 shrink-0" />
          <div className="h-px min-w-3 flex-1 bg-border/60" />
          <Skeleton className="h-3 w-14 shrink-0" />
        </div>
      </div>
    );
  }

  return (
    <figure>
      <div
        role="img"
        aria-label={`Coding activity over the last 90 days. ${view.activeDays} of ${view.totalDays} active days. ${view.isBuildingToday ? "Building today" : "Resting today"}.`}
        className="flex h-10 cursor-help items-stretch gap-px sm:gap-0.5"
      >
        {view.days.map((day) => (
          <div
            key={day.date}
            aria-hidden
            className="min-w-0 flex-1 transition-[filter] duration-150 hover:brightness-[1.35]"
            style={{
              backgroundColor: BAR_COLORS[day.level] ?? EMPTY_CELL_COLOR,
            }}
            onMouseEnter={(event) => handleBarEnter(event, day)}
            onMouseLeave={dismissTooltip}
            onTouchStart={(event) => handleBarEnter(event, day)}
          />
        ))}
      </div>

      <ActivityCaption
        activeDays={view.activeDays}
        totalDays={view.totalDays}
        isBuildingToday={view.isBuildingToday}
      />

      <ActivityTooltip hovered={hovered} onDismiss={dismissTooltip} />
    </figure>
  );
};

export default CodingActivityStatusBar;
