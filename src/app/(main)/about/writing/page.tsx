import { type Metadata } from "next";
import config from "~/config";
import { PageHeader } from "~/components/shared";
import { WritingCard } from "~/components/features/writing";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { getWritingEntries } from "~/lib/writing";

export const metadata: Metadata = getSEOTags({
  title: "Writing",
  description:
    "Reflections on building, learning, reading, and the ideas worth carrying forward.",
  openGraph: {
    title: `Writing — ${config.appName}`,
    description:
      "Lessons, open questions, and ideas shaped by work, books, and experience.",
  },
  canonicalUrlRelative: "/about/writing",
});

export default async function WritingPage() {
  const entries = await getWritingEntries();
  const [featuredEntry, ...archiveEntries] = entries;

  return (
    <div className="space-y-8 font-poem">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Me", url: "/about" },
        { name: "Writing", url: "/about/writing" },
      ])}

      <PageHeader
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About Me", url: "/about" },
          { name: "Writing", url: "/about/writing" },
        ]}
        title="What I Write"
        titleClassName="font-poem"
        subtitle="Reflections on building, learning, and ideas worth keeping."
      />

      {featuredEntry ? (
        <div className="space-y-14">
          <section aria-label="Latest writing">
            <WritingCard entry={featuredEntry} variant="featured" />
          </section>

          {archiveEntries.length > 0 && (
            <section aria-label="More writing">
              <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {archiveEntries.map((entry, index) => (
                  <WritingCard key={entry.slug} entry={entry} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <section className="border-y border-border py-10">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            The first pieces are being edited. This space will soon hold the
            ideas, lessons, and reflections that earned a second look.
          </p>
        </section>
      )}
    </div>
  );
}
