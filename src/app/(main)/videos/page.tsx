import { type Metadata } from "next";
import { youtubeVideos } from "~/data/youtube";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { PageHeader } from "~/components/shared";
import config from "~/config";
import { VideoList, VideosListJsonLd } from "~/components/features/video";

export const metadata: Metadata = getSEOTags({
  title: "Videos",
  description:
    "Developer tutorials, tech talks, and behind-the-scenes of shipping real products.",
  canonicalUrlRelative: "/videos",
  keywords: [
    "YouTube",
    "videos",
    "tutorials",
    "tech talks",
    "developer content",
    config.appName,
  ],
  openGraph: {
    title: `Videos — ${config.appName}`,
    description: "Tutorials, talks & builds from Chahat Kesharwani on YouTube.",
  },
});

const sortedVideos = [...youtubeVideos].sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

const VideosPage = () => {
  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Videos", url: "/videos" },
      ])}
      <VideosListJsonLd videos={sortedVideos} />

      <PageHeader
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Videos", url: "/videos" },
        ]}
        title="Videos"
        subtitle="Tutorials, talks, and behind-the-scenes."
      />

      <VideoList videos={sortedVideos} />
    </div>
  );
};

export default VideosPage;
