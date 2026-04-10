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

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-2 text-sm", className)}
    >
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="size-3.5 text-neutral-600" />
              )}
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
