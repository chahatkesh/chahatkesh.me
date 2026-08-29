"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import { ActivityCalendar } from "react-activity-calendar";
import { Skeleton } from "~/components/ui";
import {
  API_ROUTES,
  LEETCODE_STALE_TIME_MS,
  GITHUB_CALENDAR_FONT_SIZE,
} from "~/constants";
import { GITHUB_CONTRIBUTION_COLORS } from "~/constants/brand";
import { cn } from "~/lib/utils";
import { fetcher } from "~/lib/fetcher";
import config from "~/config";

import type { CodingActivityData, ActivityRange, HoveredDay } from "./types";
import { LAST_YEAR } from "./types";
import {
  MOBILE_MAX_WIDTH,
  BLOCK_MARGIN_DESKTOP,
  BLOCK_MARGIN_MOBILE,
  MIN_BLOCK_SIZE_DESKTOP,
  MIN_BLOCK_SIZE_MOBILE,
  MAX_BLOCK_SIZE,
  FALLBACK_BLOCK_SIZE,
  MAX_YEAR_FILTERS,
  GITHUB_ACCENT,
  LEETCODE_ACCENT,
} from "./constants";
import { buildActivityView, parseIsoDateList } from "./lib";
import { useCalendarScroll } from "./use-calendar-scroll";
import { createRenderBlock } from "./activity-cell";
import { ActivityTooltip } from "./activity-tooltip";

const GITHUB_PROFILE_URL = config.social.github;
const LEETCODE_PROFILE_URL = `https://leetcode.com/u/${config.author.leetcode}`;
const ZERO_CONTRIBUTION_DATES = parseIsoDateList(
  process.env.NEXT_PUBLIC_CODING_ACTIVITY_ZERO_DATES,
);

const CodingActivity = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [range, setRange] = useState<ActivityRange>(LAST_YEAR);
  const [hovered, setHovered] = useState<HoveredDay>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      setContainerWidth(entries[0]?.contentRect.width ?? 0);
    });
    resizeObserver.observe(element);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          intersectionObserver.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    intersectionObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  const { data, isLoading } = useQuery<CodingActivityData>({
    queryKey: ["coding-activity"],
    queryFn: () => fetcher<CodingActivityData>(API_ROUTES.CODING_ACTIVITY),
    staleTime: LEETCODE_STALE_TIME_MS,
    enabled: isVisible,
  });

  const view = useMemo(() => {
    if (!data) return null;
    return buildActivityView(data, range, ZERO_CONTRIBUTION_DATES);
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
    const sizeToFill =
      (containerWidth - blockMargin * (view.weeks - 1)) / view.weeks;
    return Math.min(MAX_BLOCK_SIZE, Math.max(minBlockSize, sizeToFill));
  }, [view, containerWidth, blockMargin, minBlockSize]);

  useCalendarScroll({
    containerRef,
    view,
    range,
    isMobile,
    blockSize,
    blockMargin,
    latestDate: data?.latestDate,
  });

  const dismissTooltip = useCallback(() => setHovered(null), []);

  const renderBlock = useMemo(() => {
    if (!view) return undefined;
    return createRenderBlock(view, setHovered);
  }, [view]);

  const yearOptions = (data?.availableYears ?? []).slice(0, MAX_YEAR_FILTERS);

  return (
    <div
      ref={containerRef}
      className={cn("w-full", isMobile && "overflow-x-hidden")}
      aria-label="Coding activity graph"
    >
      {!data || isLoading || !view ? (
        <CodingActivitySkeleton />
      ) : data.availableYears.length === 0 ? null : (
        <>
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
            className="coding-activity-calendar"
            data={view.calendarData}
            colorScheme="dark"
            fontSize={GITHUB_CALENDAR_FONT_SIZE}
            blockSize={blockSize}
            blockMargin={blockMargin}
            showColorLegend={false}
            showTotalCount={false}
            theme={{ dark: [...GITHUB_CONTRIBUTION_COLORS] }}
            renderBlock={renderBlock}
          />

          <ActivityTooltip hovered={hovered} onDismiss={dismissTooltip} />

          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
            <span>
              <span className="font-semibold text-foreground tabular-nums">
                {(view.githubTotal + view.leetcodeTotal).toLocaleString()}
              </span>{" "}
              contributions in {view.label}
            </span>

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

function CodingActivitySkeleton() {
  return (
    <div aria-busy="true">
      <div className="mb-2 flex items-center justify-end gap-2">
        <Skeleton className="h-5 w-8" />
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
      </div>
      <Skeleton className="h-[112px] w-full rounded-md" />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <Skeleton className="h-3 w-40" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-3 w-14" />
        </div>
      </div>
    </div>
  );
}

export default CodingActivity;
