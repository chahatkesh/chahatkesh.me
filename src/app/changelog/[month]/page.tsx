import { type Metadata } from "next";
import { notFound } from "next/navigation";
import {
  monthlyChangelog,
  getChangelogEntry,
  getAdjacentChangelog,
} from "~/data/changelog";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { ChangelogDetail } from "~/components/features/changelog";
import config from "~/config";
import { formatMonth } from "../_shared";

type Props = {
  params: Promise<{ month: string }>;
};

export async function generateStaticParams() {
  return monthlyChangelog.map((entry) => ({ month: entry.month }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { month } = await params;
  const entry = getChangelogEntry(month);

  if (!entry) {
    return getSEOTags({
      title: "Changelog Entry Not Found",
      description: "The requested changelog month could not be found.",
    });
  }

  const label = formatMonth(entry.month);

  return getSEOTags({
    title: `${label} — Changelog`,
    description: entry.summary,
    canonicalUrlRelative: `/changelog/${entry.month}`,
    keywords: ["changelog", "release notes", label, "updates", config.appName],
    openGraph: {
      title: `${entry.title} — ${label}`,
      description: entry.summary,
    },
  });
}

function ChangelogEntryJsonLd({
  entry,
}: {
  entry: NonNullable<ReturnType<typeof getChangelogEntry>>;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: entry.title,
          description: entry.summary,
          datePublished: entry.publishedAt,
          url: `https://${config.domainName}/changelog/${entry.month}`,
          author: {
            "@type": "Person",
            name: config.appName,
            url: `https://${config.domainName}`,
          },
        }),
      }}
    />
  );
}

export default async function ChangelogMonthPage({ params }: Props) {
  const { month } = await params;
  const entry = getChangelogEntry(month);

  if (!entry) {
    notFound();
  }

  const label = formatMonth(entry.month);
  const { newer, older } = getAdjacentChangelog(entry.month);

  return (
    <>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Changelog", url: "/changelog" },
        { name: label, url: `/changelog/${entry.month}` },
      ])}

      <ChangelogEntryJsonLd entry={entry} />

      <ChangelogDetail entry={entry} newer={newer} older={older} />
    </>
  );
}
