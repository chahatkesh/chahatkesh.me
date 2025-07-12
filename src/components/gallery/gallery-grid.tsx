"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MotionDiv } from "~/components/motion-wrapper";
import { cn } from "~/lib/utils";

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

// Component for individual gallery image
function GalleryImage({ title, alt, priority, className }: { 
  title: string; 
  alt: string; 
  priority?: boolean; 
  className?: string;
}) {
  const { imageSrc, isLoading } = useGalleryImage(title);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-neutral-800">
        <div className="text-neutral-400 text-sm">Loading...</div>
      </div>
    );
  }

  if (!imageSrc) {
    // Creative SVG placeholder when image is not available
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
        <div className="flex flex-col items-center justify-center text-center p-4">
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            className="mb-3 text-neutral-500"
            fill="currentColor"
          >
            {/* Camera icon with mountain scenery */}
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            
            {/* Mountain background */}
            <path d="M10 70 L30 45 L50 55 L70 35 L90 50 L90 80 L10 80 Z" fill="url(#grad1)" opacity="0.3" />
            <path d="M20 75 L40 50 L60 60 L80 40 L90 55 L90 80 L20 80 Z" fill="url(#grad1)" opacity="0.5" />
            
            {/* Sun */}
            <circle cx="75" cy="25" r="8" fill="#fbbf24" opacity="0.7" />
            
            {/* Camera body */}
            <rect x="25" y="35" width="50" height="35" rx="5" fill="#374151" stroke="#6b7280" strokeWidth="2" />
            
            {/* Camera lens */}
            <circle cx="50" cy="52" r="12" fill="#1f2937" stroke="#6b7280" strokeWidth="2" />
            <circle cx="50" cy="52" r="8" fill="#111827" />
            <circle cx="50" cy="52" r="4" fill="#374151" />
            <circle cx="52" cy="50" r="1.5" fill="#9ca3af" />
            
            {/* Camera flash */}
            <rect x="60" y="38" width="8" height="4" rx="2" fill="#ef4444" />
            
            {/* Camera viewfinder */}
            <rect x="35" y="30" width="8" height="4" rx="2" fill="#6b7280" />
            
            {/* Decorative elements */}
            <circle cx="20" cy="20" r="2" fill="#6366f1" opacity="0.4" />
            <circle cx="85" cy="75" r="1.5" fill="#8b5cf6" opacity="0.6" />
            <circle cx="15" cy="85" r="1" fill="#06b6d4" opacity="0.5" />
          </svg>
          
          <p className="text-sm text-neutral-400 font-medium mb-1">Image not found</p>
          <p className="text-xs text-neutral-500 px-2">
            Expected: <span className="font-mono text-neutral-400">{title.replace(/[^a-zA-Z0-9\s]/g, '').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('')}.jpeg</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      priority={priority}
      className={className}
      sizes="(min-width: 1280px) 278px, (min-width: 1040px) calc(33.3vw - 42px), (min-width: 780px) calc(50vw - 38px), calc(100vw - 32px)"
    />
  );
}

export type GalleryItem = {
  id: string;
  title: string;
  location: string;
  date: string;
  className?: string;
  aspectRatio?: "portrait" | "landscape" | "square" | "big-square";
  isFeatured?: boolean;
};

type BentoGridProps = {
  items: GalleryItem[];
};

export function GalleryGrid({ items }: BentoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef} 
      className="grid w-full auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
    >
      {items.map((item, i) => (
        <MotionDiv
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className={cn(
            "group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950",
            item.className,
            {
              // Mobile: all items are single column width, different aspect ratios apply to desktop only
              "md:col-span-2": item.aspectRatio === "landscape",
              "row-span-2": item.aspectRatio === "portrait",
              "md:col-span-2 row-span-2": item.aspectRatio === "big-square",
              "col-span-1 row-span-1": item.aspectRatio === "square" || !item.aspectRatio,
            }
          )}
        >
          <div className="relative h-full w-full overflow-hidden">
            <GalleryImage
              title={item.title}
              alt={item.title}
              priority={i < 3} // First 3 items get priority loading
              className="object-cover transition-all duration-500 group-hover:scale-105"
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
        </MotionDiv>
      ))}
    </div>
  );
}
