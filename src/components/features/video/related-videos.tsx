import { typo } from "~/components/ui";
import { MotionDiv } from "~/components/shared";
import type { YouTubeVideo } from "~/data/youtube";
import { VideoCard } from "./video-card";

type RelatedVideosProps = {
  videos: YouTubeVideo[];
};

export function RelatedVideos({ videos }: RelatedVideosProps) {
  if (videos.length === 0) return null;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="space-y-5 border-t border-border pt-8"
    >
      <h2 className={typo({ variant: "h2" })}>More Videos</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            variant="compact"
            index={index}
          />
        ))}
      </div>
    </MotionDiv>
  );
}
