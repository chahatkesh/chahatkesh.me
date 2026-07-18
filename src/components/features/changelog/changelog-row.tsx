"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "~/lib/utils";
import type { MonthlyChangelog } from "~/data/changelog";
import {
  formatChangelogDate,
  formatChangelogTime,
} from "~/app/changelog/_shared";

type ChangelogRowProps = {
  entry: MonthlyChangelog;
  isActive: boolean;
  onActivate: (x: number, y: number) => void;
  onMove: (x: number, y: number) => void;
  onDeactivate: () => void;
};

const metaClass = (isActive: boolean) =>
  cn(
    "font-mono text-[11px] transition-colors duration-200 sm:text-xs",
    "group-hover/changelog-row:text-black/70 group-focus-visible/changelog-row:text-black/70",
    isActive && "text-black/70",
  );

export function ChangelogRow({
  entry,
  isActive,
  onActivate,
  onMove,
  onDeactivate,
}: ChangelogRowProps) {
  return (
    <Link
      href={`/changelog/${entry.month}`}
      aria-label={`${formatChangelogDate(entry.publishedAt)}: ${entry.title}`}
      className={cn(
        "group/changelog-row el-focus-styles relative grid grid-cols-1 gap-y-2.5 border-b border-border/70 py-5 pl-7 pr-3 transition-colors duration-200",
        "sm:grid-cols-[minmax(0,9rem)_4rem_minmax(0,1fr)] sm:items-center sm:gap-x-8 sm:gap-y-0 sm:py-8 sm:pl-10 sm:pr-0",
        "hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black",
        isActive && "bg-white text-black",
      )}
      onMouseEnter={(event) => {
        onActivate(event.clientX, event.clientY);
      }}
      onMouseMove={(event) => {
        onMove(event.clientX, event.clientY);
      }}
      onMouseLeave={onDeactivate}
      onFocus={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        onActivate(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }}
      onBlur={onDeactivate}
    >
      <span
        aria-hidden
        className={cn(
          "absolute left-2 top-6 -translate-y-1/2 opacity-0 transition-opacity duration-200 sm:left-3 sm:top-1/2",
          "group-hover/changelog-row:opacity-100 group-focus-visible/changelog-row:opacity-100",
          isActive && "opacity-100",
        )}
      >
        <ArrowUpRight className="size-4 rotate-[-12deg]" />
      </span>

      <div className="flex items-baseline gap-4 sm:contents">
        <time
          dateTime={entry.publishedAt}
          className={cn(
            metaClass(isActive),
            "uppercase tracking-[0.12em] text-muted-foreground",
          )}
        >
          {formatChangelogDate(entry.publishedAt)}
        </time>

        <span
          className={cn(
            metaClass(isActive),
            "tabular-nums text-muted-foreground/70",
          )}
        >
          {formatChangelogTime(entry.publishedAt)}
        </span>
      </div>

      <span
        className={cn(
          "min-w-0 text-base font-normal leading-snug text-foreground transition-colors duration-200 sm:text-[1.375rem]",
          "group-hover/changelog-row:text-black group-focus-visible/changelog-row:text-black",
          isActive && "text-black",
        )}
      >
        {entry.title}
      </span>
    </Link>
  );
}
