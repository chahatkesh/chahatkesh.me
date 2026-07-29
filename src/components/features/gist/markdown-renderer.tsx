"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { cn } from "~/lib/utils";
import "~/styles/markdown.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  emptyMessage?: string;
}

/**
 * Safe markdown rendering with GitHub-flavored markdown and sanitized raw HTML.
 */
export function MarkdownRenderer({
  content,
  className,
  emptyMessage = "Start typing Markdown to preview your document.",
}: MarkdownRendererProps) {
  const normalized = content.trim();

  if (!normalized) {
    return (
      <div className="flex min-h-[260px] items-center justify-center rounded-lg border border-dashed border-border bg-card/40 px-6 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card/30 p-4 sm:p-6",
        className,
      )}
    >
      <article className="markdown-body markdown-github">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
          components={{
            a: ({ href, children, ...props }) => {
              const isExternal = Boolean(href && /^https?:\/\//.test(href));
              return (
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  {...props}
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {normalized}
        </ReactMarkdown>
      </article>
    </div>
  );
}
