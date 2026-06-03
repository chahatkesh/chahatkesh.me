"use client";

import { useState, useEffect, useMemo, useRef, cloneElement } from "react";
import { FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import { ActivityCalendar } from "react-activity-calendar";
import {
  API_ROUTES,
  LEETCODE_STALE_TIME_MS,
  GITHUB_CALENDAR_FONT_SIZE,
} from "~/constants";
import {
  GITHUB_CONTRIBUTION_COLORS,
  LEETCODE_CALENDAR_COLORS,
} from "~/constants/brand";
import { cn } from "~/lib/utils";
import { fetcher } from "~/lib/fetcher";
import config from "~/config";
import { type CodingActivityData } from "~/app/api/coding-activity/route";

const GITHUB_PROFILE_URL = config.social.github;
const LEETCODE_PROFILE_URL = `https://leetcode.com/u/${config.author.leetcode}`;

/** Which source drove a day's activity, used to pick the cell color. */
type DominantSource = "github" | "leetcode" | "none";

/** Default range: the trailing 12 months rather than a fixed calendar year. */
const LAST_YEAR = "last" as const;
type ActivityRange = typeof LAST_YEAR | number;

const EMPTY_CELL_COLOR = GITHUB_CONTRIBUTION_COLORS[0];
/** Most intense color of each palette, used to tint the source logos. */
const GITHUB_ACCENT = GITHUB_CONTRIBUTION_COLORS[4];
const LEETCODE_ACCENT = LEETCODE_CALENDAR_COLORS[4];

// Block sizing: blocks grow to fill the container width, within these bounds.
// Mobile uses a tighter gap and a larger minimum so cells stay legible.
const MOBILE_MAX_WIDTH = 640;
const BLOCK_MARGIN_DESKTOP = 4;
const BLOCK_MARGIN_MOBILE = 2;
const MIN_BLOCK_SIZE_DESKTOP = 8;
const MIN_BLOCK_SIZE_MOBILE = 11;
const MAX_BLOCK_SIZE = 18;
const FALLBACK_BLOCK_SIZE = 12;
/** How many calendar-year buttons to show alongside the "1Y" default. */
const MAX_YEAR_FILTERS = 4;

/** Parses a `YYYY-MM-DD` string into a local Date (matches the calendar lib). */
function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** Formats a local Date as a `YYYY-MM-DD` string. */
function formatIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Maps a daily count to a 0-4 heatmap level relative to the busiest day. */
function classifyIntensityLevel(
  count: number,
  busiestDayCount: number,
): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (busiestDayCount <= 0) return 1;
  const ratio = count / busiestDayCount;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

const CodingActivity = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [range, setRange] = useState<ActivityRange>(LAST_YEAR);

  // Track the container width so blocks can be sized to fill it.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0]?.contentRect.width ?? 0);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { data, isLoading } = useQuery<CodingActivityData>({
    queryKey: ["coding-activity"],
    queryFn: () => fetcher<CodingActivityData>(API_ROUTES.CODING_ACTIVITY),
    staleTime: LEETCODE_STALE_TIME_MS,
  });

  // Build the calendar for the selected range, including per-source totals,
  // the dominant-source lookup, and the number of week columns.
  const view = useMemo(() => {
    if (!data) return null;

    let startIso: string;
    let endIso: string;
    let label: string;

    if (range === LAST_YEAR) {
      // Rolling view: trailing 12 months, capped at today (no future cells).
      const start = parseIsoDate(data.latestDate);
      start.setFullYear(start.getFullYear() - 1);
      start.setDate(start.getDate() + 1);
      startIso = formatIsoDate(start);
      endIso = data.latestDate;
      label = "the last year";
    } else {
      // Calendar-year view: always the full Jan-Dec span. For the current year
      // the remaining days render as blank (zero-activity) cells.
      startIso = `${range}-01-01`;
      endIso = `${range}-12-31`;
      label = String(range);
    }

    const perDay: Array<{ date: string; github: number; leetcode: number }> =
      [];
    let githubTotal = 0;
    let leetcodeTotal = 0;
    let busiestDayCount = 0;

    const cursor = parseIsoDate(startIso);
    const end = parseIsoDate(endIso);
    while (cursor <= end) {
      const date = formatIsoDate(cursor);
      const github = data.githubCountByDate[date] ?? 0;
      const leetcode = data.leetcodeCountByDate[date] ?? 0;
      githubTotal += github;
      leetcodeTotal += leetcode;
      busiestDayCount = Math.max(busiestDayCount, github + leetcode);
      perDay.push({ date, github, leetcode });
      cursor.setDate(cursor.getDate() + 1);
    }

    const calendarData = perDay.map(({ date, github, leetcode }) => ({
      date,
      count: github + leetcode,
      level: classifyIntensityLevel(github + leetcode, busiestDayCount),
    }));

    const dominantSourceByDate = new Map<string, DominantSource>();
    for (const { date, github, leetcode } of perDay) {
      dominantSourceByDate.set(
        date,
        github + leetcode === 0
          ? "none"
          : github >= leetcode
            ? "github"
            : "leetcode",
      );
    }

    // Week columns: the calendar left-pads the first week to the start weekday.
    const weeks = Math.ceil(
      (parseIsoDate(startIso).getDay() + perDay.length) / 7,
    );

    return {
      calendarData,
      dominantSourceByDate,
      githubTotal,
      leetcodeTotal,
      weeks,
      label,
    };
  }, [data, range]);

  const isMobile = containerWidth > 0 && containerWidth < MOBILE_MAX_WIDTH;
  const blockMargin = isMobile ? BLOCK_MARGIN_MOBILE : BLOCK_MARGIN_DESKTOP;
  const minBlockSize = isMobile
    ? MIN_BLOCK_SIZE_MOBILE
    : MIN_BLOCK_SIZE_DESKTOP;

  const blockSize = useMemo(() => {
    if (!view || containerWidth <= 0 || view.weeks <= 0) {
      return FALLBACK_BLOCK_SIZE;
    }
    // Keep fractional so the cells fill the container width exactly; flooring
    // would leave up to ~1px per week unused, visible as a gap on the right.
    const sizeToFill =
      (containerWidth - blockMargin * (view.weeks - 1)) / view.weeks;
    return Math.min(MAX_BLOCK_SIZE, Math.max(minBlockSize, sizeToFill));
  }, [view, containerWidth, blockMargin, minBlockSize]);

  const yearOptions = (data?.availableYears ?? []).slice(0, MAX_YEAR_FILTERS);

  return (
    <div
      ref={containerRef}
      className="w-full"
      aria-label="Coding activity graph"
    >
      {!data || isLoading || !view ? (
        <div className="h-32 animate-pulse bg-muted/50 rounded-lg" />
      ) : data.availableYears.length === 0 ? null : (
        <>
          {/* Minimal year filter */}
          <div className="flex items-center justify-end gap-2 mb-2 text-xs">
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
            data={view.calendarData}
            colorScheme="dark"
            fontSize={GITHUB_CALENDAR_FONT_SIZE}
            blockSize={blockSize}
            blockMargin={blockMargin}
            showColorLegend={false}
            showTotalCount={false}
            theme={{ dark: [...GITHUB_CONTRIBUTION_COLORS] }}
            renderBlock={(block, activity) => {
              const source =
                view.dominantSourceByDate.get(activity.date) ?? "none";
              const palette =
                source === "leetcode"
                  ? LEETCODE_CALENDAR_COLORS
                  : GITHUB_CONTRIBUTION_COLORS;
              const fill =
                activity.level > 0 ? palette[activity.level] : EMPTY_CELL_COLOR;
              return cloneElement(block, { fill });
            }}
          />

          <div className="flex items-center justify-between gap-3 mt-2 text-xs text-muted-foreground">
            {/* Left: total contributions for the selected range */}
            <span>
              <span className="font-semibold text-foreground tabular-nums">
                {(view.githubTotal + view.leetcodeTotal).toLocaleString()}
              </span>{" "}
              contributions in {view.label}
            </span>

            {/* Right: per-source breakdown with logos, linking to profiles */}
            <div className="flex items-center gap-3">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <FaGithub
                  className="size-3.5"
                  style={{ color: GITHUB_ACCENT }}
                />
                <span className="tabular-nums">
                  {view.githubTotal.toLocaleString()}
                </span>
              </a>
              <a
                href={LEETCODE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode profile"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <SiLeetcode
                  className="size-3.5"
                  style={{ color: LEETCODE_ACCENT }}
                />
                <span className="tabular-nums">
                  {view.leetcodeTotal.toLocaleString()}
                </span>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const FilterButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
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

export default CodingActivity;
