"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "~/components/ui";
import { Input } from "~/components/ui";
import { Label } from "~/components/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "~/components/ui/sheet";
import { MotionDiv } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import { BackButton } from "~/components/shared";
import { ProtectedRoute } from "~/components/admin/protected-route";
import { formatDate } from "~/lib/date-utils";

interface GalleryImage {
  _id: string;
  title: string;
  location: string;
  date: string;
  aspectRatio: "square" | "portrait" | "landscape" | "big-square";
  imageUrl: string;
  publicId: string;
  isFeatured: boolean;
  order: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function AdminGalleryContent() {
  const { data, error, isLoading } = useSWR<{ success: boolean; data: GalleryImage[] }>(
    "/api/gallery",
    fetcher
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [originalEditData, setOriginalEditData] = useState<GalleryImage | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUploadSuccess = (result: any) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: result.info.secure_url,
      publicId: result.info.public_id,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const url = editingId ? `/api/gallery/${editingId}` : "/api/gallery";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form
        setFormData({
          title: "",
          location: "",
          date: new Date().toISOString().split("T")[0],
          aspectRatio: "square",
          isFeatured: false,
          imageUrl: "",
          publicId: "",
        });
        setEditingId(null);
        
        // Revalidate SWR cache
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        mutate("/api/gallery");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      location: "",
      date: new Date().toISOString().split("T")[0],
      aspectRatio: "square",
      isFeatured: false,
      imageUrl: "",
      publicId: "",
    });
    setEditingId(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <BackButton>Back</BackButton>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-800 dark:border-neutral-200"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <BackButton>Back</BackButton>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-red-600 dark:text-red-400">Error loading gallery. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <BackButton>Back</BackButton>
      
      {/* Page Header */}
      <MotionDiv 
        className="space-y-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={cn(typo({ variant: "h2" }), "text-3xl")}>Gallery Management</h1>
        <p className={cn(typo({ variant: "paragraph" }))}>
          Upload, edit, and manage your gallery images
        </p>
      </MotionDiv>

      {/* Upload Form */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-neutral-800 bg-neutral-950">
          <CardHeader>
            <CardTitle className="text-xl">Add New Image</CardTitle>
            <CardDescription>
              Upload a new image to your gallery collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-3">
                <Label htmlFor="image" className="text-sm font-medium">
                  Image *
                </Label>
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "portfolio_gallery"}
                  onSuccess={handleUploadSuccess}
                  onError={(error) => {
                    console.error("Upload error:", error);
                    alert("Failed to upload image. Please check your Cloudinary settings.");
                  }}
                  options={{
                    folder: "portfolio/gallery",
                    maxFiles: 1,
                    resourceType: "image",
                    clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
                    maxFileSize: 10000000, // 10MB
                  }}
                >
                  {({ open }) => (
                    <div className="space-y-3">
                      <Button
                        type="button"
                        onClick={() => open()}
                        className="w-full"
                        variant="outline"
                      >
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
                        {formData.imageUrl ? "Change Image" : "Upload Image"}
                      </Button>
                      {formData.imageUrl && (
                        <div className="relative group">
                          <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="w-full h-64 object-cover rounded-lg border border-neutral-800"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <p className="text-white text-sm">Click 'Change Image' to replace</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CldUploadWidget>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Sunset at the Beach"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    required
                    className="bg-neutral-900 border-neutral-800"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., Goa, India"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, location: e.target.value }))
                    }
                    required
                    className="bg-neutral-900 border-neutral-800"
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium">
                    Date *
                  </Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, date: e.target.value }))
                      }
                      required
                      className="bg-neutral-900 border-neutral-800 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </div>
                </div>

              </div>

              {/* Aspect Ratio */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Aspect Ratio *
                </Label>
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
                      onClick={() => setFormData((prev) => ({ ...prev, aspectRatio: option.value as any }))}
                      className={cn(
                        "px-4 py-2.5 rounded-md border text-sm font-medium transition-all duration-200",
                        formData.aspectRatio === option.value
                          ? "border-neutral-400 bg-neutral-900 text-white"
                          : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center space-x-3 p-4 bg-neutral-900 rounded-lg border border-neutral-800">
                <input
                  id="isFeatured"
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))
                  }
                  className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-neutral-100 focus:ring-2 focus:ring-neutral-600"
                />
                <div>
                  <Label htmlFor="isFeatured" className="text-sm font-medium cursor-pointer">
                    Featured Image
                  </Label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                <Button 
                  type="submit" 
                  disabled={uploading || !formData.imageUrl}
                  className="w-full"
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
                      Uploading...
                    </>
                  ) : (
                    "Add Image"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </MotionDiv>

      {/* Gallery Grid */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <div>
          <h2 className={cn(typo({ variant: "h2" }), "text-xl")}>
            Gallery Images ({data?.data?.length || 0})
          </h2>
          <p className={cn(typo({ variant: "paragraph" }))}>
            Manage your existing gallery collection
          </p>
        </div>
        
        {data?.data && data.data.length === 0 ? (
          <Card className="border-neutral-800 bg-neutral-950">
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
                className="text-neutral-600 mb-4"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">No images yet</h3>
              <p className="text-muted-foreground mb-4">
                Start building your gallery by uploading your first image above
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid w-full auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {data?.data?.map((image, index) => (
              <MotionDiv
                key={image._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={cn(
                  "group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 hover:border-neutral-700 transition-colors duration-300",
                  {
                    "md:col-span-2": image.aspectRatio === "landscape",
                    "row-span-2": image.aspectRatio === "portrait",
                    "md:col-span-2 row-span-2": image.aspectRatio === "big-square",
                    "col-span-1 row-span-1": image.aspectRatio === "square",
                  }
                )}
              >
                <div className="relative h-full w-full overflow-hidden">
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
                    <p className="mt-1 text-sm text-neutral-300">
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
                      onClick={() => handleDelete(image._id)}
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
        )}
      </MotionDiv>

      {/* Edit Modal */}
      <Sheet open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
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
                  <img
                    src={editFormData.imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-neutral-800"
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
                    setEditFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                  className="bg-neutral-900 border-neutral-800"
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
                    setEditFormData((prev) => ({ ...prev, location: e.target.value }))
                  }
                  required
                  className="bg-neutral-900 border-neutral-800"
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
                      setEditFormData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    required
                    className="bg-neutral-900 border-neutral-800 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>

              {/* Aspect Ratio */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Aspect Ratio *
                </Label>
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
                      onClick={() => setEditFormData((prev) => ({ ...prev, aspectRatio: option.value as any }))}
                      className={cn(
                        "px-4 py-2.5 rounded-md border text-sm font-medium transition-all duration-200",
                        editFormData.aspectRatio === option.value
                          ? "border-neutral-400 bg-neutral-900 text-white"
                          : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center space-x-3 p-4 bg-neutral-900 rounded-lg border border-neutral-800">
                <input
                  id="edit-isFeatured"
                  type="checkbox"
                  checked={editFormData.isFeatured}
                  onChange={(e) =>
                    setEditFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))
                  }
                  className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-neutral-100 focus:ring-2 focus:ring-neutral-600"
                />
                <div>
                  <Label htmlFor="edit-isFeatured" className="text-sm font-medium cursor-pointer">
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

export default function AdminGalleryPage() {
  return (
    <ProtectedRoute>
      <AdminGalleryContent />
    </ProtectedRoute>
  );
}
