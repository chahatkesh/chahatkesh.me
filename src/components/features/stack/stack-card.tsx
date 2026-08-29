import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { MotionDiv } from "~/components/shared";
import { cn } from "~/lib/utils";
import type { StackEntry } from "~/lib/stack-utils";

interface StackCardProps {
  stack: StackEntry;
}

export function StackCard({ stack }: StackCardProps) {
  const Icon = stack.Icon;

  return (
    <MotionDiv whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
      <Link
        href={`/stack/${stack.slug}`}
        className="el-focus-styles group block h-full rounded-xl"
      >
        <div
          className={cn(
            "relative flex h-full flex-col gap-3 overflow-hidden rounded-xl border border-border/80",
            "bg-gradient-to-br from-card/70 via-card/40 to-background/80 p-5",
            "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
            "transition-all duration-300",
            "hover:border-muted-foreground/25 hover:shadow-lg hover:shadow-black/5",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <Icon
                className={cn(stack.className, "size-5 shrink-0")}
                aria-hidden
              />
              <h3 className="font-ubuntu text-base font-medium text-foreground transition-colors group-hover:text-ring">
                {stack.name}
              </h3>
            </div>
            <FaChevronRight
              aria-hidden
              className="mt-0.5 size-3 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-muted-foreground/70"
            />
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground/85 line-clamp-2">
            {stack.subtitle}
          </p>
        </div>
      </Link>
    </MotionDiv>
  );
}
