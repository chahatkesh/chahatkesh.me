"use client";

import { useRef } from "react";
import Image from "next/image";
import { MotionDiv } from "~/components/motion-wrapper";
import { cn } from "~/lib/utils";

export type GalleryItem = {
  id: string;
  title: string;
  date: string;
  image: any; // StaticImageData
  className?: string;
  aspectRatio?: "portrait" | "landscape" | "square" | "big-square";
  priority?: boolean;
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
              "col-span-1 md:col-span-2": item.aspectRatio === "landscape",
              "row-span-2": item.aspectRatio === "portrait",
              "col-span-2 row-span-2": item.aspectRatio === "big-square",
              "col-span-1 row-span-1": item.aspectRatio === "square" || !item.aspectRatio,
            }
          )}
        >
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={item.priority}
              className="object-cover transition-all duration-500 group-hover:scale-105"
              sizes="(min-width: 1280px) 278px, (min-width: 1040px) calc(33.3vw - 42px), (min-width: 780px) calc(50vw - 38px), calc(100vw - 32px)"
            />
            {/* Bottom left corner black overlay */}
            <div className="absolute bottom-0 left-0 z-10 h-1/3 bg-black/70 rounded-tr-2xl" />
            {/* Hover overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-100 transition-opacity duration-300" />
            {/* Default gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 z-10 transition-opacity duration-300">
              <h3 className="text-base font-medium text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-neutral-300">{item.date}</p>
            </div>
          </div>
        </MotionDiv>
      ))}
    </div>
  );
}
