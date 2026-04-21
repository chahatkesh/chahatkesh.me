import { youtubeVideos } from "~/data/youtube";
import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";
import { notFound } from "next/navigation";
import { OG_MAX_TAGS } from "~/constants";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const video = youtubeVideos.find((v) => v.slug === slug);

  if (!video) {
    notFound();
  }

  return generateOGImageResponse({
    title: video.title,
    subtitle: video.durationFormatted,
    description: video.description,
    badge: "Video",
    tags: video.tags.slice(0, OG_MAX_TAGS),
  });
}

export async function generateStaticParams() {
  return youtubeVideos.map((video) => ({
    slug: video.slug,
  }));
}
