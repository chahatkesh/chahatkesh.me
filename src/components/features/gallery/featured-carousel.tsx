"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MotionDiv } from "~/components/shared";
import { cn } from "~/lib/utils";
import { GalleryItem } from "./gallery-grid";
import { typo } from "~/components/ui";

// Function to dynamically import image based on title
async function getImageByTitle(title: string) {
  try {
    const filename = title
      .replace(/[^a-zA-Z0-9\s]/g, '') 
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');

    const imageModule = await import(`~/assets/images/gallery/${filename}.jpeg`);
    return imageModule.default;
  } catch {
    console.warn(`Image not found for title: ${title}, expected filename: ${title.replace(/[^a-zA-Z0-9\s]/g, '').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('')}.jpeg`);
    return null;
  }
}

// Hook to load image dynamically
function useGalleryImage(title: string) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getImageByTitle(title).then((src) => {
      setImageSrc(src);
      setIsLoading(false);
    });
  }, [title]);

  return { imageSrc, isLoading };
}

// Featured Image Component
function FeaturedImage({ item, priority, className }: { 
  item: GalleryItem; 
  priority?: boolean; 
  className?: string;
}) {
  const { imageSrc, isLoading } = useGalleryImage(item.title);

  if (isLoading) {
    return (
      <div className={cn(
        "relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse",
        "aspect-[3/4]",
        className
      )}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    );
  }

  if (!imageSrc) {
    return null;
  }

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl group cursor-pointer",
      "aspect-[3/4] flex-shrink-0",
      className
    )}>
      <Image
        src={imageSrc}
        alt={item.title}
        fill
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 280px, 320px"
      />
      {/* Bottom left corner black overlay */}
      <div className="absolute bottom-0 left-0 z-10 h-1/3 bg-black/70 rounded-tr-2xl" />
      {/* Hover overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-100 transition-opacity duration-300" />
      {/* Default gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-4 left-4 z-10 transition-opacity duration-300">
        <h3 className="text-base font-medium text-white">{item.title},{" "}{item.location}</h3>
        <p className="mt-1 text-sm text-neutral-300">{item.date}</p>
      </div>
    </div>
  );
}

type FeaturedCarouselProps = {
  items: GalleryItem[];
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
};

export function FeaturedCarousel({ 
  items, 
  title = "Featured Moments",
  subtitle = "Highlights from my journey and experiences",
  showTitle = true 
}: FeaturedCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      return () => scrollContainer.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // Width of one card plus gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

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
            <h2 className={cn(typo({ variant: "h2" }))}>{ title}</h2>
            <p className={cn(typo({ variant: "paragraph" }), "hidden md:block")}>
              {subtitle}
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={cn(
              "p-2 rounded-full border transition-all duration-200",
              "bg-neutral-900 border-neutral-700 text-white",
              "hover:bg-neutral-800 hover:border-neutral-600",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              canScrollLeft ? "hover:scale-105" : ""
            )}
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={cn(
              "p-2 rounded-full border transition-all duration-200",
              "bg-neutral-900 border-neutral-700 text-white",
              "hover:bg-neutral-800 hover:border-neutral-600",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              canScrollRight ? "hover:scale-105" : ""
            )}
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex gap-4 overflow-x-auto scrollbar-hide",
            "pb-4 -mb-4", // Add padding bottom and negative margin to hide scrollbar
            "scroll-smooth"
          )}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {items.map((item, index) => (
            <FeaturedImage
              key={item.id}
              item={item}
              priority={index < 3}
              className="w-80 flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </MotionDiv>
  );
}
