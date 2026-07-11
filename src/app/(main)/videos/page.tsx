import { type Metadata } from "next";
import { youtubeVideos } from "~/data/youtube";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { Breadcrumb, MotionDiv } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
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

      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Videos", url: "/videos" },
        ]}
      />

      <MotionDiv
        className="mt-4 space-y-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className={cn(typo({ variant: "h2" }))}>Videos</h1>
        <p
          className={cn(
            typo({ variant: "paragraph", size: "sm" }),
            "text-muted-foreground",
          )}
        >
          Tutorials, talks, and behind-the-scenes.
        </p>
      </MotionDiv>

      <VideoList videos={sortedVideos} />
    </div>
  );
};

export default VideosPage;
