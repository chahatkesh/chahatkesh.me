import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  monthlyChangelog,
  getChangelogEntry,
  getAdjacentChangelog,
} from "~/data/changelog";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { Breadcrumb, RevealSection } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import config from "~/config";
import {
  TYPE_CONFIG,
  TYPE_ORDER,
  formatMonth,
  formatMonthShort,
  groupByType,
} from "../_shared";

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
          datePublished: `${entry.month}-01`,
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
  const groups = groupByType(entry.changes);
  const { newer, older } = getAdjacentChangelog(entry.month);

  const stats = [
    {
      value: entry.changes.length,
      label: entry.changes.length === 1 ? "update" : "updates",
    },
    {
      value: entry.stats.commits,
      label: entry.stats.commits === 1 ? "commit" : "commits",
    },
    { value: entry.stats.files, label: "files touched" },
  ];

  return (
    <div className="space-y-12">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Changelog", url: "/changelog" },
        { name: label, url: `/changelog/${entry.month}` },
      ])}

      <ChangelogEntryJsonLd entry={entry} />

      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Changelog", url: "/changelog" },
          { name: label, url: `/changelog/${entry.month}` },
        ]}
      />

      {/* Header */}
      <RevealSection className="mt-4 space-y-3">
        <h1 className={cn(typo({ variant: "h2" }), "text-2xl")}>
          {entry.title}
        </h1>

        <p
          className={cn(
            typo({ variant: "paragraph", size: "sm" }),
            "leading-relaxed",
          )}
        >
          {entry.overview}
        </p>

        {/* Stats — same scale as the changelog index */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-xs text-muted-foreground">
          {stats.map((stat, i) => (
            <span key={stat.label} className="flex items-center gap-2">
              {i > 0 && <span className="text-muted-foreground/40">·</span>}
              <span>
                <span className="font-medium text-foreground/80">
                  {stat.value}
                </span>{" "}
                {stat.label}
              </span>
            </span>
          ))}
        </div>
      </RevealSection>

      {/* Changes — grouped by type, on a quiet timeline rail */}
      <div className="relative border-t border-border pt-10">
        <span
          aria-hidden
          className="absolute bottom-0 left-[5px] top-12 w-px bg-border"
        />

        <div className="space-y-10">
          {TYPE_ORDER.map((type) => {
            const changes = groups[type];
            if (!changes?.length) return null;
            const { label: typeLabel, dot, text } = TYPE_CONFIG[type];

            return (
              <RevealSection key={type} className="relative pl-8">
                {/* Node */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-[3px] size-[11px] rounded-full border-2 border-background",
                    dot,
                  )}
                />

                {/* Group header */}
                <div className="flex items-baseline gap-2.5">
                  <h2
                    className={cn(
                      "text-xs font-semibold uppercase tracking-[0.18em]",
                      text,
                    )}
                  >
                    {typeLabel}
                  </h2>
                  <span className="text-[11px] text-muted-foreground/50">
                    {changes.length}
                  </span>
                </div>

                {/* Items */}
                <ul className="mt-3 divide-y divide-border/60 border-t border-border/60">
                  {changes.map((change, index) => (
                    <li key={`${type}-${index}`} className="py-4">
                      <h3 className="font-ubuntu text-sm font-semibold leading-snug text-foreground">
                        {change.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {change.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </RevealSection>
            );
          })}
        </div>
      </div>

      {/* Prev / Next navigation — minimal, borderless */}
      <nav
        aria-label="Changelog navigation"
        className="grid grid-cols-2 gap-6 border-t border-border pt-6"
      >
        {newer ? (
          <Link
            href={`/changelog/${newer.month}`}
            className="el-focus-styles group block min-w-0"
          >
            <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              {formatMonthShort(newer.month)}
            </span>
            <span className="mt-1.5 block truncate text-sm font-medium text-foreground/90 transition-colors group-hover:text-ring">
              {newer.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {older && (
          <Link
            href={`/changelog/${older.month}`}
            className="el-focus-styles group col-start-2 block min-w-0 text-right"
          >
            <span className="flex items-center justify-end gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
              {formatMonthShort(older.month)}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
            <span className="mt-1.5 block truncate text-sm font-medium text-foreground/90 transition-colors group-hover:text-ring">
              {older.title}
            </span>
          </Link>
        )}
      </nav>
    </div>
  );
}
