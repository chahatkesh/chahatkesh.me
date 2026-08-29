"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import config from "~/config";
import { cn } from "~/lib/utils";

const { language } = config.seo;
const { timeZone, country } = config.location;

const timeFormatter = new Intl.DateTimeFormat(language, {
  hour: "numeric",
  minute: "2-digit",
  timeZone,
});

const isoFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone,
});

function formatLocalTime(date: Date): { label: string; iso: string } {
  const parts = isoFormatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "00";

  return {
    label: timeFormatter.format(date),
    iso: `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}`,
  };
}

const statClassName =
  "inline-flex items-center gap-1.5 text-[13px] text-muted-foreground/75 md:text-sm";

interface LocalTimeProps {
  className?: string;
  /** Stacked, right-aligned layout for the desktop hero corner. */
  variant?: "inline" | "corner";
}

/**
 * Live clock in the configured timezone, aligned to minute boundaries.
 * Renders an empty width-reserved slot until mounted to avoid hydration mismatch.
 */
export function LocalTime({ className, variant = "inline" }: LocalTimeProps) {
  const [time, setTime] = useState<{ label: string; iso: string } | null>(null);

  useEffect(() => {
    const update = () => setTime(formatLocalTime(new Date()));

    update();

    const msUntilNextMinute = 60_000 - (Date.now() % 60_000);
    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      update();
      intervalId = window.setInterval(update, 60_000);
    }, msUntilNextMinute);

    const onVisibility = () => {
      if (document.visibilityState === "visible") update();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const timeLabel = (
    <span
      className={cn(
        "tabular-nums text-foreground/90",
        variant === "inline" && "inline-block min-w-[4rem]",
        variant === "inline" && !time && "invisible",
        variant === "corner" && !time && "opacity-0",
      )}
    >
      {time?.label ?? "12:34 AM"}
    </span>
  );

  if (variant === "corner") {
    return (
      <div
        className={cn(
          "text-right text-[13px] text-muted-foreground/75",
          className,
        )}
      >
        <div className="flex items-center justify-end gap-1.5">
          <Clock className="size-3.5 shrink-0" aria-hidden />
          <time dateTime={time?.iso}>{timeLabel}</time>
        </div>
        <p className="text-[11px] text-muted-foreground/60">in {country}</p>
      </div>
    );
  }

  return (
    <span className={cn(statClassName, className)}>
      <Clock className="size-3.5 shrink-0" aria-hidden />
      <time dateTime={time?.iso}>
        {timeLabel}
        <span className="hidden sm:inline"> in {country}</span>
      </time>
    </span>
  );
}
