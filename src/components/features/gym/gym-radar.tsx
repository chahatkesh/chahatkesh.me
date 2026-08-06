"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { BRAND_ACCENT_HEX } from "~/constants/brand";
import {
  MUSCLE_GROUPS,
  MUSCLE_GROUP_COLORS,
  MUSCLE_GROUP_LABELS,
} from "~/constants/gym";
import type { MuscleGroup } from "~/constants/gym";
import { addDays, formatGymDate, parseGymDate } from "~/lib/gym";
import { cn } from "~/lib/utils";
import type { GymSummary } from "~/types/gym";

const SIZE = 300;
const CENTER = SIZE / 2;
const RADIUS = 96;
const LABEL_RADIUS = RADIUS + 30;
const RING_STEPS = [0.25, 0.5, 0.75, 1];

const WINDOWS = [
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "1Y", days: 365 },
] as const;

type Metric = "frequency" | "exercises" | "volume";

interface GroupValue {
  group: MuscleGroup;
  /** Index in MUSCLE_GROUPS — keeps radar axis order stable. */
  axisIndex: number;
  value: number;
}

function groupMetricValue(
  metric: Metric,
  group: MuscleGroup,
  trainingDays: GymSummary["days"],
): number {
  if (metric === "frequency") {
    return trainingDays.filter((day) => day.groups.includes(group)).length;
  }
  if (metric === "exercises") {
    return trainingDays.reduce(
      (sum, day) => sum + (day.groupExerciseCount?.[group] ?? 0),
      0,
    );
  }
  return trainingDays.reduce(
    (sum, day) => sum + (day.groupVolume[group] ?? 0),
    0,
  );
}

/** Axis angles start at 12 o'clock and step clockwise. */
function axisPoint(index: number, distance: number) {
  const angle = (Math.PI * 2 * index) / MUSCLE_GROUPS.length - Math.PI / 2;
  return {
    x: CENTER + Math.cos(angle) * distance,
    y: CENTER + Math.sin(angle) * distance,
  };
}

function polygonPoints(values: number[], scale: number): string {
  return values
    .map((value, index) => {
      const point = axisPoint(index, RADIUS * (scale > 0 ? value / scale : 0));
      return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
    })
    .join(" ");
}

interface GymRadarProps {
  summary: GymSummary;
}

export function GymRadar({ summary }: GymRadarProps) {
  const [windowDays, setWindowDays] = useState<number>(90);
  const [metric, setMetric] = useState<Metric>("frequency");

  const { axisValues, ranked, scale } = useMemo(() => {
    const today = parseGymDate(formatGymDate(new Date()));
    const start = formatGymDate(addDays(today, -(windowDays - 1)));
    const windowDaysList = summary.days.filter((day) => day.date >= start);
    const trainingDays = windowDaysList.filter(
      (day) => !day.isRestDay && day.groups.length > 0,
    );

    const groups: GroupValue[] = MUSCLE_GROUPS.map((group, axisIndex) => ({
      group,
      axisIndex,
      value: groupMetricValue(metric, group, trainingDays),
    }));

    const axisValues = groups.map((item) => item.value);
    const ranked = [...groups].sort(
      (a, b) => b.value - a.value || a.group.localeCompare(b.group),
    );

    return {
      axisValues,
      ranked,
      scale: Math.max(...axisValues, 1),
    };
  }, [summary.days, windowDays, metric]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-xs">
          {(
            [
              { id: "frequency", label: "Frequency" },
              { id: "exercises", label: "Exercises" },
              { id: "volume", label: "Volume" },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setMetric(option.id)}
              className={cn(
                "rounded px-1.5 py-0.5 transition-colors",
                metric === option.id
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 text-xs">
          {WINDOWS.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setWindowDays(option.days)}
              className={cn(
                "rounded px-1.5 py-0.5 tabular-nums transition-colors",
                windowDays === option.days
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="w-full max-w-[280px] shrink-0 sm:max-w-[300px]"
          role="img"
          aria-label={`Muscle group ${metric} over the last ${windowDays} days`}
        >
          {RING_STEPS.map((step) => (
            <polygon
              key={step}
              points={MUSCLE_GROUPS.map((_, index) => {
                const point = axisPoint(index, RADIUS * step);
                return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
              }).join(" ")}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth={1}
            />
          ))}

          {MUSCLE_GROUPS.map((group, index) => {
            const outer = axisPoint(index, RADIUS);
            return (
              <line
                key={group}
                x1={CENTER}
                y1={CENTER}
                x2={outer.x}
                y2={outer.y}
                stroke="hsl(var(--border))"
                strokeWidth={1}
              />
            );
          })}

          <motion.polygon
            points={polygonPoints(axisValues, scale)}
            fill={`${BRAND_ACCENT_HEX}33`}
            stroke={BRAND_ACCENT_HEX}
            strokeWidth={2}
            strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          />

          {MUSCLE_GROUPS.map((group, index) => {
            const point = axisPoint(
              index,
              RADIUS * (scale > 0 ? axisValues[index] / scale : 0),
            );
            return (
              <circle
                key={group}
                cx={point.x}
                cy={point.y}
                r={4}
                fill={MUSCLE_GROUP_COLORS[group]}
                stroke="hsl(var(--background))"
                strokeWidth={1.5}
              />
            );
          })}

          {MUSCLE_GROUPS.map((group, index) => {
            const point = axisPoint(index, LABEL_RADIUS);
            return (
              <text
                key={group}
                x={point.x}
                y={point.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10}
                fill={MUSCLE_GROUP_COLORS[group]}
              >
                {MUSCLE_GROUP_LABELS[group]}
              </text>
            );
          })}
        </svg>

        <dl className="w-full max-w-[220px] space-y-2.5 sm:shrink-0">
          {ranked.map((item) => (
            <div
              key={item.group}
              className={cn(
                "flex items-center gap-2.5 text-sm",
                item.value === 0 && "opacity-45",
              )}
            >
              <span
                aria-hidden
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: MUSCLE_GROUP_COLORS[item.group] }}
              />
              <dt className="min-w-0 flex-1 truncate text-muted-foreground">
                {MUSCLE_GROUP_LABELS[item.group]}
              </dt>
              <dd className="shrink-0 font-medium tabular-nums text-foreground">
                {metric === "volume"
                  ? Math.round(item.value).toLocaleString()
                  : item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
