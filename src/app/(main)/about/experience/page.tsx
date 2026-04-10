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
  description: `Where I've shipped. Every role, what I built, what I learned, and what came out of it. A complete look at ${config.appName}'s professional journey.`,
  openGraph: {
    title: `Experience - ${config.appName}`,
    description: `Frontend engineer at Zenbase, former EIR at IIT Ropar. Here's the full story of every role I've held and what I built along the way.`,
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
              Where I&apos;ve Shipped
            </h1>
            <p className={cn(typo({ variant: "paragraph" }))}>
              Every role, what I built, and what I walked away knowing.
            </p>
          </MotionDiv>

          <ExperienceTimeline />
        </div>
      </MotionDiv>
    </>
  );
};

export default ExperiencePage;
