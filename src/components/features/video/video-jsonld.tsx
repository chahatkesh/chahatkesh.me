import Script from "next/script";
import config from "~/config";
import { MAX_VIDEO_DESCRIPTION_LENGTH } from "~/constants";
import type { YouTubeVideo } from "~/data/youtube";
import { getYouTubeEmbedUrl, getYouTubeWatchUrl } from "~/lib/video-utils";

function getVideoDescription(video: YouTubeVideo): string {
  return (
    video.description.substring(0, MAX_VIDEO_DESCRIPTION_LENGTH) || video.title
  );
}

export function VideoJsonLd({ video }: { video: YouTubeVideo }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: video.title,
          description: getVideoDescription(video),
          thumbnailUrl: video.thumbnailUrl,
          uploadDate: video.publishedAt,
          duration: video.duration,
          embedUrl: getYouTubeEmbedUrl(video.id),
          contentUrl: getYouTubeWatchUrl(video.id),
          url: `https://${config.domainName}/videos/${video.slug}`,
          author: {
            "@type": "Person",
            name: config.appName,
            url: `https://${config.domainName}`,
          },
          interactionStatistic: {
            "@type": "InteractionCounter",
            interactionType: { "@type": "WatchAction" },
            userInteractionCount: video.viewCount,
          },
          ...(video.tags.length > 0 && {
            keywords: video.tags.join(", "),
          }),
        }),
      }}
    />
  );
}

export function VideosListJsonLd({ videos }: { videos: YouTubeVideo[] }) {
  if (videos.length === 0) return null;

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
          numberOfItems: videos.length,
          itemListElement: videos.map((video, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "VideoObject",
              name: video.title,
              description: getVideoDescription(video),
              thumbnailUrl: video.thumbnailUrl,
              uploadDate: video.publishedAt,
              duration: video.duration,
              embedUrl: getYouTubeEmbedUrl(video.id),
              contentUrl: getYouTubeWatchUrl(video.id),
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
