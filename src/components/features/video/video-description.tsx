"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import { VIDEO_DESCRIPTION_COLLAPSE_LENGTH } from "~/constants";

type VideoDescriptionProps = {
  description: string;
};

export function VideoDescription({ description }: VideoDescriptionProps) {
  const trimmed = description.trim();
  const shouldCollapse = trimmed.length > VIDEO_DESCRIPTION_COLLAPSE_LENGTH;
  const [isExpanded, setIsExpanded] = useState(!shouldCollapse);

  if (!trimmed) return null;

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "relative",
          shouldCollapse && !isExpanded && "max-h-28 overflow-hidden",
        )}
      >
        <p
          className={cn(
            typo({ variant: "paragraph", size: "sm" }),
            "whitespace-pre-line text-muted-foreground",
          )}
        >
          {trimmed}
        </p>
        {shouldCollapse && !isExpanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background to-transparent" />
        )}
      </div>

      {shouldCollapse && (
        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          className="el-focus-styles inline-flex items-center gap-1 text-sm font-medium text-ring transition-colors hover:text-ring/80"
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Show less" : "Show more"}
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              isExpanded && "rotate-180",
            )}
          />
        </button>
      )}
    </div>
  );
}
