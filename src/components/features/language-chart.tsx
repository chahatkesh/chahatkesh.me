"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

interface LanguageData {
  language: string;
  percentage: number;
  color: string;
}

interface LanguageChartProps {
  data: LanguageData[];
  className?: string;
}

export function LanguageChart({ data, className }: LanguageChartProps) {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  // Calculate cumulative percentages for donut segments
  const segmentsWithPosition = useMemo(() => {
    return data.reduce(
      (acc, item, index) => {
        const start = index === 0 ? 0 : acc[index - 1].end;
        const end = start + item.percentage;
        return [
          ...acc,
          {
            ...item,
            start,
            end,
          },
        ];
      },
      [] as Array<(typeof data)[0] & { start: number; end: number }>,
    );
  }, [data]);

  const radius = 80;
  const strokeWidth = 30;
  const center = 100;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      {/* Donut Chart */}
      <div className="relative">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="hsl(var(--neutral-900))"
            strokeWidth={strokeWidth}
          />

          {/* Language segments */}
          {segmentsWithPosition.map((segment) => {
            const offset = (segment.start / 100) * circumference;
            const length = (segment.percentage / 100) * circumference;

            return (
              <motion.circle
                key={segment.language}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={-offset}
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredSegment(segment.language)}
                onMouseLeave={() => setHoveredSegment(null)}
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{
                  strokeDasharray: `${length} ${circumference - length}`,
                  strokeWidth:
                    hoveredSegment === segment.language
                      ? strokeWidth + 5
                      : strokeWidth,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  filter:
                    hoveredSegment === segment.language
                      ? "brightness(1.2)"
                      : "brightness(1)",
                }}
              />
            );
          })}
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            key={hoveredSegment || "default"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            {hoveredSegment ? (
              <>
                <div className="text-3xl font-bold text-neutral-100">
                  {
                    segmentsWithPosition.find(
                      (s) => s.language === hoveredSegment,
                    )?.percentage
                  }
                  %
                </div>
                <div className="text-sm text-neutral-400">{hoveredSegment}</div>
              </>
            ) : (
              <>
                <div className="text-sm font-medium text-neutral-400">
                  Languages
                </div>
                <div className="text-2xl font-bold text-neutral-100">
                  {data.length}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
        {data.map((item) => (
          <motion.button
            key={item.language}
            onClick={() =>
              setHoveredSegment(
                hoveredSegment === item.language ? null : item.language,
              )
            }
            onMouseEnter={() => setHoveredSegment(item.language)}
            onMouseLeave={() => setHoveredSegment(null)}
            className={cn(
              "flex items-center gap-2 rounded-md p-2 text-left transition-colors",
              "hover:bg-neutral-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
              hoveredSegment === item.language && "bg-neutral-900/50",
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-neutral-200">
                {item.language}
              </div>
              <div className="text-xs text-neutral-500">{item.percentage}%</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
