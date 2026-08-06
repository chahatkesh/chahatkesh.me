"use client";

import {
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ActivityCalendar } from "react-activity-calendar";

import { useCalendarScroll } from "~/components/features/coding-activity/use-calendar-scroll";
import { GITHUB_CALENDAR_FONT_SIZE } from "~/constants";
import { GYM_ACTIVITY_COLORS, GYM_REST_DAY_COLOR } from "~/constants/gym";
import {
  addDays,
  classifyGymLevel,
  formatGymDate,
  parseGymDate,
} from "~/lib/gym";
import { cn } from "~/lib/utils";
import type { GymDaySummary, GymSummary } from "~/types/gym";
import { GymTooltip } from "./gym-tooltip";
import type { HoveredGymDay } from "./gym-tooltip";

const MOBILE_MAX_WIDTH = 640;
const MAX_BLOCK_SIZE = 18;
const FALLBACK_BLOCK_SIZE = 12;
const MAX_YEAR_FILTERS = 4;

const LAST_YEAR = "last" as const;
type Range = typeof LAST_YEAR | number;

interface CalendarDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface HeatmapView {
  calendarData: CalendarDay[];
  weeks: number;
  label: string;
  sessions: number;
  dayByDate: Map<string, GymDaySummary>;
  startIso: string;
  endIso: string;
}

function buildHeatmapView(summary: GymSummary, range: Range): HeatmapView {
  const dayByDate = new Map(summary.days.map((day) => [day.date, day]));
  const today = parseGymDate(formatGymDate(new Date()));
  const end = range === LAST_YEAR ? today : parseGymDate(`${range}-12-31`);
  const start =
    range === LAST_YEAR
      ? addDays(
          new Date(end.getFullYear() - 1, end.getMonth(), end.getDate()),
          1,
        )
      : parseGymDate(`${range}-01-01`);

  const startIso = formatGymDate(start);
  const endIso = formatGymDate(end);
  const calendarData: CalendarDay[] = [];
  let sessions = 0;

  for (
    let cursor = new Date(start);
    cursor <= end;
    cursor = addDays(cursor, 1)
  ) {
    const iso = formatGymDate(cursor);
    const day = dayByDate.get(iso);
    const isRestDay = Boolean(day?.isRestDay);
    const groups = isRestDay ? [] : (day?.groups ?? []);

    if (!isRestDay && groups.length > 0) sessions += 1;

    calendarData.push({
      date: iso,
      // Rest days need a non-zero count so the cell isn't treated as empty
      // by the calendar, then we paint them with the rest color in renderBlock.
      count: isRestDay ? 1 : groups.length,
      level: classifyGymLevel(groups.length, day?.durationMin ?? 0, isRestDay),
    });
  }

  return {
    calendarData,
    weeks: Math.ceil((start.getDay() + calendarData.length) / 7),
    label: range === LAST_YEAR ? "the last year" : String(range),
    sessions,
    dayByDate,
    startIso,
    endIso,
  };
}

interface GymHeatmapProps {
  summary: GymSummary;
}

export function GymHeatmap({ summary }: GymHeatmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [range, setRange] = useState<Range>(LAST_YEAR);
  const [hovered, setHovered] = useState<HoveredGymDay | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0]?.contentRect.width ?? 0);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const view = useMemo(
    () => buildHeatmapView(summary, range),
    [summary, range],
  );

  const isMobile = containerWidth > 0 && containerWidth < MOBILE_MAX_WIDTH;
  const blockMargin = isMobile ? 2 : 4;
  const minBlockSize = isMobile ? 11 : 8;

  const blockSize = useMemo(() => {
    if (containerWidth <= 0 || view.weeks <= 0) return FALLBACK_BLOCK_SIZE;
    const sizeToFill =
      (containerWidth - blockMargin * (view.weeks - 1)) / view.weeks;
    return Math.min(MAX_BLOCK_SIZE, Math.max(minBlockSize, sizeToFill));
  }, [containerWidth, view.weeks, blockMargin, minBlockSize]);

  // Scroll to "now" on mobile (same behavior as coding activity).
  useCalendarScroll({
    containerRef,
    view,
    range,
    isMobile,
    blockSize,
    blockMargin,
    latestDate: formatGymDate(new Date()),
  });

  const dismissTooltip = useCallback(() => setHovered(null), []);

  const renderBlock = useCallback(
    (block: React.ReactElement, activity: { date: string }) => {
      const day = view.dayByDate.get(activity.date);
      const isRestDay = Boolean(day?.isRestDay);
      const enter = (event: { currentTarget: EventTarget | null }) => {
        const target = event.currentTarget as SVGElement | null;
        if (!target) return;
        setHovered({
          date: activity.date,
          groups: day?.groups ?? [],
          durationMin: day?.durationMin ?? 0,
          volume: day?.volume ?? 0,
          isRestDay,
          rect: target.getBoundingClientRect(),
        });
      };

      return cloneElement(block, {
        "data-date": activity.date,
        "data-rest": isRestDay ? "true" : undefined,
        onMouseEnter: enter,
        onMouseLeave: dismissTooltip,
        onFocus: enter,
        onBlur: dismissTooltip,
        onTouchStart: enter,
        style: {
          cursor: "pointer",
          ...(isRestDay ? { fill: GYM_REST_DAY_COLOR } : null),
        },
        ...(isRestDay ? { fill: GYM_REST_DAY_COLOR } : null),
      } as React.SVGProps<SVGRectElement>);
    },
    [view.dayByDate, dismissTooltip],
  );

  const yearOptions = summary.availableYears.slice(0, MAX_YEAR_FILTERS);

  return (
    <div
      ref={containerRef}
      className={cn("w-full", isMobile && "overflow-x-hidden")}
      aria-label="Training activity graph"
    >
      <div className="mb-2 flex items-center justify-end gap-2 text-xs">
        <FilterButton
          label="1Y"
          active={range === LAST_YEAR}
          onClick={() => setRange(LAST_YEAR)}
        />
        {yearOptions.map((year) => (
          <FilterButton
            key={year}
            label={String(year)}
            active={range === year}
            onClick={() => setRange(year)}
          />
        ))}
      </div>

      <ActivityCalendar
        className="coding-activity-calendar"
        data={view.calendarData}
        colorScheme="dark"
        fontSize={GITHUB_CALENDAR_FONT_SIZE}
        blockSize={blockSize}
        blockMargin={blockMargin}
        showColorLegend={false}
        showTotalCount={false}
        theme={{ dark: [...GYM_ACTIVITY_COLORS] }}
        renderBlock={renderBlock}
      />

      <GymTooltip hovered={hovered} onDismiss={dismissTooltip} />

      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <p>
          <span className="font-semibold tabular-nums text-foreground">
            {view.sessions}
          </span>{" "}
          sessions in {view.label}
        </p>
        <p className="tabular-nums">
          Best streak{" "}
          <span className="font-semibold text-foreground">
            {summary.bestStreak}d
          </span>
        </p>
      </div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded px-1.5 py-0.5 tabular-nums transition-colors",
        active
          ? "font-semibold text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
