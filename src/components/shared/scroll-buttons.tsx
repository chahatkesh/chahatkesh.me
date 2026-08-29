import { cn } from "~/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollButtonsProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  className?: string;
  size?: "sm" | "md";
}

/**
 * Reusable left/right scroll navigation buttons for carousels.
 */
export function ScrollButtons({
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight,
  className,
  size = "md",
}: ScrollButtonsProps) {
  const isSm = size === "sm";

  const buttonClassName = cn(
    "el-focus-styles rounded-full border transition-colors duration-150",
    "bg-card border-border text-foreground",
    "hover:bg-muted hover:border-muted-foreground/30",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    isSm ? "p-1" : "p-2",
  );

  const iconClassName = isSm ? "size-3.5" : "size-5";

  return (
    <div className={cn("flex gap-2", isSm && "gap-1.5", className)}>
      <button
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
        className={buttonClassName}
        aria-label="Scroll left"
      >
        <ChevronLeft className={iconClassName} />
      </button>
      <button
        onClick={onScrollRight}
        disabled={!canScrollRight}
        className={buttonClassName}
        aria-label="Scroll right"
      >
        <ChevronRight className={iconClassName} />
      </button>
    </div>
  );
}
