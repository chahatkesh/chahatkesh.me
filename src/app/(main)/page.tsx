import { type Metadata } from "next";
import dynamic from "next/dynamic";
import { AboutSection, ProfessionalExperience } from "~/components/sections";
import { ProjectList } from "~/components/features/project";
import { projects } from "~/data/projects";
import { ContactUs } from "~/components/sections";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { HomeJsonLd } from "~/components/seo";
import { MAX_FEATURED_PROJECTS } from "~/constants";

const CodingActivity = dynamic(
  () => import("~/components/features/coding-activity").then((m) => m.default),
  {
    loading: () => (
      <div
        className="h-44 animate-pulse rounded-lg bg-muted/40"
        aria-hidden="true"
      />
    ),
  },
);

const Skills = dynamic(() => import("~/components/sections/skills"), {
  loading: () => (
    <div
      className="h-40 animate-pulse rounded-lg bg-muted/40"
      aria-hidden="true"
    />
  ),
});

// Intentionally no `title` here: the homepage should carry the brand/default
// title ("Chahat Kesharwani - Engineer · Builder · Explorer") rather than a
// generic "Home | ..." prefix. Canonical falls through to the root URL.
export const metadata: Metadata = getSEOTags({
  description: `${config.appName} - ${config.appDesignation}. Explore my portfolio featuring projects, skills, and professional experience.`,
  openGraph: {
    title: `${config.appName} - ${config.appDesignation}`,
    description: `Welcome to ${config.appName}'s portfolio. Discover my projects, skills, and professional experience as a ${config.appDesignation}.`,
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
        <ContactUs />
      </div>
    </>
  );
};

export default HomePage;
