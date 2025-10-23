import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { getCollegeYearInfo, getTimelineEventsByYear } from "~/data/college-timeline";
import { MotionDiv } from "~/components/motion-wrapper";
import BackButton from "~/components/back-btn";
import TimelineComponent from "~/components/timeline-component";
import config from "~/config";

export const metadata: Metadata = getSEOTags({
  title: "2nd Year B.Tech Journey",
  description: `Explore ${config.appName}'s second year of engineering journey. Discover key events, achievements, and experiences from the 2024-25 academic year.`,
  openGraph: {
    title: `2nd Year B.Tech Journey - ${config.appName}`,
    description: `Follow my second year engineering journey with detailed timeline of events, projects, and achievements from 2024-25.`,
  },
  canonicalUrlRelative: "/about/btech-year-2",
});

const BtechYear2Page = () => {
  const yearInfo = getCollegeYearInfo(2);
  const events = getTimelineEventsByYear(2);

  if (!yearInfo || !yearInfo.isActive) {
    notFound();
  }

  return (
    <MotionDiv>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Me", url: "/about" },
        { name: "2nd Year B.Tech Journey", url: "/about/btech-year-2" },
      ])}
      
      <div className="space-y-8">
        <BackButton>Back to About</BackButton>
        
        <TimelineComponent 
          events={events}
          year={2}
          academicYear={yearInfo.academicYear}
        />
      </div>
    </MotionDiv>
  );
};

export default BtechYear2Page;
