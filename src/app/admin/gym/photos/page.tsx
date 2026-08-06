"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";

import {
  AdminConfirmDialog,
  AdminErrorState,
  AdminListCard,
  AdminListCreateTile,
  AdminListMeta,
  AdminLoadingState,
  AdminPageHeader,
  ProtectedRoute,
} from "~/components/admin";
import { Button, Input, Label } from "~/components/ui";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { API_ROUTES } from "~/constants";
import {
  CLOUDINARY_UPLOAD_OPTIONS,
  CLOUDINARY_UPLOAD_PRESET,
} from "~/constants/cloudinary";
import { ADMIN_SWR_CONFIG, adminFetcher } from "~/lib/fetcher";
import { parseCloudinaryUploadResult } from "~/lib/cloudinary-upload";
import { formatDate } from "~/lib/date-utils";
import { formatGymDate } from "~/lib/gym";
import type {
  GymProgressPhoto,
  GymProgressPhotoListApiResponse,
} from "~/types/gym";

const BREADCRUMBS = [
  { name: "Admin", url: "/admin" },
  { name: "Gym", url: "/admin/gym" },
  { name: "Photos", url: "/admin/gym/photos" },
];

interface PhotoFormData {
  date: string;
  imageUrl: string;
  publicId: string;
}

function emptyForm(): PhotoFormData {
  return {
    date: formatGymDate(new Date()),
    imageUrl: "",
    publicId: "",
  };
}

function AdminGymPhotosContent() {
  const { data, error, isLoading } = useSWR<GymProgressPhotoListApiResponse>(
    API_ROUTES.GYM_PHOTOS,
    adminFetcher,
    ADMIN_SWR_CONFIG,
  );

  const [formData, setFormData] = useState<PhotoFormData>(emptyForm);
  const [editFormData, setEditFormData] = useState<PhotoFormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [originalEditData, setOriginalEditData] =
    useState<GymProgressPhoto | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GymProgressPhoto | null>(
    null,
  );
  const [saving, setSaving] = useState(false);

  const photos = data?.data ?? [];

  const refresh = () => mutate(API_ROUTES.GYM_PHOTOS);

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    const upload = parseCloudinaryUploadResult(result);
    if (!upload) return;
    setFormData({
      ...emptyForm(),
      imageUrl: upload.imageUrl,
      publicId: upload.publicId,
    });
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setFormData(emptyForm());
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(API_ROUTES.GYM_PHOTOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        handleCloseAddModal();
        refresh();
      }
    } catch (submitError) {
      console.error("Error saving progress photo:", submitError);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (photo: GymProgressPhoto) => {
    setOriginalEditData(photo);
    setEditFormData({
      date: photo.date,
      imageUrl: photo.imageUrl,
      publicId: photo.publicId,
    });
    setEditingId(photo._id);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingId) return;
    setSaving(true);

    try {
      const response = await fetch(API_ROUTES.GYM_PHOTO_BY_ID(editingId), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        setIsEditModalOpen(false);
        setEditingId(null);
        setOriginalEditData(null);
        refresh();
      }
    } catch (submitError) {
      console.error("Error updating progress photo:", submitError);
    } finally {
      setSaving(false);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingId(null);
    setOriginalEditData(null);
    setEditFormData(emptyForm());
  };

  const hasChanges = originalEditData
    ? editFormData.date !== originalEditData.date ||
      editFormData.imageUrl !== originalEditData.imageUrl
    : false;

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const response = await fetch(
        API_ROUTES.GYM_PHOTO_BY_ID(deleteTarget._id),
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        refresh();
      }
    } catch (deleteError) {
      console.error("Error deleting progress photo:", deleteError);
    } finally {
      setDeleteTarget(null);
    }
  };

  if (isLoading) {
    return <AdminLoadingState breadcrumbs={BREADCRUMBS} />;
  }

  if (error) {
    return (
      <AdminErrorState
        breadcrumbs={BREADCRUMBS}
        errorMessage="Error loading progress photos. Please try again."
      />
    );
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        breadcrumbs={BREADCRUMBS}
        title="Progress Photos"
        subtitle="Upload dated gym progress photos for the public gym page."
      />

      <div className="space-y-3">
        <CldUploadWidget
          uploadPreset={CLOUDINARY_UPLOAD_PRESET}
          onSuccess={handleUploadSuccess}
          onError={(uploadError) => {
            console.error("Upload error:", uploadError);
            alert(
              "Failed to upload image. Please check your Cloudinary settings.",
            );
          }}
          options={CLOUDINARY_UPLOAD_OPTIONS.GYM_PROGRESS}
        >
          {({ open }) => (
            <AdminListCreateTile
              label="Upload progress photo"
              onClick={() => open()}
            />
          )}
        </CldUploadWidget>

        {photos.map((photo, index) => (
          <AdminListCard
            key={photo._id}
            index={index}
            title={formatDate(photo.date)}
            meta={<AdminListMeta items={[photo.date]} />}
            icon={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo.imageUrl}
                alt=""
                className="size-full rounded-md object-cover"
              />
            }
            actions={
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(photo)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                  onClick={() => setDeleteTarget(photo)}
                >
                  Delete
                </Button>
              </>
            }
          />
        ))}
      </div>

      <AdminConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete progress photo?"
        description={
          deleteTarget
            ? `This will permanently delete the photo from ${formatDate(deleteTarget.date)}.`
            : ""
        }
        confirmLabel="Delete Photo"
        onConfirm={confirmDelete}
        confirmDisabled={!deleteTarget}
      />

      <PhotoFormSheet
        open={isAddModalOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseAddModal();
        }}
        title="Add progress photo"
        description="Set the date for this progress photo."
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        saving={saving}
        submitLabel="Add photo"
        onCancel={handleCloseAddModal}
      />

      <PhotoFormSheet
        open={isEditModalOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseEditModal();
        }}
        title="Edit progress photo"
        description="Update the date for this progress photo."
        formData={editFormData}
        setFormData={setEditFormData}
        onSubmit={handleEditSubmit}
        saving={saving}
        submitLabel="Save changes"
        onCancel={handleCloseEditModal}
        submitDisabled={!hasChanges}
      />
    </div>
  );
}

interface PhotoFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  formData: PhotoFormData;
  setFormData: React.Dispatch<React.SetStateAction<PhotoFormData>>;
  onSubmit: (event: React.FormEvent) => void;
  saving: boolean;
  submitLabel: string;
  onCancel: () => void;
  submitDisabled?: boolean;
}

function PhotoFormSheet({
  open,
  onOpenChange,
  title,
  description,
  formData,
  setFormData,
  onSubmit,
  saving,
  submitLabel,
  onCancel,
  submitDisabled = false,
}: PhotoFormSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <form onSubmit={onSubmit} className="mt-6 space-y-6">
          {formData.imageUrl ? (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Preview</Label>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.imageUrl}
                alt="Progress photo preview"
                className="aspect-[3/4] w-full rounded-lg border border-border object-cover"
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="photo-date" className="text-sm font-medium">
              Date
            </Label>
            <Input
              id="photo-date"
              type="date"
              value={formData.date}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  date: event.target.value,
                }))
              }
              required
              className="border-border bg-card [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:filter hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving || !formData.imageUrl || submitDisabled}
              className="flex-1"
            >
              {saving ? "Saving…" : submitLabel}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default function AdminGymPhotosPage() {
  return (
    <ProtectedRoute>
      <AdminGymPhotosContent />
    </ProtectedRoute>
  );
}
