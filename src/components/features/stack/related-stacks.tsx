import Link from "next/link";
import { MotionDiv } from "~/components/shared";
import type { StackEntry } from "~/lib/stack-utils";

interface RelatedStacksProps {
  stacks: StackEntry[];
}

export function RelatedStacks({ stacks }: RelatedStacksProps) {
  if (stacks.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="font-ubuntu text-xl font-medium text-foreground">
        Also used with
      </h2>
      <div className="flex flex-wrap gap-2">
        {stacks.map((stack) => {
          const Icon = stack.Icon;
          return (
            <MotionDiv
              key={stack.slug}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={`/stack/${stack.slug}`}
                className="el-focus-styles flex h-8 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs transition-colors hover:border-muted-foreground/30"
              >
                <Icon className={stack.className} size={14} aria-hidden />
                <span className="whitespace-nowrap">{stack.name}</span>
              </Link>
            </MotionDiv>
          );
        })}
      </div>
    </section>
  );
}
