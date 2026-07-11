"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Button } from "~/components/ui";
import { Input } from "~/components/ui";
import { Label } from "~/components/ui";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { MotionDiv } from "~/components/shared";
import { cn } from "~/lib/utils";
import {
  ProtectedRoute,
  AdminPageHeader,
  AdminLoadingState,
  AdminErrorState,
  AdminConfirmDialog,
} from "~/components/admin";
import { formatDate } from "~/lib/date-utils";
import type { GalleryImage, GalleryApiResponse } from "~/types/gallery";
import { API_ROUTES } from "~/constants";
import {
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_OPTIONS,
} from "~/constants/cloudinary";
import { ADMIN_SWR_CONFIG, adminFetcher } from "~/lib/fetcher";
import { parseCloudinaryUploadResult } from "~/lib/cloudinary-upload";

const BREADCRUMBS = [
  { name: "Admin", url: "/admin" },
  { name: "Gallery", url: "/admin/gallery" },
];

function AdminGalleryContent() {
  const { data, error, isLoading } = useSWR<GalleryApiResponse>(
    API_ROUTES.GALLERY,
    adminFetcher,
    ADMIN_SWR_CONFIG,
  );

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    aspectRatio: "square" as "square" | "portrait" | "landscape" | "big-square",
    isFeatured: false,
    imageUrl: "",
    publicId: "",
  });

  const [editFormData, setEditFormData] = useState({
    title: "",
    location: "",
    date: "",
    aspectRatio: "square" as "square" | "portrait" | "landscape" | "big-square",
    isFeatured: false,
    imageUrl: "",
    publicId: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [originalEditData, setOriginalEditData] = useState<GalleryImage | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);
  const [uploading, setUploading] = useState(false);

  const resetFormData = () => ({
    title: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    aspectRatio: "square" as const,
    isFeatured: false,
    imageUrl: "",
    publicId: "",
  });

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    const upload = parseCloudinaryUploadResult(result);
    if (!upload) return;
    setFormData({
      ...resetFormData(),
      imageUrl: upload.imageUrl,
      publicId: upload.publicId,
    });
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setFormData(resetFormData());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData(resetFormData());
        setIsAddModalOpen(false);
        mutate("/api/gallery");
      }
    } catch (error) {
      console.error("Error saving image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setOriginalEditData(image);
    setEditFormData({
      title: image.title,
      location: image.location,
      date: image.date,
      aspectRatio: image.aspectRatio,
      isFeatured: image.isFeatured,
      imageUrl: image.imageUrl,
      publicId: image.publicId,
    });
    setEditingId(image._id);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const response = await fetch(`/api/gallery/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        setIsEditModalOpen(false);
        setEditingId(null);
        setOriginalEditData(null);
        mutate("/api/gallery");
      }
    } catch (error) {
      console.error("Error updating image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingId(null);
    setOriginalEditData(null);
    setEditFormData({
      title: "",
      location: "",
      date: "",
      aspectRatio: "square",
      isFeatured: false,
      imageUrl: "",
      publicId: "",
    });
  };

  const hasChanges = originalEditData
    ? editFormData.title !== originalEditData.title ||
      editFormData.location !== originalEditData.location ||
      editFormData.date !== originalEditData.date ||
      editFormData.aspectRatio !== originalEditData.aspectRatio ||
      editFormData.isFeatured !== originalEditData.isFeatured ||
      editFormData.imageUrl !== originalEditData.imageUrl
    : false;

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const response = await fetch(`/api/gallery/${deleteTarget._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        mutate("/api/gallery");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
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
        errorMessage="Error loading gallery. Please try again."
      />
    );
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        breadcrumbs={BREADCRUMBS}
        title="Gallery Management"
        subtitle="Upload, edit, and manage your gallery images"
      />

      {/* Gallery Grid */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid w-full auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <GalleryUploadTile onUploadSuccess={handleUploadSuccess} />
          {data?.data?.map((image, index) => (
            <MotionDiv
              key={image._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={cn(
                "group relative overflow-hidden rounded-lg border border-border bg-background hover:border-muted-foreground/30 transition-colors duration-300",
                {
                  "md:col-span-2": image.aspectRatio === "landscape",
                  "row-span-2": image.aspectRatio === "portrait",
                  "md:col-span-2 row-span-2":
                    image.aspectRatio === "big-square",
                  "col-span-1 row-span-1": image.aspectRatio === "square",
                },
              )}
            >
              <div className="relative h-full w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Bottom left corner black overlay */}
                <div className="absolute bottom-0 left-0 z-10 h-1/3 bg-black/70 rounded-tr-2xl" />
                {/* Hover overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-100 transition-opacity duration-300" />
                {/* Default gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Featured Badge */}
                {image.isFeatured && (
                  <div className="absolute top-3 right-3 z-20">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/90 text-black backdrop-blur-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-1"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      Featured
                    </span>
                  </div>
                )}

                {/* Image Info */}
                <div className="absolute bottom-4 left-4 z-10 transition-opacity duration-300">
                  <h3 className="text-base font-medium text-white">
                    {image.title}, {image.location}
                  </h3>
                  <p className="mt-1 text-sm text-foreground/80">
                    {formatDate(image.date)}
                  </p>
                </div>

                {/* Action Buttons - Show on hover */}
                <div className="absolute top-3 left-3 z-20 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(image)}
                    className="h-8 px-2.5 bg-white/95 hover:bg-white text-black border-0 backdrop-blur-sm text-xs"
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
                      className="mr-1"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDeleteTarget(image)}
                    className="h-8 px-2.5 bg-red-500/95 hover:bg-red-600 text-white border-0 backdrop-blur-sm text-xs"
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
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </Button>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>

      <AdminConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete image?"
        description={
          deleteTarget
            ? `This will permanently delete "${deleteTarget.title}" from your gallery.`
            : ""
        }
        confirmLabel="Delete Image"
        onConfirm={confirmDelete}
        confirmDisabled={!deleteTarget}
      />

      {/* Add Image Modal */}
      <Sheet
        open={isAddModalOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseAddModal();
        }}
      >
        <SheetContent
          side="right"
          className="w-full overflow-y-auto sm:max-w-lg"
        >
          <SheetHeader>
            <SheetTitle>Add New Image</SheetTitle>
            <SheetDescription>
              Fill in the details for your uploaded image
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {formData.imageUrl && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Uploaded Image</Label>
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="h-48 w-full rounded-lg border border-border object-cover"
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Sunset at the Beach"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                  className="border-border bg-card"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  Location *
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., Goa, India"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  required
                  className="border-border bg-card"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium">
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  required
                  className="border-border bg-card [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:filter hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Aspect Ratio *</Label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {[
                    { value: "square", label: "Square" },
                    { value: "portrait", label: "Portrait" },
                    { value: "landscape", label: "Landscape" },
                    { value: "big-square", label: "Big Square" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          aspectRatio: option.value as
                            | "square"
                            | "portrait"
                            | "landscape"
                            | "big-square",
                        }))
                      }
                      className={cn(
                        "rounded-md border px-4 py-2.5 text-sm font-medium transition-all duration-200",
                        formData.aspectRatio === option.value
                          ? "border-muted-foreground bg-background text-foreground"
                          : "border-border text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground/80",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg border border-border bg-card p-4">
                <input
                  id="isFeatured"
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isFeatured: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-muted-foreground/30 bg-muted text-foreground focus:ring-2 focus:ring-ring"
                />
                <Label
                  htmlFor="isFeatured"
                  className="cursor-pointer text-sm font-medium"
                >
                  Featured Image
                </Label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseAddModal}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={uploading || !formData.imageUrl}
                className="flex-1"
              >
                {uploading ? "Adding..." : "Add Image"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Edit Modal */}
      <Sheet open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle>Edit Image</SheetTitle>
            <SheetDescription>
              Update the details of your gallery image
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleEditSubmit} className="space-y-6 mt-6">
            {/* Image Preview */}
            {editFormData.imageUrl && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Current Image</Label>
                <div className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={editFormData.imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-border"
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="edit-title" className="text-sm font-medium">
                  Title *
                </Label>
                <Input
                  id="edit-title"
                  placeholder="e.g., Sunset at the Beach"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                  className="bg-card border-border"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="edit-location" className="text-sm font-medium">
                  Location *
                </Label>
                <Input
                  id="edit-location"
                  placeholder="e.g., Goa, India"
                  value={editFormData.location}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  required
                  className="bg-card border-border"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="edit-date" className="text-sm font-medium">
                  Date *
                </Label>
                <div className="relative">
                  <Input
                    id="edit-date"
                    type="date"
                    value={editFormData.date}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    required
                    className="bg-card border-border [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>

              {/* Aspect Ratio */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Aspect Ratio *</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { value: "square", label: "Square" },
                    { value: "portrait", label: "Portrait" },
                    { value: "landscape", label: "Landscape" },
                    { value: "big-square", label: "Big Square" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setEditFormData((prev) => ({
                          ...prev,
                          aspectRatio: option.value as
                            | "square"
                            | "portrait"
                            | "landscape"
                            | "big-square",
                        }))
                      }
                      className={cn(
                        "px-4 py-2.5 rounded-md border text-sm font-medium transition-all duration-200",
                        editFormData.aspectRatio === option.value
                          ? "border-muted-foreground bg-background text-foreground"
                          : "border-border text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground/80",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border">
                <input
                  id="edit-isFeatured"
                  type="checkbox"
                  checked={editFormData.isFeatured}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      isFeatured: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded border-muted-foreground/30 bg-muted text-foreground focus:ring-2 focus:ring-ring"
                />
                <div>
                  <Label
                    htmlFor="edit-isFeatured"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Featured Image
                  </Label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseEditModal}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={uploading || !hasChanges}
                className="flex-1"
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
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

interface GalleryUploadTileProps {
  onUploadSuccess: (result: CloudinaryUploadWidgetResults) => void;
}

function GalleryUploadTile({ onUploadSuccess }: GalleryUploadTileProps) {
  return (
    <CldUploadWidget
      uploadPreset={CLOUDINARY_UPLOAD_PRESET}
      onSuccess={onUploadSuccess}
      onError={(error) => {
        console.error("Upload error:", error);
        alert("Failed to upload image. Please check your Cloudinary settings.");
      }}
      options={CLOUDINARY_UPLOAD_OPTIONS.GALLERY}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="col-span-1 row-span-1 flex h-full min-h-[200px] flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-dashed border-border bg-muted/20 text-muted-foreground/70 transition-colors hover:border-muted-foreground/40 hover:bg-muted/30 hover:text-muted-foreground"
          aria-label="Upload image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>
          <span className="text-xs font-medium">Add image</span>
        </button>
      )}
    </CldUploadWidget>
  );
}

export default function AdminGalleryPage() {
  return (
    <ProtectedRoute>
      <AdminGalleryContent />
    </ProtectedRoute>
  );
}
