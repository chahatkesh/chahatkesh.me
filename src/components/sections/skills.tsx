import { isValidElement, type ReactNode } from "react";
import Link from "next/link";
import type { IconType } from "react-icons/lib";
import { cn } from "~/lib/utils";
import {
  BACKEND_DEVOPS,
  FRONTEND_STACKS,
  LANGUAGES_TOOLS,
  type stacksProps,
} from "~/data/stack";
import { typo } from "~/components/ui";

const ROWS: {
  id: string;
  stacks: stacksProps;
  reverse?: boolean;
  duration: string;
}[] = [
  { id: "languages", stacks: LANGUAGES_TOOLS, duration: "70s" },
  { id: "frontend", stacks: FRONTEND_STACKS, reverse: true, duration: "80s" },
  { id: "backend", stacks: BACKEND_DEVOPS, duration: "75s" },
];

const pillClassName =
  "flex w-max items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-[15px] text-foreground shadow-sm";

const Skills = () => {
  const symbols = new Map<string, { Icon: IconType }>();
  for (const row of ROWS) {
    for (const meta of Object.values(row.stacks)) {
      symbols.set(meta.slug, { Icon: meta.Icon });
    }
  }

  return (
    <section aria-labelledby="skills-heading" className="my-4 space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="skills-heading" className={typo({ variant: "h2" })}>
          What I Build With
        </h2>
        <Link
          href="/stack"
          className="el-focus-styles text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Browse all
        </Link>
      </div>

      <svg aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <defs>
          {[...symbols.entries()].map(([slug, { Icon }]) => {
            const icon = Icon({});
            if (!isValidElement(icon)) return null;
            const props = icon.props as {
              viewBox?: string;
              children?: ReactNode;
            };
            return (
              <symbol
                key={slug}
                id={`skill-icon-${slug}`}
                viewBox={props.viewBox ?? "0 0 24 24"}
              >
                {props.children}
              </symbol>
            );
          })}
        </defs>
      </svg>

      <div className="space-y-6">
        {ROWS.map((row) => (
          <SkillMarquee
            key={row.id}
            stacks={row.stacks}
            reverse={row.reverse}
            duration={row.duration}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;

const SkillIcon = ({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    className={cn("size-4 shrink-0", className)}
    fill="currentColor"
  >
    <use href={`#skill-icon-${slug}`} />
  </svg>
);

const SkillMarquee = ({
  stacks,
  reverse = false,
  duration,
}: {
  stacks: stacksProps;
  reverse?: boolean;
  duration: string;
}) => {
  return (
    <div className="group h-14 overflow-hidden motion-reduce:h-auto motion-reduce:overflow-visible">
      <ul
        className="flex h-14 w-max min-w-full items-center gap-2 motion-safe:animate-skill-marquee motion-reduce:h-auto motion-reduce:w-full motion-reduce:flex-wrap group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        style={{
          animationDuration: duration,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <SkillItems stacks={stacks} />
        <SkillItems stacks={stacks} duplicate />
      </ul>
    </div>
  );
};

const SkillItems = ({
  stacks,
  duplicate = false,
}: {
  stacks: stacksProps;
  duplicate?: boolean;
}) => {
  return (
    <>
      {Object.entries(stacks).map(([stack, meta]) => {
        const content = (
          <>
            <SkillIcon slug={meta.slug} className={meta.className} />
            <span className="whitespace-nowrap">{stack}</span>
          </>
        );

        return (
          <li
            key={duplicate ? `copy-${stack}` : stack}
            className={duplicate ? "motion-reduce:hidden" : undefined}
            aria-hidden={duplicate || undefined}
          >
            {duplicate ? (
              <span className={pillClassName}>{content}</span>
            ) : (
              <Link
                href={`/stack/${meta.slug}`}
                className={`el-focus-styles ${pillClassName} transition-colors hover:border-muted-foreground/30`}
              >
                {content}
              </Link>
            )}
          </li>
        );
      })}
    </>
  );
};
