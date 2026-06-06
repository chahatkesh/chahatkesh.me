"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Button, Input } from "~/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { MotionDiv, Breadcrumb } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import { ProtectedRoute } from "~/components/admin/protected-route";
import { formatRelativeDate } from "~/lib/date-utils";
import type { SharedFile, SharedFileApiResponse } from "~/types/files";
import { API_ROUTES } from "~/constants";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  return `${size.toFixed(size >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

function AdminFilesContent() {
  const { data, error, isLoading } = useSWR<SharedFileApiResponse>(
    API_ROUTES.FILES,
    fetcher,
  );

  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [savingRename, setSavingRename] = useState(false);

  const handleUploadSuccess = async (result: CloudinaryUploadWidgetResults) => {
    if (!result.info || typeof result.info === "string") return;

    const info = result.info;
    const fileName = info.original_filename
      ? info.format
        ? `${info.original_filename}.${info.format}`
        : info.original_filename
      : info.public_id;

    setUploading(true);
    try {
      const response = await fetch(API_ROUTES.FILES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName,
          fileUrl: info.secure_url,
          publicId: info.public_id,
          format: info.format ?? "",
          bytes: info.bytes ?? 0,
          resourceType: info.resource_type ?? "auto",
        }),
      });

      if (response.ok) {
        mutate(API_ROUTES.FILES);
      } else {
        alert("Upload succeeded but saving the file record failed.");
      }
    } catch (err) {
      console.error("Error saving file:", err);
      alert("Failed to save the uploaded file.");
    } finally {
      setUploading(false);
    }
  };

  const shareUrl = (file: SharedFile) =>
    typeof window !== "undefined"
      ? `${window.location.origin}/s/${file._id}`
      : `/s/${file._id}`;

  const handleCopy = async (file: SharedFile) => {
    try {
      await navigator.clipboard.writeText(shareUrl(file));
      setCopiedId(file._id);
      setTimeout(
        () => setCopiedId((id) => (id === file._id ? null : id)),
        2000,
      );
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`${API_ROUTES.FILES}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await mutate(API_ROUTES.FILES);
      } else {
        alert("Failed to delete the file. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting file:", err);
      alert("Failed to delete the file. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const startRename = (file: SharedFile) => {
    setRenamingId(file._id);
    setRenameValue(file.fileName);
  };

  const cancelRename = () => {
    setRenamingId(null);
    setRenameValue("");
  };

  const saveRename = async (file: SharedFile) => {
    const next = renameValue.trim();
    if (!next || next === file.fileName) {
      cancelRename();
      return;
    }

    setSavingRename(true);
    try {
      const response = await fetch(`${API_ROUTES.FILES}/${file._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: next }),
      });

      if (response.ok) {
        await mutate(API_ROUTES.FILES);
        cancelRename();
      } else {
        alert("Failed to rename the file. Please try again.");
      }
    } catch (err) {
      console.error("Error renaming file:", err);
      alert("Failed to rename the file. Please try again.");
    } finally {
      setSavingRename(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Breadcrumb
          items={[
            { name: "Admin", url: "/admin" },
            { name: "Files", url: "/admin/files" },
          ]}
        />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-muted-foreground/30"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <Breadcrumb
          items={[
            { name: "Admin", url: "/admin" },
            { name: "Files", url: "/admin/files" },
          ]}
        />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-destructive">
            Error loading files. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const files = data?.data ?? [];

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { name: "Admin", url: "/admin" },
          { name: "Files", url: "/admin/files" },
        ]}
      />

      {/* Page Header */}
      <MotionDiv
        className="space-y-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={cn(typo({ variant: "h2" }), "text-3xl")}>
          File Sharing
        </h1>
        <p className={cn(typo({ variant: "paragraph" }))}>
          Upload files and instantly get a shareable URL you can send to anyone
        </p>
      </MotionDiv>

      {/* Upload Card */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-border bg-background">
          <CardHeader>
            <CardTitle className="text-xl">Upload a File</CardTitle>
            <CardDescription>
              Images, PDFs, and documents up to 20MB. The shareable link is
              generated automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CldUploadWidget
              uploadPreset={
                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
                "portfolio_gallery"
              }
              onSuccess={handleUploadSuccess}
              onError={(err) => {
                console.error("Upload error:", err);
                alert(
                  "Failed to upload file. Please check your Cloudinary settings.",
                );
              }}
              options={{
                folder: "portfolio/files",
                maxFiles: 1,
                resourceType: "auto",
                clientAllowedFormats: [
                  "jpg",
                  "jpeg",
                  "png",
                  "webp",
                  "gif",
                  "svg",
                  "pdf",
                  "doc",
                  "docx",
                  "xls",
                  "xlsx",
                  "ppt",
                  "pptx",
                  "txt",
                  "csv",
                  "zip",
                ],
                maxFileSize: 20000000, // 20MB
              }}
            >
              {({ open }) => (
                <Button
                  type="button"
                  onClick={() => open()}
                  className="w-full"
                  variant="outline"
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" x2="12" y1="3" y2="15" />
                      </svg>
                      Upload File
                    </>
                  )}
                </Button>
              )}
            </CldUploadWidget>
          </CardContent>
        </Card>
      </MotionDiv>

      {/* Files List */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <div>
          <h2 className={cn(typo({ variant: "h2" }), "text-xl")}>
            Uploaded Files ({files.length})
          </h2>
          <p className={cn(typo({ variant: "paragraph" }))}>
            Copy a link to share, or delete files you no longer need
          </p>
        </div>

        {files.length === 0 ? (
          <Card className="border-border bg-background">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground/50 mb-4"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">No files yet</h3>
              <p className="text-muted-foreground mb-4">
                Upload your first file above to get a shareable link
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {files.map((file, index) => (
              <MotionDiv
                key={file._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className={cn(
                  "group flex items-center gap-4 rounded-lg border border-border bg-background p-4 transition-all duration-300 hover:border-muted-foreground/30",
                  deletingId === file._id && "opacity-60",
                )}
              >
                {/* File icon */}
                <div className="flex-shrink-0 p-2.5 rounded-lg bg-card">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>

                {/* File meta */}
                <div className="min-w-0 flex-1">
                  {renamingId === file._id ? (
                    <Input
                      value={renameValue}
                      autoFocus
                      disabled={savingRename}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          saveRename(file);
                        } else if (e.key === "Escape") {
                          cancelRename();
                        }
                      }}
                      className="h-8 border-border bg-card text-sm"
                    />
                  ) : (
                    <>
                      <p className="truncate text-sm font-medium text-foreground">
                        {file.fileName}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {file.format ? `${file.format.toUpperCase()} · ` : ""}
                        {formatBytes(file.bytes)} ·{" "}
                        {formatRelativeDate(file.createdAt)}
                      </p>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-shrink-0 items-center gap-1.5">
                  {renamingId === file._id ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => saveRename(file)}
                        disabled={savingRename || !renameValue.trim()}
                        className="h-8 px-2.5 text-xs"
                      >
                        {savingRename ? (
                          <svg
                            className="mr-1 h-3 w-3 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={cancelRename}
                        disabled={savingRename}
                        className="h-8 px-2.5 text-xs"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopy(file)}
                        disabled={deletingId === file._id}
                        className="h-8 px-2.5 text-xs"
                      >
                        {copiedId === file._id ? (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-1"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Copied
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-1"
                            >
                              <rect
                                width="14"
                                height="14"
                                x="8"
                                y="8"
                                rx="2"
                                ry="2"
                              />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                            Copy
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startRename(file)}
                        disabled={deletingId === file._id}
                        className="h-8 px-2 text-xs"
                        aria-label="Rename file"
                        title="Rename"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                      </Button>
                      <a
                        href={`/s/${file._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open shared page"
                        title="Open"
                        className={cn(
                          "inline-flex h-8 items-center rounded-md border border-border px-2 text-xs font-medium transition-colors hover:bg-card",
                          deletingId === file._id &&
                            "pointer-events-none opacity-50",
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 3h6v6" />
                          <path d="M10 14 21 3" />
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        </svg>
                      </a>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(file._id)}
                        disabled={deletingId === file._id}
                        aria-label="Delete file"
                        title="Delete"
                        className="h-8 px-2 text-xs border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      >
                        {deletingId === file._id ? (
                          <svg
                            className="h-3 w-3 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </MotionDiv>
            ))}
          </div>
        )}
      </MotionDiv>
    </div>
  );
}

export default function AdminFilesPage() {
  return (
    <ProtectedRoute>
      <AdminFilesContent />
    </ProtectedRoute>
  );
}
