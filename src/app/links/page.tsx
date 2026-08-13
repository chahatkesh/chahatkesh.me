import { type Metadata } from "next";
import Link from "next/link";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { cn } from "~/lib/utils";
import { CodingActivityStatusBar } from "~/components/features";
import {
  startLinks,
  workLinks,
  allWritingLink,
  elsewhereLinks,
  footerSupportLink,
  type LinkItem,
} from "~/data/links";
import { LinksFeaturedGallery } from "~/components/features/gallery";
import {
  LinkGroup,
  LinkRow,
  LinksHero,
  LinksAnimatedSection,
} from "~/components/features/links";
import { SOCIAL_BRAND_COLORS } from "~/constants/theme";
import { getWritingEntries } from "~/lib/writing";

export const metadata: Metadata = getSEOTags({
  title: "Links",
  description:
    "Resume, writing, projects, socials, and ways to reach me — all in one place.",
  openGraph: {
    title: `Links — ${config.appName}`,
    description: "Every place I exist online — pick your platform.",
  },
  canonicalUrlRelative: "/links",
});

/** Container width shared by the hero and every list below it. */
const COLUMN = "mx-auto w-full max-w-2xl px-4";

async function getWritingLinks(): Promise<LinkItem[]> {
  const [latest] = await getWritingEntries();
  if (!latest) return [allWritingLink];

  return [
    {
      id: 21,
      title: latest.title,
      href: `/about/writing/${latest.slug}`,
      icon: "PenLine",
      meta: `${latest.readingTime} min`,
    },
    allWritingLink,
  ];
}

const LinksPage = async () => {
  const writingLinks = await getWritingLinks();

  return (
    <>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Links", url: "/links" },
      ])}

      <header className={cn(COLUMN, "pt-14 pb-10 md:pt-20 md:pb-12")}>
        <LinksAnimatedSection>
          <LinksHero />
        </LinksAnimatedSection>
      </header>

      <div className={cn(COLUMN, "space-y-8 pb-16")}>
        <LinksAnimatedSection delay={0.05}>
          <CodingActivityStatusBar />
        </LinksAnimatedSection>

        <LinksAnimatedSection inView>
          <LinkGroup label="Start here">
            {startLinks.map((item) => (
              <LinkRow key={item.id} item={item} emphasis />
            ))}
          </LinkGroup>
        </LinksAnimatedSection>

        <LinksAnimatedSection inView>
          <LinkGroup label="Latest writing">
            {writingLinks.map((item) => (
              <LinkRow key={item.id} item={item} />
            ))}
          </LinkGroup>
        </LinksAnimatedSection>

        <LinksAnimatedSection inView>
          <LinkGroup label="Work">
            {workLinks.map((item) => (
              <LinkRow key={item.id} item={item} />
            ))}
          </LinkGroup>
        </LinksAnimatedSection>

        <LinksAnimatedSection inView>
          <LinkGroup label="Elsewhere">
            {elsewhereLinks.map((item) => (
              <LinkRow key={item.id} item={item} />
            ))}
          </LinkGroup>
        </LinksAnimatedSection>

        <LinksFeaturedGallery />

        <footer className="flex flex-nowrap items-center justify-center gap-x-3 border-t border-border/50 pt-8 text-xs text-muted-foreground/70 sm:text-sm">
          <Link
            href="/"
            className="shrink-0 rounded-sm transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            chahatkesh.me
          </Link>
          <span aria-hidden className="shrink-0 text-border">
            ·
          </span>
          <a
            href={footerSupportLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "shrink-0 rounded-sm transition-colors duration-150",
              SOCIAL_BRAND_COLORS.buymeacoffeeText,
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            {footerSupportLink.title}
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </footer>
      </div>
    </>
  );
};

export default LinksPage;
