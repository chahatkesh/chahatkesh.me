/**
 * Experience grouping utilities.
 *
 * Provides helpers for rendering experiences that share the same company,
 * e.g., multiple roles at one employer. The grouping is driven by the
 * optional `companyId` field on each experience entry — when omitted the
 * employer string is used as the fallback key.
 */

import { type StaticImageData } from "next/image";
import { type Experience } from "~/data/experience";
import { parseMonthYear } from "~/lib/date-utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ExperienceGroup = {
  /** Stable key used for React rendering and lookups */
  companyId: string;
  employer: string;
  logo: StaticImageData | string;
  /** All positions at this company, preserved in original (newest-first) order */
  positions: Experience[];
  /** The oldest start date across all positions */
  earliestStart: string;
  /** The latest end date across all positions ("present" wins over any date) */
  latestEnd: string;
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function getLaterEnd(a: string, b: string): string {
  if (a.toLowerCase() === "present" || b.toLowerCase() === "present") {
    return "present";
  }
  const dateA = parseMonthYear(a);
  const dateB = parseMonthYear(b);
  return dateA >= dateB ? a : b;
}

function getEarlierStart(a: string, b: string): string {
  const dateA = parseMonthYear(a);
  const dateB = parseMonthYear(b);
  return dateA <= dateB ? a : b;
}

function toMonthIndex(dateStr: string): number {
  const date = parseMonthYear(dateStr);
  return date.getFullYear() * 12 + date.getMonth();
}

/**
 * True when role periods overlap or touch with no month gap between them.
 */
function areRolesContinuous(
  roles: { start_date: string; end_date: string }[],
): boolean {
  if (roles.length <= 1) return true;

  const intervals = roles
    .map((role) => ({
      start: toMonthIndex(role.start_date),
      end: toMonthIndex(role.end_date),
    }))
    .sort((a, b) => a.start - b.start);

  const merged = [{ ...intervals[0] }];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = merged[merged.length - 1];

    if (current.start <= last.end + 1) {
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push({ ...current });
    }
  }

  return merged.length === 1;
}

type RoleSummary = {
  role: string;
  start_date: string;
  end_date: string;
};

export type CompanyRolesSegment = {
  role: string;
  dateRange: string;
};

export type CompanyRolesDisplay = {
  segments: CompanyRolesSegment[];
  fullTitle: string;
};

function formatSegmentsTitle(segments: CompanyRolesSegment[]): string {
  return segments
    .map((segment) => `${segment.role} · ${segment.dateRange}`)
    .join(" · ");
}

/**
 * Structured role/date parts for UI rendering.
 */
export function getCompanyRolesDisplay(
  roles: RoleSummary[],
): CompanyRolesDisplay {
  if (roles.length === 0) {
    return { segments: [], fullTitle: "" };
  }

  if (roles.length === 1) {
    const role = roles[0];
    const segments = [
      {
        role: role.role,
        dateRange: `${role.start_date} – ${role.end_date}`,
      },
    ];
    return { segments, fullTitle: formatSegmentsTitle(segments) };
  }

  if (areRolesContinuous(roles)) {
    const rolesLabel = roles.map((role) => role.role).join(" & ");
    const earliestStart = roles.reduce(
      (earliest, role) => getEarlierStart(earliest, role.start_date),
      roles[0].start_date,
    );
    const latestEnd = roles.reduce(
      (latest, role) => getLaterEnd(latest, role.end_date),
      roles[0].end_date,
    );
    const segments = [
      {
        role: rolesLabel,
        dateRange: `${earliestStart} – ${latestEnd}`,
      },
    ];
    return { segments, fullTitle: formatSegmentsTitle(segments) };
  }

  const segments = roles.map((role) => ({
    role: role.role,
    dateRange: `${role.start_date} – ${role.end_date}`,
  }));

  return { segments, fullTitle: formatSegmentsTitle(segments) };
}

/**
 * Compact one-line summary for one or more roles at the same employer.
 * Continuous timelines merge roles and dates; gaps keep per-role date ranges.
 */
export function formatCompanyRolesSummary(roles: RoleSummary[]): string {
  return getCompanyRolesDisplay(roles).fullTitle;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Groups experiences by `companyId` (falling back to `employer`) while
 * preserving the original ordering of both groups and positions within groups.
 *
 * @example
 * const groups = groupExperiencesByCompany(experiences);
 * // Annam.ai produces one group with two nested positions
 */
export function groupExperiencesByCompany(
  exps: Experience[],
): ExperienceGroup[] {
  const map = new Map<string, ExperienceGroup>();

  for (const exp of exps) {
    const key = exp.companyId ?? exp.employer;

    if (map.has(key)) {
      const group = map.get(key)!;
      group.positions.push(exp);
      group.earliestStart = getEarlierStart(
        group.earliestStart,
        exp.start_date,
      );
      group.latestEnd = getLaterEnd(group.latestEnd, exp.end_date);
    } else {
      map.set(key, {
        companyId: key,
        employer: exp.employer,
        logo: exp.logo,
        positions: [exp],
        earliestStart: exp.start_date,
        latestEnd: exp.end_date,
      });
    }
  }

  return Array.from(map.values());
}
