"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type Props = ComponentPropsWithoutRef<"a"> & {
  label: string;
  preview: ReactNode;
};

export function ImagePreview({
  label,
  preview,
  children,
  className,
  ...link
}: Props) {
  return (
    <Tooltip delayDuration={220}>
      <TooltipTrigger asChild>
        {link.href ? (
          <a {...link} className={className}>
            {children}
          </a>
        ) : (
          <span tabIndex={0} className={className}>
            {children}
          </span>
        )}
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          aria-label={label}
          sideOffset={8}
          collisionPadding={12}
          className="w-80 max-w-[calc(100vw-1.5rem)] border-0 p-0"
        >
          {preview}
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}
