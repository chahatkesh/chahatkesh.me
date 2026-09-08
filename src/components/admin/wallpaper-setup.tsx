"use client";

import { type ReactNode, useCallback, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

import { AdminPageHeader } from "./admin-page-header";
import { Button } from "~/components/ui";
import { API_ROUTES } from "~/constants";
import {
  WALLPAPER_COLORS,
  WALLPAPER_SIZE,
  WALLPAPER_TIMEZONE,
} from "~/constants/wallpaper";
import { cn } from "~/lib/utils";

interface WallpaperSetupProps {
  wallpaperUrl: string;
}

const BREADCRUMBS = [
  { name: "Admin", url: "/admin" },
  { name: "Gym", url: "/admin/gym" },
  { name: "Wallpaper", url: "/admin/gym/wallpaper" },
];

const SETUP_STEPS: { title: string; body: ReactNode }[] = [
  {
    title: "Create a daily automation",
    body: "Shortcuts → Automation → New Personal Automation → Time of Day (12:00 AM).",
  },
  {
    title: "Fetch the wallpaper",
    body: (
      <>
        Add{" "}
        <strong className="font-medium text-foreground">
          Get Contents of URL
        </strong>
        , not Open URL, and paste the shortcut URL.
      </>
    ),
  },
  {
    title: "Set it on the lock screen",
    body: (
      <>
        Add{" "}
        <strong className="font-medium text-foreground">Set Wallpaper</strong>{" "}
        and choose Lock Screen and/or Home Screen.
      </>
    ),
  },
  {
    title: "Run it unattended",
    body: (
      <>
        Turn off{" "}
        <strong className="font-medium text-foreground">
          Ask Before Running
        </strong>{" "}
        so it updates overnight.
      </>
    ),
  },
];

const LEGEND = [
  { label: "Training", color: WALLPAPER_COLORS.training },
  { label: "Rest", color: WALLPAPER_COLORS.rest },
  { label: "Unlogged", color: WALLPAPER_COLORS.inactive },
] as const;

function formatLockScreen(date: Date) {
  const dateLabel = date.toLocaleDateString("en-US", {
    timeZone: WALLPAPER_TIMEZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const timeLabel = date
    .toLocaleTimeString("en-US", {
      timeZone: WALLPAPER_TIMEZONE,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/\s?[AP]M/i, "");

  return { dateLabel, timeLabel };
}

function IPhonePreview({ src }: { src: string }) {
  const { dateLabel, timeLabel } = useMemo(
    () => formatLockScreen(new Date()),
    [],
  );

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-[16.5rem] flex-col items-center gap-5 xs:max-w-[19.5rem]">
      <div className="relative w-full min-w-0 px-[3px]">
        <div
          aria-hidden
          className="absolute left-0 top-[17%] z-10 h-6 w-[3px] rounded-l-sm bg-neutral-500"
        />
        <div
          aria-hidden
          className="absolute left-0 top-[26%] z-10 h-11 w-[3px] rounded-l-sm bg-neutral-500"
        />
        <div
          aria-hidden
          className="absolute left-0 top-[36%] z-10 h-11 w-[3px] rounded-l-sm bg-neutral-500"
        />
        <div
          aria-hidden
          className="absolute right-0 top-[29%] z-10 h-14 w-[3px] rounded-r-sm bg-neutral-500"
        />

        <div className="rounded-[2.7rem] bg-gradient-to-br from-neutral-500 via-neutral-800 to-neutral-950 p-[9px] shadow-[0_30px_80px_-32px_rgba(0,0,0,0.85)]">
          <div
            className="relative overflow-hidden rounded-[2.15rem] bg-black"
            style={{
              aspectRatio: `${WALLPAPER_SIZE.width} / ${WALLPAPER_SIZE.height}`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt="iPhone 15 Pro streak wallpaper preview"
              className="absolute inset-0 size-full object-cover"
            />

            <div
              aria-hidden
              className="absolute left-1/2 top-[12px] z-10 flex h-[22px] w-[90px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[9px]"
            >
              <span className="size-[7px] rounded-full bg-neutral-950 ring-1 ring-neutral-800" />
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-[2.7rem] z-10 flex flex-col items-center text-white">
              <p className="text-[12px] font-medium tracking-wide text-white/90">
                {dateLabel}
              </p>
              <p className="mt-1 text-[3.65rem] font-extralight leading-none tracking-tight tabular-nums">
                {timeLabel}
              </p>
            </div>

            <div
              aria-hidden
              className="absolute bottom-[9px] left-1/2 z-10 h-[4px] w-[108px] -translate-x-1/2 rounded-full bg-white/75"
            />
          </div>
        </div>
      </div>

      <p className="text-[11px] tracking-wide text-muted-foreground">
        iPhone 15 Pro · live preview
      </p>
    </div>
  );
}

export function WallpaperSetup({ wallpaperUrl }: WallpaperSetupProps) {
  const [copied, setCopied] = useState(false);
  const [previewNonce] = useState(() => Date.now());
  const previewUrl = `${API_ROUTES.WALLPAPER}?t=${previewNonce}`;

  const copyWallpaperUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(wallpaperUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy wallpaper URL:", error);
    }
  }, [wallpaperUrl]);

  return (
    <div className="space-y-8 pb-16">
      <AdminPageHeader
        breadcrumbs={BREADCRUMBS}
        title="Wallpaper"
        subtitle="Daily iPhone 15 Pro lock screen from your gym streak."
      />

      <div className="grid min-w-0 lg:grid-cols-[minmax(0,1fr)_22.5rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="order-2 flex min-w-0 flex-col justify-center gap-9 pt-8 lg:order-1 lg:pt-0">
          <section className="space-y-3">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-foreground">
                Shortcut URL
              </h2>
              <p className="text-xs text-muted-foreground">
                Public PNG — paste this into Get Contents of URL.
              </p>
            </div>
            <div className="flex overflow-hidden rounded-lg border border-border bg-muted/30">
              <code className="min-w-0 flex-1 truncate px-3.5 py-2.5 text-xs text-foreground">
                {wallpaperUrl}
              </code>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => void copyWallpaperUrl()}
                className="h-auto shrink-0 rounded-none border-l border-border px-3 text-xs"
              >
                {copied ? (
                  <Check className="mr-1.5 size-3.5" />
                ) : (
                  <Copy className="mr-1.5 size-3.5" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground">
              iPhone Shortcut setup
            </h2>
            <ol>
              {SETUP_STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="relative flex gap-3.5 pb-6 last:pb-0"
                >
                  {index < SETUP_STEPS.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute left-[13px] top-7 h-[calc(100%-0.5rem)] w-px bg-border"
                    />
                  ) : null}
                  <span
                    className={cn(
                      "relative z-[1] mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-background",
                      "text-xs font-medium tabular-nums text-muted-foreground",
                    )}
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0 space-y-1 pt-0.5">
                    <p className="text-sm font-medium text-foreground">
                      {step.title}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5">
            {LEGEND.map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-2 text-[11px] text-muted-foreground"
              >
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </span>
            ))}
            <span className="text-[11px] text-muted-foreground/70 sm:ml-auto">
              IST · 1179×2556
            </span>
          </div>
        </div>

        <div className="order-1 flex min-w-0 w-full justify-center lg:order-2 lg:w-auto">
          <IPhonePreview src={previewUrl} />
        </div>
      </div>
    </div>
  );
}
