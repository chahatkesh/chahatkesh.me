"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";

const cardClassName =
  "el-focus-styles group relative flex w-full items-start gap-3.5 rounded-lg border border-border bg-background p-4 text-left transition-colors duration-200 hover:border-muted-foreground/30 hover:bg-muted/20 sm:items-center sm:gap-4";

interface AdminDashboardCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Nav card for the admin dashboard grid.
 * Quiet border, horizontal scan, soft hover — matches admin list rows.
 * Use `href` for navigation or `onClick` for actions (e.g. logout).
 */
export function AdminDashboardCard({
  title,
  description,
  icon,
  href,
  onClick,
  className,
}: AdminDashboardCardProps) {
  const content = (
    <>
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/40 text-muted-foreground transition-colors group-hover:bg-muted/60 group-hover:text-foreground/80">
        {icon}
      </div>

      <div className="min-w-0 flex-1 space-y-0.5">
        <h3 className="text-sm font-medium tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground sm:line-clamp-2">
          {description}
        </p>
      </div>

      <ChevronRight
        className="mt-0.5 size-4 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-muted-foreground sm:mt-0"
        strokeWidth={2}
        aria-hidden
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(cardClassName, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(cardClassName, className)}
    >
      {content}
    </button>
  );
}
