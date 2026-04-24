import { Play } from "lucide-react";
import type { YouTubeVideo } from "~/data/youtube";
import { VideoCard } from "./video-card";

type VideoListProps = {
  videos: YouTubeVideo[];
};

export function VideoList({ videos }: VideoListProps) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card/50 py-20 text-center">
        <Play className="mb-4 size-10 text-muted-foreground" />
        <p className="text-lg font-medium">No videos yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Videos will appear here once the channel has uploads.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {videos.map((video, index) => (
        <VideoCard key={video.id} video={video} index={index} />
      ))}
    </div>
  );
}
