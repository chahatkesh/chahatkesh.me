import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { youtubeVideos } from "~/data/youtube";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { Breadcrumb, MotionDiv } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import config from "~/config";
import { MAX_VIDEO_DESCRIPTION_LENGTH, MAX_VIDEO_TAGS } from "~/constants";
import {
  RelatedVideos,
  VideoDescription,
  VideoJsonLd,
  VideoMeta,
} from "~/components/features/video";
import {
  getRelatedVideos,
  getYouTubeEmbedUrl,
  getYouTubeWatchUrl,
} from "~/lib/video-utils";

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

export default async function VideoPage({ params }: Props) {
  const { slug } = await params;
  const video = youtubeVideos.find((v) => v.slug === slug);

  if (!video) {
    notFound();
  }

  const relatedVideos = getRelatedVideos(video, youtubeVideos);

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

      <MotionDiv
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-5"
      >
        <div className="overflow-hidden rounded-xl border border-border bg-black md:rounded-2xl">
          <div className="relative aspect-video w-full">
            <iframe
              src={getYouTubeEmbedUrl(video.id)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

        <div className="space-y-3 border-b border-border pb-5">
          <h1
            className={cn(
              typo({ variant: "h2" }),
              "text-balance leading-tight md:text-2xl",
            )}
          >
            {video.title}
          </h1>

          <VideoMeta video={video} youtubeUrl={getYouTubeWatchUrl(video.id)} />
        </div>

        {video.description && (
          <VideoDescription description={video.description} />
        )}

        {video.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </MotionDiv>

      <RelatedVideos videos={relatedVideos} />
    </div>
  );
}
