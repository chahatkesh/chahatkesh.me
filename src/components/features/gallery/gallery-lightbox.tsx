"use client";

import { useCallback, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";
import { formatDate } from "~/lib/date-utils";
import type { GalleryItem } from "~/types/gallery";

type GalleryLightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function GalleryLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: GalleryLightboxProps) {
  const isOpen = index !== null && index >= 0 && index < items.length;
  const item = isOpen ? items[index] : null;
  const hasMultiple = items.length > 1;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onIndexChange(index === 0 ? items.length - 1 : index - 1);
  }, [index, items.length, onIndexChange]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onIndexChange(index === items.length - 1 ? 0 : index + 1);
  }, [index, items.length, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, goPrev, goNext]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center outline-none"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">
            {item?.title ?? "Gallery image"}
          </Dialog.Title>

          {/* Close button */}
          <Dialog.Close
            className={cn(
              "absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2",
              "text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white",
              "focus:outline-none focus:ring-2 focus:ring-white/40",
            )}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Dialog.Close>

          {/* Prev arrow */}
          {hasMultiple && (
            <button
              onClick={goPrev}
              className={cn(
                "absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2",
                "text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white",
                "focus:outline-none focus:ring-2 focus:ring-white/40",
              )}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next arrow */}
          {hasMultiple && (
            <button
              onClick={goNext}
              className={cn(
                "absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2",
                "text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white",
                "focus:outline-none focus:ring-2 focus:ring-white/40",
              )}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Image + caption */}
          {item && (
            <div className="flex max-h-[95vh] max-w-[95vw] flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.title}
                className="max-h-[85vh] max-w-[92vw] h-auto w-auto rounded-lg object-contain"
              />
              <div className="text-center">
                <p className="text-sm font-medium text-white">
                  {item.title}, {item.location}
                </p>
                <p className="mt-0.5 text-xs text-white/70">
                  {formatDate(item.date)}
                </p>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
