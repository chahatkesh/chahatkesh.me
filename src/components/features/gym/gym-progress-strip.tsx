"use client";

import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { API_ROUTES } from "~/constants";
import { fetcher } from "~/lib/fetcher";
import { formatDate } from "~/lib/date-utils";
import { cn } from "~/lib/utils";
import type {
  GymProgressPhoto,
  GymProgressPhotoListApiResponse,
} from "~/types/gym";

const STALE_TIME_MS = 5 * 60 * 1000;

interface ProgressLightboxItem {
  id: string;
  date: string;
  src: string;
}

function ProgressLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: ProgressLightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
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
    function handleKey(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") goPrev();
      else if (event.key === "ArrowRight") goNext();
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
            {item
              ? `Progress photo from ${formatDate(item.date)}`
              : "Progress photo"}
          </Dialog.Title>

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

          {hasMultiple ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                className={cn(
                  "absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2",
                  "text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white",
                  "focus:outline-none focus:ring-2 focus:ring-white/40",
                )}
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className={cn(
                  "absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2",
                  "text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white",
                  "focus:outline-none focus:ring-2 focus:ring-white/40",
                )}
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          ) : null}

          {item ? (
            <div className="flex max-h-[95vh] max-w-[95vw] flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={`Progress on ${formatDate(item.date)}`}
                className="max-h-[85vh] max-w-[92vw] h-auto w-auto rounded-lg object-contain"
              />
              <p className="text-sm font-medium text-white">
                {formatDate(item.date)}
              </p>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function toLightboxItem(photo: GymProgressPhoto): ProgressLightboxItem {
  return {
    id: photo._id,
    date: photo.date,
    src: photo.imageUrl,
  };
}

function formatStripDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function GymProgressStrip() {
  const { data, isLoading, isError } =
    useQuery<GymProgressPhotoListApiResponse>({
      queryKey: ["gym-progress-photos"],
      queryFn: () =>
        fetcher<GymProgressPhotoListApiResponse>(API_ROUTES.GYM_PHOTOS),
      staleTime: STALE_TIME_MS,
    });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = data?.data ?? [];
  const items = photos.map(toLightboxItem);

  if (isLoading || isError || photos.length === 0) {
    return null;
  }

  return (
    <section aria-label="Progress photos">
      <p className="mb-3 text-[11px] font-medium tracking-wide text-muted-foreground">
        Progress
      </p>

      <div className="-mx-1 overflow-x-auto px-1 pb-1 scrollbar-hide">
        <div className="flex w-max gap-3">
          {photos.map((photo, index) => (
            <button
              key={photo._id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="el-focus-styles group flex w-[7.5rem] shrink-0 flex-col gap-2 sm:w-[8.5rem]"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-md bg-muted/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.imageUrl}
                  alt={`Progress on ${formatStripDate(photo.date)}`}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <span className="text-center text-[11px] tabular-nums text-muted-foreground transition-colors group-hover:text-foreground">
                {formatStripDate(photo.date)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <ProgressLightbox
        items={items}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
