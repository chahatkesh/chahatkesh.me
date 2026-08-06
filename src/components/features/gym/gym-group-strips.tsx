"use client";

import { useCallback, useMemo, useState } from "react";

import {
  GYM_STRIP_DAYS,
  MUSCLE_GROUPS,
  MUSCLE_GROUP_COLORS,
  MUSCLE_GROUP_LABELS,
} from "~/constants/gym";
import type { MuscleGroup } from "~/constants/gym";
import { addDays, formatGymDate, parseGymDate } from "~/lib/gym";
import type { GymSummary } from "~/types/gym";
import { GymTooltip } from "./gym-tooltip";
import type { HoveredGymDay } from "./gym-tooltip";

const EMPTY_CELL_COLOR = "#1b1b1b";

interface StripDay {
  date: string;
  trained: boolean;
}

interface GroupStrip {
  group: MuscleGroup;
  days: StripDay[];
  count: number;
}

interface GymGroupStripsProps {
  summary: GymSummary;
}

export function GymGroupStrips({ summary }: GymGroupStripsProps) {
  const [hovered, setHovered] = useState<HoveredGymDay | null>(null);

  const { strips, dayByDate } = useMemo(() => {
    const byDate = new Map(summary.days.map((day) => [day.date, day]));
    const today = parseGymDate(formatGymDate(new Date()));
    const window: string[] = [];

    for (let offset = GYM_STRIP_DAYS - 1; offset >= 0; offset -= 1) {
      window.push(formatGymDate(addDays(today, -offset)));
    }

    const built: GroupStrip[] = MUSCLE_GROUPS.map((group) => {
      const days = window.map((date) => ({
        date,
        trained: Boolean(byDate.get(date)?.groups.includes(group)),
      }));
      return {
        group,
        days,
        count: days.filter((day) => day.trained).length,
      };
    }).sort((a, b) => b.count - a.count || a.group.localeCompare(b.group));

    return { strips: built, dayByDate: byDate };
  }, [summary.days]);

  const dismissTooltip = useCallback(() => setHovered(null), []);

  const handleEnter = useCallback(
    (event: React.SyntheticEvent<HTMLDivElement>, date: string) => {
      const day = dayByDate.get(date);
      setHovered({
        date,
        groups: day?.groups ?? [],
        durationMin: day?.durationMin ?? 0,
        volume: day?.volume ?? 0,
        rect: event.currentTarget.getBoundingClientRect(),
      });
    },
    [dayByDate],
  );

  return (
    <div className="space-y-6">
      {strips.map((strip) => {
        const color = MUSCLE_GROUP_COLORS[strip.group];
        const label = MUSCLE_GROUP_LABELS[strip.group];

        return (
          <div
            key={strip.group}
            aria-label={`${label} over the last ${GYM_STRIP_DAYS} days`}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold tracking-tight">{label}</h3>
              <span className="text-sm tabular-nums text-muted-foreground">
                {strip.count}/{GYM_STRIP_DAYS} days
              </span>
            </div>

            <div className="flex h-10 items-stretch gap-px sm:gap-0.5">
              {strip.days.map((day) => (
                <div
                  key={day.date}
                  role="presentation"
                  tabIndex={0}
                  aria-label={`${label} on ${day.date}`}
                  className="min-w-0 flex-1 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  style={{
                    backgroundColor: day.trained ? color : EMPTY_CELL_COLOR,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(event) => handleEnter(event, day.date)}
                  onMouseLeave={dismissTooltip}
                  onFocus={(event) => handleEnter(event, day.date)}
                  onBlur={dismissTooltip}
                  onTouchStart={(event) => handleEnter(event, day.date)}
                />
              ))}
            </div>
          </div>
        );
      })}

      <GymTooltip hovered={hovered} onDismiss={dismissTooltip} />
    </div>
  );
}
