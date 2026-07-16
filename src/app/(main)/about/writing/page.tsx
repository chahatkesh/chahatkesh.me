import { type Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import config from "~/config";
import { Breadcrumb, MotionDiv, RevealSection } from "~/components/shared";
import { formatDate } from "~/lib/date-utils";
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
    <div className="space-y-10 font-poem">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Me", url: "/about" },
        { name: "Writing", url: "/about/writing" },
      ])}

      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "About Me", url: "/about" },
          { name: "Writing", url: "/about/writing" },
        ]}
      />

      <MotionDiv
        className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="max-w-2xl space-y-3">
          <h1 className="text-4xl font-semibold leading-none text-foreground sm:text-5xl">
            Writing
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Reflections on what I am learning, building, reading, and becoming.
          </p>
        </div>
        <p className="shrink-0 font-sans text-xs text-muted-foreground">
          {entries.length.toString().padStart(2, "0")} published{" "}
          {entries.length === 1 ? "piece" : "pieces"}
        </p>
      </MotionDiv>

      {featuredEntry ? (
        <div className="space-y-12">
          <section aria-label="Latest writing">
            <RevealSection>
              <Link
                href={`/about/writing/${featuredEntry.slug}`}
                className="group relative grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 gap-y-4 border-b border-border pb-10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[2rem_minmax(0,1fr)_8rem] sm:gap-x-6"
              >
                <span aria-hidden className="pt-1 font-sans text-xs text-ring">
                  01
                </span>

                <div className="min-w-0 space-y-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs text-muted-foreground">
                    <span className="text-ring">Latest piece</span>
                    <span aria-hidden>·</span>
                    <time dateTime={featuredEntry.date}>
                      {formatDate(featuredEntry.date)}
                    </time>
                    <span aria-hidden>·</span>
                    <span className="flex items-center gap-1">
                      <Clock3 aria-hidden className="size-3" />
                      {featuredEntry.readingTime} min read
                    </span>
                  </div>

                  <h2 className="max-w-3xl pr-8 text-2xl font-semibold leading-tight text-foreground transition-colors group-hover:text-ring sm:text-3xl">
                    {featuredEntry.title}
                  </h2>
                  <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {featuredEntry.description}
                  </p>
                  {featuredEntry.tags.length > 0 && (
                    <ul
                      className="flex flex-wrap gap-x-4 gap-y-1 font-sans text-xs text-muted-foreground/80"
                      aria-label="Topics"
                    >
                      {featuredEntry.tags.map((tag) => (
                        <li key={tag}>
                          #{tag.toLowerCase().replaceAll(" ", "-")}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <ArrowUpRight
                  aria-hidden
                  className="absolute right-0 top-10 size-6 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ring sm:static sm:ml-auto sm:mt-7 sm:size-7"
                />
              </Link>
            </RevealSection>
          </section>

          {archiveEntries.length > 0 && (
            <section aria-labelledby="writing-archive-title">
              <div className="flex items-baseline justify-between border-b border-border pb-3">
                <h2
                  id="writing-archive-title"
                  className="text-xl font-semibold text-foreground"
                >
                  Archive
                </h2>
                <span className="font-sans text-xs text-muted-foreground">
                  {archiveEntries.length.toString().padStart(2, "0")} older
                </span>
              </div>

              {archiveEntries.map((entry, index) => (
                <RevealSection key={entry.slug} delay={index * 0.04}>
                  <Link
                    href={`/about/writing/${entry.slug}`}
                    className="group grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 gap-y-3 border-b border-border py-7 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[2rem_minmax(0,1fr)_8rem] sm:gap-x-6"
                  >
                    <span
                      aria-hidden
                      className="pt-1 font-sans text-xs text-muted-foreground"
                    >
                      {(index + 2).toString().padStart(2, "0")}
                    </span>

                    <div className="min-w-0 space-y-3">
                      <h3 className="flex items-start gap-2 text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-ring sm:text-2xl">
                        <span>{entry.title}</span>
                        <ArrowUpRight
                          aria-hidden
                          className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ring"
                        />
                      </h3>
                      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {entry.description}
                      </p>
                      {entry.tags.length > 0 && (
                        <ul
                          className="flex flex-wrap gap-x-4 gap-y-1 font-sans text-xs text-muted-foreground/80"
                          aria-label="Topics"
                        >
                          {entry.tags.map((tag) => (
                            <li key={tag}>
                              #{tag.toLowerCase().replaceAll(" ", "-")}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="col-start-2 flex items-center gap-3 font-sans text-xs text-muted-foreground sm:col-start-3 sm:row-start-1 sm:flex-col sm:items-end sm:gap-1 sm:pt-1">
                      <time dateTime={entry.date}>
                        {formatDate(entry.date)}
                      </time>
                      <span className="flex items-center gap-1">
                        <Clock3 aria-hidden className="size-3" />
                        {entry.readingTime} min read
                      </span>
                    </div>
                  </Link>
                </RevealSection>
              ))}
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
