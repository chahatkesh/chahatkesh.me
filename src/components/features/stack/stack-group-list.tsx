import { StackCard } from "./stack-card";
import type { StackEntry } from "~/lib/stack-utils";

interface StackGroupListProps {
  title: string;
  stacks: StackEntry[];
}

export function StackGroupList({ title, stacks }: StackGroupListProps) {
  if (stacks.length === 0) return null;

  return (
    <section className="space-y-4" aria-label={title}>
      <h2 className="font-ubuntu text-xl font-medium text-foreground">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stacks.map((stack) => (
          <StackCard key={stack.slug} stack={stack} />
        ))}
      </div>
    </section>
  );
}
