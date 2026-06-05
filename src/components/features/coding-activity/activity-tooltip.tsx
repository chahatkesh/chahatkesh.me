import { useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { GITHUB_ACCENT, LEETCODE_ACCENT } from "./constants";
import type { HoveredDay } from "./types";
import { parseIsoDate } from "./lib";

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

const TOOLTIP_GAP = 6;
const VIEWPORT_PADDING = 8;
/** Approximate half-width used only to keep the tooltip inside the viewport. */
const ESTIMATED_HALF_WIDTH = 80;

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

export function ActivityTooltip({
  hovered,
  onDismiss,
}: {
  hovered: HoveredDay;
  onDismiss: () => void;
}) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Tap-away dismissal on mobile
  useEffect(() => {
    if (!hovered) return;
    const handler = (e: PointerEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        onDismiss();
      }
    };
    document.addEventListener("pointerdown", handler, { passive: true });
    return () => document.removeEventListener("pointerdown", handler);
  }, [hovered, onDismiss]);

  if (!hovered) return null;

  const { date, github, leetcode, rect } = hovered;
  const formattedDate = parseIsoDate(date).toLocaleDateString(
    "en-US",
    DATE_FORMAT,
  );

  let left = rect.left + rect.width / 2;
  const top = rect.top - TOOLTIP_GAP;

  // Clamp horizontally so the tooltip never overflows the viewport
  const minLeft = VIEWPORT_PADDING + ESTIMATED_HALF_WIDTH;
  const maxLeft = window.innerWidth - VIEWPORT_PADDING - ESTIMATED_HALF_WIDTH;
  left = Math.max(minLeft, Math.min(maxLeft, left));

  return (
    <div
      ref={tooltipRef}
      role="tooltip"
      className="fixed z-50 pointer-events-none w-max max-w-[200px] rounded-md border bg-popover px-2.5 py-1.5 text-[11px] leading-tight text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
      style={{
        left,
        top,
        transform: "translate(-50%, -100%)",
      }}
    >
      <p className="font-medium text-foreground">{formattedDate}</p>
      {github + leetcode === 0 ? (
        <p className="text-muted-foreground">No activity</p>
      ) : (
        <div className="mt-0.5 flex flex-col gap-0.5 text-muted-foreground">
          {github > 0 && (
            <span className="flex items-center gap-1.5">
              <FaGithub className="size-2.5" style={{ color: GITHUB_ACCENT }} />
              {plural(github, "contribution")}
            </span>
          )}
          {leetcode > 0 && (
            <span className="flex items-center gap-1.5">
              <SiLeetcode
                className="size-2.5"
                style={{ color: LEETCODE_ACCENT }}
              />
              {plural(leetcode, "submission")}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
