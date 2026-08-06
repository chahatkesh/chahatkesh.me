"use client";

import {
  MUSCLE_GROUPS,
  MUSCLE_GROUP_COLORS,
  MUSCLE_GROUP_LABELS,
} from "~/constants/gym";
import type { MuscleGroup } from "~/constants/gym";
import { cn } from "~/lib/utils";

interface MuscleGroupPickerProps {
  selected: MuscleGroup[];
  onToggle: (group: MuscleGroup) => void;
  disabled?: boolean;
  /** Show 1–8 shortcut badges (desktop). */
  showShortcuts?: boolean;
}

export function MuscleGroupPicker({
  selected,
  onToggle,
  disabled = false,
  showShortcuts = true,
}: MuscleGroupPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2 xs:grid-cols-4 lg:grid-cols-8">
      {MUSCLE_GROUPS.map((group, index) => {
        const isActive = selected.includes(group);
        const color = MUSCLE_GROUP_COLORS[group];
        return (
          <button
            key={group}
            type="button"
            onClick={() => onToggle(group)}
            disabled={disabled}
            aria-pressed={isActive}
            title={`${MUSCLE_GROUP_LABELS[group]} (${index + 1})`}
            className={cn(
              "el-focus-styles relative flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-xs font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 lg:px-1.5 lg:py-2",
              isActive
                ? "shadow-sm"
                : "border-border bg-muted/20 text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground",
            )}
            style={
              isActive
                ? {
                    borderColor: `${color}66`,
                    backgroundColor: `${color}26`,
                    color,
                  }
                : undefined
            }
          >
            {showShortcuts ? (
              <kbd
                aria-hidden
                className="absolute right-1 top-0.5 hidden font-sans text-[9px] tabular-nums text-muted-foreground/50 lg:inline"
              >
                {index + 1}
              </kbd>
            ) : null}
            <span
              aria-hidden
              className="size-1.5 shrink-0 rounded-full transition-opacity lg:size-2"
              style={{
                backgroundColor: color,
                opacity: isActive ? 1 : 0.35,
              }}
            />
            <span className="truncate">{MUSCLE_GROUP_LABELS[group]}</span>
          </button>
        );
      })}
    </div>
  );
}
