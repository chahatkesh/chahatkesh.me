"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  Copy,
  FileText,
  FolderGit2,
  Home,
  Mail,
  PenLine,
} from "lucide-react";
import { GiJourney } from "react-icons/gi";
import { cn } from "~/lib/utils";
import { getLinkIcon } from "~/lib/link-icons";
import { trackEvent } from "~/components/analytics/google-analytics";
import type { LinkItem } from "~/data/links";

const ICON_CLASS = "size-[18px]";

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className={ICON_CLASS} aria-hidden />,
  FolderGit2: <FolderGit2 className={ICON_CLASS} aria-hidden />,
  Home: <Home className={ICON_CLASS} aria-hidden />,
  Mail: <Mail className={ICON_CLASS} aria-hidden />,
  Journey: <GiJourney className={ICON_CLASS} aria-hidden />,
  Calendar: <Calendar className={ICON_CLASS} aria-hidden />,
  PenLine: <PenLine className={ICON_CLASS} aria-hidden />,
  BookOpen: <BookOpen className={ICON_CLASS} aria-hidden />,
  Briefcase: <Briefcase className={ICON_CLASS} aria-hidden />,
};

function resolveIcon(icon: string) {
  return (
    iconMap[icon] ?? getLinkIcon(icon, { default: 18, globe: 18, file: 18 })
  );
}

const rowClassName = cn(
  "group flex w-full items-center gap-3.5 px-4 py-3.5 text-left",
  "transition-colors duration-150 active:duration-75",
  "hover:bg-muted/40 active:bg-muted/60",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
);

const trailingIconClassName =
  "size-4 shrink-0 text-muted-foreground/50 transition-all duration-150 group-hover:text-muted-foreground/80";

interface LinkRowProps {
  item: LinkItem;
  /** Brighter resting icon, used for the primary group. */
  emphasis?: boolean;
}

export function LinkRow({ item, emphasis = false }: LinkRowProps) {
  const [copied, setCopied] = useState(false);
  const isInternal = item.href.startsWith("/");
  const isCopy = item.action === "copy";

  const handleTrack = useCallback(() => {
    trackEvent("link_click", "links", item.title);
  }, [item.title]);

  const handleCopy = useCallback(async () => {
    handleTrack();
    try {
      await navigator.clipboard.writeText(item.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${item.href}`;
    }
  }, [handleTrack, item.href]);

  const meta = isCopy && copied ? "Copied" : item.meta;

  const content = (
    <>
      <span
        className={cn(
          "shrink-0 transition-colors duration-150 group-hover:text-foreground",
          emphasis ? "text-foreground/90" : "text-muted-foreground",
        )}
      >
        {resolveIcon(item.icon)}
      </span>

      <span className="min-w-0 flex-1 truncate text-[15px] font-medium leading-tight">
        {item.title}
      </span>

      {meta && (
        <span className="shrink-0 text-[13px] tabular-nums text-muted-foreground/60">
          {meta}
        </span>
      )}

      {isCopy ? (
        copied ? (
          <Check className="size-4 shrink-0 text-ring" aria-hidden />
        ) : (
          <Copy className={trailingIconClassName} aria-hidden />
        )
      ) : isInternal ? (
        <ChevronRight
          className={cn(trailingIconClassName, "group-hover:translate-x-0.5")}
          aria-hidden
        />
      ) : (
        <>
          <ArrowUpRight
            className={cn(
              trailingIconClassName,
              "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            )}
            aria-hidden
          />
          <span className="sr-only">(opens in new tab)</span>
        </>
      )}
    </>
  );

  if (isCopy) {
    return (
      <li>
        <button
          type="button"
          onClick={() => void handleCopy()}
          className={rowClassName}
        >
          {content}
          <span className="sr-only">(copy to clipboard)</span>
        </button>
        <span role="status" aria-live="polite" className="sr-only">
          {copied ? `${item.title} copied to clipboard` : ""}
        </span>
      </li>
    );
  }

  if (isInternal) {
    return (
      <li>
        <Link href={item.href} className={rowClassName} onClick={handleTrack}>
          {content}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={rowClassName}
        onClick={handleTrack}
      >
        {content}
      </a>
    </li>
  );
}
