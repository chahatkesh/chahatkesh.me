import { useEffect, type RefObject } from "react";
import { CALENDAR_SCROLL_SELECTOR } from "./constants";
import {
  LAST_YEAR,
  type ActivityRange,
  type CodingActivityView,
} from "./types";
import { getWeekIndexForDate } from "./lib";

function getCalendarScrollEl(container: HTMLElement | null) {
  return (
    container?.querySelector<HTMLElement>(CALENDAR_SCROLL_SELECTOR) ?? null
  );
}

function setCalendarScrollbarHidden(scrollEl: HTMLElement, hidden: boolean) {
  scrollEl.classList.toggle("scrollbar-hide", hidden);
  if (hidden) {
    scrollEl.style.setProperty("scrollbar-width", "none");
    scrollEl.style.setProperty("-ms-overflow-style", "none");
  } else {
    scrollEl.style.removeProperty("scrollbar-width");
    scrollEl.style.removeProperty("-ms-overflow-style");
  }
}

function getScrollTargetDate(
  range: ActivityRange,
  latestDate: string,
  endIso: string,
): string {
  if (range === LAST_YEAR) return latestDate;
  const latestYear = Number(latestDate.slice(0, 4));
  if (range === latestYear) return latestDate;
  return endIso;
}

function scrollCalendarToDate(
  container: HTMLElement | null,
  startIso: string,
  targetDate: string,
  blockSize: number,
  blockMargin: number,
) {
  const scrollEl = getCalendarScrollEl(container);
  if (!scrollEl) return;

  const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
  if (maxScroll <= 0) return;

  const columnWidth = blockSize + blockMargin;
  const weekIndex = getWeekIndexForDate(startIso, targetDate);
  const scrollLeft =
    weekIndex * columnWidth - scrollEl.clientWidth + columnWidth;
  scrollEl.scrollLeft = Math.max(0, Math.min(maxScroll, scrollLeft));
}

/**
 * On mobile: hides the calendar's inner scrollbar and scrolls to the
 * relevant anchor day (today for current year / 1Y, end-of-year for past).
 */
export function useCalendarScroll({
  containerRef,
  view,
  range,
  isMobile,
  blockSize,
  blockMargin,
  latestDate,
}: {
  containerRef: RefObject<HTMLElement | null>;
  view: CodingActivityView | null;
  range: ActivityRange;
  isMobile: boolean;
  blockSize: number;
  blockMargin: number;
  latestDate: string | undefined;
}) {
  useEffect(() => {
    if (!view || !latestDate) return;

    const containerEl = containerRef.current;

    const sync = () => {
      const scrollEl = getCalendarScrollEl(containerRef.current);
      if (!scrollEl) return;

      if (isMobile) {
        setCalendarScrollbarHidden(scrollEl, true);
        const targetDate = getScrollTargetDate(range, latestDate, view.endIso);
        scrollCalendarToDate(
          containerRef.current,
          view.startIso,
          targetDate,
          blockSize,
          blockMargin,
        );
      } else {
        setCalendarScrollbarHidden(scrollEl, false);
      }
    };

    sync();
    const frame = requestAnimationFrame(sync);

    return () => {
      cancelAnimationFrame(frame);
      const scrollEl = getCalendarScrollEl(containerEl);
      if (scrollEl) setCalendarScrollbarHidden(scrollEl, false);
    };
  }, [isMobile, view, blockSize, blockMargin, range, latestDate, containerRef]);
}
