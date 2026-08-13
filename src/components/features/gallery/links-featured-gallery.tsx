"use client";

import useSWR from "swr";
import { FeaturedCarousel } from "./featured-carousel";
import { Skeleton } from "~/components/ui";
import { SectionLabel } from "~/components/shared";
import { LinksAnimatedSection } from "~/components/features/links";
import { API_ROUTES, SWR_DEDUPING_INTERVAL_MS } from "~/constants";
import type { GalleryApiResponse, GalleryItem } from "~/types/gallery";
import { toGalleryItem } from "~/types/gallery";
import { simpleFetcher as fetcher } from "~/lib/fetcher";

export function LinksFeaturedGallery() {
  const { data, isLoading } = useSWR<GalleryApiResponse>(
    API_ROUTES.GALLERY,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: SWR_DEDUPING_INTERVAL_MS,
    },
  );

  const galleryItems: GalleryItem[] = data?.data?.map(toGalleryItem) || [];
  const featuredImages = galleryItems.filter((item) => item.isFeatured);

  if (isLoading) {
    return (
      <LinksAnimatedSection inView>
        <SectionLabel label="Moments" className="mb-2.5" />
        <div className="flex gap-4 overflow-hidden" aria-busy="true">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="aspect-[3/4] w-80 flex-shrink-0 rounded-xl"
            />
          ))}
        </div>
      </LinksAnimatedSection>
    );
  }

  if (featuredImages.length === 0) {
    return null;
  }

  return (
    <LinksAnimatedSection inView>
      <FeaturedCarousel
        items={featuredImages}
        showTitle={false}
        showScrollButtons
        edgeFade
        animated={false}
        label="Moments"
      />
    </LinksAnimatedSection>
  );
}
