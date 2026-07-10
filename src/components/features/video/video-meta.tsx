import { ExternalLink } from "lucide-react";
import { cn } from "~/lib/utils";
import type { YouTubeVideo } from "~/data/youtube";
import {
  formatVideoDate,
  formatVideoDurationVerbose,
  formatViewCount,
} from "~/lib/video-utils";

type VideoMetaProps = {
  video: YouTubeVideo;
  youtubeUrl?: string;
  className?: string;
};

export function VideoMeta({ video, youtubeUrl, className }: VideoMetaProps) {
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
      {youtubeUrl && (
        <>
          {" · "}
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="el-focus-styles inline-flex items-center gap-1 font-medium text-ring transition-colors hover:text-ring/80"
          >
            Watch on YouTube
            <ExternalLink className="size-3 shrink-0" aria-hidden="true" />
          </a>
        </>
      )}
    </p>
  );
}
