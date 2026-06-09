import { type Metadata } from "next";
import Script from "next/script";
import { monthlyChangelog } from "~/data/changelog";
import type { ChangelogChange, ChangelogChangeType } from "~/data/changelog";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { Breadcrumb } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import config from "~/config";

export const metadata: Metadata = getSEOTags({
  title: "Changelog",
  description: `Everything new, improved, and fixed on ${config.appName}'s portfolio — a monthly log of features, refinements, and fixes.`,
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
    description: `A monthly log of everything new, improved, and fixed on ${config.appName}'s portfolio.`,
  },
});

const TYPE_CONFIG: Record<
  ChangelogChangeType,
  { label: string; dot: string; badge: string }
> = {
  added: {
    label: "Added",
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  improved: {
    label: "Improved",
    dot: "bg-sky-500",
    badge: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  },
  fixed: {
    label: "Fixed",
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
};

const TYPE_ORDER: ChangelogChangeType[] = ["added", "improved", "fixed"];

function formatMonth(month: string): string {
  const [year, monthIndex] = month.split("-").map(Number);
  return new Date(year, monthIndex - 1).toLocaleDateString(
    config.seo.language,
    {
      year: "numeric",
      month: "long",
    },
  );
}

function groupByType(
  changes: ChangelogChange[],
): Partial<Record<ChangelogChangeType, ChangelogChange[]>> {
  const groups: Partial<Record<ChangelogChangeType, ChangelogChange[]>> = {};
  for (const change of changes) {
    (groups[change.type] ??= []).push(change);
  }
  return groups;
}

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
              description: entry.description,
              datePublished: `${entry.month}-01`,
              url: `https://${config.domainName}/changelog#${entry.month}`,
            },
          })),
        }),
      }}
    />
  );
}

const ChangelogPage = () => {
  return (
    <div className="space-y-8">
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

      <div className="mt-4 space-y-1">
        <h1 className={cn(typo({ variant: "h2" }))}>Changelog</h1>
        <p className={cn(typo({ variant: "paragraph", size: "sm" }))}>
          Everything new, improved, and fixed.{" "}
        </p>
      </div>

      <div className="relative">
        {monthlyChangelog.map((entry) => {
          const groups = groupByType(entry.changes);

          return (
            <section
              key={entry.month}
              id={entry.month}
              className="relative grid scroll-mt-24 grid-cols-1 gap-x-10 border-border pb-16 md:grid-cols-[10rem_1fr]"
            >
              {/* Date rail */}
              <div className="mb-4 md:mb-0">
                <div className="md:sticky md:top-24">
                  <time
                    dateTime={`${entry.month}-01`}
                    className="text-sm font-medium text-muted-foreground"
                  >
                    {formatMonth(entry.month)}
                  </time>
                </div>
              </div>

              {/* Entry content */}
              <div className="relative border-l border-border pl-6 md:pl-10">
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-1.5 size-[9px] rounded-full bg-foreground"
                />

                <h2 className="font-ubuntu text-base font-bold leading-snug">
                  {entry.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>

                <div className="mt-6 space-y-6">
                  {TYPE_ORDER.map((type) => {
                    const changes = groups[type];
                    if (!changes?.length) return null;
                    const { label, dot, badge } = TYPE_CONFIG[type];

                    return (
                      <div key={type}>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                            badge,
                          )}
                        >
                          <span
                            aria-hidden
                            className={cn("size-1.5 rounded-full", dot)}
                          />
                          {label}
                        </span>

                        <ul className="mt-3 space-y-2.5">
                          {changes.map((change, index) => (
                            <li
                              key={`${type}-${index}`}
                              className="flex gap-3 text-sm text-justify leading-relaxed text-foreground/90"
                            >
                              <span
                                aria-hidden
                                className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-muted-foreground/60"
                              />
                              <span>{change.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ChangelogPage;
