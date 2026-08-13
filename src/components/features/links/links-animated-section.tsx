"use client";

import { type ReactNode } from "react";
import { MotionDiv } from "~/components/shared";
import { cn } from "~/lib/utils";

const transition = { duration: 0.35, ease: "easeOut" as const };

interface LinksAnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /** When true, animates on scroll into view instead of on mount. */
  inView?: boolean;
  delay?: number;
}

export function LinksAnimatedSection({
  children,
  className,
  inView = false,
  delay = 0,
}: LinksAnimatedSectionProps) {
  if (inView) {
    return (
      <MotionDiv
        className={cn(className)}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          // Shrink only the top edge so sections near the page bottom can still
          // enter view — symmetric negative margins leave the last blocks stuck
          // at opacity: 0 with no way to scroll them into the intersection root.
          margin: "-8% 0px 0px 0px",
          amount: 0.12,
        }}
        transition={{ ...transition, delay }}
      >
        {children}
      </MotionDiv>
    );
  }

  return (
    <MotionDiv
      className={cn(className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay }}
    >
      {children}
    </MotionDiv>
  );
}
