import { type Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { youtubeVideos } from "~/data/youtube";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { Breadcrumb } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import config from "~/config";
import {
  MAX_RELATED_VIDEOS,
  MAX_VIDEO_DESCRIPTION_LENGTH,
  MAX_VIDEO_TAGS,
} from "~/constants";
import { Eye, ThumbsUp, Clock, ExternalLink, Calendar } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = youtubeVideos.find((v) => v.slug === slug);

  if (!video) {
    return getSEOTags({
      title: "Video Not Found",
      description: "The requested video could not be found.",
    });
  }

  const description =
    video.description.substring(0, MAX_VIDEO_DESCRIPTION_LENGTH) || video.title;

  return getSEOTags({
    title: video.title,
    description,
    canonicalUrlRelative: `/videos/${video.slug}`,
    keywords: [
      ...video.tags.slice(0, MAX_VIDEO_TAGS),
      "YouTube",
      "Video",
      config.appName,
    ],
    openGraph: {
      title: video.title,
      description,
      images: [
        {
          url: video.thumbnailUrl,
          width: 1280,
          height: 720,
          alt: video.title,
        },
      ],
    },
  });
}

export async function generateStaticParams() {
  return youtubeVideos.map((video) => ({
    slug: video.slug,
  }));
}

function VideoJsonLd({ video }: { video: (typeof youtubeVideos)[number] }) {
  return (
    <Script
      id={`video-jsonld-${video.id}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
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

function getRelatedVideos(
  currentVideo: (typeof youtubeVideos)[number],
  count: number = MAX_RELATED_VIDEOS,
) {
  const currentTags = new Set(currentVideo.tags.map((t) => t.toLowerCase()));

  return youtubeVideos
    .filter((v) => v.id !== currentVideo.id)
    .map((v) => {
      const sharedTags = v.tags.filter((t) =>
        currentTags.has(t.toLowerCase()),
      ).length;
      return { video: v, relevance: sharedTags };
    })
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, count)
    .map((r) => r.video);
}

function formatViewCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toLocaleString();
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString(config.seo.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function VideoPage({ params }: Props) {
  const { slug } = await params;
  const video = youtubeVideos.find((v) => v.slug === slug);

  if (!video) {
    notFound();
  }

  const relatedVideos = getRelatedVideos(video);

  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Videos", url: "/videos" },
        { name: video.title, url: `/videos/${video.slug}` },
      ])}

      <VideoJsonLd video={video} />

      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Videos", url: "/videos" },
          { name: video.title, url: `/videos/${video.slug}` },
        ]}
      />

      {/* Embed */}
      <div className="relative w-full overflow-hidden rounded-xl border border-border md:rounded-2xl">
        <div className="relative aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>

      {/* Title & metadata */}
      <div className="space-y-4">
        <h1 className="font-ubuntu text-2xl font-bold leading-tight md:text-3xl">
          {video.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {formatDate(video.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="size-4" />
            {formatViewCount(video.viewCount)} views
          </span>
          <span className="flex items-center gap-1.5">
            <ThumbsUp className="size-4" />
            {formatViewCount(video.likeCount)} likes
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {video.durationFormatted}
          </span>
        </div>

        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="el-focus-styles inline-flex items-center gap-2 text-sm font-medium text-ring transition-colors hover:text-ring/80"
        >
          Watch on YouTube
          <ExternalLink className="size-3.5" />
        </a>
      </div>

      {/* Description */}
      {video.description && (
        <div className="space-y-3">
          <h2 className={cn(typo({ variant: "h2" }))}>Description</h2>
          <div className="rounded-xl border border-border bg-card/50 p-5">
            <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/80">
              {video.description}
            </p>
          </div>
        </div>
      )}

      {/* Tags */}
      {video.tags.length > 0 && (
        <div className="space-y-3">
          <h2 className={cn(typo({ variant: "h2" }))}>Tags</h2>
          <div className="flex flex-wrap gap-2">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-foreground/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related videos */}
      {relatedVideos.length > 0 && (
        <div className="mt-16 space-y-6 border-t border-border pt-10">
          <h2 className={cn(typo({ variant: "h2" }))}>More Videos</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedVideos.map((rv) => (
              <Link
                key={rv.id}
                href={`/videos/${rv.slug}`}
                className="group block overflow-hidden rounded-xl border border-border bg-gradient-to-br from-card/50 to-background/70 transition-all duration-300 hover:border-ring/30"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rv.thumbnailUrl}
                    alt={rv.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium tabular-nums text-white">
                    {rv.durationFormatted}
                  </span>
                </div>
                <div className="space-y-1.5 p-4">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug transition-colors duration-200 group-hover:text-ring">
                    {rv.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="size-3" />
                      {formatViewCount(rv.viewCount)}
                    </span>
                    <span>
                      {new Date(rv.publishedAt).toLocaleDateString(
                        config.seo.language,
                        { year: "numeric", month: "short" },
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
