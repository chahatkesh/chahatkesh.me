"use client";

import useSWR from "swr";
import { FeaturedCarousel } from "./featured-carousel";
import { API_ROUTES, SWR_DEDUPING_INTERVAL_MS } from "~/constants";
import type { GalleryApiResponse, GalleryItem } from "~/types/gallery";
import { toGalleryItem } from "~/types/gallery";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function LinksFeaturedGallery() {
  const { data } = useSWR<GalleryApiResponse>(API_ROUTES.GALLERY, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: SWR_DEDUPING_INTERVAL_MS,
  });

  const galleryItems: GalleryItem[] = data?.data?.map(toGalleryItem) || [];

  const featuredImages = galleryItems.filter((item) => item.isFeatured);

  if (featuredImages.length === 0) {
    return null;
  }

  return <FeaturedCarousel items={featuredImages} showTitle={false} />;
}
