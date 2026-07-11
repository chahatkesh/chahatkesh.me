"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Check, Copy, File, Loader2, Pencil, Trash2 } from "lucide-react";
import { Button, Input } from "~/components/ui";
import { MotionDiv } from "~/components/shared";
import {
  ProtectedRoute,
  AdminPageHeader,
  AdminLoadingState,
  AdminErrorState,
  AdminConfirmDialog,
  AdminListCard,
  AdminListCreateTile,
  AdminListMeta,
  adminListActionClassName,
  adminListDangerActionClassName,
  adminListIconActionClassName,
} from "~/components/admin";
import { formatRelativeDate } from "~/lib/date-utils";
import type { SharedFile, SharedFileApiResponse } from "~/types/files";
import { API_ROUTES } from "~/constants";
import {
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_OPTIONS,
} from "~/constants/cloudinary";
import { simpleFetcher as fetcher } from "~/lib/fetcher";
import { parseCloudinaryUploadResult } from "~/lib/cloudinary-upload";

const BREADCRUMBS = [
  { name: "Admin", url: "/admin" },
  { name: "Files", url: "/admin/files" },
];

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
  const [deleteTarget, setDeleteTarget] = useState<SharedFile | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [savingRename, setSavingRename] = useState(false);

  const handleUploadSuccess = async (result: CloudinaryUploadWidgetResults) => {
    const upload = parseCloudinaryUploadResult(result);
    if (!upload) return;

    const fileName = upload.originalFilename
      ? upload.format
        ? `${upload.originalFilename}.${upload.format}`
        : upload.originalFilename
      : upload.publicId;

    setUploading(true);
    try {
      const response = await fetch(API_ROUTES.FILES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName,
          fileUrl: upload.imageUrl,
          publicId: upload.publicId,
          format: upload.format ?? "",
          bytes: upload.bytes ?? 0,
          resourceType: upload.resourceType ?? "auto",
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

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget._id);
    try {
      const response = await fetch(`${API_ROUTES.FILES}/${deleteTarget._id}`, {
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
      setDeleteTarget(null);
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
    return <AdminLoadingState breadcrumbs={BREADCRUMBS} />;
  }

  if (error) {
    return (
      <AdminErrorState
        breadcrumbs={BREADCRUMBS}
        errorMessage="Error loading files. Please try again."
      />
    );
  }

  const files = data?.data ?? [];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        breadcrumbs={BREADCRUMBS}
        title="Files"
        subtitle="Upload files and instantly get a shareable URL you can send to anyone"
      />

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="space-y-3">
          <FilesUploadTile
            onUploadSuccess={handleUploadSuccess}
            uploading={uploading}
          />
          {files.map((file, index) => {
            const isDeleting = deletingId === file._id;
            const isRenaming = renamingId === file._id;

            return (
              <AdminListCard
                key={file._id}
                index={index}
                disabled={isDeleting}
                href={isRenaming ? undefined : `/s/${file._id}`}
                icon={<File className="size-5" strokeWidth={1.75} />}
                content={
                  isRenaming ? (
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
                  ) : undefined
                }
                title={file.fileName}
                meta={
                  <AdminListMeta
                    items={[
                      file.format ? file.format.toUpperCase() : null,
                      formatBytes(file.bytes),
                      formatRelativeDate(file.createdAt),
                    ]}
                  />
                }
                actions={
                  isRenaming ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => saveRename(file)}
                        disabled={savingRename || !renameValue.trim()}
                        className={adminListActionClassName}
                      >
                        {savingRename ? (
                          <Loader2 className="mr-1 size-3 animate-spin" />
                        ) : (
                          <Check className="mr-1 size-3" />
                        )}
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={cancelRename}
                        disabled={savingRename}
                        className={adminListActionClassName}
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
                        disabled={isDeleting}
                        className={adminListActionClassName}
                      >
                        {copiedId === file._id ? (
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
                        size="sm"
                        variant="outline"
                        onClick={() => startRename(file)}
                        disabled={isDeleting}
                        className={adminListIconActionClassName}
                        aria-label="Rename file"
                        title="Rename"
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDeleteTarget(file)}
                        disabled={isDeleting}
                        aria-label="Delete file"
                        title="Delete"
                        className={adminListDangerActionClassName}
                      >
                        {isDeleting ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="size-3.5" />
                        )}
                      </Button>
                    </>
                  )
                }
              />
            );
          })}
        </div>
      </MotionDiv>

      <AdminConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete file?"
        description={
          deleteTarget
            ? `This will permanently delete "${deleteTarget.fileName}".`
            : ""
        }
        confirmLabel="Delete File"
        onConfirm={confirmDelete}
        confirmDisabled={!deleteTarget || deletingId === deleteTarget?._id}
        loading={Boolean(deleteTarget && deletingId === deleteTarget._id)}
      />
    </div>
  );
}

interface FilesUploadTileProps {
  onUploadSuccess: (result: CloudinaryUploadWidgetResults) => void;
  uploading: boolean;
}

function FilesUploadTile({ onUploadSuccess, uploading }: FilesUploadTileProps) {
  return (
    <CldUploadWidget
      uploadPreset={CLOUDINARY_UPLOAD_PRESET}
      onSuccess={onUploadSuccess}
      onError={(err) => {
        console.error("Upload error:", err);
        alert("Failed to upload file. Please check your Cloudinary settings.");
      }}
      options={CLOUDINARY_UPLOAD_OPTIONS.FILES}
    >
      {({ open }) => (
        <AdminListCreateTile
          label="Add file"
          loadingLabel="Saving..."
          loading={uploading}
          onClick={() => open()}
        />
      )}
    </CldUploadWidget>
  );
}

export default function AdminFilesPage() {
  return (
    <ProtectedRoute>
      <AdminFilesContent />
    </ProtectedRoute>
  );
}
