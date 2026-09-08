"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { API_ROUTES } from "~/constants";
import {
  GYM_WEEK_HISTORY,
  MUSCLE_GROUPS,
  RADAR_GROUPS,
  WEIGHT_UNIT,
} from "~/constants/gym";
import { fetcher } from "~/lib/fetcher";
import { cn } from "~/lib/utils";
import { Skeleton } from "~/components/ui";
import type { GymSummary, GymSummaryApiResponse } from "~/types/gym";
import { GymGroupStrips } from "./gym-group-strips";
import { GymHeatmap } from "./gym-heatmap";
import { GymProgressStrip } from "./gym-progress-strip";
import { GymRadar } from "./gym-radar";
import { GymRings, weekToRingMetrics } from "./gym-rings";
import { GymWeekStrip } from "./gym-week-strip";

const STALE_TIME_MS = 5 * 60 * 1000;

export function GymDashboard() {
  const { data, isLoading, isError, refetch, isFetching } =
    useQuery<GymSummaryApiResponse>({
      queryKey: ["gym-summary"],
      queryFn: () => fetcher<GymSummaryApiResponse>(API_ROUTES.GYM_SUMMARY),
      staleTime: STALE_TIME_MS,
    });

  if (isLoading) {
    return <GymDashboardSkeleton />;
  }

  if (isError || !data?.data) {
    return (
      <div className="rounded-lg border border-border px-4 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          Couldn&apos;t load training data.
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="el-focus-styles mt-3 text-sm font-medium text-ring underline-offset-4 hover:underline disabled:opacity-60"
        >
          {isFetching ? "Retrying…" : "Try again"}
        </button>
      </div>
    );
  }

  const summary = data.data;

  if (summary.totalSessions === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No sessions logged yet. The graphs light up once training starts.
      </p>
    );
  }

  // Remount when summary identity changes so week selection resets to latest.
  return (
    <GymDashboardContent
      key={`${summary.latestDate}-${summary.weeks.length}`}
      summary={summary}
    />
  );
}

function GymDashboardContent({ summary }: { summary: GymSummary }) {
  const currentIndex = Math.max(summary.weeks.length - 1, 0);
  const [selectedIndex, setSelectedIndex] = useState(currentIndex);

  const week = summary.weeks[selectedIndex] ?? summary.weeks[currentIndex];
  const metrics = weekToRingMetrics(
    week,
    summary.weeklyGoal,
    summary.weeklyDurationGoal,
  );

  return (
    <div className="space-y-10">
      <section aria-label="Weekly training rings">
        <div className="flex justify-center px-1 py-2 sm:py-5">
          <div className="flex w-full max-w-md flex-col items-stretch gap-7 sm:w-auto sm:max-w-none sm:flex-row sm:items-start sm:gap-8">
            <div className="order-2 flex flex-col sm:order-1">
              <p className="mb-3 text-center text-[11px] font-medium tracking-wide text-muted-foreground sm:text-left">
                Last 12 weeks
              </p>
              <GymWeekStrip
                weeks={summary.weeks}
                weeklyGoal={summary.weeklyGoal}
                weeklyDurationGoal={summary.weeklyDurationGoal}
                selectedIndex={selectedIndex}
                onSelect={setSelectedIndex}
              />
            </div>

            <div className="order-1 flex flex-col items-center sm:order-2 sm:items-start">
              <GymRings metrics={metrics} animateKey={week.start} />
            </div>
          </div>
        </div>

        <GymStats summary={summary} />
      </section>

      <section>
        <GymHeatmap summary={summary} />
      </section>

      <section>
        <GymGroupStrips summary={summary} />
      </section>

      <GymProgressStrip />

      <section>
        <GymRadar summary={summary} />
      </section>
    </div>
  );
}

