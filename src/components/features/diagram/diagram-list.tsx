"use client";

import Link from "next/link";
import { Check, Copy, Pencil, Trash2, Workflow } from "lucide-react";
import {
  AdminListCard,
  AdminListCreateTile,
  AdminListMeta,
  adminListActionClassName,
  adminListDangerActionClassName,
  adminListIconActionClassName,
} from "~/components/admin";
import { Button } from "~/components/ui";
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
      <AdminListCreateTile href={createHref} label="Add diagram" />

      {diagrams.map((diagram, index) => {
        const isDeleting = deletingId === diagram._id;
        const sharePath = getDiagramSharePath(diagram.slug);

        return (
          <AdminListCard
            key={diagram._id}
            index={index}
            disabled={isDeleting}
            href={sharePath}
            icon={<Workflow className="size-5" strokeWidth={1.75} />}
            title={diagram.title}
            meta={
              <AdminListMeta
                items={["Mermaid", formatRelativeDate(diagram.updatedAt)]}
                title={sharePath}
              />
            }
            actions={
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onCopyLink(diagram)}
                  disabled={isDeleting}
                  className={adminListActionClassName}
                >
                  {copiedId === diagram._id ? (
                    <>
                      <Check className="mr-1 size-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1 size-3" />
                      Copy
                    </>
                  )}
                </Button>

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  disabled={isDeleting}
                  className={adminListIconActionClassName}
                >
                  <Link
                    href={`/admin/diagrams/${diagram._id}/edit`}
                    aria-label="Edit diagram"
                    title="Edit"
                  >
                    <Pencil className="size-3.5" />
                  </Link>
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onDeleteDiagram(diagram)}
                  disabled={isDeleting}
                  aria-label="Delete diagram"
                  title="Delete"
                  className={adminListDangerActionClassName}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </>
            }
          />
        );
      })}
    </div>
  );
}
