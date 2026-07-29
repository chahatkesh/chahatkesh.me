"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader, ProtectedRoute } from "~/components/admin";
import { Card, CardContent } from "~/components/ui/card";
import { GistEditor } from "~/components/features/gist";
import { API_ROUTES } from "~/constants";
import type { GistItemApiResponse } from "~/types/gists";

const BREADCRUMBS = [
  { name: "Admin", url: "/admin" },
  { name: "Gists", url: "/admin/gists" },
  { name: "New", url: "/admin/gists/new" },
];

const DEFAULT_MARKDOWN = `# System Design Notes

Use this page to write and share markdown documents.

## Why this exists

- Capture architecture decisions
- Share teaching notes publicly
- Keep docs easy to update from admin

## Example checklist

- [ ] Add intro
- [ ] Add diagrams/images
- [ ] Publish and copy share link
`;

function NewGistContent() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [markdownContent, setMarkdownContent] = useState(DEFAULT_MARKDOWN);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage("");

    try {
      const response = await fetch(API_ROUTES.GISTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, markdownContent }),
      });

      const payload = (await response.json()) as GistItemApiResponse & {
        error?: string;
      };

      if (!response.ok || !payload.success) {
        setErrorMessage(payload.error ?? "Unable to save document");
        return;
      }

      router.push(`/admin/gists/${payload.data._id}/edit`);
    } catch (saveError) {
      console.error("Failed to save gist/document:", saveError);
      setErrorMessage("Unable to save document. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        breadcrumbs={BREADCRUMBS}
        title="Create Markdown Document"
        subtitle="Write markdown, preview it live, and publish a public share link"
      />

      {errorMessage && (
        <Card className="border-red-500/30 bg-red-500/10">
          <CardContent className="py-4 text-sm text-red-500">
            {errorMessage}
          </CardContent>
        </Card>
      )}

      <GistEditor
        title={title}
        markdownContent={markdownContent}
        onTitleChange={setTitle}
        onMarkdownContentChange={setMarkdownContent}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}

export default function AdminNewGistPage() {
  return (
    <ProtectedRoute>
      <NewGistContent />
    </ProtectedRoute>
  );
}