function GymDashboardSkeleton() {
  return (
    <div className="space-y-10" aria-busy="true">
      {/* Weekly rings + stats */}
      <section aria-hidden>
        <div className="flex justify-center px-1 py-2 sm:py-5">
          <div className="flex w-full max-w-md flex-col items-stretch gap-7 sm:w-auto sm:max-w-none sm:flex-row sm:items-start sm:gap-8">
            <div className="order-2 flex flex-col sm:order-1">
              <Skeleton className="mb-3 h-3 w-20 self-center sm:self-start" />
              <div className="grid w-full grid-cols-6 gap-x-1.5 gap-y-3.5 sm:w-[268px] sm:gap-x-2">
                {Array.from({ length: GYM_WEEK_HISTORY }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <Skeleton className="size-[34px] rounded-full" />
                    <Skeleton className="h-2.5 w-7" />
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 flex flex-col items-center sm:order-2 sm:items-start">
              <div className="flex items-center gap-5 sm:gap-6">
                <Skeleton className="size-[156px] shrink-0 rounded-full" />
                <div className="flex flex-col gap-2.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-baseline gap-2.5">
                      <Skeleton className="mt-1.5 size-1.5 shrink-0 rounded-full" />
                      <Skeleton className="h-3.5 w-[4.5rem]" />
                      <Skeleton className="h-3.5 w-10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 border-y border-border sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col justify-center gap-1 px-4 py-3.5",
                i % 2 === 1 && "border-l border-border",
                i > 0 && "sm:border-l sm:border-border",
                i >= 2 && "border-t border-border sm:border-t-0",
              )}
            >
              <Skeleton className="h-3 w-16" />
              <Skeleton className={cn("h-7", i === 3 ? "w-16" : "w-12")} />
            </div>
          ))}
        </div>
      </section>

      {/* Heatmap */}
      <section aria-hidden>
        <div className="mb-2 flex items-center justify-end gap-2">
          <Skeleton className="h-5 w-8" />
          <Skeleton className="h-5 w-10" />
        </div>
        <Skeleton className="h-[112px] w-full rounded-md" />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      </section>

      {/* Muscle group strips */}
      <section aria-hidden className="space-y-6">
        {MUSCLE_GROUPS.map((group) => (
          <div key={group}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </section>

      {/* Progress photos */}
      <section aria-hidden>
        <Skeleton className="mb-3 h-3 w-16" />
        <div className="-mx-1 overflow-hidden px-1 pb-1">
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex w-[7.5rem] shrink-0 flex-col gap-2 sm:w-[8.5rem]"
              >
                <Skeleton className="aspect-[3/4] w-full rounded-md" />
                <Skeleton className="mx-auto h-3 w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Radar */}
      <section aria-hidden>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-12" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-5 w-8" />
            <Skeleton className="h-5 w-8" />
            <Skeleton className="h-5 w-8" />
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
          <Skeleton className="aspect-square w-full max-w-[280px] rounded-md sm:max-w-[300px]" />
          <div className="w-full max-w-[220px] space-y-2.5 sm:shrink-0">
            {RADAR_GROUPS.map((group) => (
              <div key={group} className="flex items-center gap-2.5">
                <Skeleton className="size-2 shrink-0 rounded-full" />
                <Skeleton className="h-3.5 flex-1" />
                <Skeleton className="h-3.5 w-8 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GymStats({ summary }: { summary: GymSummary }) {
  const averageDurationMin =
    summary.totalSessions > 0
      ? Math.round(summary.totalDurationMin / summary.totalSessions)
      : 0;
  const averageVolume =
    summary.totalSessions > 0 ? summary.totalVolume / summary.totalSessions : 0;
  const stats = [
    {
      label: "Current Streak",
      value: String(summary.currentStreak),
      unit: "d",
    },
    {
      label: "Total Sessions",
      value: String(summary.totalSessions),
      unit: "",
    },
    {
      label: "Avg time",
      value: String(averageDurationMin),
      unit: "min",
    },
    {
      label: "Avg / day",
      value: Math.round(averageVolume).toLocaleString(),
      unit: WEIGHT_UNIT,
    },
  ] as const;

  return (
    <dl className="mt-8 grid grid-cols-2 border-y border-border sm:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={cn(
            "flex flex-col justify-center gap-1 px-4 py-3.5",
            index % 2 === 1 && "border-l border-border",
            index > 0 && "sm:border-l sm:border-border",
            index >= 2 && "border-t border-border sm:border-t-0",
          )}
        >
          <dt className="text-[11px] text-muted-foreground">{stat.label}</dt>
          <dd className="flex items-baseline gap-1 tabular-nums">
            <span className="text-xl font-semibold tracking-tight">
              {stat.value}
            </span>
            {stat.unit ? (
              <span className="text-xs text-muted-foreground">{stat.unit}</span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
