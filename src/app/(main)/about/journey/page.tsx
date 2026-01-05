import { Metadata } from "next";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { MotionDiv } from "~/components/shared";
import { Breadcrumb } from "~/components/shared";
import { TimelineComponent } from "~/components/shared";
import config from "~/config";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui";

export const metadata: Metadata = getSEOTags({
  title: "Journey Timeline",
  description: `Explore ${config.appName}'s journey timeline. Discover key events, achievements, projects, and milestones from education to professional development.`,
  openGraph: {
    title: `Journey - ${config.appName}`,
    description: `Follow my journey through an interactive timeline showcasing projects, achievements, learning experiences, and professional milestones.`,
  },
  canonicalUrlRelative: "/about/journey",
});

const JourneyPage = () => {
  return (
    <MotionDiv>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Me", url: "/about" },
        { name: "Journey", url: "/about/journey" },
      ])}

      <div className="space-y-8">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "About Me", url: "/about" },
            { name: "Journey", url: "/about/journey" },
          ]}
        />
        <MotionDiv
          className="space-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={cn(typo({ variant: "h2" }))}>My Journey</h1>
          <p className={cn(typo({ variant: "paragraph" }))}>
            A timeline showcasing my learnings, achievements, and milestones.
          </p>
        </MotionDiv>
        <TimelineComponent />
      </div>
    </MotionDiv>
  );
};

export default JourneyPage;
