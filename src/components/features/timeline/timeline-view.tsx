"use client";

import { useEffect, useMemo, useRef } from "react";
import { LocateFixed } from "lucide-react";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui";
import { cn } from "~/lib/utils";
import {
  TIMELINE_AXIS_PAD_TOP,
  TIMELINE_KIND_META,
  TIMELINE_KINDS,
  TIMELINE_LANE_PAD_Y,
  TIMELINE_TRACK_HEIGHT,
  cssPercent,
  formatTimelineDate,
  getMonthKeys,
  getTimelineBounds,
  packLaneMarks,
  parseISODate,
  positionOf,
  timelineLaneHeight,
  type PackedLaneMark,
  type UnifiedTimelineItem,
} from "~/lib/timeline-utils";

const PX_PER_DAY = 3.6;
const LANE_LABEL_WIDTH = 72;

type TimelineViewProps = {
  items: UnifiedTimelineItem[];
  now: string;
  authorName: string;
  authorUrl?: string;
};

export function TimelineView({
  items,
  now: nowIso,
  authorName,
  authorUrl = "/",
}: TimelineViewProps) {
  const now = useMemo(() => parseISODate(nowIso), [nowIso]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const bounds = useMemo(() => getTimelineBounds(items, now), [items, now]);
  const months = useMemo(() => getMonthKeys(items, now), [items, now]);
  const canvasWidth = useMemo(() => {
    const days = Math.max(
      1,
      (bounds.end.getTime() - bounds.start.getTime()) / 86_400_000,
    );
    return Math.round(days * PX_PER_DAY);
  }, [bounds]);

  const nowLeft = positionOf(now, bounds.start, bounds.end);
  const packedLanes = useMemo(
    () =>
      TIMELINE_KINDS.map((kind) => {
        const packed = packLaneMarks(
          items.filter((item) => item.kind === kind),
          bounds.start,
          bounds.end,
          now,
          canvasWidth,
        );
        return {
          kind,
          ...packed,
          height: timelineLaneHeight(packed.trackCount),
        };
      }),
    [bounds.end, bounds.start, canvasWidth, items, now],
  );
  const stackHeight = packedLanes.reduce((sum, lane) => sum + lane.height, 0);
  const frameHeight = stackHeight + TIMELINE_AXIS_PAD_TOP;

  const scrollToNow = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const nowX = (nowLeft / 100) * canvasWidth + LANE_LABEL_WIDTH;
    el.scrollTo({
      left: Math.max(0, nowX - el.clientWidth * 0.7),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const nowX = (nowLeft / 100) * canvasWidth + LANE_LABEL_WIDTH;
    el.scrollLeft = Math.max(0, nowX - el.clientWidth * 0.7);
  }, [canvasWidth, nowLeft]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <TooltipProvider delayDuration={120} skipDelayDuration={80}>
      <div className="relative h-dvh w-full overflow-hidden">
        <div
          ref={scrollerRef}
          className="h-full w-full overflow-x-auto overflow-y-hidden scrollbar-hide"
        >
          <div
            className="flex h-full min-w-full items-center"
            style={{ width: canvasWidth + LANE_LABEL_WIDTH }}
          >
            <div
              className="sticky left-0 z-20 flex shrink-0 flex-col justify-end bg-gradient-to-r from-background via-background/90 to-transparent pr-3"
              style={{
                width: LANE_LABEL_WIDTH,
                height: frameHeight,
                paddingTop: TIMELINE_AXIS_PAD_TOP,
              }}
            >
              {packedLanes.map((lane) => {
                const meta = TIMELINE_KIND_META[lane.kind];
                const empty = lane.marks.length === 0;
                return (
                  <div
                    key={lane.kind}
                    className="flex items-center"
                    style={{ height: lane.height }}
                  >
                    <span
                      className={cn(
                        "text-[10px] uppercase tracking-[0.16em]",
                        empty ? "text-muted-foreground/30" : meta.text,
                      )}
                    >
                      {meta.shortLabel}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              className="relative"
              style={{
                width: canvasWidth,
                height: frameHeight,
                paddingTop: TIMELINE_AXIS_PAD_TOP,
              }}
            >
              <Axis
                months={months}
                rangeStart={bounds.start}
                rangeEnd={bounds.end}
              />

              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 z-10 w-px bg-ring"
                style={{
                  left: cssPercent(nowLeft),
                  top: TIMELINE_AXIS_PAD_TOP,
                }}
              >
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.18em] text-ring">
                  now
                </span>
              </div>

              <div className="relative">
                {packedLanes.map((lane) => {
                  const meta = TIMELINE_KIND_META[lane.kind];

                  return (
                    <div
                      key={lane.kind}
                      className={cn(
                        "relative",
                        lane.marks.length > 0 && meta.wash,
                      )}
                      style={{ height: lane.height }}
                    >
                      <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border/50" />
                      {lane.marks.map((mark) => (
                        <LaneMark key={mark.item.id} mark={mark} />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-background/95 via-background/65 to-transparent" />

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-30 w-[min(90vw,40rem)] -translate-x-1/2 text-center sm:bottom-4">
          <h2 className="truncate text-sm font-semibold text-foreground sm:text-base">
            The Record
          </h2>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            by{" "}
            <a
              href={authorUrl}
              className="pointer-events-auto text-ring no-underline transition-colors hover:text-ring/80"
            >
              {authorName}
            </a>
          </p>
        </div>

        <div className="absolute right-3 top-3 z-30 sm:right-4 sm:top-4">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={scrollToNow}
            aria-label="Jump to now"
            title="Jump to now"
            className="size-8 rounded-full border border-border/60 bg-background/50 text-foreground/90 shadow-lg backdrop-blur-sm hover:bg-card/70 hover:text-foreground"
          >
            <LocateFixed className="size-3.5" />
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}

function Axis({
  months,
  rangeStart,
  rangeEnd,
}: {
  months: { year: number; month: number; key: string }[];
  rangeStart: Date;
  rangeEnd: Date;
}) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {months.map(({ year, month, key }) => {
        const date = new Date(year, month, 1);
        const left = positionOf(date, rangeStart, rangeEnd);
        const isYear = month === 0 || key === months[0]?.key;

        return (
          <div
            key={key}
            className="absolute bottom-0 top-0"
            style={{ left: cssPercent(left) }}
          >
            <div
              className={cn(
                "absolute inset-y-0 w-px",
                isYear ? "bg-border/80" : "bg-border/30",
              )}
            />
            {isYear && (
              <span className="absolute top-0 left-1.5 font-ubuntu text-xs font-medium tabular-nums text-muted-foreground/80">
                {year}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function LaneMark({ mark }: { mark: PackedLaneMark }) {
  const { item, left, width, track } = mark;
  const meta = TIMELINE_KIND_META[item.kind];
  const isRange = width > 0;
  const dateLabel = formatTimelineDate(item);
  const top =
    TIMELINE_LANE_PAD_Y +
    track * TIMELINE_TRACK_HEIGHT +
    TIMELINE_TRACK_HEIGHT / 2;

  const markClassName = cn(
    "absolute z-[1] -translate-y-1/2 rounded-full transition-all duration-200",
    "hover:z-20 focus-visible:z-20",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
    item.href && "cursor-pointer",
    isRange
      ? cn("h-[5px] hover:h-[7px]", meta.bar, meta.glow)
      : cn("size-2 -ml-1 hover:scale-125", meta.dot, meta.glow),
  );

  const style = isRange
    ? {
        left: cssPercent(left),
        width: cssPercent(Math.min(width, 100 - left)),
        top,
      }
    : { left: cssPercent(left), top };

  const trigger = item.href ? (
    <a
      href={item.href}
      className={markClassName}
      style={style}
      aria-label={`${item.title}, ${dateLabel}`}
    />
  ) : (
    <button
      type="button"
      className={markClassName}
      style={style}
      aria-label={`${item.title}, ${dateLabel}`}
    />
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        collisionPadding={16}
        className="max-w-[18rem] px-3 py-2"
      >
        <p className="font-ubuntu text-sm font-medium leading-snug text-popover-foreground">
          {item.title}
        </p>
        <p className="mt-1 font-mono text-[11px] tabular-nums text-muted-foreground">
          {dateLabel}
          {item.location ? ` · ${item.location}` : ""}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
