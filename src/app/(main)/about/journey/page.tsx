import { type Metadata } from "next";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { PageHeader, TimelineComponent } from "~/components/shared";
import { getWritingEntries } from "~/lib/writing";
import config from "~/config";

export const metadata: Metadata = getSEOTags({
  title: "My Storyline",
  description:
    "Projects, hackathons, travel, community, and the moments that shaped how I build.",
  openGraph: {
    title: `My Storyline — ${config.appName}`,
    description:
      "Projects, hackathons, travel, community, and the moments that shaped how I build. Not just the wins.",
  },
  canonicalUrlRelative: "/about/journey",
});

const JourneyPage = async () => {
  const writing = await getWritingEntries();

  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Me", url: "/about" },
        { name: "Journey", url: "/about/journey" },
      ])}

      <PageHeader
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About Me", url: "/about" },
          { name: "Journey", url: "/about/journey" },
        ]}
        title="My Storyline"
        subtitle="The moments that shaped me. Not just the wins."
      />

      <TimelineComponent
        writing={writing.map((entry) => ({
          slug: entry.slug,
          title: entry.title,
          subtitle: entry.subtitle,
          description: entry.description,
          date: entry.date,
        }))}
      />
    </div>
  );
};

export default JourneyPage;
