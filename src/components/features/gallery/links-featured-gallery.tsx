"use client";

import useSWR from "swr";
import { FeaturedCarousel } from "./featured-carousel";

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

export function LinksFeaturedGallery() {
  const { data } = useSWR<{ success: boolean; data: GalleryImage[] }>(
    "/api/gallery",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    },
  );

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

  const featuredImages = galleryItems.filter((item) => item.isFeatured);

  if (featuredImages.length === 0) {
    return null;
  }

  return <FeaturedCarousel items={featuredImages} showTitle={false} />;
}
