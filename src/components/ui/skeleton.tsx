import * as React from "react";

import { cn } from "~/lib/utils";

/**
 * Quiet pulse placeholder for content that has not loaded yet.
 * Use layout-shaped compositions of this primitive — never invent a new fill/opacity.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/40", className)}
      aria-hidden
      {...props}
    />
  );
}

export { Skeleton };
