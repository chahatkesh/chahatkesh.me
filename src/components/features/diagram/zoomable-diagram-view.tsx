"use client";

import { useState, useRef } from "react";
import { Minus, Plus, LocateFixed } from "lucide-react";
import {
  type ReactZoomPanPinchContentRef,
  type ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { Button } from "~/components/ui";
import { MermaidRenderer } from "./mermaid-renderer";
import { cn } from "~/lib/utils";

interface ZoomableDiagramViewProps {
  title: string;
  mermaidCode: string;
  authorName?: string;
  authorUrl?: string;
  className?: string;
}

/**
 * Read-only diagram viewport with smooth zoom/pan controls for shared pages.
 */
export function ZoomableDiagramView({
  title,
  mermaidCode,
  authorName,
  authorUrl,
  className,
}: ZoomableDiagramViewProps) {
  const transformRef = useRef<ReactZoomPanPinchContentRef | null>(null);
  const [zoomPercent, setZoomPercent] = useState(100);

  const updateZoomPercent = (scale: number) => {
    const next = Math.round(scale * 100);
    setZoomPercent((prev) => (prev === next ? prev : next));
  };

  const handleInit = (ref: ReactZoomPanPinchRef) => {
    updateZoomPercent(ref.state.scale);
  };

  const handleTransform = (
    _ref: ReactZoomPanPinchRef,
    state: { scale: number },
  ) => {
    updateZoomPercent(state.scale);
  };

  const resetView = () => {
    const api = transformRef.current;
    if (!api) return;
    api.resetTransform(180, "easeOut");
    api.centerView(1, 0, "easeOut");
  };

  return (
    <div className={cn("relative h-dvh w-full overflow-hidden", className)}>
      <TransformWrapper
        ref={transformRef}
        onInit={handleInit}
        onTransform={handleTransform}
        minScale={0.3}
        maxScale={4}
        initialScale={1}
        centerOnInit
        limitToBounds={false}
        wheel={{
          disabled: false,
          step: 0.14,
          wheelDisabled: true,
          touchPadDisabled: false,
        }}
        pinch={{ step: 5 }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut }) => (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-background/95 via-background/65 to-transparent" />

            <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 w-[min(90vw,40rem)] -translate-x-1/2 text-center sm:bottom-4">
              <h2 className="truncate text-sm font-semibold text-foreground sm:text-base">
                {title}
              </h2>
              {authorName && (
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  by{" "}
                  <a
                    href={authorUrl ?? "/"}
                    className="pointer-events-auto text-ring no-underline transition-colors hover:text-ring/80"
                  >
                    {authorName}
                  </a>
                </p>
              )}
            </div>

            <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5 sm:right-4 sm:top-4">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => zoomOut()}
                aria-label="Zoom out"
                title="Zoom out"
                className="size-8 rounded-full border border-border/60 bg-background/50 text-foreground/90 shadow-lg backdrop-blur-sm hover:bg-card/70 hover:text-foreground"
              >
                <Minus className="size-4" />
              </Button>

              <div className="min-w-[3.25rem] text-center text-xs font-medium tabular-nums text-foreground/85">
                {zoomPercent}%
              </div>

              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => zoomIn()}
                aria-label="Zoom in"
                title="Zoom in"
                className="size-8 rounded-full border border-border/60 bg-background/50 text-foreground/90 shadow-lg backdrop-blur-sm hover:bg-card/70 hover:text-foreground"
              >
                <Plus className="size-4" />
              </Button>

              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={resetView}
                aria-label="Center view"
                title="Center view"
                className="size-8 rounded-full border border-border/60 bg-background/50 text-foreground/90 shadow-lg backdrop-blur-sm hover:bg-card/70 hover:text-foreground"
              >
                <LocateFixed className="size-3.5" />
              </Button>
            </div>

            <TransformComponent
              wrapperClass="!h-full !w-full !cursor-grab active:!cursor-grabbing"
              contentClass="!h-full !w-full !flex !items-center !justify-center !select-none"
            >
              <div className="mx-auto flex min-h-full w-full items-center justify-center px-6 py-8 sm:px-12">
                <MermaidRenderer
                  code={mermaidCode}
                  title={title}
                  mode="canvas"
                />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
