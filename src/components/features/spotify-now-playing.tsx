"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SiSpotify } from "react-icons/si";

type SpotifyData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

const SpotifyNowPlaying = () => {
  const [data, setData] = useState<SpotifyData>({ isPlaying: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        // Add timestamp to prevent caching
        const response = await fetch(
          `/api/spotify/now-playing?t=${Date.now()}`,
          {
            cache: "no-store",
          },
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    // Refresh every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex gap-3 animate-pulse">
        <div className="w-16 h-16 bg-neutral-800 rounded" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-neutral-800 rounded w-3/4" />
          <div className="h-2 bg-neutral-800 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!data.isPlaying) {
    return (
      <div className="flex items-center gap-3 text-neutral-500">
        <div className="w-16 h-16 bg-neutral-800 rounded flex items-center justify-center">
          <SiSpotify className="text-neutral-600 text-2xl" />
        </div>
        <p className="text-sm">Not playing</p>
      </div>
    );
  }

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-3 group"
    >
      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
        {data.albumImageUrl && (
          <Image
            src={data.albumImageUrl}
            alt={data.album || "Album cover"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="64px"
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate group-hover:text-ring transition-colors">
          {data.title}
        </p>
        <p className="text-xs text-neutral-400 truncate mt-0.5">
          {data.artist}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <SiSpotify className="text-green-500 text-xs" />
          <span className="text-[10px] text-neutral-500">Playing now</span>
        </div>
      </div>
    </a>
  );
};

export default SpotifyNowPlaying;
