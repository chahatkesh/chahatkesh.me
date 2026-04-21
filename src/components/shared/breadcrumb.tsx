"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className }: BreadcrumbProps) => {
  const displayName = (name: string, url: string) =>
    url === "/" ? "chahat" : name.toLowerCase();

  const sep = <ChevronRight className="size-3.5 shrink-0 text-neutral-600" />;

  const last = items[items.length - 1];
  const parent = items.length >= 2 ? items[items.length - 2] : null;
  // Show … prefix when ancestors above the parent are hidden (3+ items)
  const hasAncestors = items.length >= 3;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-sm min-w-0", className)}
    >
      {/*
       * Mobile: single-line, show "… › parent › current" for 3+ levels.
       * Per NNG / IxDF research: the immediate parent is the most useful
       * navigable item; home is always reachable via logo/back.
       * "…" signals that ancestors exist above without cluttering the trail.
       */}
      <ol className="flex sm:hidden items-center gap-1.5 min-w-0 w-full overflow-hidden">
        {items.length === 1 ? (
          <li className="truncate text-neutral-400 font-medium min-w-0">
            {displayName(last.name, last.url)}
          </li>
        ) : (
          <>
            {hasAncestors && (
              <li className="flex items-center gap-1.5 shrink-0">
                <span
                  className="text-neutral-600 select-none"
                  aria-hidden="true"
                >
                  &hellip;
                </span>
              </li>
            )}
            {parent && (
              <li className="flex items-center gap-1.5 shrink-0">
                {hasAncestors && sep}
                <Link
                  href={parent.url}
                  className="shrink-0 text-neutral-500 hover:text-ring transition-colors duration-200"
                >
                  {displayName(parent.name, parent.url)}
                </Link>
              </li>
            )}
            <li className="flex items-center gap-1.5 min-w-0 overflow-hidden">
              {sep}
              <span className="truncate text-neutral-400 font-medium min-w-0">
                {displayName(last.name, last.url)}
              </span>
            </li>
          </>
        )}
      </ol>

      {/* Desktop: full trail, wrapping allowed */}
      <ol className="hidden sm:flex items-center gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && sep}
              {isLast ? (
                <span className="text-neutral-400 font-medium">
                  {displayName(item.name, item.url)}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-neutral-500 hover:text-ring transition-colors duration-200"
                >
                  {displayName(item.name, item.url)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
