import { cn } from "~/lib/utils";

type PageLoaderProps = {
  /** Extra classes on the outer shell. */
  className?: string;
  /**
   * Minimum height of the loading region.
   * Defaults to a comfortable viewport-centered wait for route segments.
   */
  minHeight?: "none" | "screen" | "page" | "section";
  /** Accessible label announced to screen readers. */
  label?: string;
};

const MIN_HEIGHT_CLASS = {
  none: undefined,
  screen: "min-h-dvh",
  page: "min-h-[60vh]",
  section: "min-h-[400px]",
} as const;

/**
 * Full-page / section wait indicator — brand-tipped ring, no visible copy.
 * Use for route `loading.tsx`, admin chrome, and auth gates.
 * Prefer {@link Skeleton} for in-page content placeholders.
 */
export function PageLoader({
  className,
  minHeight = "page",
  label = "Loading",
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        MIN_HEIGHT_CLASS[minHeight],
        className,
      )}
      aria-busy="true"
      role="status"
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-brand"
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
