import type { ReactNode } from "react";
import type { Hobby } from "~/data/about";

const motion =
  "motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out";

const scenes = {
  notebook: (
    <>
      <rect
        x="12"
        y="12"
        width="31"
        height="38"
        rx="3"
        className="fill-muted"
      />
      <path d="M18 12v38m6-25h11m-11 6h8" />
      <g
        className={`${motion} motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1`}
      >
        <path
          d="m32 39 2-8 16-20q2-2 4 0l2 2q2 2 0 4L40 37Z"
          className="fill-background"
        />
        <path d="m34 31 6 6m7-22 7 5" />
      </g>
    </>
  ),
  barbell: (
    <g
      className={`${motion} motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:-translate-y-1`}
    >
      <path d="M8 32h48" />
      <g className="fill-muted">
        <rect x="10" y="22" width="6" height="20" rx="2" />
        <rect x="16" y="17" width="7" height="30" rx="2" />
        <rect x="41" y="17" width="7" height="30" rx="2" />
        <rect x="48" y="22" width="6" height="20" rx="2" />
      </g>
    </g>
  ),
  curve: (
    <>
      <path d="m12 45 4-30m32 0 4 30" strokeDasharray="2 4" opacity=".5" />
      <path d="M12 45C16 5 48 5 52 45" />
      <g className="fill-muted">
        <path d="M9 42h6v6H9zm40 0h6v6h-6z" />
        <circle cx="16" cy="15" r="2" />
        <circle cx="48" cy="15" r="2" />
      </g>
      <path
        d="m32 29 1 18 5-5 5 7 4-3-5-7 7-2Z"
        className={`${motion} fill-background motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:-translate-y-1`}
      />
    </>
  ),
  plane: (
    <>
      <path
        d="M8 48c14 6 24-1 19-7-4-5-12 2-5 5 6 2 12-4 15-11"
        strokeDasharray="2 4"
        opacity=".5"
      />
      <g
        className={`${motion} motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:translate-x-1 motion-safe:group-focus-visible:-translate-y-1`}
      >
        <path d="m13 22 40-11-12 31-9-12-9 5-1-10Z" className="fill-muted" />
        <path d="m22 25 31-14-21 19m-9 5 5-8" />
      </g>
    </>
  ),
} satisfies Record<Hobby["illustration"], ReactNode>;

export function HobbyIllustration({ kind }: { kind: Hobby["illustration"] }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="-ml-1 size-12 text-foreground sm:size-14"
    >
      {scenes[kind]}
    </svg>
  );
}
