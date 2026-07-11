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

/** Space between the cell/bar and the arrow tip. */
const TOOLTIP_GAP = 10;
const VIEWPORT_PADDING = 8;
/** Approximate half-width used only to keep the tooltip inside the viewport. */
const ESTIMATED_HALF_WIDTH = 84;
/** How far the arrow tip can shift from the tooltip center before looking odd. */
const MAX_ARROW_OFFSET = 56;

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

  const targetCenter = rect.left + rect.width / 2;
  let left = targetCenter;
  const top = rect.top - TOOLTIP_GAP;

  // Clamp horizontally so the tooltip never overflows the viewport
  const minLeft = VIEWPORT_PADDING + ESTIMATED_HALF_WIDTH;
  const maxLeft = window.innerWidth - VIEWPORT_PADDING - ESTIMATED_HALF_WIDTH;
  left = Math.max(minLeft, Math.min(maxLeft, left));

  // Keep the caret aimed at the hovered cell even when the box is clamped
  const arrowOffset = Math.max(
    -MAX_ARROW_OFFSET,
    Math.min(MAX_ARROW_OFFSET, targetCenter - left),
  );

  return (
    <div
      ref={tooltipRef}
      role="tooltip"
      className="fixed z-50 pointer-events-none w-max max-w-[220px] animate-in fade-in-0 zoom-in-95"
      style={{
        left,
        top,
        transform: "translate(-50%, -100%)",
      }}
    >
      <div className="relative rounded-lg border border-border/70 bg-popover px-3 py-2 text-[11px] leading-snug text-popover-foreground shadow-[0_10px_28px_-14px_rgba(0,0,0,0.75)]">
        <p className="font-medium tracking-tight text-foreground">
          {formattedDate}
        </p>
        {github + leetcode === 0 ? (
          <p className="mt-1 text-muted-foreground">No activity</p>
        ) : (
          <div className="mt-1.5 flex flex-col gap-1 text-muted-foreground">
            {github > 0 && (
              <span className="flex items-center gap-1.5">
                <FaGithub
                  className="size-2.5 shrink-0"
                  style={{ color: GITHUB_ACCENT }}
                />
                {plural(github, "contribution")}
              </span>
            )}
            {leetcode > 0 && (
              <span className="flex items-center gap-1.5">
                <SiLeetcode
                  className="size-2.5 shrink-0"
                  style={{ color: LEETCODE_ACCENT }}
                />
                {plural(leetcode, "submission")}
              </span>
            )}
          </div>
        )}

        {/* Anchor arrow — same fill/border as the box so colors match */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 size-2 -mb-1 rounded-[1px] border-r border-b border-border/70 bg-popover"
          style={{
            left: `calc(50% + ${arrowOffset}px)`,
            transform: "translateX(-50%) rotate(45deg)",
          }}
        />
      </div>
    </div>
  );
}
