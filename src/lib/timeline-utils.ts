import { btechCourses } from "~/data/btech-courses";
import { experiences } from "~/data/experience";
import { projects } from "~/data/projects";
import { timelineEvents } from "~/data/timeline";
import { youtubeVideos } from "~/data/youtube";
import { parseMonthYear } from "~/lib/date-utils";

export const TIMELINE_KINDS = [
  "work",
  "project",
  "writing",
  "video",
  "life",
  "school",
] as const;

export type TimelineKind = (typeof TIMELINE_KINDS)[number];

export type TimelinePrecision = "day" | "month";

export type WritingTimelineInput = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  readingTime: number;
};

export type UnifiedTimelineItem = {
  id: string;
  kind: TimelineKind;
  title: string;
  description: string;
  href?: string;
  location?: string;
  meta?: string;
  start: string;
  end?: string;
  ongoing: boolean;
  precision: TimelinePrecision;
};

export type TimelineKindMeta = {
  label: string;
  shortLabel: string;
  dot: string;
  text: string;
  bar: string;
  ring: string;
  wash: string;
  glow: string;
};

export const TIMELINE_KIND_META: Record<TimelineKind, TimelineKindMeta> = {
  work: {
    label: "Work",
    shortLabel: "Work",
    dot: "bg-violet-400",
    text: "text-violet-400",
    bar: "bg-violet-400/80",
    ring: "ring-violet-400/50",
    wash: "bg-violet-400/[0.08]",
    glow: "hover:shadow-[0_0_14px_rgba(167,139,250,0.55)]",
  },
  project: {
    label: "Projects",
    shortLabel: "Project",
    dot: "bg-sky-400",
    text: "text-sky-400",
    bar: "bg-sky-400/80",
    ring: "ring-sky-400/50",
    wash: "bg-sky-400/[0.08]",
    glow: "hover:shadow-[0_0_14px_rgba(56,189,248,0.5)]",
  },
  writing: {
    label: "Blogs",
    shortLabel: "Blogs",
    dot: "bg-amber-400",
    text: "text-amber-400",
    bar: "bg-amber-400/80",
    ring: "ring-amber-400/50",
    wash: "bg-amber-400/[0.08]",
    glow: "hover:shadow-[0_0_14px_rgba(251,191,36,0.5)]",
  },
  video: {
    label: "Videos",
    shortLabel: "Video",
    dot: "bg-rose-400",
    text: "text-rose-400",
    bar: "bg-rose-400/80",
    ring: "ring-rose-400/50",
    wash: "bg-rose-400/[0.08]",
    glow: "hover:shadow-[0_0_14px_rgba(251,113,133,0.5)]",
  },
  life: {
    label: "Life",
    shortLabel: "Life",
    dot: "bg-pink-400",
    text: "text-pink-400",
    bar: "bg-pink-400/80",
    ring: "ring-pink-400/50",
    wash: "bg-pink-400/[0.08]",
    glow: "hover:shadow-[0_0_14px_rgba(244,114,182,0.5)]",
  },
  school: {
    label: "School",
    shortLabel: "School",
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bar: "bg-emerald-400/80",
    ring: "ring-emerald-400/50",
    wash: "bg-emerald-400/[0.08]",
    glow: "hover:shadow-[0_0_14px_rgba(52,211,153,0.5)]",
  },
};

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const LIFE_CATEGORIES = new Set([
  "achievement",
  "learning",
  "travel",
  "hackathon",
  "workshop",
  "other",
  "project",
]);

