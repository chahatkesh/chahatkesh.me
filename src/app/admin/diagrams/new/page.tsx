"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader, ProtectedRoute } from "~/components/admin";
import { Card, CardContent } from "~/components/ui/card";
import { DiagramEditor } from "~/components/features/diagram";
import { API_ROUTES } from "~/constants";
import type { DiagramItemApiResponse } from "~/types/diagrams";

const BREADCRUMBS = [
  { name: "Admin", url: "/admin" },
  { name: "Diagrams", url: "/admin/diagrams" },
  { name: "New", url: "/admin/diagrams/new" },
];

const DEFAULT_MERMAID = `flowchart LR
  Browser[Browser] --> CDN[CDN Layer]
  CDN --> Next[Next.js App]
  Next --> API[API Routes]
  API --> DB[(MongoDB)]
  Next --> Cache[(Cache)]`;

function NewDiagramContent() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [mermaidCode, setMermaidCode] = useState(DEFAULT_MERMAID);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage("");

    try {
      const response = await fetch(API_ROUTES.DIAGRAMS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, mermaidCode }),
      });

      const payload = (await response.json()) as DiagramItemApiResponse & {
        error?: string;
      };

      if (!response.ok || !payload.success) {
        setErrorMessage(payload.error ?? "Unable to save diagram");
        return;
      }

      router.push(`/admin/diagrams/${payload.data._id}/edit`);
    } catch (saveError) {
      console.error("Failed to save diagram:", saveError);
      setErrorMessage("Unable to save diagram. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        breadcrumbs={BREADCRUMBS}
        title="Create Mermaid Diagram"
        subtitle="Start with a blank canvas and publish a clean public diagram page"
      />

      {errorMessage && (
        <Card className="border-red-500/30 bg-red-500/10">
          <CardContent className="py-4 text-sm text-red-500">
            {errorMessage}
          </CardContent>
        </Card>
      )}

      <DiagramEditor
        title={title}
        mermaidCode={mermaidCode}
        onTitleChange={setTitle}
        onMermaidCodeChange={setMermaidCode}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}

export default function AdminNewDiagramPage() {
  return (
    <ProtectedRoute>
      <NewDiagramContent />
    </ProtectedRoute>
  );
}
