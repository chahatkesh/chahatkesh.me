"use client";

import { useState, useId } from "react";
import useSWR, { mutate } from "swr";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Button } from "~/components/ui";
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
import { experiences } from "~/data/experience";
import { API_ROUTES } from "~/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ExperienceGalleryImage {
  _id: string;
  experienceSlug: string;
  imageUrl: string;
  publicId: string;
  caption?: string;
  order: number;
}

interface ExperienceGalleryApiResponse {
  success: boolean;
  data: ExperienceGalleryImage[];
}

/** An image that has been uploaded to Cloudinary but not yet saved to DB */
interface PendingItem {
  /** Client-only stable key */
  clientId: string;
  imageUrl: string;
  publicId: string;
  caption: string;
  saving: boolean;
  error?: string;
}

// ---------------------------------------------------------------------------
// Fetcher
// ---------------------------------------------------------------------------

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AdminExperienceGalleryPage() {
  return (
    <ProtectedRoute>
      <AdminExperienceGalleryContent />
    </ProtectedRoute>
  );
}

function AdminExperienceGalleryContent() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const toggleExpanded = (slug: string) =>
    setExpandedSlug((prev) => (prev === slug ? null : slug));

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { name: "Admin", url: "/admin" },
          { name: "Experience Gallery", url: "/admin/experience" },
        ]}
      />

      <MotionDiv
        className="space-y-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={cn(typo({ variant: "h2" }), "text-3xl")}>
          Experience Gallery
        </h1>
        <p className={cn(typo({ variant: "paragraph" }))}>
          Upload and manage highlight images for each work experience
        </p>
      </MotionDiv>

      <MotionDiv
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {experiences.map((exp) => (
          <ExperienceGalleryCard
            key={exp.slug}
            slug={exp.slug}
            employer={exp.employer}
            role={exp.role}
            logo={exp.logo}
            isExpanded={expandedSlug === exp.slug}
            onToggle={() => toggleExpanded(exp.slug)}
          />
        ))}
      </MotionDiv>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Per-experience accordion card
// ---------------------------------------------------------------------------

interface ExperienceGalleryCardProps {
  slug: string;
  employer: string;
  role: string;
  logo: string | { src: string };
  isExpanded: boolean;
  onToggle: () => void;
}

