"use client";

import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

interface MetricData {
  label: string;
  value: number;
  max: number;
  color?: string;
  unit?: string;
}

interface MetricsChartProps {
  data: MetricData[];
  className?: string;
  showValues?: boolean;
}

export function MetricsChart({
  data,
  className,
  showValues = true,
}: MetricsChartProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {data.map((metric, index) => {
        const percentage = (metric.value / metric.max) * 100;
        const color = metric.color || "hsl(var(--cyan-500))";

        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-neutral-200">
                {metric.label}
              </span>
              {showValues && (
                <span className="font-mono text-neutral-400">
                  {metric.value.toLocaleString()}
                  {metric.unit && ` ${metric.unit}`}
                </span>
              )}
            </div>

            <div className="relative h-8 overflow-hidden rounded-lg bg-neutral-900/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{
                  delay: index * 0.1 + 0.2,
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="h-full rounded-lg"
                style={{
                  background: `linear-gradient(90deg, ${color} 0%, ${color}99 100%)`,
                }}
              />

              {/* Animated shimmer effect */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  delay: index * 0.1 + 0.3,
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: 0,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
