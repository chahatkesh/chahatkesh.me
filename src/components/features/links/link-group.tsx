import { SectionLabel } from "~/components/shared";
import { cn } from "~/lib/utils";

interface LinkGroupProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function LinkGroup({ label, children, className }: LinkGroupProps) {
  return (
    <section className={className}>
      <SectionLabel label={label} className="mb-2.5" />
      <ul
        className={cn(
          "divide-y divide-border/60 overflow-hidden rounded-xl",
          "border border-border bg-card/60",
          "inset-highlight",
        )}
      >
        {children}
      </ul>
    </section>
  );
}
