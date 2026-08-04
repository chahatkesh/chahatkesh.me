"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SiSpotify } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES, SPOTIFY_POLL_INTERVAL_MS } from "~/constants";
import { fetcher } from "~/lib/fetcher";

type SpotifyData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

const SpotifyNowPlaying = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry?.isIntersecting ?? false);
      },
      { rootMargin: "100px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { data, isPending } = useQuery<SpotifyData>({
    queryKey: ["spotify-now-playing"],
    queryFn: () =>
      fetcher<SpotifyData>(`${API_ROUTES.SPOTIFY_NOW_PLAYING}?t=${Date.now()}`),
    // Poll only while the widget is on-screen; pause when scrolled away.
    refetchInterval: isVisible ? SPOTIFY_POLL_INTERVAL_MS : false,
    enabled: isVisible,
  });

  // Keep the last successful payload when scrolled out of view; skeleton only
  // before the first successful fetch.
  const showSkeleton = data === undefined && (isPending || !isVisible);
  const track =
    data?.title && data.songUrl
      ? {
          title: data.title,
          artist: data.artist,
          album: data.album,
          albumImageUrl: data.albumImageUrl,
          songUrl: data.songUrl,
          isPlaying: data.isPlaying,
        }
      : null;

  return (
    <div ref={containerRef} className="min-w-0">
      {showSkeleton ? (
        <div className="flex gap-3 animate-pulse">
          <div className="w-16 h-16 bg-muted rounded" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-muted rounded w-3/4" />
            <div className="h-2 bg-muted rounded w-1/2" />
          </div>
        </div>
      ) : !track ? (
        <div className="flex items-center gap-3 text-muted-foreground/70">
          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
            <SiSpotify className="text-muted-foreground/50 text-2xl" />
          </div>
          <p className="text-sm">Not playing</p>
        </div>
      ) : (
        <a
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="el-focus-styles group flex min-w-0 gap-3 rounded-md"
        >
          <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
            {track.albumImageUrl && (
              <Image
                src={track.albumImageUrl}
                alt={track.album || "Album cover"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="64px"
              />
            )}
          </div>

          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-ring">
              {track.title}
            </p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {track.artist}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <SiSpotify
                className={
                  track.isPlaying
                    ? "text-green-500 text-xs"
                    : "text-muted-foreground/70 text-xs"
                }
              />
              <span className="text-[10px] text-muted-foreground/70">
                {track.isPlaying ? "Playing now" : "Last played"}
              </span>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

export default SpotifyNowPlaying;
