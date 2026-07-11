"use client";

import Link from "next/link";
import { Check, Copy, Pencil, Trash2, FileText } from "lucide-react";
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
import type { GistDocument } from "~/types/gists";
import { getGistSharePath } from "~/lib/gist-utils";

interface GistListProps {
  gists: GistDocument[];
  createHref: string;
  copiedId: string | null;
  deletingId: string | null;
  onCopyLink: (gist: GistDocument) => void;
  onDeleteGist: (gist: GistDocument) => void;
}

export function GistList({
  gists,
  createHref,
  copiedId,
  deletingId,
  onCopyLink,
  onDeleteGist,
}: GistListProps) {
  return (
    <div className="space-y-3">
      <AdminListCreateTile href={createHref} label="Add document" />

      {gists.map((gist, index) => {
        const isDeleting = deletingId === gist._id;
        const sharePath = getGistSharePath(gist.slug);

        return (
          <AdminListCard
            key={gist._id}
            index={index}
            disabled={isDeleting}
            href={sharePath}
            icon={<FileText className="size-5" strokeWidth={1.75} />}
            title={gist.title}
            meta={
              <AdminListMeta
                items={["Markdown", formatRelativeDate(gist.updatedAt)]}
                title={sharePath}
              />
            }
            actions={
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onCopyLink(gist)}
                  disabled={isDeleting}
                  className={adminListActionClassName}
                >
                  {copiedId === gist._id ? (
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
                    href={`/admin/gists/${gist._id}/edit`}
                    aria-label="Edit document"
                    title="Edit"
                  >
                    <Pencil className="size-3.5" />
                  </Link>
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => onDeleteGist(gist)}
                  disabled={isDeleting}
                  aria-label="Delete document"
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
