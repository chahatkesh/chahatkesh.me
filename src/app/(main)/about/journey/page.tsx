import { type Metadata } from "next";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { MotionDiv } from "~/components/shared";
import { Breadcrumb } from "~/components/shared";
import { TimelineComponent } from "~/components/shared";
import config from "~/config";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui";

export const metadata: Metadata = getSEOTags({
  title: "My Storyline",
  description: `The moments that shaped me. Projects, hackathons, travel, community work, and everything in between. Laid out as it happened.`,
  openGraph: {
    title: `My Storyline - ${config.appName}`,
    description: `A timeline of the key moments, builds, and experiences that define who I am. Not just the wins.`,
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
          <h1 className={cn(typo({ variant: "h2" }))}>My Storyline</h1>
          <p className={cn(typo({ variant: "paragraph" }))}>
            The moments that shaped me. Not just the wins.
          </p>
        </MotionDiv>
        <TimelineComponent />
      </div>
    </MotionDiv>
  );
};

export default JourneyPage;
