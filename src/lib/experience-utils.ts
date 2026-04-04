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
