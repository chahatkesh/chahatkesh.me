import { MotionDiv } from "~/components/shared";
import { ALL_STACKS } from "~/lib/project-utils";

interface TechStackBadgesProps {
  stacks: string[];
  /** Max stacks to show before "+N more" label. Omit to show all. */
  max?: number;
  /** Badge size variant */
  size?: "sm" | "md";
}

/**
 * Renders a row of tech-stack badges with icons.
 * Supports a `max` prop to truncate with a "+N more" indicator.
 */
export function TechStackBadges({
  stacks,
  max,
  size = "md",
}: TechStackBadgesProps) {
  const visible = max ? stacks.slice(0, max) : stacks;
  const overflow = max ? stacks.length - max : 0;

  const iconSize = size === "sm" ? 14 : 16;
  const badgeHeight = size === "sm" ? "h-6" : "h-6 md:h-8";
  const textSize = size === "sm" ? "text-[11px]" : "text-xs";

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((stack) => {
        const techInfo = ALL_STACKS[stack];
        const Icon = techInfo?.Icon;
        const className = techInfo?.className || "text-neutral-400";

        return (
          <MotionDiv
            key={stack}
            className={`flex items-center ${badgeHeight} gap-1.5 px-3 rounded-full bg-neutral-900 border border-neutral-800 ${textSize}`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            {Icon && (
              <Icon className={className} size={iconSize} aria-label={stack} />
            )}
            <span className="whitespace-nowrap">{stack}</span>
          </MotionDiv>
        );
      })}
      {overflow > 0 && (
        <span className="flex items-center text-xs text-neutral-500">
          +{overflow} more
        </span>
      )}
    </div>
  );
}
