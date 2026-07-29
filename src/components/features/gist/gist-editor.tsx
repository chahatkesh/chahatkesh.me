"use client";

import { useCallback, useEffect, useMemo } from "react";
import { Copy, Save, Check, RefreshCcw, ExternalLink } from "lucide-react";
import { Button, Input } from "~/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { MarkdownRenderer } from "./markdown-renderer";
import { cn } from "~/lib/utils";

interface GistEditorProps {
  title: string;
  markdownContent: string;
  onTitleChange: (value: string) => void;
  onMarkdownContentChange: (value: string) => void;
  onSave?: () => void;
  onUpdate?: () => void;
  isSaving?: boolean;
  isUpdating?: boolean;
  publicLink?: string | null;
  onCopyPublicLink?: () => void;
  copiedPublicLink?: boolean;
  updateEnabled?: boolean;
  className?: string;
}

export function GistEditor({
  title,
  markdownContent,
  onTitleChange,
  onMarkdownContentChange,
  onSave,
  onUpdate,
  isSaving = false,
  isUpdating = false,
  publicLink,
  onCopyPublicLink,
  copiedPublicLink = false,
  updateEnabled = true,
  className,
}: GistEditorProps) {
  const canSubmit =
    title.trim().length > 0 && markdownContent.trim().length > 0;

  const primaryAction = useMemo(() => {
    if (onUpdate) {
      return {
        label: isUpdating ? "Updating..." : "Update Document",
        onClick: onUpdate,
        disabled: isUpdating || !canSubmit || !updateEnabled,
        icon: isUpdating ? RefreshCcw : Save,
      };
    }

    if (onSave) {
      return {
        label: isSaving ? "Saving..." : "Save Document",
        onClick: onSave,
        disabled: isSaving || !canSubmit,
        icon: isSaving ? RefreshCcw : Save,
      };
    }

    return null;
  }, [canSubmit, isSaving, isUpdating, onSave, onUpdate, updateEnabled]);

  const handleTabIndent = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key !== "Tab") return;

      event.preventDefault();
      const target = event.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const nextValue = `${markdownContent.slice(0, start)}  ${markdownContent.slice(end)}`;
      onMarkdownContentChange(nextValue);

      requestAnimationFrame(() => {
        target.setSelectionRange(start + 2, start + 2);
      });
    },
    [markdownContent, onMarkdownContentChange],
  );

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      const isSaveCombo = (event.metaKey || event.ctrlKey) && event.key === "s";
      if (!isSaveCombo || !primaryAction || primaryAction.disabled) return;
      event.preventDefault();
      primaryAction.onClick();
    }

    window.addEventListener("keydown", handleShortcut);
    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, [primaryAction]);

  return (
    <div className={cn("space-y-5", className)}>
      <Card className="border-border bg-background">
        <CardHeader className="gap-3">
          <CardTitle className="text-xl">Document Details</CardTitle>
          <CardDescription>
            Write Markdown and preview exactly what your public page will look
            like.
          </CardDescription>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {primaryAction && (
              <Button
                onClick={primaryAction.onClick}
                disabled={primaryAction.disabled}
              >
                <primaryAction.icon
                  className={cn(
                    "mr-2 size-4",
                    (isSaving || isUpdating) && "animate-spin",
                  )}
                />
                {primaryAction.label}
              </Button>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={onCopyPublicLink}
              disabled={!publicLink || !onCopyPublicLink}
            >
              {copiedPublicLink ? (
                <>
                  <Check className="mr-2 size-4" />
                  Copied Link
                </>
              ) : (
                <>
                  <Copy className="mr-2 size-4" />
                  Copy Public Link
                </>
              )}
            </Button>

            {publicLink && (
              <a
                href={publicLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button type="button" variant="outline">
                  <ExternalLink className="mr-2 size-4" />
                  Open Public View
                </Button>
              </a>
            )}
          </div>

          {publicLink && (
            <p className="break-all text-xs text-muted-foreground">
              {publicLink}
            </p>
          )}
        </CardHeader>
      </Card>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="border-border bg-background">
          <CardHeader>
            <CardTitle className="text-lg">Markdown Editor</CardTitle>
            <CardDescription>
              Supports GitHub-flavored markdown. Save shortcut: Cmd/Ctrl + S.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="gist-title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="gist-title"
                value={title}
                onChange={(event) => onTitleChange(event.target.value)}
                placeholder="System Design Notes"
                className="bg-card"
                maxLength={180}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="gist-content" className="text-sm font-medium">
                Markdown Content
              </label>
              <textarea
                id="gist-content"
                value={markdownContent}
                onChange={(event) =>
                  onMarkdownContentChange(event.target.value)
                }
                onKeyDown={handleTabIndent}
                spellCheck={false}
                className="el-focus-styles scrollbar-minimal min-h-[540px] w-full resize-y rounded-md border border-input bg-card px-3 py-2 font-mono text-[13px] leading-6"
                placeholder="# Design note\n\nWrite your explanation in markdown..."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-background">
          <CardHeader>
            <CardTitle className="text-lg">Live Preview</CardTitle>
            <CardDescription>
              Read-only preview rendered from your markdown.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MarkdownRenderer content={markdownContent} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
