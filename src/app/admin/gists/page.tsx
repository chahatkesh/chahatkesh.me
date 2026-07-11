"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  AdminConfirmDialog,
  AdminErrorState,
  AdminLoadingState,
  AdminPageHeader,
  ProtectedRoute,
} from "~/components/admin";
import { GistList } from "~/components/features/gist";
import { API_ROUTES } from "~/constants";
import { ADMIN_SWR_CONFIG, adminFetcher } from "~/lib/fetcher";
import { getGistSharePath } from "~/lib/gist-utils";
import type { GistDocument, GistListApiResponse } from "~/types/gists";

const BREADCRUMBS = [
  { name: "Admin", url: "/admin" },
  { name: "Gists", url: "/admin/gists" },
];

function AdminGistsContent() {
  const { data, error, isLoading } = useSWR<GistListApiResponse>(
    API_ROUTES.GISTS,
    adminFetcher,
    ADMIN_SWR_CONFIG,
  );

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GistDocument | null>(null);

  const handleCopyLink = async (gist: GistDocument) => {
    const sharePath = getGistSharePath(gist.slug);
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${sharePath}`
        : sharePath;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(gist._id);
      setTimeout(
        () => setCopiedId((prev) => (prev === gist._id ? null : prev)),
        2000,
      );
    } catch (copyError) {
      console.error("Failed to copy gist URL:", copyError);
    }
  };

  const confirmDeleteGist = async () => {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget._id);
    try {
      const response = await fetch(API_ROUTES.GIST_BY_ID(deleteTarget._id), {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Failed to delete document. Please try again.");
        return;
      }

      await mutate(API_ROUTES.GISTS);
    } catch (deleteError) {
      console.error("Failed to delete gist:", deleteError);
      alert("Failed to delete document. Please try again.");
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
        errorMessage="Failed to load documents. Please refresh and try again."
      />
    );
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        breadcrumbs={BREADCRUMBS}
        title="Gists"
        subtitle="Create markdown documents and share them publicly with clean read-only pages"
      />

      <GistList
        gists={data.data}
        createHref="/admin/gists/new"
        copiedId={copiedId}
        deletingId={deletingId}
        onCopyLink={handleCopyLink}
        onDeleteGist={setDeleteTarget}
      />

      <AdminConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete document?"
        description={
          deleteTarget
            ? `This will permanently delete "${deleteTarget.title}" and its public link.`
            : ""
        }
        confirmLabel="Delete Document"
        onConfirm={confirmDeleteGist}
        confirmDisabled={!deleteTarget || deletingId === deleteTarget?._id}
        loading={Boolean(deleteTarget && deletingId === deleteTarget._id)}
      />
    </div>
  );
}

export default function AdminGistsPage() {
  return (
    <ProtectedRoute>
      <AdminGistsContent />
    </ProtectedRoute>
  );
}
