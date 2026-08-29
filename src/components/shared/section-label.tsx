import { cn } from "~/lib/utils";

interface SectionLabelProps {
  label: string;
  className?: string;
  /** Renders as a caption (plain text) instead of a heading. */
  asCaption?: boolean;
  /** Optional value shown between two hairlines, before the trailing rule. */
  value?: string;
  /** Optional element pinned to the far right. */
  trailing?: React.ReactNode;
}

/**
 * Compact uppercase label with a hairline rule, used to head grouped lists.
 * Shared by the links page groups, the coding activity caption, and the gallery.
 */
export function SectionLabel({
  label,
  className,
  asCaption = false,
  value,
  trailing,
}: SectionLabelProps) {
  const text = "text-[11px] font-medium uppercase tracking-[0.14em]";

  return (
    <div className={cn("flex items-center gap-3 px-1", className)}>
      {asCaption ? (
        <span className={cn(text, "shrink-0 text-muted-foreground/60")}>
          {label}
        </span>
      ) : (
        <h2 className={cn(text, "shrink-0 text-muted-foreground/60")}>
          {label}
        </h2>
      )}

      <span aria-hidden className="h-px min-w-3 flex-1 bg-border/60" />

      {value && (
        <>
          <span className="shrink-0 tabular-nums text-[11px] text-muted-foreground/70">
            {value}
          </span>
          <span aria-hidden className="h-px min-w-3 flex-1 bg-border/60" />
        </>
      )}

      {trailing}
    </div>
  );
}
