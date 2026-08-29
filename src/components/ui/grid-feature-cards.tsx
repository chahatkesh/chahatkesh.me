import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "~/lib/utils";

export type FeatureType = {
  title: string;
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
    "aria-hidden"?: boolean;
  }>;
  description: string;
};

type FeatureCardProps = {
  feature: FeatureType;
  href?: string;
  compact?: boolean;
  className?: string;
};

export function FeatureCard({
  feature,
  href,
  compact = false,
  className,
}: FeatureCardProps) {
  const Icon = feature.icon;
  const squares = patternFromSeed(feature.title);

  const content = (
    <>
      <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-ring/10 to-transparent opacity-80 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] transition-opacity duration-300 group-hover:opacity-100">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={squares}
            className="absolute inset-0 h-full w-full fill-ring/5 stroke-border mix-blend-overlay"
          />
        </div>
      </div>

      <Icon
        className={cn(
          "relative text-foreground/75 transition-colors duration-300 group-hover:text-ring",
          compact ? "size-5" : "size-6",
        )}
        strokeWidth={1.5}
        aria-hidden
      />

      <div
        className={cn(
          "relative z-20 flex items-center gap-1.5",
          compact ? "mt-6" : "mt-10",
        )}
      >
        <h3 className="font-ubuntu text-[15px] font-medium text-foreground transition-colors duration-300 group-hover:text-ring">
          {feature.title}
        </h3>
        {href ? (
          <ArrowUpRight
            aria-hidden
            className="size-3.5 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ring"
          />
        ) : null}
      </div>

      <p
        className={cn(
          "relative z-20 mt-2 leading-relaxed text-muted-foreground",
          compact ? "text-[13px]" : "text-sm",
        )}
      >
        {feature.description}
      </p>
    </>
  );

  const classes = cn(
    "group relative block h-full overflow-hidden bg-background transition-colors duration-300",
    "hover:bg-muted/20",
    compact ? "p-5" : "p-6",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "el-focus-styles focus-visible:ring-inset focus-visible:ring-offset-0",
          classes,
        )}
      >
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  className,
  ...props
}: React.ComponentProps<"svg"> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: Array<[number, number]>;
}) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" className={className} {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares ? (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy], index) => (
            <rect
              strokeWidth="0"
              key={`${sx}-${sy}-${index}`}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      ) : null}
    </svg>
  );
}

/** Deterministic cells so SSR markup matches the client. */
function patternFromSeed(seed: string, length = 5): Array<[number, number]> {
  let state = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    state ^= seed.charCodeAt(i);
    state = Math.imul(state, 16777619);
  }

  const next = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state;
  };

  return Array.from({ length }, () => {
    const sx = 7 + (next() % 4);
    const sy = 1 + (next() % 6);
    return [sx, sy];
  });
}
