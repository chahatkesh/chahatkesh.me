"use client";

import useSWR from "swr";
import { GalleryGrid, FeaturedCarousel } from "~/components/features/gallery";
import { MotionDiv } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui";

interface GalleryImage {
  _id: string;
  title: string;
  location: string;
  date: string;
  aspectRatio: "square" | "portrait" | "landscape" | "big-square";
  imageUrl: string;
  publicId: string;
  isFeatured: boolean;
  order: number;
}

interface GalleryItem {
  id: string;
  title: string;
  location: string;
  date: string;
  aspectRatio: "square" | "portrait" | "landscape" | "big-square";
  src: string;
  isFeatured: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function GalleryContent() {
  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: GalleryImage[] }>(
    "/api/gallery",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      dedupingInterval: 10000, // Dedupe requests within 10s
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      onSuccess: (data) => {
        console.log(`✓ Loaded ${data?.data?.length || 0} gallery images`);
      },
      onError: (err) => {
        console.error('Failed to load gallery:', err);
      },
    }
  );

  // Transform API data to match component props
  const galleryItems: GalleryItem[] =
    data?.data?.map((item) => ({
      id: item._id,
      title: item.title,
      location: item.location,
      date: item.date,
      aspectRatio: item.aspectRatio,
      src: item.imageUrl,
      isFeatured: item.isFeatured,
    })) || [];

  // Filter featured items for the carousel
  const featuredItems = galleryItems.filter((item) => item.isFeatured);

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Featured Carousel Skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-48 bg-neutral-800 animate-pulse rounded" />
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl aspect-[3/4] w-80 flex-shrink-0 bg-neutral-800 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Gallery Grid Skeleton */}
        <div className="space-y-6">
          <div className="h-8 w-48 bg-neutral-800 animate-pulse rounded" />
          <div className="grid w-full auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="rounded-lg bg-neutral-800 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-500 mb-2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        <h3 className="text-lg font-semibold">Failed to load gallery</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Unable to fetch gallery images. Please check your connection and try again.
        </p>
        <Button onClick={() => mutate()} variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          Retry
        </Button>
      </div>
    );
  }

  if (!data?.success || galleryItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600 dark:text-gray-400">
          No gallery images available yet.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Featured Carousel */}
      {featuredItems.length > 0 && <FeaturedCarousel items={featuredItems} />}

      {/* All Gallery Items */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6"
      >
        <div>
          <h2 className={cn(typo({ variant: "h2" }))}>All Moments</h2>
          <p className={cn(typo({ variant: "paragraph" }), "hidden md:block")}>
            Explore the complete collection of my visual journey
          </p>
        </div>
        <GalleryGrid items={galleryItems} />
      </MotionDiv>
    </>
  );
}
