import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { getCollegeYearInfo, getTimelineEventsByYear } from "~/data/college-timeline";
import { MotionDiv } from "~/components/motion-wrapper";
import BackButton from "~/components/back-btn";
import TimelineComponent from "~/components/timeline-component";
import config from "~/config";

export const metadata: Metadata = getSEOTags({
  title: "3rd Year B.Tech Journey",
  description: `Explore ${config.appName}'s third year of engineering journey. Discover key events, achievements, and experiences from the 2025-26 academic year.`,
  openGraph: {
    title: `3rd Year B.Tech Journey - ${config.appName}`,
    description: `Follow my current third year engineering journey with detailed timeline of events, projects, and achievements from 2025-26.`,
  },
  canonicalUrlRelative: "/about/btech-year-3",
});

const BtechYear3Page = () => {
  const yearInfo = getCollegeYearInfo(3);
  const events = getTimelineEventsByYear(3);

  if (!yearInfo || !yearInfo.isActive) {
    notFound();
  }

  return (
    <MotionDiv>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Me", url: "/about" },
        { name: "3rd Year B.Tech Journey", url: "/about/btech-year-3" },
      ])}
      
      <div className="space-y-8">
        <BackButton>Back to About</BackButton>
        
        <TimelineComponent 
          events={events}
          year={3}
          academicYear={yearInfo.academicYear}
        />
      </div>
    </MotionDiv>
  );
};

export default BtechYear3Page;
