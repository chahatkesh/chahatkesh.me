import { Metadata } from "next";
import { GalleryGrid, FeaturedCarousel } from "~/components/features/gallery";
import { MotionDiv } from "~/components/shared";
import { typo } from "~/components/ui";
import { galleryItems } from "~/data/gallery";
import { BackButton } from "~/components/shared";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { cn } from "~/lib/utils";

export const metadata: Metadata = getSEOTags({
  title: "Gallery",
  description: `Explore ${config.appName}'s gallery showcasing photography, design work, and visual projects.`,
  canonicalUrlRelative: "/gallery",
  openGraph: {
    title: `Gallery | ${config.appName}`,
    description: `This gallery shows moments, projects, and memories that matter to me. Each picture shares a small part of my story, how I see, feel, and create.`,
  },
});

export default function GalleryPage() {
  // Filter featured items for the carousel
  const featuredItems = galleryItems.filter(item => item.isFeatured);

  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Gallery", url: "/gallery" },
      ])}
      <BackButton>Back</BackButton>
      <MotionDiv 
        className="space-y-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={cn(typo({ variant: "h2" }))}>Gallery</h1>
        <p className={cn(typo({ variant: "paragraph" }))}>
          This gallery shows moments, projects, and memories that matter to me. Each picture shares a small part of my story, how I see, feel, and create.
        </p>
      </MotionDiv>

      {/* Featured Carousel */}
      {featuredItems.length > 0 && (
        <FeaturedCarousel items={featuredItems} />
      )}

      {/* All Gallery Items */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6"
      >
        <div>
          <h2 className={cn(typo({ variant: "h2" }))}>All Moments</h2>
          <p className={cn(typo({ variant: "paragraph" }), "hidden md:block")}>
            Explore the complete collection of my visual journey
          </p>
        </div>
        <GalleryGrid items={galleryItems} />
      </MotionDiv>
    </div>
  );
}
