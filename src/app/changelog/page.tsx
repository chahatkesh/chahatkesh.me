import { type Metadata } from "next";
import Script from "next/script";
import { monthlyChangelog } from "~/data/changelog";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { ChangelogList } from "~/components/features/changelog";
import config from "~/config";

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
              datePublished: entry.publishedAt,
              url: `https://${config.domainName}/changelog/${entry.month}`,
            },
          })),
        }),
      }}
    />
  );
}

const ChangelogPage = () => {
  return (
    <>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Changelog", url: "/changelog" },
      ])}
      <ChangelogJsonLd />

      <div className="mx-auto max-w-5xl px-4 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-32">
        <header className="mb-10 sm:mb-20">
          <h1 className="font-sans text-[clamp(2.75rem,12vw,6.25rem)] font-medium leading-[0.95] tracking-[-0.03em] text-foreground">
            Changelog
          </h1>
        </header>

        <ChangelogList entries={monthlyChangelog} />
      </div>
    </>
  );
};

export default ChangelogPage;
