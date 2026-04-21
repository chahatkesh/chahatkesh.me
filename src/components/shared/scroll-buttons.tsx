import { cn } from "~/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollButtonsProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  className?: string;
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
}: ScrollButtonsProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <button
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
        className={cn(
          "el-focus-styles p-2 rounded-full border transition-all duration-200",
          "bg-card border-border text-foreground",
          "hover:bg-muted hover:border-muted-foreground/30",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          canScrollLeft && "hover:scale-105",
        )}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onScrollRight}
        disabled={!canScrollRight}
        className={cn(
          "el-focus-styles p-2 rounded-full border transition-all duration-200",
          "bg-card border-border text-foreground",
          "hover:bg-muted hover:border-muted-foreground/30",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          canScrollRight && "hover:scale-105",
        )}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
