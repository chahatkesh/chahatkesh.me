"use client";

import Link from "next/link";
import { Check, Copy, PencilLine, Trash2, ExternalLink } from "lucide-react";
import { Button } from "~/components/ui";
import { MotionDiv } from "~/components/shared";
import { formatRelativeDate } from "~/lib/date-utils";
import type { DiagramPage } from "~/types/diagrams";
import { getDiagramSharePath } from "~/lib/diagram-utils";

interface DiagramListProps {
  diagrams: DiagramPage[];
  createHref: string;
  copiedId: string | null;
  deletingId: string | null;
  onCopyLink: (diagram: DiagramPage) => void;
  onDeleteDiagram: (diagram: DiagramPage) => void;
}

export function DiagramList({
  diagrams,
  createHref,
  copiedId,
  deletingId,
  onCopyLink,
  onDeleteDiagram,
}: DiagramListProps) {
  return (
    <div className="space-y-3">
      <Link
        href={createHref}
        className="flex w-full items-center gap-4 rounded-lg border border-dashed border-border bg-muted/20 p-4 text-muted-foreground/70 transition-colors hover:border-muted-foreground/40 hover:bg-muted/30 hover:text-muted-foreground"
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-dashed border-border bg-background">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>
        </div>
        <span className="text-sm font-medium">Add diagram</span>
      </Link>

      {diagrams.map((diagram, index) => {
        const isDeleting = deletingId === diagram._id;

        return (
          <MotionDiv
            key={diagram._id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            className="rounded-lg border border-border bg-background p-4"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="truncate text-base font-medium">
                  {diagram.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  /diagrams/{diagram.slug}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Updated {formatRelativeDate(diagram.updatedAt)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onCopyLink(diagram)}
                  disabled={isDeleting}
                >
                  {copiedId === diagram._id ? (
                    <>
                      <Check className="mr-1.5 size-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1.5 size-3.5" />
                      Copy Link
                    </>
                  )}
                </Button>

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  disabled={isDeleting}
                >
                  <Link href={`/admin/diagrams/${diagram._id}/edit`}>
                    <PencilLine className="mr-1.5 size-3.5" />
                    Edit
                  </Link>
                </Button>

                <a
                  href={getDiagramSharePath(diagram.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={isDeleting}
                  >
                    <ExternalLink className="mr-1.5 size-3.5" />
                    Open
                  </Button>
                </a>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onDeleteDiagram(diagram)}
                  disabled={isDeleting}
                  className="border-red-500/25 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                >
                  <Trash2 className="mr-1.5 size-3.5" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          </MotionDiv>
        );
      })}
    </div>
  );
}
