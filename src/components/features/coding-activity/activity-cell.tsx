import {
  cloneElement,
  type ReactElement,
  type SVGAttributes,
  type HTMLAttributes,
  type JSXElementConstructor,
} from "react";
import {
  GITHUB_CONTRIBUTION_COLORS,
  LEETCODE_CALENDAR_COLORS,
} from "~/constants/brand";
import { EMPTY_CELL_COLOR } from "./constants";
import { classifyIntensityLevel } from "./lib";
import type { CodingActivityView, HoveredDay, DayCounts } from "./types";

type Activity = { date: string; count: number; level: number };
type BlockElement = ReactElement<
  SVGAttributes<SVGRectElement> & HTMLAttributes<SVGRectElement>,
  JSXElementConstructor<SVGRectElement>
>;

/**
 * Returns a `renderBlock` callback for the ActivityCalendar.
 *
 * Handles:
 * - Single-source fill (GitHub teal or LeetCode amber)
 * - Diagonal split for days with both sources
 * - Hover / focus / touch event wiring for the shared tooltip
 */
export function createRenderBlock(
  view: CodingActivityView,
  setHovered: (h: HoveredDay) => void,
) {
  const renderBlock = (
    block: BlockElement,
    activity: Activity,
  ): ReactElement => {
    const counts: DayCounts = view.countsByDate.get(activity.date) ?? {
      github: 0,
      leetcode: 0,
    };
    const gh = counts.github;
    const lc = counts.leetcode;

    const ghFill =
      GITHUB_CONTRIBUTION_COLORS[
        classifyIntensityLevel(gh, view.githubBusiest)
      ];
    const lcFill =
      LEETCODE_CALENDAR_COLORS[
        classifyIntensityLevel(lc, view.leetcodeBusiest)
      ];

    const enter = (
      e: React.MouseEvent | React.FocusEvent | React.TouchEvent,
    ) => {
      const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
      setHovered({ date: activity.date, github: gh, leetcode: lc, rect });
    };
    const leave = () => setHovered(null);

    const interactionStyle = { cursor: "pointer" as const };
    const handlers = {
      onMouseEnter: enter,
      onMouseLeave: leave,
      onFocus: enter,
      onBlur: leave,
      onTouchStart: enter,
      style: interactionStyle,
    };

    if (gh + lc === 0) {
      return cloneElement(block, { fill: EMPTY_CELL_COLOR, ...handlers });
    }

    if (lc === 0) {
      return cloneElement(block, { fill: ghFill, ...handlers });
    }

    if (gh === 0) {
      return cloneElement(block, { fill: lcFill, ...handlers });
    }

    const x = Number(block.props.x);
    const y = Number(block.props.y);
    const w = Number(block.props.width);
    const h = Number(block.props.height);
    const r = Number(block.props.rx) || 0;
    const clipId = `cell-${activity.date}`;

    return (
      <g data-date={activity.date} {...handlers}>
        <defs>
          <clipPath id={clipId}>
            <rect x={x} y={y} width={w} height={h} rx={r} ry={r} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <polygon
            points={`${x},${y} ${x + w},${y} ${x},${y + h}`}
            fill={ghFill}
          />
          <polygon
            points={`${x + w},${y} ${x + w},${y + h} ${x},${y + h}`}
            fill={lcFill}
          />
        </g>
      </g>
    );
  };

  renderBlock.displayName = "ActivityBlock";
  return renderBlock;
}
