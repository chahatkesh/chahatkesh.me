"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Loader2, Plus } from "lucide-react";
import { MotionDiv } from "~/components/shared";
import { cn } from "~/lib/utils";

const cardShell =
  "group relative flex flex-wrap items-start gap-x-3 gap-y-2.5 rounded-lg border border-border bg-background p-3.5 transition-colors duration-200 hover:border-muted-foreground/30 sm:flex-nowrap sm:items-center sm:gap-4 sm:p-4";

interface AdminListCreateTileProps {
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loadingLabel?: string;
  loading?: boolean;
}

/**
 * Dashed "add" tile used at the top of admin resource lists.
 */
export function AdminListCreateTile({
  label,
  href,
  onClick,
  disabled = false,
  loading = false,
  loadingLabel,
}: AdminListCreateTileProps) {
  const content = (
    <>
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-dashed border-border bg-background">
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Plus className="size-[22px]" strokeWidth={1.75} />
        )}
      </div>
      <span className="text-sm font-medium">
        {loading ? (loadingLabel ?? label) : label}
      </span>
    </>
  );

  const className = cn(
    "flex w-full items-center gap-3.5 rounded-lg border border-dashed border-border bg-muted/20 p-3.5 text-muted-foreground/70 transition-colors hover:border-muted-foreground/40 hover:bg-muted/30 hover:text-muted-foreground sm:gap-4 sm:p-4",
    (disabled || loading) && "cursor-not-allowed opacity-60",
  );

  if (href) {
    return (
      <Link href={href} className={className} aria-label={label}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      aria-label={label}
    >
      {content}
    </button>
  );
}

interface AdminListMetaProps {
  items: Array<string | null | undefined | false>;
  title?: string;
}

/**
 * Compact meta line: joins facts with middots (e.g. PDF · 146 KB · 6h ago).
 */
export function AdminListMeta({ items, title }: AdminListMetaProps) {
  const parts = items.filter(Boolean) as string[];
  if (parts.length === 0) return null;

  return (
    <p
      className="mt-0.5 text-xs leading-relaxed text-muted-foreground sm:truncate"
      title={title ?? parts.join(" · ")}
    >
      {parts.map((part, i) => (
        <span key={`${part}-${i}`}>
          {i > 0 ? (
            <span className="mx-1.5 text-muted-foreground/40" aria-hidden>
              ·
            </span>
          ) : null}
          {part}
        </span>
      ))}
    </p>
  );
}

interface AdminListCardProps {
  icon: ReactNode;
  title?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  /** Replace the default title/meta block (e.g. rename input). */
  content?: ReactNode;
  /** Makes the card open this URL (replaces a dedicated Open button). */
  href?: string;
  openInNewTab?: boolean;
  index?: number;
  disabled?: boolean;
  className?: string;
}

/**
 * Shared list row for admin resource pages (files, diagrams, gists).
 * Premium/minimal: quiet border, soft hover, compact type and actions.
 */
export function AdminListCard({
  icon,
  title,
  meta,
  actions,
  content,
  href,
  openInNewTab = true,
  index = 0,
  disabled = false,
  className,
}: AdminListCardProps) {
  const isClickable = Boolean(href) && !disabled;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={cn(
        cardShell,
        isClickable && "cursor-pointer",
        disabled && "opacity-60",
        className,
      )}
    >
      {isClickable ? (
        <a
          href={href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          className="absolute inset-0 z-0 rounded-lg"
          aria-label={typeof title === "string" ? `Open ${title}` : "Open item"}
        />
      ) : null}

      <div className="relative z-10 flex min-w-0 flex-1 items-start gap-3 pointer-events-none sm:items-center sm:gap-4">
        <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted/40 text-muted-foreground transition-colors group-hover:bg-muted/60 group-hover:text-foreground/80">
          {icon}
        </div>

        <div
          className={cn(
            "min-w-0 flex-1 pt-0.5 sm:pt-0",
            content && "pointer-events-auto",
          )}
        >
          {content ?? (
            <>
              <p className="truncate text-sm font-medium tracking-tight text-foreground">
                {title}
              </p>
              {meta}
            </>
          )}
        </div>
      </div>

      {actions ? (
        <div className="relative z-10 ml-auto flex flex-shrink-0 flex-wrap items-center justify-end gap-1.5">
          {actions}
        </div>
      ) : null}
    </MotionDiv>
  );
}

/** Labeled primary action (e.g. Copy). */
export const adminListActionClassName = "h-9 px-2.5 text-xs sm:h-8";

/** Square icon-only secondary action. */
export const adminListIconActionClassName = "size-9 px-0 text-xs sm:size-8";

/** Destructive icon-only action. */
export const adminListDangerActionClassName =
  "size-9 px-0 text-xs sm:size-8 border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500";
