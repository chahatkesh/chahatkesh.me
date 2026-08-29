import {
  ALL_STACKS_FLAT,
  BACKEND_DEVOPS,
  FRONTEND_STACKS,
  LANGUAGES_TOOLS,
  STACK_CATEGORIES,
  type StackCategory,
  type StackMeta,
} from "~/data/stack";
import { experiences } from "~/data/experience";
import { projects } from "~/data/projects";
import type { Experience } from "~/data/experience";
import type { Project } from "~/data/projects";

export type StackEntry = StackMeta & { name: string };

export type StackUsage = {
  projects: Project[];
  experiences: Experience[];
  projectCount: number;
  experienceCount: number;
  totalUsage: number;
};

const CATEGORY_LABELS: Record<StackCategory, string> = {
  "languages-tools": "Languages & Tools",
  frontend: "Frontend",
  "backend-devops": "Backend & DevOps",
};

/** Resolve a stack display name from ALL_STACKS; returns undefined for unknown tags. */
export function resolveStackName(name: string): string | undefined {
  if (ALL_STACKS_FLAT[name]) return name;

  for (const [stackName, meta] of Object.entries(ALL_STACKS_FLAT)) {
    if (meta.aliases?.includes(name)) return stackName;
  }

  return undefined;
}

/** All canonical stack entries (one per page). */
export function getAllStacks(): StackEntry[] {
  return Object.entries(ALL_STACKS_FLAT).map(([name, meta]) => ({
    name,
    ...meta,
  }));
}

export function getStackBySlug(slug: string): StackEntry | undefined {
  return getAllStacks().find((stack) => stack.slug === slug);
}

export function getStackByName(name: string): StackEntry | undefined {
  const resolved = resolveStackName(name);
  if (!resolved) return undefined;
  const meta = ALL_STACKS_FLAT[resolved];
  return { name: resolved, ...meta };
}

export function stackHref(name: string): string | undefined {
  const stack = getStackByName(name);
  return stack ? `/stack/${stack.slug}` : undefined;
}

export function getStackCategoryLabel(category: StackCategory): string {
  return CATEGORY_LABELS[category];
}

/** Names that should match when finding usage for a stack page (includes aliases). */
export function getStackMatchNames(name: string): string[] {
  const stack = getStackByName(name);
  if (!stack) return [name];

  const names = new Set<string>([stack.name, ...(stack.aliases ?? [])]);
  return [...names];
}

function matchesStackList(
  list: string[] | undefined,
  matchNames: string[],
): boolean {
  if (!list?.length) return false;
  return list.some((item) => matchNames.includes(item));
}

export function getStackUsage(name: string): StackUsage {
  const matchNames = getStackMatchNames(name);

  const matchedProjects = projects.filter((project) =>
    matchesStackList(project.stacks, matchNames),
  );

  const matchedExperiences = experiences.filter((experience) =>
    matchesStackList(experience.techStack, matchNames),
  );

  return {
    projects: matchedProjects,
    experiences: matchedExperiences,
    projectCount: matchedProjects.length,
    experienceCount: matchedExperiences.length,
    totalUsage: matchedProjects.length + matchedExperiences.length,
  };
}

export function sortProjectsForStack(projectsList: Project[]): Project[] {
  return [...projectsList].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return (
      new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
    );
  });
}

export function sortStacksByUsage(stacks: StackEntry[]): StackEntry[] {
  return [...stacks].sort((a, b) => {
    const usageA = getStackUsage(a.name).totalUsage;
    const usageB = getStackUsage(b.name).totalUsage;
    if (usageA !== usageB) return usageB - usageA;
    return a.name.localeCompare(b.name);
  });
}

export function filterStacksBySearch(
  stacks: StackEntry[],
  query: string,
): StackEntry[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return stacks;

  return stacks.filter((stack) => {
    const haystack = [
      stack.name,
      stack.description,
      getStackCategoryLabel(stack.category),
      ...(stack.aliases ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

export function getRelatedStacks(name: string, limit = 8): StackEntry[] {
  const current = getStackByName(name);
  if (!current) return [];

  const matchNames = getStackMatchNames(name);
  const coOccurrence = new Map<string, number>();

  for (const project of projects) {
    if (!matchesStackList(project.stacks, matchNames)) continue;
    for (const stackName of project.stacks) {
      if (matchNames.includes(stackName)) continue;
      const resolved = resolveStackName(stackName);
      if (!resolved || resolved === current.name) continue;
      coOccurrence.set(resolved, (coOccurrence.get(resolved) ?? 0) + 1);
    }
  }

  for (const experience of experiences) {
    if (!matchesStackList(experience.techStack, matchNames)) continue;
    for (const stackName of experience.techStack ?? []) {
      if (matchNames.includes(stackName)) continue;
      const resolved = resolveStackName(stackName);
      if (!resolved || resolved === current.name) continue;
      coOccurrence.set(resolved, (coOccurrence.get(resolved) ?? 0) + 1);
    }
  }

  const ranked = [...coOccurrence.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([stackName]) => getStackByName(stackName))
    .filter((stack): stack is StackEntry => Boolean(stack));

  const seen = new Set<string>([current.name]);
  const related: StackEntry[] = [];

  for (const stack of ranked) {
    if (seen.has(stack.name)) continue;
    related.push(stack);
    seen.add(stack.name);
    if (related.length >= limit) return related;
  }

  const sameCategory = getAllStacks()
    .filter(
      (stack) =>
        stack.category === current.category &&
        stack.name !== current.name &&
        !seen.has(stack.name),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const stack of sameCategory) {
    related.push(stack);
    if (related.length >= limit) break;
  }

  return related;
}

/** Year span from mapped project dates and experience start/end strings. */
export function getStackYearSpan(name: string): string | null {
  const usage = getStackUsage(name);
  const years = new Set<number>();

  for (const project of usage.projects) {
    years.add(new Date(project.dateStarted).getFullYear());
    years.add(new Date(project.datePublished).getFullYear());
  }

  for (const experience of usage.experiences) {
    const startMatch = experience.start_date.match(/\d{4}/);
    if (startMatch) years.add(Number(startMatch[0]));

    if (experience.end_date !== "present") {
      const endMatch = experience.end_date.match(/\d{4}/);
      if (endMatch) years.add(Number(endMatch[0]));
    } else {
      years.add(new Date().getFullYear());
    }
  }

  if (years.size === 0) return null;

  const sorted = [...years].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  return min === max ? `${min}` : `${min}–${max}`;
}

export function formatStackUsageCounts(usage: StackUsage): string {
  const parts: string[] = [];
  if (usage.projectCount > 0) {
    parts.push(
      `${usage.projectCount} project${usage.projectCount === 1 ? "" : "s"}`,
    );
  }
  if (usage.experienceCount > 0) {
    parts.push(
      `${usage.experienceCount} role${usage.experienceCount === 1 ? "" : "s"}`,
    );
  }
  return parts.join(" · ");
}

export { STACK_CATEGORIES, LANGUAGES_TOOLS, FRONTEND_STACKS, BACKEND_DEVOPS };
