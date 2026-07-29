"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import useSWR, { mutate } from "swr";
import {
  AdminErrorState,
  AdminLoadingState,
  AdminPageHeader,
  ProtectedRoute,
} from "~/components/admin";
import { Card, CardContent } from "~/components/ui/card";
import { GistEditor } from "~/components/features/gist";
import { API_ROUTES } from "~/constants";
import { ADMIN_SWR_CONFIG, adminFetcher } from "~/lib/fetcher";
import { getGistSharePath } from "~/lib/gist-utils";
import type { GistItemApiResponse } from "~/types/gists";

const BREADCRUMBS = [
  { name: "Admin", url: "/admin" },
  { name: "Gists", url: "/admin/gists" },
  { name: "Edit", url: "/admin/gists/[id]/edit" },
];

function EditGistContent() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { data, error, isLoading } = useSWR<GistItemApiResponse>(
    id ? API_ROUTES.GIST_BY_ID(id) : null,
    adminFetcher,
    ADMIN_SWR_CONFIG,
  );

  const [title, setTitle] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [initialTitle, setInitialTitle] = useState("");
  const [initialMarkdownContent, setInitialMarkdownContent] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [actionError, setActionError] = useState("");
  const [copiedPublicLink, setCopiedPublicLink] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (!data?.success || isInitialized) return;

    setTitle(data.data.title);
    setMarkdownContent(data.data.markdownContent);
    setInitialTitle(data.data.title);
    setInitialMarkdownContent(data.data.markdownContent);
    setIsInitialized(true);
  }, [data, isInitialized]);

  const sharePath = useMemo(() => {
    if (!data?.success) return null;
    return getGistSharePath(data.data.slug);
  }, [data]);

  const publicLink = useMemo(() => {
    if (!sharePath) return null;
    return origin ? `${origin}${sharePath}` : sharePath;
  }, [origin, sharePath]);

  const hasChanges = useMemo(
    () => title !== initialTitle || markdownContent !== initialMarkdownContent,
    [title, initialTitle, markdownContent, initialMarkdownContent],
  );

  const handleUpdate = async () => {
    if (!id) return;

    setIsUpdating(true);
    setActionError("");

    try {
      const response = await fetch(API_ROUTES.GIST_BY_ID(id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, markdownContent }),
      });

      const payload = (await response.json()) as GistItemApiResponse & {
        error?: string;
      };

      if (!response.ok || !payload.success) {
        setActionError(payload.error ?? "Failed to update document");
        return;
      }

      setTitle(payload.data.title);
      setMarkdownContent(payload.data.markdownContent);
      setInitialTitle(payload.data.title);
      setInitialMarkdownContent(payload.data.markdownContent);
      await mutate(API_ROUTES.GIST_BY_ID(id), payload, false);
      await mutate(API_ROUTES.GISTS);
    } catch (updateError) {
      console.error("Failed to update gist/document:", updateError);
      setActionError("Failed to update document. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCopyPublicLink = async () => {
    if (!sharePath || typeof window === "undefined") return;

    const absoluteUrl = `${window.location.origin}${sharePath}`;

    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopiedPublicLink(true);
      setTimeout(() => setCopiedPublicLink(false), 2000);
    } catch (copyError) {
      console.error("Failed to copy public link:", copyError);
      setActionError("Could not copy public link.");
    }
  };

  if (isLoading) {
    return <AdminLoadingState breadcrumbs={BREADCRUMBS} />;
  }

  if (error || !data?.success) {
    return (
      <AdminErrorState
        breadcrumbs={BREADCRUMBS}
        errorMessage="Unable to load this document. It may have been deleted."
      />
    );
  }

  if (!isInitialized) {
    return <AdminLoadingState breadcrumbs={BREADCRUMBS} />;
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        breadcrumbs={BREADCRUMBS}
        title="Edit Markdown Document"
        subtitle="Update your document and keep the public page in sync"
      />

      {actionError && (
        <Card className="border-red-500/30 bg-red-500/10">
          <CardContent className="py-4 text-sm text-red-500">
            {actionError}
          </CardContent>
        </Card>
      )}

      <GistEditor
        title={title}
        markdownContent={markdownContent}
        onTitleChange={setTitle}
        onMarkdownContentChange={setMarkdownContent}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
        updateEnabled={hasChanges}
        publicLink={publicLink}
        onCopyPublicLink={handleCopyPublicLink}
        copiedPublicLink={copiedPublicLink}
      />
    </div>
  );
}

export default function AdminEditGistPage() {
  return (
    <ProtectedRoute>
      <EditGistContent />
    </ProtectedRoute>
  );
}
