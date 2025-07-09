import { Metadata } from "next";
import { GalleryGrid } from "~/components/gallery";
import { MotionDiv } from "~/components/motion-wrapper";
import { typo } from "~/components/ui/typograpghy";
import { galleryItems } from "~/data/gallery";
import BackButton from "~/components/back-btn";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";

export const metadata: Metadata = getSEOTags({
  title: "Gallery",
  description: `Explore ${config.appName}'s gallery showcasing photography, design work, and visual projects.`,
  canonicalUrlRelative: "/gallery",
  openGraph: {
    title: `Gallery | ${config.appName}`,
    description: `Browse through my collection of photos, design work, and visual projects. Get a glimpse into my creative side beyond coding.`,
  },
});

export default function GalleryPage() {
  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Gallery", url: "/gallery" },
      ])}
      <BackButton>Back</BackButton>
      <MotionDiv 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={typo({ variant: "h2" })}>Gallery</h1>
        <p className={typo({ variant: "paragraph" })}>
          A visual collection of moments, projects, and experiences that inspire me. Each image tells a story of creativity, 
          exploration, and the beauty of capturing life through a different lens.
        </p>
      </MotionDiv>

      <GalleryGrid items={galleryItems} />
    </div>
  );
}
