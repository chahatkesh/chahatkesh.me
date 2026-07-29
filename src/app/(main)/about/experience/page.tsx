import { type Metadata } from "next";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { PageHeader } from "~/components/shared";
import { ExperienceTimeline } from "~/components/features/experience";

export const metadata: Metadata = getSEOTags({
  title: "Experience",
  description:
    "Founding Engineer at Zenbase. Former EIR at Annam.ai / IIT Ropar. Roles, builds, and what came out of them.",
  openGraph: {
    title: `Experience — ${config.appName}`,
    description:
      "Where I've shipped. Every role, what I built, what I learned, and what came out of it.",
  },
  canonicalUrlRelative: "/about/experience",
});

const ExperiencePage = () => {
  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
        { name: "Experience", url: "/about/experience" },
      ])}

      <PageHeader
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
          { name: "Experience", url: "/about/experience" },
        ]}
        title={<>Where I&apos;ve Shipped</>}
        subtitle="Every role, what I built, and what I walked away knowing."
      />

      <ExperienceTimeline />
    </div>
  );
};

export default ExperiencePage;
