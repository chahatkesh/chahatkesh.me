import { type Metadata } from "next";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { MotionDiv } from "~/components/shared";
import { Breadcrumb } from "~/components/shared";
import { ExperienceTimeline } from "~/components/features/experience";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui";

export const metadata: Metadata = getSEOTags({
  title: "Professional Experience",
  description: `Explore ${config.appName}'s professional journey. View detailed work experience, contributions, and achievements across various roles and organizations.`,
  openGraph: {
    title: `Experience - ${config.appName}`,
    description: `Comprehensive overview of professional experience, key contributions, and technical expertise gained through various roles.`,
  },
  canonicalUrlRelative: "/about/experience",
});

const ExperiencePage = () => {
  return (
    <>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
        { name: "Experience", url: "/about/experience" },
      ])}

      <MotionDiv>
        <div className="space-y-8">
          <Breadcrumb
            items={[
              { name: "Home", url: "/" },
              { name: "About", url: "/about" },
              { name: "Experience", url: "/about/experience" },
            ]}
          />

          <MotionDiv
            className="space-y-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={cn(typo({ variant: "h2" }))}>
              Professional Experience
            </h1>
            <p className={cn(typo({ variant: "paragraph" }))}>
              A comprehensive overview of my professional journey, roles, and
              contributions.
            </p>
          </MotionDiv>

          <ExperienceTimeline />
        </div>
      </MotionDiv>
    </>
  );
};

export default ExperiencePage;
