"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { MonthlyChangelog } from "~/data/changelog";
import { getChangelogPreview } from "~/app/changelog/_shared";
import { ChangelogRow } from "./changelog-row";

type ChangelogListProps = {
  entries: MonthlyChangelog[];
};

type PreviewState = {
  entry: MonthlyChangelog;
  x: number;
  y: number;
};

const PREVIEW_WIDTH = 512;
const PREVIEW_HEIGHT = 256;
const CURSOR_OFFSET = 24;

function clampPreviewPosition(x: number, y: number) {
  const maxX = window.innerWidth - PREVIEW_WIDTH - 16;
  const maxY = window.innerHeight - PREVIEW_HEIGHT - 16;

  return {
    x: Math.min(Math.max(x + CURSOR_OFFSET, 16), maxX),
    y: Math.min(Math.max(y + CURSOR_OFFSET, 16), maxY),
  };
}

export function ChangelogList({ entries }: ChangelogListProps) {
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [canHoverPreview, setCanHoverPreview] = useState(false);
  const activeEntryRef = useRef<MonthlyChangelog | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHoverPreview(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handleActivate = useCallback(
    (entry: MonthlyChangelog, x: number, y: number) => {
      if (!canHoverPreview || !getChangelogPreview(entry)) return;
      activeEntryRef.current = entry;
      const position = clampPreviewPosition(x, y);
      setPreview({ entry, ...position });
    },
    [canHoverPreview],
  );

  const handleMove = useCallback((x: number, y: number) => {
    if (!activeEntryRef.current) return;
    const position = clampPreviewPosition(x, y);
    setPreview((current) =>
      current ? { entry: current.entry, ...position } : null,
    );
  }, []);

  const handleDeactivate = useCallback(() => {
    activeEntryRef.current = null;
    setPreview(null);
  }, []);

  const previewSrc = preview ? getChangelogPreview(preview.entry) : undefined;

  return (
    <>
      <ul className="relative border-t border-border/70">
        {entries.map((entry) => (
          <li key={entry.month}>
            <ChangelogRow
              entry={entry}
              isActive={preview?.entry.month === entry.month}
              onActivate={(x, y) => handleActivate(entry, x, y)}
              onMove={handleMove}
              onDeactivate={handleDeactivate}
            />
          </li>
        ))}
      </ul>

      {preview && previewSrc && canHoverPreview ? (
        <div
          aria-hidden
          className="pointer-events-none fixed z-20 hidden w-[32rem] motion-reduce:transition-none lg:block"
          style={{
            left: preview.x,
            top: preview.y,
          }}
        >
          <div className="overflow-hidden rounded-xl border border-white/10 bg-card shadow-2xl shadow-black/40">
            <Image
              src={previewSrc}
              alt=""
              width={1024}
              height={512}
              unoptimized
              className="aspect-[2/1] w-full object-cover"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
