"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MotionDiv } from "~/components/shared";
import { cn } from "~/lib/utils";

type ExperienceCarouselProps = {
  images: string[];
  experienceName: string;
};

export function ExperienceCarousel({ images, experienceName }: ExperienceCarouselProps) {
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
        <h2 className="font-ubuntu text-xl font-medium text-white">Highlights</h2>
        
        {/* Navigation Buttons */}
        {images.length > 1 && (
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
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex gap-4 overflow-x-auto scrollbar-hide",
            "pb-4 -mb-4",
            "scroll-smooth"
          )}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={cn(
                "relative overflow-hidden rounded-xl group cursor-pointer",
                "aspect-[3/4] flex-shrink-0 w-80"
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
