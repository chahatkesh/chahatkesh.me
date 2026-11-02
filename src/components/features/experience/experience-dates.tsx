import { cn } from "~/lib/utils";

interface ExperienceDatesProps {
  start: string;
  end: string;
  duration?: string;
  /** Right-align for timeline rows; inline for stacked meta */
  align?: "right" | "inline";
  /** `md` is for the detail header so the right column has enough weight */
  size?: "sm" | "md";
  className?: string;
}

export function ExperienceDates({
  start,
  end,
  duration,
  align = "right",
  size = "sm",
  className,
}: ExperienceDatesProps) {
  const isPresent = end.toLowerCase() === "present";
  const isMd = size === "md";

  if (align === "inline") {
    return (
      <p
        className={cn("tabular-nums text-sm text-muted-foreground", className)}
      >
        {start} &ndash;{" "}
        <span className={cn(isPresent && "text-ring")}>{end}</span>
        {duration && (
          <>
            {" "}
            &middot;{" "}
            <span className="text-muted-foreground/70">{duration}</span>
          </>
        )}
      </p>
    );
  }

  return (
    <div className={cn("flex-shrink-0 text-right tabular-nums", className)}>
      <p
        className={cn(
          "whitespace-nowrap leading-none text-muted-foreground",
          isMd ? "text-sm" : "text-xs",
        )}
      >
        {start} &ndash;{" "}
        <span className={cn(isPresent && "text-ring")}>{end}</span>
      </p>
      {duration && (
        <p
          className={cn(
            "leading-none text-muted-foreground/60",
            isMd ? "mt-2 text-xs" : "mt-1.5 text-[11px]",
          )}
        >
          {duration}
        </p>
      )}
    </div>
  );
}
