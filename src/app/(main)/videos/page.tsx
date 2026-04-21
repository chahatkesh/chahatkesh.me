import { type Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { youtubeVideos } from "~/data/youtube";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { Breadcrumb } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import config from "~/config";
import { MAX_VIDEO_DESCRIPTION_LENGTH } from "~/constants";
import { Eye, Clock, Play } from "lucide-react";

export const metadata: Metadata = getSEOTags({
  title: "Videos",
  description: `Watch ${config.appName}'s videos — tutorials, talks, and behind-the-scenes of building products.`,
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
    title: `Videos by ${config.appName}`,
    description: `Tutorials, talks, and builds — watch ${config.appName} on YouTube.`,
  },
});

function VideosJsonLd() {
  if (youtubeVideos.length === 0) return null;

  return (
    <Script
      id="videos-list-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Videos by ${config.appName}`,
          numberOfItems: youtubeVideos.length,
          itemListElement: youtubeVideos.map((video, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "VideoObject",
              name: video.title,
              description:
                video.description.substring(0, MAX_VIDEO_DESCRIPTION_LENGTH) ||
                video.title,
              thumbnailUrl: video.thumbnailUrl,
              uploadDate: video.publishedAt,
              duration: video.duration,
              embedUrl: `https://www.youtube.com/embed/${video.id}`,
              contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
              url: `https://${config.domainName}/videos/${video.slug}`,
              interactionStatistic: {
                "@type": "InteractionCounter",
                interactionType: { "@type": "WatchAction" },
                userInteractionCount: video.viewCount,
              },
            },
          })),
        }),
      }}
    />
  );
}

function formatViewCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toLocaleString();
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString(config.seo.language, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const VideosPage = () => {
  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Videos", url: "/videos" },
      ])}
      <VideosJsonLd />

      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Videos", url: "/videos" },
        ]}
      />

      <div className="mt-4 space-y-1">
        <h1 className={cn(typo({ variant: "h2" }))}>Videos</h1>
        <p className={cn(typo({ variant: "paragraph", size: "sm" }))}>
          Tutorials, talks, and behind-the-scenes.
        </p>
      </div>

      {youtubeVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card/50 py-20 text-center">
          <Play className="mb-4 size-10 text-muted-foreground" />
          <p className="text-lg font-medium">No videos yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Videos will appear here once the channel has uploads.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {youtubeVideos.map((video) => (
            <Link
              key={video.id}
              href={`/videos/${video.slug}`}
              className="group block overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900/50 to-neutral-950/70 transition-all duration-300 hover:border-ring/30"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium tabular-nums text-white">
                  {video.durationFormatted}
                </span>
              </div>

              <div className="space-y-2 p-4">
                <h2 className="line-clamp-2 text-base font-semibold leading-snug group-hover:text-ring transition-colors duration-200">
                  {video.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="size-3.5" />
                    {formatViewCount(video.viewCount)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {video.durationFormatted}
                  </span>
                  <span>{formatDate(video.publishedAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideosPage;
