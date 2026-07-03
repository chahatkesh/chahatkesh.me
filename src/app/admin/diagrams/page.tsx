"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import useSWR, { mutate } from "swr";
import { Button } from "~/components/ui";
import {
  AdminErrorState,
  AdminLoadingState,
  AdminConfirmDialog,
  AdminPageHeader,
  ProtectedRoute,
} from "~/components/admin";
import { DiagramList } from "~/components/features/diagram";
import { API_ROUTES } from "~/constants";
import { simpleFetcher as fetcher } from "~/lib/fetcher";
import { getDiagramSharePath } from "~/lib/diagram-utils";
import type { DiagramListApiResponse, DiagramPage } from "~/types/diagrams";

const BREADCRUMBS = [
  { name: "Admin", url: "/admin" },
  { name: "Diagrams", url: "/admin/diagrams" },
];

function AdminDiagramsContent() {
  const { data, error, isLoading } = useSWR<DiagramListApiResponse>(
    API_ROUTES.DIAGRAMS,
    fetcher,
  );

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DiagramPage | null>(null);

  const handleCopyLink = async (diagram: DiagramPage) => {
    const sharePath = getDiagramSharePath(diagram.slug);
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${sharePath}`
        : sharePath;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(diagram._id);
      setTimeout(
        () => setCopiedId((prev) => (prev === diagram._id ? null : prev)),
        2000,
      );
    } catch (copyError) {
      console.error("Failed to copy diagram URL:", copyError);
    }
  };

  const confirmDeleteDiagram = async () => {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget._id);
    try {
      const response = await fetch(API_ROUTES.DIAGRAM_BY_ID(deleteTarget._id), {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Failed to delete diagram. Please try again.");
        return;
      }

      await mutate(API_ROUTES.DIAGRAMS);
    } catch (deleteError) {
      console.error("Failed to delete diagram:", deleteError);
      alert("Failed to delete diagram. Please try again.");
    } finally {
      setDeletingId(null);
      setDeleteTarget(null);
    }
  };

  if (isLoading) {
    return <AdminLoadingState breadcrumbs={BREADCRUMBS} />;
  }

  if (error || !data?.success) {
    return (
      <AdminErrorState
        breadcrumbs={BREADCRUMBS}
        errorMessage="Failed to load diagrams. Please refresh and try again."
      />
    );
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        breadcrumbs={BREADCRUMBS}
        title="Mermaid Diagram Pages"
        subtitle="Create, edit, and share clean architecture diagrams with public URLs"
      />

      <div className="flex justify-end">
        <Button asChild>
          <Link href="/admin/diagrams/new">
            <Plus className="mr-2 size-4" />
            New Diagram
          </Link>
        </Button>
      </div>

      <DiagramList
        diagrams={data.data}
        copiedId={copiedId}
        deletingId={deletingId}
        onCopyLink={handleCopyLink}
        onDeleteDiagram={setDeleteTarget}
      />

      <AdminConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete diagram?"
        description={
          deleteTarget
            ? `This will permanently delete "${deleteTarget.title}" and its public link.`
            : ""
        }
        confirmLabel="Delete Diagram"
        onConfirm={confirmDeleteDiagram}
        confirmDisabled={!deleteTarget || deletingId === deleteTarget?._id}
        loading={Boolean(deleteTarget && deletingId === deleteTarget._id)}
      />
    </div>
  );
}

export default function AdminDiagramsPage() {
  return (
    <ProtectedRoute>
      <AdminDiagramsContent />
    </ProtectedRoute>
  );
}
