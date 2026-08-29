import { type Metadata } from "next";
import { DiagramCanvas } from "~/components/features/diagram";
import { TimelineView } from "~/components/features/timeline";
import config from "~/config";
import { getSEOTags } from "~/lib/seo";
import { buildUnifiedTimeline, toISODate } from "~/lib/timeline-utils";
import { getWritingEntries } from "~/lib/writing";

export const metadata: Metadata = getSEOTags({
  title: "Timeline",
  description:
    "A calibrated map of work, projects, writing, videos, and life — every dated thing on this site in one place.",
  canonicalUrlRelative: "/timeline",
  keywords: [
    "Timeline",
    "Portfolio",
    "Experience",
    "Projects",
    "Writing",
    "Journey",
  ],
  openGraph: {
    title: `The Record — ${config.appName}`,
    description:
      "Work, projects, writing, and life placed on a single calibrated map.",
  },
});

const TimelinePage = async () => {
  const writing = await getWritingEntries();
  const items = buildUnifiedTimeline(
    writing.map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      subtitle: entry.subtitle,
      description: entry.description,
      date: entry.date,
      readingTime: entry.readingTime,
    })),
  );

  return (
    <DiagramCanvas>
      <h1 className="sr-only">The Record</h1>
      <TimelineView
        items={items}
        now={toISODate(new Date())}
        authorName={config.author.name}
        authorUrl="/"
      />
    </DiagramCanvas>
  );
};

export default TimelinePage;
