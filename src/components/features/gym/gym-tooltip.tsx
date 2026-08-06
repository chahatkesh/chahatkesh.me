"use client";

import { useEffect } from "react";

import {
  MUSCLE_GROUP_COLORS,
  MUSCLE_GROUP_LABELS,
  WEIGHT_UNIT,
} from "~/constants/gym";
import type { MuscleGroup } from "~/constants/gym";
import { formatGymDate, parseGymDate } from "~/lib/gym";

const TOOLTIP_GAP = 10;
const VIEWPORT_PADDING = 8;
const ESTIMATED_HALF_WIDTH = 90;
const MAX_ARROW_OFFSET = 60;

export interface HoveredGymDay {
  date: string;
  groups: MuscleGroup[];
  durationMin: number;
  volume: number;
  isRestDay?: boolean;
  rect: DOMRect;
}

interface GymTooltipProps {
  hovered: HoveredGymDay | null;
  onDismiss: () => void;
}

export function GymTooltip({ hovered, onDismiss }: GymTooltipProps) {
  useEffect(() => {
    if (!hovered) return;
    document.addEventListener("pointerdown", onDismiss, { passive: true });
    return () => document.removeEventListener("pointerdown", onDismiss);
  }, [hovered, onDismiss]);

  if (!hovered) return null;

  const { rect } = hovered;
  const targetCenter = rect.left + rect.width / 2;
  const top = rect.top - TOOLTIP_GAP;

  const minLeft = VIEWPORT_PADDING + ESTIMATED_HALF_WIDTH;
  const maxLeft = window.innerWidth - VIEWPORT_PADDING - ESTIMATED_HALF_WIDTH;
  const left = Math.max(minLeft, Math.min(maxLeft, targetCenter));

  const arrowOffset = Math.max(
    -MAX_ARROW_OFFSET,
    Math.min(MAX_ARROW_OFFSET, targetCenter - left),
  );

  const formattedDate = parseGymDate(hovered.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const todayIso = formatGymDate(new Date());
  const isFuture = hovered.date > todayIso;
  const isRestDay = Boolean(hovered.isRestDay);
  const hasTraining = !isRestDay && hovered.groups.length > 0;

  return (
    <div
      role="tooltip"
      className="pointer-events-none fixed z-50 w-max max-w-[240px] animate-in fade-in-0 zoom-in-95"
      style={{ left, top, transform: "translate(-50%, -100%)" }}
    >
      <div className="relative rounded-lg border border-border/70 bg-popover px-3 py-2 text-[11px] leading-snug text-popover-foreground shadow-[0_10px_28px_-14px_rgba(0,0,0,0.75)]">
        <p className="font-medium tracking-tight text-foreground">
          {formattedDate}
        </p>

        {isRestDay ? (
          <p className="mt-1 text-muted-foreground">Rest Day</p>
        ) : hasTraining ? (
          <>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {hovered.groups.map((group) => (
                <span
                  key={group}
                  className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                  style={{
                    backgroundColor: `${MUSCLE_GROUP_COLORS[group]}26`,
                    color: MUSCLE_GROUP_COLORS[group],
                  }}
                >
                  {MUSCLE_GROUP_LABELS[group]}
                </span>
              ))}
            </div>
            <p className="mt-1.5 tabular-nums text-muted-foreground">
              {[
                hovered.durationMin ? `${hovered.durationMin} min` : null,
                hovered.volume
                  ? `${hovered.volume.toLocaleString()} ${WEIGHT_UNIT}`
                  : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </>
        ) : (
          <p className="mt-1 text-muted-foreground">
            {isFuture ? "Upcoming" : "Missed"}
          </p>
        )}

        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 -mb-1 size-2 rounded-[1px] border-b border-r border-border/70 bg-popover"
          style={{
            left: `calc(50% + ${arrowOffset}px)`,
            transform: "translateX(-50%) rotate(45deg)",
          }}
        />
      </div>
    </div>
  );
}
