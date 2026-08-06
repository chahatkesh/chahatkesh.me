"use client";

import { parseGymDate } from "~/lib/gym";
import { cn } from "~/lib/utils";
import type { GymWeekSummary } from "~/types/gym";
import { MiniWeekRings, weekToRingMetrics } from "./gym-rings";

interface GymWeekStripProps {
  weeks: GymWeekSummary[];
  weeklyGoal: number;
  weeklyDurationGoal: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

function weekLabel(week: GymWeekSummary): string {
  if (week.isCurrent) return "Now";
  const start = parseGymDate(week.start);
  return start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function GymWeekStrip({
  weeks,
  weeklyGoal,
  weeklyDurationGoal,
  selectedIndex,
  onSelect,
}: GymWeekStripProps) {
  return (
    <div
      className="grid w-full grid-cols-6 gap-x-1.5 gap-y-3.5 sm:w-[268px] sm:gap-x-2"
      role="listbox"
      aria-label="Last 12 weeks"
    >
      {weeks.map((week, index) => {
        const selected = index === selectedIndex;
        const label = weekLabel(week);
        const metrics = weekToRingMetrics(week, weeklyGoal, weeklyDurationGoal);
        const hasActivity =
          metrics.sessions > 0 || metrics.groups > 0 || metrics.durationMin > 0;

        return (
          <button
            key={week.start}
            type="button"
            role="option"
            aria-selected={selected}
            aria-label={`${label}: ${metrics.sessions} sessions, ${metrics.groups} groups, ${metrics.durationMin} min`}
            onClick={() => onSelect(index)}
            className={cn(
              "el-focus-styles flex flex-col items-center gap-1.5 rounded-sm py-0.5 transition-[opacity,transform] duration-200",
              selected
                ? "opacity-100"
                : hasActivity
                  ? "opacity-45 hover:opacity-75"
                  : "opacity-28 hover:opacity-50",
            )}
          >
            <MiniWeekRings metrics={metrics} active={selected || hasActivity} />
            <span
              className={cn(
                "max-w-full truncate text-[10px] leading-none sm:text-[11px]",
                selected
                  ? "font-medium text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
