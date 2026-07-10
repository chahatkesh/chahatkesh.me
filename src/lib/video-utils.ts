import config from "~/config";
import { MAX_RELATED_VIDEOS } from "~/constants";
import type { YouTubeVideo } from "~/data/youtube";

export function formatViewCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toLocaleString();
}

export function formatVideoDate(
  dateString: string,
  style: "short" | "long" = "short",
): string {
  return new Date(dateString).toLocaleDateString(config.seo.language, {
    year: "numeric",
    month: "short",
    day: style === "long" ? "numeric" : undefined,
  });
}

export function formatVideoDurationVerbose(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = Number(match?.[1] ?? 0);
  const minutes = Number(match?.[2] ?? 0);
  const seconds = Number(match?.[3] ?? 0);

  const parts: string[] = [];

  if (hours > 0) parts.push(`${hours} hr`);
  if (minutes > 0) parts.push(`${minutes} min`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds} sec`);

  return parts.join(" ");
}

export function getRelatedVideos(
  currentVideo: YouTubeVideo,
  videos: YouTubeVideo[],
  count = MAX_RELATED_VIDEOS,
): YouTubeVideo[] {
  const currentTags = new Set(
    currentVideo.tags.map((tag) => tag.toLowerCase()),
  );

  return videos
    .filter((video) => video.id !== currentVideo.id)
    .map((video) => {
      const sharedTags = video.tags.filter((tag) =>
        currentTags.has(tag.toLowerCase()),
      ).length;

      return { video, relevance: sharedTags };
    })
    .sort((a, b) => {
      if (b.relevance !== a.relevance) return b.relevance - a.relevance;

      return (
        new Date(b.video.publishedAt).getTime() -
        new Date(a.video.publishedAt).getTime()
      );
    })
    .slice(0, count)
    .map((entry) => entry.video);
}

export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?rel=0`;
}
