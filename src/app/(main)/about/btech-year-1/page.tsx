import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { getCollegeYearInfo, getTimelineEventsByYear } from "~/data/college-timeline";
import { MotionDiv } from "~/components/motion-wrapper";
import BackButton from "~/components/back-btn";
import TimelineComponent from "~/components/timeline-component";
import config from "~/config";

export const metadata: Metadata = getSEOTags({
  title: "1st Year B.Tech Journey",
  description: `Explore ${config.appName}'s first year of engineering journey. Discover key events, achievements, and experiences from the 2023-24 academic year.`,
  openGraph: {
    title: `1st Year B.Tech Journey - ${config.appName}`,
    description: `Follow my first year engineering journey with detailed timeline of events, projects, and achievements from 2023-24.`,
  },
  canonicalUrlRelative: "/about/btech-year-1",
});

const BtechYear1Page = () => {
  const yearInfo = getCollegeYearInfo(1);
  const events = getTimelineEventsByYear(1);

  if (!yearInfo || !yearInfo.isActive) {
    notFound();
  }

  return (
    <MotionDiv>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Me", url: "/about" },
        { name: "1st Year B.Tech Journey", url: "/about/btech-year-1" },
      ])}
      
      <div className="space-y-8">
        <BackButton>Back to About</BackButton>
        
        <TimelineComponent 
          events={events}
          year={1}
          academicYear={yearInfo.academicYear}
        />
      </div>
    </MotionDiv>
  );
};

export default BtechYear1Page;
