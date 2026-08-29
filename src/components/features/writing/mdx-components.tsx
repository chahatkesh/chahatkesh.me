import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { FolderStructures } from "./folder-structures";
import { BackendRoadmap } from "./backend-roadmap";
import { WritingMermaid } from "./writing-mermaid";
import Link from "next/link";
import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "~/lib/utils";

type CalloutTone = "note" | "idea" | "warning";

const calloutStyles: Record<
  CalloutTone,
  { icon: typeof Info; className: string }
> = {
  note: {
    icon: Info,
    className: "border-blue-400/30 bg-blue-400/10 text-blue-100",
  },
  idea: {
    icon: Lightbulb,
    className: "border-amber-400/30 bg-amber-400/10 text-amber-100",
  },
  warning: {
    icon: TriangleAlert,
    className: "border-red-400/30 bg-red-400/10 text-red-100",
  },
};

export function Callout({
  children,
  title,
  tone = "note",
}: {
  children: ReactNode;
  title?: string;
  tone?: CalloutTone;
}) {
  const { icon: Icon, className } = calloutStyles[tone];

  return (
    <aside className={cn("my-6 rounded-md border px-4 py-3", className)}>
      <div className="flex items-start gap-3">
        <Icon aria-hidden className="mt-1 size-4 shrink-0" />
        <div className="min-w-0">
          {title && <p className="!mb-1 font-semibold text-current">{title}</p>}
          <div className="[&>:last-child]:!mb-0">{children}</div>
        </div>
      </div>
    </aside>
  );
}

export function Details({
  children,
  summary,
}: {
  children: ReactNode;
  summary: string;
}) {
  return (
    <details className="my-6 rounded-md border border-border bg-card/40 px-4 py-3 open:pb-4">
      <summary className="cursor-pointer font-ubuntu text-sm font-semibold text-foreground marker:text-muted-foreground">
        {summary}
      </summary>
      <div className="mt-3 border-t border-border pt-3 [&>:last-child]:!mb-0">
        {children}
      </div>
    </details>
  );
}

function MdxLink({
  href = "",
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

export const writingMdxComponents = {
  a: MdxLink,
  Callout,
  Details,
  FolderStructures,
  BackendRoadmap,
  WritingMermaid,
};
