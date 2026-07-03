"use client";

import Link from "next/link";
import { Check, Copy, PencilLine, Trash2, ExternalLink } from "lucide-react";
import { Button } from "~/components/ui";
import { Card, CardContent } from "~/components/ui/card";
import { MotionDiv } from "~/components/shared";
import { formatRelativeDate } from "~/lib/date-utils";
import type { DiagramPage } from "~/types/diagrams";
import { getDiagramSharePath } from "~/lib/diagram-utils";

interface DiagramListProps {
  diagrams: DiagramPage[];
  copiedId: string | null;
  deletingId: string | null;
  onCopyLink: (diagram: DiagramPage) => void;
  onDeleteDiagram: (diagram: DiagramPage) => void;
}

export function DiagramList({
  diagrams,
  copiedId,
  deletingId,
  onCopyLink,
  onDeleteDiagram,
}: DiagramListProps) {
  if (diagrams.length === 0) {
    return (
      <Card className="border-border bg-background">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <h3 className="text-lg font-semibold">No diagrams yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your first Mermaid diagram page to generate a shareable URL.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
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
