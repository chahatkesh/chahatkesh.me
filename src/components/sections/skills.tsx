"use client";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import {
  BACKEND_DEVOPS,
  FRONTEND_STACKS,
  LANGUAGES_TOOLS,
  type stacksProps,
} from "~/data/stack";
import { typo } from "~/components/ui";
import { MARQUEE_SPEED } from "~/constants";

const Skills = () => {
  return (
    <section aria-label="skills" className="my-4 space-y-8 bg-background">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className={typo({ variant: "h2" })}>What I Build With</h2>
        <Link
          href="/stack"
          className="el-focus-styles text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Browse all
        </Link>
      </div>
      <div className="w-full space-y-6">
        <Marquee autoFill pauseOnHover speed={MARQUEE_SPEED}>
          <SkillsList stacks={LANGUAGES_TOOLS} />
        </Marquee>

        <Marquee autoFill pauseOnHover direction="right" speed={MARQUEE_SPEED}>
          <SkillsList stacks={FRONTEND_STACKS} />
        </Marquee>

        <Marquee autoFill pauseOnHover speed={MARQUEE_SPEED}>
          <SkillsList stacks={BACKEND_DEVOPS} />
        </Marquee>
      </div>
    </section>
  );
};

export default Skills;

const SkillsList = ({ stacks }: { stacks: stacksProps }) => {
  return (
    <ul className="flex items-center" role="list">
      {Object.entries(stacks).map(([stack, meta]) => {
        const Icon = meta.Icon;
        const className = meta.className;
        return (
          <li role="listitem" key={stack} className="mr-2">
            <Link
              href={`/stack/${meta.slug}`}
              className="el-focus-styles flex w-max items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-[15px] text-foreground shadow-sm transition-colors hover:border-muted-foreground/30"
            >
              <Icon className={className} aria-hidden />
              <span className="whitespace-nowrap">{stack}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
