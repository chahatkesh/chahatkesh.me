import { cn } from "~/lib/utils";
import type { YouTubeVideo } from "~/data/youtube";
import {
  formatVideoDate,
  formatVideoDurationVerbose,
  formatViewCount,
} from "~/lib/video-utils";

type VideoMetaProps = {
  video: YouTubeVideo;
  className?: string;
};

export function VideoMeta({ video, className }: VideoMetaProps) {
  const items = [
    formatVideoDate(video.publishedAt, "long"),
    `${formatViewCount(video.viewCount)} views`,
    <>
      <span className="md:hidden">{video.durationFormatted}</span>
      <span className="hidden md:inline">
        {formatVideoDurationVerbose(video.duration)}
      </span>
    </>,
  ];

  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && " · "}
          {item}
        </span>
      ))}
    </p>
  );
}
