"use client";

import { motion } from "framer-motion";

import { MUSCLE_GROUPS } from "~/constants/gym";
import type { GymWeekSummary } from "~/types/gym";

/** ViewBox size — rendered at a fixed CSS size. */
const VIEW = 180;
const CENTER = VIEW / 2;
const STROKE = 13.5;
const GAP = 4.75;
const RING_PX = 156;

export const RING_COLORS = {
  sessions: "#00d3d9",
  groups: "#845ef7",
  time: "#f2b84b",
} as const;

export interface WeekRingMetrics {
  sessions: number;
  groups: number;
  durationMin: number;
  weeklyGoal: number;
  weeklyDurationGoal: number;
}

export interface RingValue {
  key: keyof typeof RING_COLORS;
  label: string;
  color: string;
  progress: number;
  caption: string;
}

export function weekToRingMetrics(
  week: GymWeekSummary,
  weeklyGoal: number,
  weeklyDurationGoal: number,
): WeekRingMetrics {
  return {
    sessions: week.sessions,
    groups: week.groups.length,
    durationMin: week.durationMin,
    weeklyGoal,
    weeklyDurationGoal,
  };
}

export function buildRingValues(metrics: WeekRingMetrics): RingValue[] {
  const move = metrics.weeklyGoal ? metrics.sessions / metrics.weeklyGoal : 0;
  const coverage = metrics.groups / MUSCLE_GROUPS.length;
  const load = metrics.weeklyDurationGoal
    ? metrics.durationMin / metrics.weeklyDurationGoal
    : 0;

  return [
    {
      key: "sessions",
      label: "Sessions",
      color: RING_COLORS.sessions,
      progress: move,
      caption: `${metrics.sessions}/${metrics.weeklyGoal}`,
    },
    {
      key: "groups",
      label: "Groups",
      color: RING_COLORS.groups,
      progress: coverage,
      caption: `${metrics.groups}/${MUSCLE_GROUPS.length}`,
    },
    {
      key: "time",
      label: "Time",
      color: RING_COLORS.time,
      progress: load,
      caption: `${metrics.durationMin}/${metrics.weeklyDurationGoal}m`,
    },
  ];
}

function Ring({
  radius,
  color,
  progress,
  delay,
}: {
  radius: number;
  color: string;
  progress: number;
  delay: number;
}) {
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(progress, 1);
  const dash = clamped * circumference;

  return (
    <>
      <circle
        cx={CENTER}
        cy={CENTER}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={STROKE}
        strokeOpacity={0.14}
      />
      {dash > 0 ? (
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${dash} ${circumference - dash}` }}
          transition={{ duration: 0.9, delay, ease: [0.4, 0, 0.2, 1] }}
        />
      ) : null}
    </>
  );
}

interface GymRingsProps {
  metrics: WeekRingMetrics;
  /** Remount key so rings re-animate when the selected week changes. */
  animateKey?: string | number;
}

export function GymRings({ metrics, animateKey }: GymRingsProps) {
  const values = buildRingValues(metrics);

  return (
    <div className="flex items-center gap-5 sm:gap-6">
      <svg
        key={animateKey}
        width={RING_PX}
        height={RING_PX}
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="shrink-0 -rotate-90"
        role="img"
        aria-label={`Week rings: ${values.map((v) => `${v.label} ${v.caption}`).join(", ")}`}
      >
        {values.map((value, index) => (
          <Ring
            key={value.key}
            radius={CENTER - STROKE / 2 - index * (STROKE + GAP)}
            color={value.color}
            progress={value.progress}
            delay={index * 0.1}
          />
        ))}
      </svg>

      <dl className="flex min-w-0 flex-col gap-2.5">
        {values.map((value) => (
          <div key={value.key} className="flex items-baseline gap-2.5">
            <span
              aria-hidden
              className="mt-1.5 size-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: value.color }}
            />
            <dt className="w-[4.5rem] shrink-0 text-[13px] text-muted-foreground">
              {value.label}
            </dt>
            <dd className="text-sm font-medium tabular-nums tracking-tight text-foreground">
              {value.caption}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Compact triple-ring glyph used in the week history grid. */
export function MiniWeekRings({
  metrics,
  size = 34,
  active = true,
}: {
  metrics: WeekRingMetrics;
  size?: number;
  /** When false, tracks render quieter (empty / inactive weeks). */
  active?: boolean;
}) {
  const values = buildRingValues(metrics);
  const stroke = 3;
  const gap = 1.1;
  const center = size / 2;
  const hasProgress = values.some((value) => value.progress > 0);
  const trackOpacity = !active || !hasProgress ? 0.08 : 0.14;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90"
      aria-hidden
    >
      {values.map((value, index) => {
        const radius = center - stroke / 2 - index * (stroke + gap);
        const circumference = 2 * Math.PI * radius;
        const clamped = Math.min(value.progress, 1);
        const dash = clamped * circumference;

        return (
          <g key={value.key}>
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={hasProgress ? value.color : "currentColor"}
              strokeWidth={stroke}
              strokeOpacity={hasProgress ? trackOpacity : 0.12}
              className={hasProgress ? undefined : "text-muted-foreground"}
            />
            {dash > 0 ? (
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={value.color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference - dash}`}
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
