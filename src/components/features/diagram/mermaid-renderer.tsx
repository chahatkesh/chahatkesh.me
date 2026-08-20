"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "~/lib/utils";

export type MermaidRenderState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready" }
  | { status: "error"; errorMessage: string };

interface MermaidRendererProps {
  code?: string;
  title: string;
  className?: string;
  mode?: "editor" | "canvas";
  /** fill stretches to the container; contain keeps article diagrams compact. */
  fit?: "fill" | "contain";
  onRenderStateChange?: (state: MermaidRenderState) => void;
  onSvgReady?: (svg: SVGSVGElement | null) => void;
}

function readHsl(variable: string, fallback: string, alpha = 1): string {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
  if (!raw) return fallback;
  return alpha === 1 ? `hsl(${raw})` : `hsl(${raw} / ${alpha})`;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  if (typeof error === "string" && error.trim()) {
    return error;
  }
  return "Invalid Mermaid syntax. Please review your diagram code.";
}

/**
 * Renders Mermaid source safely with strict security mode.
 * Keeps parser/runtime errors local to this component so pages never crash.
 */
export function MermaidRenderer({
  code,
  title,
  className,
  mode = "editor",
  fit = "fill",
  onRenderStateChange,
  onSvgReady,
}: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<MermaidRenderState>({ status: "idle" });
  const isCanvasMode = mode === "canvas";
  const isContainFit = fit === "contain";
  const renderId = useMemo(
    () => `mermaid-${Math.random().toString(36).slice(2, 10)}`,
    [],
  );

  useEffect(() => {
    onRenderStateChange?.(state);
  }, [onRenderStateChange, state]);

  useEffect(() => {
    const normalizedCode = (code ?? "").trim();

    if (!normalizedCode) {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      onSvgReady?.(null);
      setState({ status: "idle" });
      return;
    }

    let cancelled = false;

    async function renderDiagram() {
      setState({ status: "loading" });

      try {
        const mod = await import("mermaid");
        const mermaid = mod.default ?? mod;

        const background = readHsl("--background", "hsl(224 71% 4%)");
        const surface = readHsl("--card", "hsl(220 25% 10%)");
        const border = readHsl("--border", "hsl(218 18% 24%)");
        const text = readHsl("--foreground", "hsl(210 40% 98%)");
        const accent = readHsl("--ring", "hsl(182.7 100% 35.5%)");
        const accentSoft = readHsl("--ring", "hsl(182.7 100% 35.5%)", 0.1);

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          themeVariables: {
            background,
            primaryColor: surface,
            primaryBorderColor: border,
            primaryTextColor: text,
            secondaryColor: surface,
            secondaryBorderColor: border,
            secondaryTextColor: text,
            tertiaryColor: background,
            tertiaryBorderColor: border,
            tertiaryTextColor: text,
            lineColor: accent,
            nodeBorder: border,
            nodeTextColor: text,
            clusterBkg: accentSoft,
            clusterBorder: accent,
            edgeLabelBackground: background,
            titleColor: text,
            textColor: text,
            fontSize: isContainFit ? "13px" : "14px",
          },
          flowchart: {
            curve: "basis",
            useMaxWidth: !isCanvasMode && !isContainFit,
            // HTML labels keep a fixed CSS font size, so they clip when the
            // SVG is scaled to fit an article. SVG text scales with the chart.
            htmlLabels: !isContainFit,
            padding: isContainFit ? 12 : 16,
            nodeSpacing: isContainFit ? 28 : 50,
            rankSpacing: isContainFit ? 44 : 50,
          },
          sequence: {
            useMaxWidth: !isCanvasMode && !isContainFit,
          },
        });

        const { svg, bindFunctions } = await mermaid.render(
          renderId,
          normalizedCode,
        );

        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = svg;

        const svgElement = containerRef.current.querySelector("svg");
        if (svgElement) {
          const viewBox = svgElement.viewBox.baseVal;

          if (isCanvasMode && viewBox.width > 0 && viewBox.height > 0) {
            svgElement.style.width = `${viewBox.width}px`;
            svgElement.style.height = `${viewBox.height}px`;
            svgElement.style.maxWidth = "none";
            svgElement.style.maxHeight = "none";
            svgElement.style.display = "block";
          } else if (isContainFit) {
            svgElement.removeAttribute("width");
            svgElement.removeAttribute("height");
            svgElement.style.width = "auto";
            svgElement.style.height = "auto";
            svgElement.style.maxWidth = "100%";
            svgElement.style.maxHeight = "28rem";
            svgElement.style.display = "block";
            svgElement.style.marginInline = "auto";
          } else {
            svgElement.removeAttribute("height");
            svgElement.style.height = "auto";
            svgElement.style.maxWidth = "100%";
            svgElement.style.width = "100%";
          }

          onSvgReady?.(svgElement);
        }

        bindFunctions?.(containerRef.current);
        setState({ status: "ready" });
      } catch (error) {
        if (cancelled) return;
        onSvgReady?.(null);
        setState({ status: "error", errorMessage: getErrorMessage(error) });
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [code, renderId, isCanvasMode, isContainFit, onSvgReady]);

  return (
    <div className={cn(isCanvasMode ? "w-auto" : "w-full", className)}>
      {state.status === "idle" && (
        <div
          className={cn(
            "flex min-h-[280px] items-center justify-center p-6 text-center text-sm text-muted-foreground",
            isCanvasMode
              ? "rounded-lg border border-dashed border-border/70 bg-background/60"
              : "rounded-xl border border-dashed border-border bg-card/30",
          )}
        >
          Start typing Mermaid code to see a live preview.
        </div>
      )}

      {state.status === "loading" && (
        <div
          className={cn(
            "flex items-center justify-center gap-3 text-sm text-muted-foreground",
            isCanvasMode
              ? ""
              : "min-h-[280px] rounded-xl border border-border bg-card/30 p-6",
          )}
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-ring" />
          Rendering diagram...
        </div>
      )}

      {state.status === "error" && (
        <div
          className={cn(
            "min-h-[280px] border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500",
            isCanvasMode ? "rounded-lg" : "rounded-xl",
          )}
        >
          <p className="font-medium">Unable to render Mermaid diagram</p>
          <p className="mt-1 break-words text-red-500/90">
            {state.errorMessage}
          </p>
        </div>
      )}

      <div
        ref={containerRef}
        role="img"
        aria-label={title}
        className={cn(
          isCanvasMode
            ? "inline-flex items-start justify-start [&_svg]:h-auto [&_svg]:w-auto"
            : "mx-auto flex w-full justify-center rounded-xl border border-border bg-card/30 p-3 sm:p-5 [&_svg]:h-auto",
          state.status === "ready" ? "" : "hidden",
        )}
      />
    </div>
  );
}