function ExperienceGalleryCard({
  slug,
  employer,
  role,
  logo,
  isExpanded,
  onToggle,
}: ExperienceGalleryCardProps) {
  const apiUrl = API_ROUTES.EXPERIENCE_GALLERY(slug);
  const { data, isLoading } = useSWR<ExperienceGalleryApiResponse>(
    isExpanded ? apiUrl : null,
    fetcher,
  );

  const images = data?.data ?? [];
  const logoSrc = typeof logo === "string" ? logo : logo.src;

  return (
    <Card className="border-neutral-800 bg-neutral-950 overflow-hidden">
      {/* Collapsible header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-950"
        aria-expanded={isExpanded}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="h-12 w-12 rounded-md overflow-hidden border border-neutral-700 bg-neutral-800/50 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc}
                alt={`${employer} logo`}
                className="w-full h-full object-contain p-1"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base text-white truncate">
                {employer}
              </CardTitle>
              <CardDescription className="text-neutral-400 text-sm truncate">
                {role}
              </CardDescription>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {isExpanded && images.length > 0 && (
                <span className="hidden sm:inline-flex items-center rounded-full border border-neutral-700 px-2.5 py-0.5 text-xs text-neutral-400">
                  {images.length} image{images.length !== 1 ? "s" : ""}
                </span>
              )}
              {!isExpanded && (
                <span className="text-xs text-neutral-500">Manage</span>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={cn(
                  "w-4 h-4 text-neutral-400 transition-transform duration-200",
                  isExpanded ? "rotate-180" : "",
                )}
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </CardHeader>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <CardContent className="pt-0 border-t border-neutral-800">
          <div className="pt-5 space-y-6">
            {/* Upload zone */}
            <UploadSection slug={slug} onSaved={() => mutate(apiUrl)} />

            {/* Saved images */}
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-600" />
              </div>
            ) : images.length === 0 ? (
              <p className="text-sm text-neutral-500 text-center py-6 border border-dashed border-neutral-800 rounded-lg">
                No images yet — upload your first highlight above.
              </p>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">
                  Saved ({images.length})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {images.map((img) => (
                    <GalleryImageTile
                      key={img._id}
                      image={img}
                      onChanged={() => mutate(apiUrl)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Upload section — multi-file staging queue
// ---------------------------------------------------------------------------

interface UploadSectionProps {
  slug: string;
  onSaved: () => void;
}

function UploadSection({ slug, onSaved }: UploadSectionProps) {
  const [pendingItems, setPendingItems] = useState<PendingItem[]>([]);
  const baseId = useId();

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info !== "string") {
      const info = result.info;
      setPendingItems((prev) => [
        ...prev,
        {
          clientId: `${baseId}-${Date.now()}-${Math.random()}`,
          imageUrl: info.secure_url,
          publicId: info.public_id,
          caption: "",
          saving: false,
        },
      ]);
    }
  };

  const updateCaption = (clientId: string, caption: string) => {
    setPendingItems((prev) =>
      prev.map((item) =>
        item.clientId === clientId ? { ...item, caption } : item,
      ),
    );
  };

  const removePending = (clientId: string) => {
    setPendingItems((prev) =>
      prev.filter((item) => item.clientId !== clientId),
    );
  };

  const saveOne = async (clientId: string) => {
    const item = pendingItems.find((i) => i.clientId === clientId);
    if (!item) return;

    setPendingItems((prev) =>
      prev.map((i) =>
        i.clientId === clientId ? { ...i, saving: true, error: undefined } : i,
      ),
    );

    try {
      const res = await fetch("/api/experience/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceSlug: slug,
          imageUrl: item.imageUrl,
          publicId: item.publicId,
          caption: item.caption.trim() || undefined,
        }),
      });

      if (res.ok) {
        setPendingItems((prev) => prev.filter((i) => i.clientId !== clientId));
        onSaved();
      } else {
        const data = await res.json();
        setPendingItems((prev) =>
          prev.map((i) =>
            i.clientId === clientId
              ? { ...i, saving: false, error: data.error ?? "Save failed" }
              : i,
          ),
        );
      }
    } catch {
      setPendingItems((prev) =>
        prev.map((i) =>
          i.clientId === clientId
            ? { ...i, saving: false, error: "Network error" }
            : i,
        ),
      );
    }
  };

  const saveAll = async () => {
    await Promise.all(
      pendingItems.filter((i) => !i.saving).map((i) => saveOne(i.clientId)),
    );
  };

  const hasPending = pendingItems.length > 0;

  return (
    <div className="space-y-4">
      {/* Upload trigger */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-300">Add Images</p>
        {hasPending && (
          <span className="text-xs text-neutral-500">
            {pendingItems.length} pending
          </span>
        )}
      </div>

      <CldUploadWidget
        uploadPreset={
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
          "portfolio_gallery"
        }
        onSuccess={handleUploadSuccess}
        onError={(error) => console.error("Upload error:", error)}
        options={{
          folder: `portfolio/experience/${slug}`,
          multiple: true,
          maxFiles: 20,
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
          maxFileSize: 10000000,
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-neutral-700 hover:border-neutral-500 rounded-lg py-6 text-neutral-500 hover:text-neutral-400 transition-colors"
          >
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
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            <span className="text-sm font-medium">Click to upload images</span>
            <span className="text-xs">
              JPG, PNG, WebP — up to 10 MB each, up to 20 at once
            </span>
          </button>
        )}
      </CldUploadWidget>

      {/* Staging queue */}
      {hasPending && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">
              Review & add captions
            </p>
            <Button
              type="button"
              size="sm"
              onClick={saveAll}
              disabled={pendingItems.every((i) => i.saving)}
            >
              Save all ({pendingItems.length})
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {pendingItems.map((item) => (
              <PendingImageTile
                key={item.clientId}
                item={item}
                onCaptionChange={(c) => updateCaption(item.clientId, c)}
                onSave={() => saveOne(item.clientId)}
                onDiscard={() => removePending(item.clientId)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pending image tile (staged, not yet in DB)
// ---------------------------------------------------------------------------

interface PendingImageTileProps {
  item: PendingItem;
  onCaptionChange: (c: string) => void;
  onSave: () => void;
  onDiscard: () => void;
}

function PendingImageTile({
  item,
  onCaptionChange,
  onSave,
  onDiscard,
}: PendingImageTileProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-neutral-700 bg-neutral-900/40 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt="Pending upload preview"
          className="w-full h-full object-cover"
        />
        {item.saving && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
          </div>
        )}
      </div>

      {/* Caption + actions */}
      <div className="px-2 pb-2 flex flex-col gap-1.5">
        <input
          type="text"
          placeholder="Caption (optional)"
          value={item.caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          maxLength={500}
          disabled={item.saving}
          className="w-full px-2 py-1 text-xs bg-neutral-900 border border-neutral-700 rounded text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-500 disabled:opacity-50"
        />
        {item.error && <p className="text-xs text-red-400">{item.error}</p>}
        <div className="flex gap-1">
          <Button
            type="button"
            size="sm"
            onClick={onSave}
            disabled={item.saving}
            className="flex-1 text-xs h-7"
          >
            {item.saving ? "Saving…" : "Save"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onDiscard}
            disabled={item.saving}
            className="text-xs h-7 px-2"
            aria-label="Discard"
          >
            ✕
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Saved image tile — inline caption editing + delete
// ---------------------------------------------------------------------------

interface GalleryImageTileProps {
  image: ExperienceGalleryImage;
  onChanged: () => void;
}

function GalleryImageTile({ image, onChanged }: GalleryImageTileProps) {
  const [editingCaption, setEditingCaption] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isEditing = editingCaption !== null;

  const startEdit = () => setEditingCaption(image.caption ?? "");
  const cancelEdit = () => setEditingCaption(null);

  const saveCaption = async () => {
    if (editingCaption === null) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/experience/gallery/${image._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caption: editingCaption.trim() || undefined,
        }),
      });
      if (res.ok) {
        setEditingCaption(null);
        onChanged();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/experience/gallery/${image._id}`, {
        method: "DELETE",
      });
      if (res.ok) onChanged();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-neutral-800 bg-neutral-950 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.imageUrl}
          alt={image.caption ?? "Gallery image"}
          className="w-full h-full object-cover"
        />
        {deleting && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
          </div>
        )}
      </div>

      {/* Caption display / edit + actions */}
      <div className="px-2 pb-2 flex flex-col gap-1.5">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editingCaption}
              onChange={(e) => setEditingCaption(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveCaption();
                if (e.key === "Escape") cancelEdit();
              }}
              maxLength={500}
              autoFocus
              disabled={saving}
              placeholder="Caption (optional)"
              className="w-full px-2 py-1 text-xs bg-neutral-900 border border-neutral-600 rounded text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-400 disabled:opacity-50"
            />
            <div className="flex gap-1">
              <Button
                type="button"
                size="sm"
                onClick={saveCaption}
                disabled={saving}
                className="flex-1 text-xs h-7"
              >
                {saving ? "Saving…" : "Save"}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={cancelEdit}
                disabled={saving}
                className="text-xs h-7 px-2"
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Caption preview — always visible */}
            <p
              className={cn(
                "text-xs min-h-[1rem] line-clamp-2 cursor-pointer",
                image.caption
                  ? "text-neutral-400 hover:text-neutral-300"
                  : "text-neutral-600 italic hover:text-neutral-500",
              )}
              onClick={startEdit}
              title="Click to edit caption"
            >
              {image.caption ?? "Add caption…"}
            </p>

            <div className="flex gap-1">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={startEdit}
                className="flex-1 text-xs h-7"
              >
                Edit caption
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
                className="text-xs h-7 px-2"
                aria-label="Delete image"
              >
                {deleting ? (
                  "…"
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
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
