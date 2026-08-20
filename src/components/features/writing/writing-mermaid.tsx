"use client";

import { isValidElement, type ReactNode } from "react";
import { MermaidRenderer } from "~/components/features/diagram/mermaid-renderer";

function mermaidSource(children: ReactNode): string {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(mermaidSource).join("");
  }
  if (isValidElement<{ children?: ReactNode }>(children)) {
    return mermaidSource(children.props.children);
  }
  return "";
}

export function WritingMermaid({
  title,
  caption,
  code,
  children,
}: {
  title: string;
  caption?: string;
  code?: string;
  children?: ReactNode;
}) {
  const definition = (code ?? mermaidSource(children)).trim();

  return (
    <figure className="writing-mermaid my-8 space-y-3 font-sans">
      <MermaidRenderer code={definition} title={title} fit="contain" />
      {caption ? (
        <figcaption className="mx-auto max-w-2xl text-center font-sans text-sm leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
