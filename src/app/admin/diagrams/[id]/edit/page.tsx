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
import { DiagramEditor } from "~/components/features/diagram";
import { API_ROUTES } from "~/constants";
import { simpleFetcher as fetcher } from "~/lib/fetcher";
import { getDiagramSharePath } from "~/lib/diagram-utils";
import type { DiagramItemApiResponse } from "~/types/diagrams";

const BREADCRUMBS = [
  { name: "Admin", url: "/admin" },
  { name: "Diagrams", url: "/admin/diagrams" },
  { name: "Edit", url: "/admin/diagrams/[id]/edit" },
];

function EditDiagramContent() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { data, error, isLoading } = useSWR<DiagramItemApiResponse>(
    id ? API_ROUTES.DIAGRAM_BY_ID(id) : null,
    fetcher,
  );

  const [title, setTitle] = useState("");
  const [mermaidCode, setMermaidCode] = useState("");
  const [initialTitle, setInitialTitle] = useState("");
  const [initialMermaidCode, setInitialMermaidCode] = useState("");
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
    setMermaidCode(data.data.mermaidCode);
    setInitialTitle(data.data.title);
    setInitialMermaidCode(data.data.mermaidCode);
    setIsInitialized(true);
  }, [data, isInitialized]);

  const sharePath = useMemo(() => {
    if (!data?.success) return null;
    return getDiagramSharePath(data.data.slug);
  }, [data]);

  const publicLink = useMemo(() => {
    if (!sharePath) return null;
    return origin ? `${origin}${sharePath}` : sharePath;
  }, [origin, sharePath]);

  const hasChanges = useMemo(
    () => title !== initialTitle || mermaidCode !== initialMermaidCode,
    [title, initialTitle, mermaidCode, initialMermaidCode],
  );

  const handleUpdate = async () => {
    if (!id) return;

    setIsUpdating(true);
    setActionError("");

    try {
      const response = await fetch(API_ROUTES.DIAGRAM_BY_ID(id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, mermaidCode }),
      });

      const payload = (await response.json()) as DiagramItemApiResponse & {
        error?: string;
      };

      if (!response.ok || !payload.success) {
        setActionError(payload.error ?? "Failed to update diagram");
        return;
      }

      setTitle(payload.data.title);
      setMermaidCode(payload.data.mermaidCode);
      setInitialTitle(payload.data.title);
      setInitialMermaidCode(payload.data.mermaidCode);
      await mutate(API_ROUTES.DIAGRAM_BY_ID(id), payload, false);
      await mutate(API_ROUTES.DIAGRAMS);
    } catch (updateError) {
      console.error("Failed to update diagram:", updateError);
      setActionError("Failed to update diagram. Please try again.");
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
        errorMessage="Unable to load this diagram. It may have been deleted."
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
        title="Edit Mermaid Diagram"
        subtitle="Update your diagram and keep the public page in sync"
      />

      {actionError && (
        <Card className="border-red-500/30 bg-red-500/10">
          <CardContent className="py-4 text-sm text-red-500">
            {actionError}
          </CardContent>
        </Card>
      )}

      <DiagramEditor
        title={title}
        mermaidCode={mermaidCode}
        onTitleChange={setTitle}
        onMermaidCodeChange={setMermaidCode}
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

export default function AdminEditDiagramPage() {
  return (
    <ProtectedRoute>
      <EditDiagramContent />
    </ProtectedRoute>
  );
}
