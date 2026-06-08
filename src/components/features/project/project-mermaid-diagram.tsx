"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { typo } from "~/components/ui";
import { MotionDiv } from "~/components/shared";

interface ProjectMermaidDiagramProps {
  title: string;
  definition: string;
}

/**
 * Resolves an HSL CSS variable (e.g. "240 10% 3.9%") into a usable color string
 * so the diagram can inherit the exact portfolio design tokens.
 */
function readHsl(variable: string, fallback: string, alpha = 1): string {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
  if (!raw) return fallback;
  return alpha === 1 ? `hsl(${raw})` : `hsl(${raw} / ${alpha})`;
}

export function ProjectMermaidDiagram({
  title,
  definition,
}: ProjectMermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const id = useMemo(
    () => `project-mermaid-${Math.random().toString(36).slice(2, 10)}`,
    [],
  );
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        const mod = await import("mermaid");
        const mermaid = mod.default ?? mod;

        // Map the portfolio design tokens onto Mermaid's theme variables so the
        // diagram visually matches the rest of the site (dark surface, teal
        // accent, white text, subtle borders).
        const background = readHsl("--card", "hsl(240 5% 8%)");
        const surface = readHsl("--muted", "hsl(240 3.7% 15.9%)");
        const border = readHsl("--border", "hsl(240 3.7% 15.9%)");
        const text = readHsl("--foreground", "hsl(0 0% 98%)");
        const muted = readHsl("--muted-foreground", "hsl(240 5% 64.9%)");
        const accent = readHsl("--ring", "hsl(182.7 100% 35.5%)");
        const accentSoft = readHsl("--ring", "hsl(182.7 100% 35.5%)", 0.14);

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
            mainBkg: surface,
            nodeBorder: border,
            nodeTextColor: text,
            clusterBkg: accentSoft,
            clusterBorder: accent,
            edgeLabelBackground: background,
            titleColor: text,
            textColor: muted,
            fontSize: "14px",
          },
          flowchart: {
            curve: "basis",
            padding: 14,
            nodeSpacing: 36,
            rankSpacing: 56,
            useMaxWidth: true,
            htmlLabels: true,
          },
        });

        const { svg, bindFunctions } = await mermaid.render(id, definition);

        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = svg;

        // Ensure the produced SVG scales fluidly but never dominates the page.
        const svgEl = containerRef.current.querySelector("svg");
        if (svgEl) {
          svgEl.removeAttribute("height");
          svgEl.style.height = "auto";
          svgEl.style.width = "100%";
          // Cap the rendered size so large diagrams stay compact and readable.
          svgEl.style.maxWidth = "720px";
          svgEl.style.maxHeight = "420px";
        }

        bindFunctions?.(containerRef.current);
        setStatus("ready");
      } catch (error) {
        if (!cancelled) {
          setStatus("error");
          console.error("Mermaid render error:", error);
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [definition, id]);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-5"
    >
      <div className="flex flex-col gap-2">
        <h2 className={typo({ variant: "h2" })}>How It Works</h2>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card/80 to-background/60 backdrop-blur-sm">
        {/* Subtle accent glow consistent with site hover treatments */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-ring/10 blur-3xl" />
          <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-ring/5 blur-3xl" />
        </div>

        <div className="relative overflow-x-auto p-4 sm:p-6 md:p-8">
          {status === "loading" && (
            <div className="flex min-h-[160px] items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-ring" />
              <span>Rendering diagram&hellip;</span>
            </div>
          )}

          {status === "error" && (
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              Could not render the diagram. Please refresh the page.
            </div>
          )}

          <div
            ref={containerRef}
            role="img"
            aria-label={title}
            className={
              "mx-auto flex w-full justify-center [&_svg]:h-auto" +
              (status === "ready" ? "" : " hidden")
            }
          />
        </div>
      </div>
    </MotionDiv>
  );
}
