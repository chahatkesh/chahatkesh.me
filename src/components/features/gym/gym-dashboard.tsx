"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { API_ROUTES } from "~/constants";
import { WEIGHT_UNIT } from "~/constants/gym";
import { fetcher } from "~/lib/fetcher";
import { formatTrainingTimeParts } from "~/lib/gym";
import { cn } from "~/lib/utils";
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
    return (
      <div className="space-y-8" aria-hidden>
        <div className="h-56 animate-pulse rounded-lg bg-muted/50" />
        <div className="h-40 animate-pulse rounded-lg bg-muted/50" />
        <div className="h-64 animate-pulse rounded-lg bg-muted/50" />
      </div>
    );
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

function GymStats({ summary }: { summary: GymSummary }) {
  const time = formatTrainingTimeParts(summary.totalDurationMin);
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
      label: "Total time",
      value: time.value,
      unit: time.unit,
      secondary: time.secondary,
    },
    {
      label: "Total volume",
      value: Math.round(summary.totalVolume).toLocaleString(),
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
            {"secondary" in stat && stat.secondary ? (
              <>
                <span className="text-xl font-semibold tracking-tight">
                  {stat.secondary.value}
                </span>
                <span className="text-xs text-muted-foreground">
                  {stat.secondary.unit}
                </span>
              </>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
