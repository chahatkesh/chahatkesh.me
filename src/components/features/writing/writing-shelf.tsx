"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formatDate } from "~/lib/date-utils";
import { cn } from "~/lib/utils";
import type { WritingEntry } from "~/lib/writing";
import {
  CLOTH_GRAIN,
  getWritingSpineSpec,
  type WritingSpineSpec,
} from "~/lib/writing-shelf";

export type WritingShelfEntry = Pick<
  WritingEntry,
  "slug" | "title" | "date" | "readingTime"
>;

type WritingShelfProps = {
  entries: WritingShelfEntry[];
};

const SHELF_LIMIT = 8;
const SPINE_SPRING = { type: "spring", stiffness: 420, damping: 32 } as const;

/** Longer titles step down a size so they still fit the spine. */
function spineTitleSize(title: string) {
  if (title.length > 34) return "text-[11px] sm:text-[12px]";
  if (title.length > 26) return "text-[12px] sm:text-[13px]";
  return "text-[12.5px] sm:text-[14px]";
}

function spineFaceStyle(spec: WritingSpineSpec): CSSProperties {
  const paperback = spec.finish === "paper";
  const cylinder = paperback
    ? "linear-gradient(90deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.08) 16%, rgba(255,255,255,0.22) 38%, rgba(255,255,255,0.06) 52%, rgba(0,0,0,0.1) 78%, rgba(0,0,0,0.3) 100%)"
    : "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 11%, rgba(255,255,255,0.2) 27%, rgba(255,255,255,0.05) 42%, rgba(0,0,0,0.08) 68%, rgba(0,0,0,0.32) 88%, rgba(0,0,0,0.58) 100%)";
  const specular = paperback
    ? "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.16) 36%, transparent 42%)"
    : "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.28) 25%, transparent 31%)";
  const foot =
    "linear-gradient(180deg, transparent 70%, rgba(0,0,0,0.18) 100%)";
  const weave = paperback
    ? "repeating-linear-gradient(90deg, transparent 0 3px, rgba(0,0,0,0.025) 3px 4px)"
    : "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.03) 2px 3px), repeating-linear-gradient(90deg, transparent 0 2px, rgba(0,0,0,0.045) 2px 3px)";

  return {
    backgroundColor: spec.cloth,
    backgroundImage: `${specular}, ${cylinder}, ${foot}, ${weave}`,
    color: spec.ink,
    boxShadow: paperback
      ? "inset 2px 0 3px rgba(0,0,0,0.18), inset -2px 0 3px rgba(0,0,0,0.14), 1px 8px 12px -8px rgba(0,0,0,0.7)"
      : "inset 4px 0 6px -2px rgba(0,0,0,0.45), inset -4px 0 7px -2px rgba(0,0,0,0.38), inset 0 10px 10px -8px rgba(255,255,255,0.14), inset 0 -16px 14px -10px rgba(0,0,0,0.4), 2px 10px 16px -9px rgba(0,0,0,0.8)",
  };
}

