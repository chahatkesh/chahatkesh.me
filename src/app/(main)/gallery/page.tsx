import { type Metadata } from "next";
import { PageHeader } from "~/components/shared";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { GalleryContent } from "~/components/features/gallery";

export const metadata: Metadata = getSEOTags({
  title: "Gallery",
  description:
    "Trips, meet-ups, hackathons, and places — captured as they happened.",
  canonicalUrlRelative: "/gallery",
  openGraph: {
    title: `Gallery — ${config.appName}`,
    description:
      "Moments that mattered — trips, meet-ups, hackathons, and places.",
  },
});

export default function GalleryPage() {
  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Gallery", url: "/gallery" },
      ])}

      <PageHeader
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Gallery", url: "/gallery" },
        ]}
        title="Captured Moments"
        subtitle="Trips, events, and in-between. The parts of life that don't fit in a resume."
      />

      <GalleryContent />
    </div>
  );
}
