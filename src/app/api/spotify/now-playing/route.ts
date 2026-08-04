import { NextResponse } from "next/server";
import { getNowPlaying, getRecentlyPlayed } from "~/lib/spotify";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  external_urls: { spotify: string };
};

function trackPayload(track: SpotifyTrack, isPlaying: boolean) {
  return {
    album: track.album.name,
    albumImageUrl: track.album.images[0]?.url,
    artist: track.artists.map((artist) => artist.name).join(", "),
    isPlaying,
    songUrl: track.external_urls.spotify,
    title: track.name,
  };
}

async function getLastPlayedPayload() {
  const response = await getRecentlyPlayed();

  if (!response.ok) return null;

  const data = await response.json();
  const track = data.items?.[0]?.track as SpotifyTrack | undefined;

  if (!track) return null;

  return trackPayload(track, false);
}

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      const lastPlayed = await getLastPlayedPayload();
      return NextResponse.json(lastPlayed ?? { isPlaying: false }, {
        headers: NO_CACHE_HEADERS,
      });
    }

    const song = await response.json();

    if (song.item === null) {
      const lastPlayed = await getLastPlayedPayload();
      return NextResponse.json(lastPlayed ?? { isPlaying: false }, {
        headers: NO_CACHE_HEADERS,
      });
    }

    // Paused on a track still counts as current context; treat as last played.
    if (!song.is_playing) {
      return NextResponse.json(trackPayload(song.item, false), {
        headers: NO_CACHE_HEADERS,
      });
    }

    return NextResponse.json(trackPayload(song.item, true), {
      headers: NO_CACHE_HEADERS,
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json(
      { isPlaying: false, error: "Failed to fetch Spotify data" },
      {
        status: 500,
        headers: NO_CACHE_HEADERS,
      },
    );
  }
}