export function parseISODate(value: string): Date {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function experienceToISO(
  value: string,
): { iso: string; precision: TimelinePrecision } | null {
  if (value.toLowerCase() === "present") return null;

  const parsed = parseMonthYear(value);
  if (Number.isNaN(parsed.getTime())) return null;

  const hasDay = /\d{1,2},/.test(value);
  return {
    iso: toISODate(parsed),
    precision: hasDay ? "day" : "month",
  };
}

function normalizeTitle(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titlesOverlap(left: string, right: string): boolean {
  const a = normalizeTitle(left);
  const b = normalizeTitle(right);
  if (a.length < 4 || b.length < 4) return false;
  return a.includes(b) || b.includes(a);
}

function isCoveredByCatalog(title: string): boolean {
  return (
    projects.some((project) => titlesOverlap(title, project.title)) ||
    experiences.some(
      (experience) =>
        titlesOverlap(title, experience.employer) ||
        titlesOverlap(title, experience.role),
    )
  );
}

function clipSentence(text: string, maxLength = 220): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (!trimmed) return "";

  const sentence = trimmed.match(/^[^.!?\n]+[.!?]?/)?.[0]?.trim() ?? trimmed;
  if (sentence.length <= maxLength) return sentence;

  const clipped = sentence.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > maxLength * 0.6 ? clipped.slice(0, lastSpace) : clipped).trim()}…`;
}

function semesterWindow(academicYear: string, number: number) {
  const [startYearText, endYearText] = academicYear.split("-");
  const startYear = Number(startYearText);
  const endYear =
    endYearText.length === 2
      ? Number(`${startYearText.slice(0, 2)}${endYearText}`)
      : Number(endYearText);
  const odd = number % 2 === 1;

  return {
    start: toISODate(new Date(odd ? startYear : endYear, odd ? 7 : 0, 1)),
    end: toISODate(
      new Date(odd ? startYear : endYear, odd ? 11 : 4, odd ? 31 : 31),
    ),
  };
}

function sortItems(items: UnifiedTimelineItem[]): UnifiedTimelineItem[] {
  return [...items].sort((a, b) => {
    const startDiff = a.start.localeCompare(b.start);
    if (startDiff !== 0) return startDiff;
    return a.title.localeCompare(b.title);
  });
}

export function buildUnifiedTimeline(
  writing: WritingTimelineInput[],
): UnifiedTimelineItem[] {
  const items: UnifiedTimelineItem[] = [];

  for (const experience of experiences) {
    const start = experienceToISO(experience.start_date);
    if (!start) continue;

    const ongoing = experience.end_date.toLowerCase() === "present";
    const end = ongoing ? undefined : experienceToISO(experience.end_date);

    items.push({
      id: `work-${experience.slug}`,
      kind: "work",
      title: `${experience.role} · ${experience.employer}`,
      description: clipSentence(experience.tagline || experience.description),
      href: `/about/experience/${experience.slug}`,
      location: experience.location,
      meta: experience.type,
      start: start.iso,
      end: end?.iso,
      ongoing,
      precision: start.precision,
    });
  }

  for (const project of projects) {
    items.push({
      id: `project-${project.slug}`,
      kind: "project",
      title: project.title,
      description: clipSentence(project.tagline || project.timelineDescription),
      href: `/projects/${project.slug}`,
      meta: project.isFeatured ? "Featured" : undefined,
      start: project.dateStarted,
      end: project.datePublished,
      ongoing: false,
      precision: "day",
    });
  }

  for (const entry of writing) {
    items.push({
      id: `writing-${entry.slug}`,
      kind: "writing",
      title: entry.title,
      description: clipSentence(entry.subtitle || entry.description),
      href: `/about/writing/${entry.slug}`,
      meta: `${entry.readingTime} min read`,
      start: entry.date,
      ongoing: false,
      precision: "day",
    });
  }

  for (const video of youtubeVideos) {
    items.push({
      id: `video-${video.slug}`,
      kind: "video",
      title: video.title,
      description: clipSentence(video.description),
      href: `/videos/${video.slug}`,
      meta: video.durationFormatted,
      start: video.publishedAt.slice(0, 10),
      ongoing: false,
      precision: "day",
    });
  }

  for (const semester of btechCourses) {
    const window = semesterWindow(semester.academicYear, semester.number);
    const credits = semester.courses.reduce(
      (sum, course) => sum + course.credits,
      0,
    );

    items.push({
      id: `school-${semester.id}`,
      kind: "school",
      title: `B.Tech Semester ${semester.number}`,
      description: `${semester.courses.length} courses · ${credits} credits · AY ${semester.academicYear}`,
      href: "/about/journey/btech",
      meta: `AY ${semester.academicYear}`,
      start: window.start,
      end: window.end,
      ongoing: false,
      precision: "month",
    });
  }

  for (const event of timelineEvents) {
    if (!LIFE_CATEGORIES.has(event.category)) continue;
    if (isCoveredByCatalog(event.title)) continue;

    const ongoing = event.endDate?.toLowerCase() === "present";

    items.push({
      id: event.id,
      kind: "life",
      title: event.title,
      description: clipSentence(event.description ?? ""),
      href: event.links?.[0]?.url,
      location: event.location || undefined,
      meta: event.category,
      start: event.startDate,
      end: ongoing ? undefined : event.endDate,
      ongoing,
      precision: "day",
    });
  }

  return sortItems(
    items.filter((item) => !Number.isNaN(parseISODate(item.start).getTime())),
  );
}

export function getTimelineYears(
  items: UnifiedTimelineItem[],
  now: Date = new Date(),
): number[] {
  const years = new Set<number>();

  for (const item of items) {
    years.add(parseISODate(item.start).getFullYear());
    if (item.end) years.add(parseISODate(item.end).getFullYear());
    if (item.ongoing) years.add(now.getFullYear());
  }

  return [...years].sort((a, b) => b - a);
}

export function countByKind(
  items: UnifiedTimelineItem[],
): Record<TimelineKind, number> {
  return TIMELINE_KINDS.reduce(
    (counts, kind) => {
      counts[kind] = items.filter((item) => item.kind === kind).length;
      return counts;
    },
    {} as Record<TimelineKind, number>,
  );
}

export function itemIntersectsYear(
  item: UnifiedTimelineItem,
  year: number,
  now: Date = new Date(),
): boolean {
  const start = parseISODate(item.start);
  const end = item.ongoing ? now : item.end ? parseISODate(item.end) : start;

  return start.getFullYear() <= year && end.getFullYear() >= year;
}

export function itemIntersectsMonth(
  item: UnifiedTimelineItem,
  year: number,
  month: number,
  now: Date = new Date(),
): boolean {
  const start = parseISODate(item.start);
  const end = item.ongoing ? now : item.end ? parseISODate(item.end) : start;
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0, 23, 59, 59);

  return start <= monthEnd && end >= monthStart;
}

export function yearPlacement(
  item: UnifiedTimelineItem,
  year: number,
  now: Date = new Date(),
): { left: number; width: number } {
  const yearStart = new Date(year, 0, 1);
  const yearEnd = new Date(year, 11, 31, 23, 59, 59);
  const start = parseISODate(item.start);
  const rawEnd = item.ongoing ? now : item.end ? parseISODate(item.end) : start;
  const visibleStart = start < yearStart ? yearStart : start;
  const visibleEnd = rawEnd > yearEnd ? yearEnd : rawEnd;
  const span = yearEnd.getTime() - yearStart.getTime();
  const left = ((visibleStart.getTime() - yearStart.getTime()) / span) * 100;
  const right = ((visibleEnd.getTime() - yearStart.getTime()) / span) * 100;
  const isRange = Boolean(item.end || item.ongoing);

  return {
    left: Math.max(0, Math.min(left, 100)),
    width: isRange ? Math.max(right - left, 1.4) : 0,
  };
}

export function formatTimelineDate(item: UnifiedTimelineItem): string {
  const start = parseISODate(item.start);
  const startLabel = formatDateLabel(start, item.precision);

  if (item.ongoing) return `${startLabel} — now`;
  if (!item.end || item.end === item.start) return startLabel;

  const end = parseISODate(item.end);
  const sameMonth =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth();

  if (item.precision === "month") {
    if (sameMonth) return startLabel;
    return `${startLabel} — ${formatDateLabel(end, "month")}`;
  }

  if (start.getFullYear() === end.getFullYear()) {
    if (sameMonth) {
      if (start.getDate() === end.getDate()) return startLabel;
      return `${MONTH_LABELS[start.getMonth()]} ${start.getDate()}–${end.getDate()}, ${end.getFullYear()}`;
    }
    return `${MONTH_LABELS[start.getMonth()]} ${start.getDate()} — ${MONTH_LABELS[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
  }

  return `${startLabel} — ${formatDateLabel(end, "day")}`;
}

