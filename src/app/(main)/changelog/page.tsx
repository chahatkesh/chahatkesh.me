import { type Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight } from "lucide-react";
import { monthlyChangelog, changelogStats } from "~/data/changelog";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { Breadcrumb, RevealCard } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import config from "~/config";
import {
  TYPE_CONFIG,
  countByType,
  formatMonth,
  formatMonthAbbr,
} from "./_shared";

export const metadata: Metadata = getSEOTags({
  title: "Changelog",
  description:
    "A monthly log of every feature, refinement, and fix shipped to this portfolio.",
  canonicalUrlRelative: "/changelog",
  keywords: [
    "changelog",
    "release notes",
    "updates",
    "what's new",
    "portfolio updates",
    config.appName,
  ],
  openGraph: {
    title: `Changelog — ${config.appName}`,
    description:
      "Shipped to this portfolio — what's new, improved, and fixed each month.",
  },
});

function ChangelogJsonLd() {
  return (
    <Script
      id="changelog-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Changelog — ${config.appName}`,
          description: `Monthly release notes for ${config.appName}'s portfolio.`,
          numberOfItems: monthlyChangelog.length,
          itemListElement: monthlyChangelog.map((entry, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Article",
              headline: entry.title,
              description: entry.summary,
              datePublished: `${entry.month}-01`,
              url: `https://${config.domainName}/changelog/${entry.month}`,
            },
          })),
        }),
      }}
    />
  );
}

/** Group months (newest-first) into year buckets, preserving order. */
function groupByYear() {
  const groups: { year: string; entries: typeof monthlyChangelog }[] = [];
  for (const entry of monthlyChangelog) {
    const year = entry.month.slice(0, 4);
    const bucket = groups.find((g) => g.year === year);
    if (bucket) bucket.entries.push(entry);
    else groups.push({ year, entries: [entry] });
  }
  return groups;
}

const ChangelogPage = () => {
  const yearGroups = groupByYear();
  const latestMonth = monthlyChangelog[0]?.month;

  return (
    <div className="space-y-12">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Changelog", url: "/changelog" },
      ])}
      <ChangelogJsonLd />

      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Changelog", url: "/changelog" },
        ]}
      />

      {/* Header */}
      <div className="mt-4 space-y-3">
        <h1 className={cn(typo({ variant: "h2" }), "text-2xl")}>Changelog</h1>
        <p
          className={cn(
            typo({ variant: "paragraph", size: "sm" }),
            "max-w-xl leading-relaxed",
          )}
        >
          A monthly log of everything new, improved, and fixed.
        </p>

        {/* Quiet credibility line */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">
            {changelogStats.totalMonths}
          </span>
          <span>months</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="font-medium text-foreground/80">
            {changelogStats.totalCommits}+
          </span>
          <span>commits</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="font-medium text-foreground/80">
            {changelogStats.totalChanges}
          </span>
          <span>updates shipped</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Continuous vertical rail */}
        <span
          aria-hidden
          className="absolute bottom-1 left-[5px] top-2 w-px bg-border"
        />

        <div className="space-y-10">
          {yearGroups.map((group) => {
            const yearUpdates = group.entries.reduce(
              (sum, entry) => sum + entry.changes.length,
              0,
            );

            return (
              <section key={group.year} className="space-y-6">
                {/* Year marker */}
                <div className="flex items-center gap-3 pl-8">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                    {group.year}
                  </h2>
                  <span className="h-px flex-1 bg-border/60" />
                  <span className="text-[11px] text-muted-foreground/50">
                    {yearUpdates} {yearUpdates === 1 ? "update" : "updates"}
                  </span>
                </div>

                <ul>
                  {group.entries.map((entry, index) => {
                    const counts = countByType(entry.changes);
                    const isLatest = entry.month === latestMonth;

                    return (
                      <li
                        key={entry.month}
                        className="group/item relative pl-8"
                      >
                        {/* Timeline node */}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute left-0 top-[7px] size-[11px] rounded-full border-2 border-background transition-colors",
                            isLatest
                              ? "bg-ring"
                              : "bg-muted-foreground/30 group-hover/item:bg-muted-foreground/60",
                          )}
                        />

                        <RevealCard index={index}>
                          <Link
                            href={`/changelog/${entry.month}`}
                            aria-label={`${formatMonth(entry.month)}: ${entry.title}`}
                            className="el-focus-styles block border-b border-border py-5 transition-colors duration-300 group-hover/item:border-muted-foreground/30"
                          >
                            {/* Title row */}
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
                                <h3 className="font-ubuntu text-base font-semibold leading-snug text-foreground transition-colors duration-200 group-hover/item:text-ring">
                                  {entry.title}
                                </h3>
                                {isLatest && (
                                  <span className="inline-flex items-center rounded-full border border-ring/30 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ring">
                                    Latest
                                  </span>
                                )}
                              </div>

                              <time
                                dateTime={`${entry.month}-01`}
                                className="shrink-0 pt-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground/70"
                              >
                                {formatMonthAbbr(entry.month)}
                              </time>
                            </div>

                            {/* Summary */}
                            <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                              {entry.summary}
                            </p>

                            {/* Meta */}
                            <div className="mt-3 flex items-center justify-between gap-3">
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                                {counts.map(({ type, count }) => (
                                  <span
                                    key={type}
                                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/80"
                                  >
                                    <span
                                      aria-hidden
                                      className={cn(
                                        "size-1.5 rounded-full",
                                        TYPE_CONFIG[type].dot,
                                      )}
                                    />
                                    <span className="tabular-nums">
                                      {count}{" "}
                                      {TYPE_CONFIG[type].label.toLowerCase()}
                                    </span>
                                  </span>
                                ))}
                              </div>

                              <span
                                aria-hidden
                                className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground/0 transition-colors duration-200 group-hover/item:text-ring"
                              >
                                Read
                                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/item:translate-x-0.5" />
                              </span>
                            </div>
                          </Link>
                        </RevealCard>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChangelogPage;
