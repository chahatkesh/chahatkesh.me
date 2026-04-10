import { type Metadata } from "next";
import { MotionDiv } from "~/components/shared";
import { typo } from "~/components/ui";
import { Breadcrumb } from "~/components/shared";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { cn } from "~/lib/utils";
import { GalleryContent } from "~/components/features/gallery";

export const metadata: Metadata = getSEOTags({
  title: "Gallery",
  description: `Moments that mattered. Trips, meet-ups, hackathons, places. Captured as they happened.`,
  canonicalUrlRelative: "/gallery",
  openGraph: {
    title: `Gallery | ${config.appName}`,
    description: `This gallery shows moments, projects, and memories that matter to me. Each picture shares a small part of my story, how I see, feel, and create.`,
  },
});

export default function GalleryPage() {
  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Gallery", url: "/gallery" },
      ])}
      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Gallery", url: "/gallery" },
        ]}
      />
      <MotionDiv
        className="space-y-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={cn(typo({ variant: "h2" }))}>Captured Moments</h1>
        <p className={cn(typo({ variant: "paragraph" }))}>
          Trips, events, and in-between. The parts of life that don&apos;t fit
          in a resume.
        </p>
      </MotionDiv>

      {/* Gallery Content with SWR */}
      <GalleryContent />
    </div>
  );
}
