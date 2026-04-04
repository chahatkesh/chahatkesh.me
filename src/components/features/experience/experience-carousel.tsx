"use client";

import Image from "next/image";
import { MotionDiv, ScrollButtons } from "~/components/shared";
import { cn } from "~/lib/utils";
import { useHorizontalScroll } from "~/hooks/use-horizontal-scroll";

export type CarouselItem = {
  url: string;
  caption?: string;
};

type ExperienceCarouselProps = {
  items: CarouselItem[];
  experienceName: string;
};

export function ExperienceCarousel({
  items,
  experienceName,
}: ExperienceCarouselProps) {
  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  } = useHorizontalScroll();

  if (items.length === 0) {
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

        {items.length > 1 && (
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
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, index) => (
            <div
              key={item.url + index}
              className={cn(
                "relative overflow-hidden rounded-xl group cursor-pointer flex-shrink-0",
                "aspect-[3/4] w-72",
              )}
            >
              <Image
                src={item.url}
                alt={
                  item.caption ?? `${experienceName} — highlight ${index + 1}`
                }
                fill
                priority={index < 3}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 260px, 288px"
              />

              {/* Always-visible gradient at bottom so caption is readable */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

              {/* Caption */}
              {item.caption && (
                <p className="absolute inset-x-0 bottom-3 px-3 text-xs text-white/90 font-medium text-center leading-snug line-clamp-2 drop-shadow">
                  {item.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </MotionDiv>
  );
}
