"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Copy, Save, Check, RefreshCcw, ExternalLink } from "lucide-react";
import { Button, Input } from "~/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { MermaidRenderer, type MermaidRenderState } from "./mermaid-renderer";
import { cn } from "~/lib/utils";

interface DiagramEditorProps {
  title: string;
  mermaidCode: string;
  onTitleChange: (value: string) => void;
  onMermaidCodeChange: (value: string) => void;
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

const SUPPORTED_TYPES = [
  "flowchart",
  "sequenceDiagram",
  "classDiagram",
  "stateDiagram",
  "erDiagram",
  "journey",
  "gantt",
  "mindmap",
];

export function DiagramEditor({
  title,
  mermaidCode,
  onTitleChange,
  onMermaidCodeChange,
  onSave,
  onUpdate,
  isSaving = false,
  isUpdating = false,
  publicLink,
  onCopyPublicLink,
  copiedPublicLink = false,
  updateEnabled = true,
  className,
}: DiagramEditorProps) {
  const [renderState, setRenderState] = useState<MermaidRenderState>({
    status: "idle",
  });

  const canSubmit = title.trim().length > 0 && mermaidCode.trim().length > 0;

  const primaryAction = useMemo(() => {
    if (onUpdate) {
      return {
        label: isUpdating ? "Updating..." : "Update Diagram",
        onClick: onUpdate,
        disabled: isUpdating || !canSubmit || !updateEnabled,
        icon: isUpdating ? RefreshCcw : Save,
      };
    }

    if (onSave) {
      return {
        label: isSaving ? "Saving..." : "Save Diagram",
        onClick: onSave,
        disabled: isSaving || !canSubmit,
        icon: isSaving ? RefreshCcw : Save,
      };
    }

    return null;
  }, [canSubmit, isSaving, isUpdating, onSave, onUpdate, updateEnabled]);

  const handleCodeTab = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key !== "Tab") return;

      event.preventDefault();
      const target = event.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const nextValue = `${mermaidCode.slice(0, start)}  ${mermaidCode.slice(end)}`;
      onMermaidCodeChange(nextValue);

      requestAnimationFrame(() => {
        target.setSelectionRange(start + 2, start + 2);
      });
    },
    [mermaidCode, onMermaidCodeChange],
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
          <CardTitle className="text-xl">Diagram Details</CardTitle>
          <CardDescription>
            Write Mermaid code and review the live preview before publishing.
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
            <CardTitle className="text-lg">Editor</CardTitle>
            <CardDescription>
              Use Tab to indent. Save shortcut: Cmd/Ctrl + S.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="diagram-title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="diagram-title"
                value={title}
                onChange={(event) => onTitleChange(event.target.value)}
                placeholder="Distributed Architecture Overview"
                className="bg-card"
                maxLength={160}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="mermaid-code" className="text-sm font-medium">
                Mermaid Code
              </label>
              <textarea
                id="mermaid-code"
                value={mermaidCode}
                onChange={(event) => onMermaidCodeChange(event.target.value)}
                onKeyDown={handleCodeTab}
                spellCheck={false}
                className="el-focus-styles scrollbar-minimal min-h-[520px] w-full resize-y rounded-md border border-input bg-card px-3 py-2 font-mono text-[13px] leading-6"
                placeholder="flowchart LR\n  A[Client] --> B[API]\n  B --> C[(DB)]"
              />
              <p className="text-xs text-muted-foreground">
                Supports: {SUPPORTED_TYPES.join(", ")}
              </p>
            </div>

            {renderState.status === "error" && (
              <div className="rounded-md border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-500">
                {renderState.errorMessage}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-background">
          <CardHeader>
            <CardTitle className="text-lg">Live Preview</CardTitle>
            <CardDescription>
              Preview updates instantly as you edit Mermaid code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MermaidRenderer
              code={mermaidCode}
              title={title || "Mermaid diagram preview"}
              onRenderStateChange={setRenderState}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
