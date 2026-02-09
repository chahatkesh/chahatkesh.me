"use client";

import Image, { StaticImageData } from "next/image";
import { MotionDiv, ScrollButtons } from "~/components/shared";
import { cn } from "~/lib/utils";
import { useHorizontalScroll } from "~/hooks/use-horizontal-scroll";

type ExperienceCarouselProps = {
  images: (string | StaticImageData)[];
  experienceName: string;
};

export function ExperienceCarousel({
  images,
  experienceName,
}: ExperienceCarouselProps) {
  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  } = useHorizontalScroll();

  if (images.length === 0) {
    return null;
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-ubuntu text-xl font-medium text-white">
          Highlights
        </h2>

        {images.length > 1 && (
          <ScrollButtons
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
            onScrollLeft={scrollLeft}
            onScrollRight={scrollRight}
          />
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex gap-4 overflow-x-auto scrollbar-hide",
            "pb-4 -mb-4",
            "scroll-smooth",
          )}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {images.map((image, index) => (
            <div
              key={typeof image === "string" ? image : index}
              className={cn(
                "relative overflow-hidden rounded-xl group cursor-pointer",
                "aspect-[3/4] flex-shrink-0 w-80",
              )}
            >
              <Image
                src={image}
                alt={`${experienceName} - Image ${index + 1}`}
                fill
                priority={index < 3}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 280px, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </MotionDiv>
  );
}