function formatDateLabel(date: Date, precision: TimelinePrecision): string {
  if (precision === "month") {
    return `${MONTH_LABELS[date.getMonth()]} ${date.getFullYear()}`;
  }

  return `${MONTH_LABELS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatCompactDate(item: UnifiedTimelineItem): string {
  const start = parseISODate(item.start);
  if (item.precision === "month") {
    return `${MONTH_LABELS[start.getMonth()]} ${String(start.getFullYear()).slice(2)}`;
  }
  return `${MONTH_LABELS[start.getMonth()]} ${start.getDate()}`;
}

export function getMonthKeys(
  items: UnifiedTimelineItem[],
  now: Date = new Date(),
): { year: number; month: number; key: string }[] {
  if (items.length === 0) return [];

  const starts = items.map((item) => parseISODate(item.start));
  const ends = items.map((item) =>
    item.ongoing
      ? now
      : item.end
        ? parseISODate(item.end)
        : parseISODate(item.start),
  );
  const min = new Date(Math.min(...starts.map((date) => date.getTime())));
  const max = new Date(Math.max(...ends.map((date) => date.getTime())));

  const keys: { year: number; month: number; key: string }[] = [];
  const cursor = new Date(min.getFullYear(), min.getMonth(), 1);
  const last = new Date(max.getFullYear(), max.getMonth(), 1);

  while (cursor <= last) {
    keys.push({
      year: cursor.getFullYear(),
      month: cursor.getMonth(),
      key: `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`,
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return keys;
}

export function monthDensity(
  items: UnifiedTimelineItem[],
  year: number,
  month: number,
  now: Date = new Date(),
): number {
  return items.filter((item) => itemIntersectsMonth(item, year, month, now))
    .length;
}

/** Stable CSS percent so SSR and hydration stringify the same float. */
export function cssPercent(value: number): string {
  return `${value.toFixed(4)}%`;
}

export function getTimelineBounds(
  items: UnifiedTimelineItem[],
  now: Date = new Date(),
): { start: Date; end: Date } {
  if (items.length === 0) {
    return {
      start: new Date(now.getFullYear(), now.getMonth(), 1),
      end: now,
    };
  }

  const starts = items.map((item) => parseISODate(item.start).getTime());
  const ends = items.map((item) => {
    if (item.ongoing) return now.getTime();
    if (item.end) return parseISODate(item.end).getTime();
    return parseISODate(item.start).getTime();
  });

  const min = new Date(Math.min(...starts));
  const max = new Date(Math.max(...ends, now.getTime()));

  return {
    start: new Date(min.getFullYear(), min.getMonth(), 1),
    end: new Date(max.getFullYear(), max.getMonth(), max.getDate(), 23, 59, 59),
  };
}

export function positionOf(
  date: Date,
  rangeStart: Date,
  rangeEnd: Date,
): number {
  const span = rangeEnd.getTime() - rangeStart.getTime();
  if (span <= 0) return 0;
  return ((date.getTime() - rangeStart.getTime()) / span) * 100;
}

export function spanPlacement(
  item: UnifiedTimelineItem,
  rangeStart: Date,
  rangeEnd: Date,
  now: Date = new Date(),
): { left: number; width: number } {
  const start = parseISODate(item.start);
  const rawEnd = item.ongoing ? now : item.end ? parseISODate(item.end) : start;
  const left = positionOf(start, rangeStart, rangeEnd);
  const right = positionOf(rawEnd, rangeStart, rangeEnd);
  const isRange = Boolean(item.end || item.ongoing);

  return {
    left: Math.max(0, Math.min(left, 100)),
    width: isRange ? Math.max(right - left, 0.35) : 0,
  };
}

const POINT_HIT_PX = 10;
const RANGE_MIN_PX = 8;
const PACK_GAP_PX = 4;

export const TIMELINE_TRACK_HEIGHT = 14;
export const TIMELINE_LANE_PAD_Y = 13;
export const TIMELINE_AXIS_PAD_TOP = 32;

export function timelineLaneHeight(trackCount: number): number {
  return (
    TIMELINE_LANE_PAD_Y * 2 + Math.max(1, trackCount) * TIMELINE_TRACK_HEIGHT
  );
}

export type PackedLaneMark = {
  item: UnifiedTimelineItem;
  left: number;
  width: number;
  track: number;
};

export function packLaneMarks(
  items: UnifiedTimelineItem[],
  rangeStart: Date,
  rangeEnd: Date,
  now: Date,
  canvasWidth: number,
): { marks: PackedLaneMark[]; trackCount: number } {
  if (items.length === 0 || canvasWidth <= 0) {
    return { marks: [], trackCount: 1 };
  }

  const placed = items
    .map((item) => {
      const placement = spanPlacement(item, rangeStart, rangeEnd, now);
      const isRange = placement.width > 0;
      const widthPx = isRange
        ? Math.max((placement.width / 100) * canvasWidth, RANGE_MIN_PX)
        : POINT_HIT_PX;
      const startPx =
        (placement.left / 100) * canvasWidth - (isRange ? 0 : POINT_HIT_PX / 2);

      return {
        item,
        left: placement.left,
        width: placement.width,
        startPx,
        endPx: startPx + widthPx,
        track: 0,
      };
    })
    .sort(
      (a, b) =>
        a.startPx - b.startPx ||
        b.endPx - a.endPx ||
        a.item.id.localeCompare(b.item.id),
    );

  const trackEnds: number[] = [];

  for (const mark of placed) {
    const track = trackEnds.findIndex(
      (end) => end + PACK_GAP_PX <= mark.startPx,
    );
    if (track === -1) {
      mark.track = trackEnds.length;
      trackEnds.push(mark.endPx);
    } else {
      mark.track = track;
      trackEnds[track] = mark.endPx;
    }
  }

  return {
    marks: placed.map(({ item, left, width, track }) => ({
      item,
      left,
      width,
      track,
    })),
    trackCount: Math.max(1, trackEnds.length),
  };
}
