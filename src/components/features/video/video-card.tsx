import Link from "next/link";
import { Eye, Play } from "lucide-react";
import { MotionDiv } from "~/components/shared";
import { cn } from "~/lib/utils";
import type { YouTubeVideo } from "~/data/youtube";
import { formatVideoDate, formatViewCount } from "~/lib/video-utils";

type VideoCardProps = {
  video: YouTubeVideo;
  variant?: "default" | "compact";
  index?: number;
};

export function VideoCard({
  video,
  variant = "default",
  index = 0,
}: VideoCardProps) {
  const isCompact = variant === "compact";

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.04 * index }}
      className="h-full"
    >
      <Link
        href={`/videos/${video.slug}`}
        className="el-focus-styles group block h-full"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex size-11 items-center justify-center rounded-full bg-black/75 text-white">
              <Play className="size-4 fill-current" />
            </span>
          </div>
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white">
            {video.durationFormatted}
          </span>
        </div>

        <div className={cn("space-y-1", isCompact ? "mt-2" : "mt-2.5")}>
          <h2
            className={cn(
              "line-clamp-2 font-medium leading-snug transition-colors duration-200 group-hover:text-ring",
              isCompact ? "text-sm" : "text-[15px]",
            )}
          >
            {video.title}
          </h2>
          <p className="text-xs text-muted-foreground">
            {formatViewCount(video.viewCount)} views ·{" "}
            {formatVideoDate(video.publishedAt)}
          </p>
        </div>
      </Link>
    </MotionDiv>
  );
}
