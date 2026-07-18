import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import config from "~/config";
import { Breadcrumb } from "~/components/shared";
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
            author: {
              "@type": "Person",
              name: config.appName,
              url: `https://${config.domainName}`,
            },
            keywords: entry.tags.join(", "),
          }),
        }}
      />

      <header className="space-y-2">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Writing", url: "/about/writing" },
            { name: entry.title, url: `/about/writing/${entry.slug}` },
          ]}
        />

        <div className="space-y-4 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
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
          </div>

          <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {entry.title}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {entry.description}
          </p>

          {entry.tags.length > 0 && (
            <ul
              className="flex flex-wrap gap-x-3 gap-y-1 pt-1"
              aria-label="Topics"
            >
              {entry.tags.map((tag) => (
                <li key={tag} className="text-xs text-ring/90">
                  #{tag.toLowerCase().replaceAll(" ", "-")}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

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
