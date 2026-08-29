import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import config from "~/config";
import { PageHeader } from "~/components/shared";
import { WritingCover } from "~/components/features/writing";
import { formatDate } from "~/lib/date-utils";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { getWritingEntries, getWritingEntry } from "~/lib/writing";
import "~/styles/markdown.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const entries = await getWritingEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getWritingEntry(slug);

  if (!entry || entry.draft) {
    return getSEOTags({
      title: "Writing Not Found",
      description: "The requested piece could not be found.",
    });
  }

  return getSEOTags({
    title: entry.title,
    description: entry.description,
    canonicalUrlRelative: `/about/writing/${entry.slug}`,
    markdownUrlRelative: `/about/writing/${entry.slug}.md`,
    keywords: [...entry.tags, "reflections", "writing", config.appName],
    openGraph: {
      title: entry.title,
      description: entry.description,
      type: "article",
      publishedTime: entry.date,
      modifiedTime: entry.updated,
      tags: entry.tags,
    },
  });
}

export default async function WritingEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = await getWritingEntry(slug);

  if (!entry || entry.draft) notFound();

  const entries = await getWritingEntries();
  const currentIndex = entries.findIndex((item) => item.slug === entry.slug);
  const newerEntry = currentIndex > 0 ? entries[currentIndex - 1] : null;
  const olderEntry =
    currentIndex >= 0 && currentIndex < entries.length - 1
      ? entries[currentIndex + 1]
      : null;

  return (
    <div className="space-y-8 font-poem">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Writing", url: "/about/writing" },
        { name: entry.title, url: `/about/writing/${entry.slug}` },
      ])}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: entry.title,
            description: entry.description,
            datePublished: entry.date,
            dateModified: entry.updated ?? entry.date,
            url: `https://${config.domainName}/about/writing/${entry.slug}`,
            image: `https://${config.domainName}/about/writing/${entry.slug}/opengraph-image`,
            author: {
              "@type": "Person",
              name: config.appName,
              url: `https://${config.domainName}`,
            },
            keywords: entry.tags.join(", "),
            articleBody: entry.markdown,
            encodingFormat: "text/markdown",
          }).replace(/</g, "\\u003c"),
        }}
      />

      <PageHeader
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Writing", url: "/about/writing" },
          { name: entry.title, url: `/about/writing/${entry.slug}` },
        ]}
        title={entry.title}
        titleClassName="font-poem max-w-3xl text-balance"
        subtitle={entry.subtitle}
      />

      <div className="relative aspect-[2/1] overflow-hidden rounded-xl border border-border/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:aspect-[2.2/1] sm:rounded-2xl">
        <WritingCover slug={entry.slug} title={entry.title} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-b border-border pb-8 font-poem text-xs text-muted-foreground">
        <time dateTime={entry.date}>{formatDate(entry.date)}</time>
        <span aria-hidden>·</span>
        <span className="flex items-center gap-1">
          <Clock3 aria-hidden className="size-3" />
          {entry.readingTime} min read
        </span>
        {entry.updated && (
          <>
            <span aria-hidden>·</span>
            <span>Updated {formatDate(entry.updated)}</span>
          </>
        )}
        <span aria-hidden>·</span>
        <a
          href={`/about/writing/${entry.slug}.md`}
          className="transition-colors hover:text-ring"
        >
          Markdown
        </a>
      </div>

      <article className="markdown-body markdown-github writing-prose w-full">
        {entry.content}
      </article>

      <nav
        aria-label="More writing"
        className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2"
      >
        {newerEntry ? (
          <Link
            href={`/about/writing/${newerEntry.slug}`}
            className="group space-y-1 text-left"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeft
                aria-hidden
                className="size-3 transition-transform group-hover:-translate-x-1"
              />
              Newer piece
            </span>
            <span className="block text-sm font-medium text-foreground group-hover:text-ring">
              {newerEntry.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {olderEntry && (
          <Link
            href={`/about/writing/${olderEntry.slug}`}
            className="group space-y-1 text-left sm:text-right"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground sm:justify-end">
              Older piece
              <ArrowRight
                aria-hidden
                className="size-3 transition-transform group-hover:translate-x-1"
              />
            </span>
            <span className="block text-sm font-medium text-foreground group-hover:text-ring">
              {olderEntry.title}
            </span>
          </Link>
        )}
      </nav>
    </div>
  );
}
