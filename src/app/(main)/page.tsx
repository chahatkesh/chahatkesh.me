import { type Metadata } from "next";
import dynamic from "next/dynamic";
import {
  AboutSection,
  ContactUs,
  OutsideTheScreen,
  ProfessionalExperience,
} from "~/components/sections";
import { ProjectList } from "~/components/features/project";
import { projects } from "~/data/projects";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { HomeJsonLd } from "~/components/seo";
import { MAX_FEATURED_PROJECTS } from "~/constants";
import { Skeleton } from "~/components/ui";

function CodingActivityFallback() {
  return (
    <div aria-busy="true">
      <div className="mb-2 flex items-center justify-end gap-2">
        <Skeleton className="h-5 w-8" />
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
      </div>
      <Skeleton className="h-[112px] w-full rounded-md" />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <Skeleton className="h-3 w-40" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-3 w-14" />
        </div>
      </div>
    </div>
  );
}

function SkillsFallback() {
  return (
    <section aria-busy="true" className="my-4 space-y-8">
      <Skeleton className="h-7 w-48" />
      <div className="space-y-6">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex gap-2 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-28 shrink-0 rounded-full" />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

const CodingActivity = dynamic(
  () => import("~/components/features/coding-activity").then((m) => m.default),
  {
    loading: () => <CodingActivityFallback />,
  },
);

const Skills = dynamic(() => import("~/components/sections/skills"), {
  loading: () => <SkillsFallback />,
});

// Intentionally no `title` here: the homepage should carry the brand/default
// title ("Chahat Kesharwani - Engineer · Builder · Explorer") rather than a
// generic "Home | ..." prefix. Canonical falls through to the root URL.
export const metadata: Metadata = getSEOTags({
  description: config.seo.defaultDescription,
  openGraph: {
    title: `${config.appName} - ${config.appDesignation}`,
    description: config.seo.defaultDescription,
  },
});

const HomePage = () => {
  return (
    <>
      <HomeJsonLd />
      {renderBreadcrumbSchema([{ name: "Home", url: "/" }])}
      <div className="!mt-8 space-y-14">
        <AboutSection />
        <CodingActivity />
        <ProfessionalExperience />
        <ProjectList
          projects={projects
            .filter((project) => project.isFeatured)
            .slice(0, MAX_FEATURED_PROJECTS)}
          metadata
          showFeatured={true}
        />
        <Skills />
        <OutsideTheScreen variant="minimal" />
        <ContactUs />
      </div>
    </>
  );
};

export default HomePage;
