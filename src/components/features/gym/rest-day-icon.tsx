"use client";

import { Bed, type LucideProps } from "lucide-react";

/** Rest-day mark — sleep / recovery, used across admin logger + lists. */
export function RestDayIcon({ strokeWidth = 1.75, ...props }: LucideProps) {
  return <Bed strokeWidth={strokeWidth} {...props} />;
}