function SpineRib({ foil }: { foil: string }) {
  return (
    <span aria-hidden className="relative h-[4px] w-[64%] shrink-0">
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0.22), rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.12) 70%, rgba(255,255,255,0.08))`,
        }}
      />
      <span
        className="absolute inset-x-[8%] top-1/2 h-px -translate-y-1/2 opacity-80"
        style={{ background: foil }}
      />
    </span>
  );
}

function SpineFace({
  spec,
  title,
  readingTime,
}: {
  spec: WritingSpineSpec;
  title: string;
  readingTime: number;
}) {
  const hardcover = spec.finish !== "paper";
  const shade = spec.page === "#e9dcc4" ? "#d4c3a4" : "#e0d0b4";

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden isolate",
        hardcover ? "rounded-t-[5px]" : "rounded-t-[1px]",
      )}
      style={spineFaceStyle(spec)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{
          backgroundImage: CLOTH_GRAIN,
          opacity: hardcover ? 0.28 : 0.12,
        }}
      />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-r from-black/45 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[3px] bg-gradient-to-l from-black/35 to-transparent"
      />

      {hardcover ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[7px]"
          style={{
            backgroundImage: `repeating-linear-gradient(-52deg, ${spec.foil} 0 2px, ${spec.cloth} 2px 4px)`,
            boxShadow:
              "inset 0 -1px 0 rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.12)",
          }}
        />
      ) : (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
          style={{
            backgroundImage: `repeating-linear-gradient(to right, ${spec.page} 0px, ${shade} 1px, ${spec.page} 2px)`,
          }}
        />
      )}

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-black/35"
      />

      <span
        className={cn(
          "relative z-[1] flex h-full flex-col items-center justify-between gap-2 px-1",
          hardcover ? "pb-2.5 pt-3.5" : "py-2.5",
        )}
      >
        <SpineRib foil={spec.foil} />

        <span
          className={cn(
            "min-h-0 flex-1 rotate-180 overflow-hidden text-center font-poem font-medium leading-[1.3] tracking-tight [writing-mode:vertical-rl]",
            spineTitleSize(title),
          )}
          style={{
            textShadow: hardcover
              ? "0 1px 0 rgba(0,0,0,0.45), 0 0 0.4px currentColor"
              : "0 1px 0 rgba(255,255,255,0.28)",
          }}
        >
          {title}
        </span>

        <span
          aria-hidden
          className="flex w-full shrink-0 flex-col items-center gap-1.5"
        >
          <SpineRib foil={spec.foil} />
          <span
            className="grid h-[15px] min-w-[15px] place-items-center rounded-[1px] px-0.5 font-sans text-[6.5px] font-semibold tracking-wide"
            style={{
              background: spec.foil,
              color: spec.cloth,
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 1px rgba(0,0,0,0.4), 0 1px 0 rgba(0,0,0,0.25)",
            }}
          >
            {readingTime}m
          </span>
        </span>
      </span>
    </div>
  );
}

export function WritingShelf({ entries }: WritingShelfProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const volumes = entries.slice(0, SHELF_LIMIT);
  const shown = volumes[activeIndex ?? 0];

  if (!shown) return null;

  return (
    <div
      data-shelf
      className="relative"
      onMouseLeave={() => setActiveIndex(null)}
    >
      <div className="scrollbar-hide -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="w-full min-w-max pt-8">
          <ul className="flex items-end justify-center gap-[3px] px-3">
            {volumes.map((entry, index) => {
              const spec = getWritingSpineSpec(
                entry.slug,
                entry.title,
                entry.readingTime,
              );
              const isActive = activeIndex === index;
              const isDimmed = activeIndex !== null && !isActive;

              return (
                <motion.li
                  key={entry.slug}
                  className="shrink-0"
                  style={
                    {
                      "--spine-w": `${spec.width}px`,
                      "--spine-h": `${spec.height}px`,
                    } as CSSProperties
                  }
                  initial={{ opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    ...SPINE_SPRING,
                    delay: Math.min(index * 0.06, 0.42),
                  }}
                >
                  <motion.div
                    className="relative h-[calc(var(--spine-h)*0.72)] w-[calc(var(--spine-w)*0.78)] origin-bottom sm:h-[calc(var(--spine-h)*0.92)] sm:w-[calc(var(--spine-w)*0.92)]"
                    animate={
                      reduceMotion
                        ? {}
                        : {
                            y: isActive ? -7 : 1,
                            rotate: isActive ? 0 : spec.tilt,
                            opacity: isDimmed ? 0.55 : 1,
                          }
                    }
                    transition={SPINE_SPRING}
                  >
                    <Link
                      href={`/about/writing/${entry.slug}`}
                      aria-label={`${entry.title} — ${formatDate(entry.date)}, ${entry.readingTime} min read`}
                      className="el-focus-styles relative block h-full w-full"
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onBlur={(event) => {
                        const next = event.relatedTarget;
                        if (
                          !(next instanceof Node) ||
                          !event.currentTarget
                            .closest("[data-shelf]")
                            ?.contains(next)
                        ) {
                          setActiveIndex(null);
                        }
                      }}
                    >
                      <SpineFace
                        spec={spec}
                        title={entry.title}
                        readingTime={entry.readingTime}
                      />
                    </Link>
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>

          <div aria-hidden className="relative -mt-px">
            <div className="h-2.5 rounded-t-[3px] border-t border-white/[0.16] bg-gradient-to-b from-white/[0.2] via-white/[0.07] to-white/[0.02] shadow-[inset_0_2px_3px_rgba(0,0,0,0.35)]" />
            <div className="mx-[9px] h-3.5 rounded-b-[8px] border-x border-b border-white/[0.06] bg-gradient-to-b from-white/[0.05] to-transparent" />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="mx-auto mt-5 min-h-5 max-w-xl px-4 text-center sm:min-h-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={shown.slug}
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex items-baseline justify-center gap-x-2 font-sans text-xs text-muted-foreground sm:text-[13px]"
          >
            <span className="truncate font-poem text-sm text-foreground sm:text-[15px]">
              {shown.title}
            </span>
            <span aria-hidden className="shrink-0 opacity-40">
              ·
            </span>
            <time className="shrink-0" dateTime={shown.date}>
              {formatDate(shown.date)}
            </time>
            <span aria-hidden className="shrink-0 opacity-40">
              ·
            </span>
            <span className="shrink-0">{shown.readingTime} min read</span>
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
