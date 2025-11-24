import { Metadata } from "next";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { MotionDiv } from "~/components/motion-wrapper";
import BackButton from "~/components/back-btn";
import TimelineComponent from "~/components/timeline-component";
import config from "~/config";

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
        <BackButton href="/about">Back to About</BackButton>
        <TimelineComponent />
      </div>
    </MotionDiv>
  );
};

export default JourneyPage;