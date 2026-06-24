import type { ChangelogChange, ChangelogChangeType } from "~/data/changelog";
import config from "~/config";

export const TYPE_CONFIG: Record<
  ChangelogChangeType,
  { label: string; dot: string; badge: string; text: string }
> = {
  added: {
    label: "Added",
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    text: "text-emerald-600",
  },
  improved: {
    label: "Improved",
    dot: "bg-sky-500",
    badge: "bg-sky-500/10 text-sky-600 border-sky-500/20",
    text: "text-sky-600",
  },
  fixed: {
    label: "Fixed",
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    text: "text-amber-600",
  },
};

export const TYPE_ORDER: ChangelogChangeType[] = ["added", "improved", "fixed"];

/** Format an ISO month ("2026-06") into a friendly label ("June 2026"). */
export function formatMonth(month: string): string {
  const [year, monthIndex] = month.split("-").map(Number);
  return new Date(year, monthIndex - 1).toLocaleDateString(
    config.seo.language,
    {
      year: "numeric",
      month: "long",
    },
  );
}

/** Short month label ("Jun 2026") for compact UI. */
export function formatMonthShort(month: string): string {
  const [year, monthIndex] = month.split("-").map(Number);
  return new Date(year, monthIndex - 1).toLocaleDateString(
    config.seo.language,
    {
      year: "numeric",
      month: "short",
    },
  );
}

/** Three-letter month label only ("Jun"), with no year. */
export function formatMonthAbbr(month: string): string {
  const [year, monthIndex] = month.split("-").map(Number);
  return new Date(year, monthIndex - 1).toLocaleDateString(
    config.seo.language,
    {
      month: "short",
    },
  );
}

export function groupByType(
  changes: ChangelogChange[],
): Partial<Record<ChangelogChangeType, ChangelogChange[]>> {
  const groups: Partial<Record<ChangelogChangeType, ChangelogChange[]>> = {};
  for (const change of changes) {
    (groups[change.type] ??= []).push(change);
  }
  return groups;
}

/** Count changes per type, preserving display order and skipping zeros. */
export function countByType(
  changes: ChangelogChange[],
): { type: ChangelogChangeType; count: number }[] {
  const groups = groupByType(changes);
  return TYPE_ORDER.map((type) => ({
    type,
    count: groups[type]?.length ?? 0,
  })).filter((entry) => entry.count > 0);
}
