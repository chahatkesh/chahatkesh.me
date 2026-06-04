"use client";

import Image from "next/image";
import { MotionDiv, ScrollButtons } from "~/components/shared";
import { cn } from "~/lib/utils";
import type { GalleryItem } from "~/types/gallery";
import { typo } from "~/components/ui";
import { formatDate } from "~/lib/date-utils";
import { useHorizontalScroll } from "~/hooks/use-horizontal-scroll";

function FeaturedImage({
  item,
  priority,
  className,
  onClick,
}: {
  item: GalleryItem;
  priority?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  if (!item.src) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl group",
        "aspect-[3/4] flex-shrink-0",
        onClick && "cursor-pointer",
        className,
      )}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 280px, 320px"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      <div className="absolute bottom-4 left-4 z-10 transition-opacity duration-300">
        <h3 className="text-base font-medium text-white">
          {item.title}, {item.location}
        </h3>
        <p className="mt-1 text-sm text-white/80">{formatDate(item.date)}</p>
      </div>
    </div>
  );
}

type FeaturedCarouselProps = {
  items: GalleryItem[];
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  onImageClick?: (item: GalleryItem) => void;
};

export function FeaturedCarousel({
  items,
  title = "The Favorites",
  subtitle = "A few frames worth remembering",
  showTitle = true,
  onImageClick,
}: FeaturedCarouselProps) {
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
      className="space-y-6"
    >
      {showTitle && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className={cn(typo({ variant: "h2" }))}>{title}</h2>
            <p
              className={cn(typo({ variant: "paragraph" }), "hidden md:block")}
            >
              {subtitle}
            </p>
          </div>

          <ScrollButtons
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
            onScrollLeft={scrollLeft}
            onScrollRight={scrollRight}
          />
        </div>
      )}

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
          {items.map((item, index) => (
            <FeaturedImage
              key={item.id}
              item={item}
              priority={index < 3}
              className="w-80 flex-shrink-0"
              onClick={onImageClick ? () => onImageClick(item) : undefined}
            />
          ))}
        </div>
      </div>
    </MotionDiv>
  );
}
