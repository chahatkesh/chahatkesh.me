import { type Metadata } from "next";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { PageHeader, TimelineComponent } from "~/components/shared";
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

const JourneyPage = () => {
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

      <TimelineComponent />
    </div>
  );
};

export default JourneyPage;
