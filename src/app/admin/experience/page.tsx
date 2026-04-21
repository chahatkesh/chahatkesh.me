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
import { experiences, type Experience } from "~/data/experience";
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

interface PendingItem {
  clientId: string;
  imageUrl: string;
  publicId: string;
  caption: string;
  saving: boolean;
  error?: string;
}

/** A company with one or more roles, sharing a single media gallery */
interface CompanyGroup {
  /** The slug used to key the gallery (companyId for multi-role, else experience slug) */
  gallerySlug: string;
  employer: string;
  logo: Experience["logo"];
  roles: Pick<
    Experience,
    "slug" | "role" | "type" | "start_date" | "end_date"
  >[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Group experiences by employer.
 * Gallery is keyed by companyId when present (multi-role companies),
 * otherwise by the single experience slug — preserving backward compatibility.
 */
function groupExperiencesByCompany(exps: Experience[]): CompanyGroup[] {
  const map = new Map<string, CompanyGroup>();

  for (const exp of exps) {
    const key = exp.employer;
    if (!map.has(key)) {
      // For multi-role companies, companyId is the shared gallery key.
      // For single-role, fall back to the experience slug (backward-compatible).
      const gallerySlug = exp.companyId ?? exp.slug;
      map.set(key, {
        gallerySlug,
        employer: exp.employer,
        logo: exp.logo,
        roles: [],
      });
    }
    map.get(key)!.roles.push({
      slug: exp.slug,
      role: exp.role,
      type: exp.type,
      start_date: exp.start_date,
      end_date: exp.end_date,
    });
  }

  return Array.from(map.values());
}

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
  const companies = groupExperiencesByCompany(experiences);

  const toggleExpanded = (gallerySlug: string) =>
    setExpandedSlug((prev) => (prev === gallerySlug ? null : gallerySlug));

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
          Upload and manage highlight images per company. Multiple roles at the
          same company share one gallery.
        </p>
      </MotionDiv>

      <MotionDiv
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {companies.map((company) => (
          <CompanyGalleryCard
            key={company.gallerySlug}
            company={company}
            isExpanded={expandedSlug === company.gallerySlug}
            onToggle={() => toggleExpanded(company.gallerySlug)}
          />
        ))}
      </MotionDiv>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Per-company accordion card
// ---------------------------------------------------------------------------

interface CompanyGalleryCardProps {
  company: CompanyGroup;
  isExpanded: boolean;
  onToggle: () => void;
}

function CompanyGalleryCard({
  company,
  isExpanded,
  onToggle,
}: CompanyGalleryCardProps) {
  const { gallerySlug, employer, logo, roles } = company;
  const apiUrl = API_ROUTES.EXPERIENCE_GALLERY(gallerySlug);

  const { data, isLoading } = useSWR<ExperienceGalleryApiResponse>(
    isExpanded ? apiUrl : null,
    fetcher,
  );

  const images = data?.data ?? [];
  const logoSrc = typeof logo === "string" ? logo : logo.src;
  const isMultiRole = roles.length > 1;

  return (
    <Card className="overflow-hidden border-border bg-background">
      {/* Collapsible header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
        aria-expanded={isExpanded}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="mt-0.5 flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc}
                alt={`${employer} logo`}
                className="h-full w-full object-contain p-1"
              />
            </div>

            {/* Company + roles */}
            <div className="min-w-0 flex-1">
              <CardTitle className="truncate text-base text-foreground">
                {employer}
              </CardTitle>

              {isMultiRole ? (
                /* Multiple roles — list them all */
                <ul className="mt-1 space-y-0.5">
                  {roles.map((r) => (
                    <li key={r.slug} className="flex items-center gap-1.5">
                      <span className="h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/50" />
                      <CardDescription className="truncate text-xs text-muted-foreground">
                        {r.role}
                        <span className="ml-1.5 text-muted-foreground/50">
                          {r.start_date} – {r.end_date}
                        </span>
                      </CardDescription>
                    </li>
                  ))}
                </ul>
              ) : (
                /* Single role — show inline */
                <CardDescription className="mt-0.5 truncate text-sm text-muted-foreground">
                  {roles[0].role}
                  <span className="ml-1.5 text-muted-foreground/50 text-xs">
                    {roles[0].start_date} – {roles[0].end_date}
                  </span>
                </CardDescription>
              )}
            </div>

            {/* Right side */}
            <div className="flex flex-shrink-0 items-center gap-3">
              {isExpanded && images.length > 0 && (
                <span className="hidden items-center rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground sm:inline-flex">
                  {images.length} image{images.length !== 1 ? "s" : ""}
                </span>
              )}
              {!isExpanded && (
                <span className="text-xs text-muted-foreground/70">Manage</span>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-200",
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
        <CardContent className="border-t border-border pt-0">
          <div className="space-y-6 pt-5">
            {isMultiRole && (
              <p className="rounded-md border border-border bg-card/50 px-3 py-2 text-xs text-muted-foreground/70">
                Images uploaded here are shared across all{" "}
                <span className="text-foreground/80">{employer}</span> roles.
              </p>
            )}

            {/* Upload zone */}
            <UploadSection
              gallerySlug={gallerySlug}
              onSaved={() => mutate(apiUrl)}
            />

            {/* Saved images */}
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-muted-foreground/30" />
              </div>
            ) : images.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border py-6 text-center text-sm text-muted-foreground/70">
                No images yet — upload your first highlight above.
              </p>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                  Saved ({images.length})
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
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
  gallerySlug: string;
  onSaved: () => void;
}

function UploadSection({ gallerySlug, onSaved }: UploadSectionProps) {
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
          experienceSlug: gallerySlug,
          imageUrl: item.imageUrl,
          publicId: item.publicId,
          caption: item.caption.trim() || undefined,
        }),
      });

      if (res.ok) {
        setPendingItems((prev) => prev.filter((i) => i.clientId !== clientId));
        onSaved();
      } else {
        const errData = await res.json();
        setPendingItems((prev) =>
          prev.map((i) =>
            i.clientId === clientId
              ? { ...i, saving: false, error: errData.error ?? "Save failed" }
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
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground/80">Add Images</p>
        {hasPending && (
          <span className="text-xs text-muted-foreground/70">
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
          folder: `portfolio/experience/${gallerySlug}`,
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
            className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-6 text-muted-foreground/70 transition-colors hover:border-muted-foreground/40 hover:text-muted-foreground"
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

      {hasPending && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
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

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
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
    <div className="flex flex-col gap-2 overflow-hidden rounded-lg border border-border bg-card/40">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt="Pending upload preview"
          className="h-full w-full object-cover"
        />
        {item.saving && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-white" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 px-2 pb-2">
        <input
          type="text"
          placeholder="Caption (optional)"
          value={item.caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          maxLength={500}
          disabled={item.saving}
          className="w-full rounded border border-border bg-card px-2 py-1 text-xs text-foreground/90 placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none disabled:opacity-50"
        />
        {item.error && <p className="text-xs text-red-400">{item.error}</p>}
        <div className="flex gap-1">
          <Button
            type="button"
            size="sm"
            onClick={onSave}
            disabled={item.saving}
            className="h-7 flex-1 text-xs"
          >
            {item.saving ? "Saving…" : "Save"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onDiscard}
            disabled={item.saving}
            className="h-7 px-2 text-xs"
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
    <div className="flex flex-col gap-2 overflow-hidden rounded-lg border border-border bg-background">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.imageUrl}
          alt={image.caption ?? "Gallery image"}
          className="h-full w-full object-cover"
        />
        {deleting && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-white" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 px-2 pb-2">
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
              className="w-full rounded border border-muted-foreground/40 bg-card px-2 py-1 text-xs text-foreground/90 placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none disabled:opacity-50"
            />
            <div className="flex gap-1">
              <Button
                type="button"
                size="sm"
                onClick={saveCaption}
                disabled={saving}
                className="h-7 flex-1 text-xs"
              >
                {saving ? "Saving…" : "Save"}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={cancelEdit}
                disabled={saving}
                className="h-7 px-2 text-xs"
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p
              className={cn(
                "min-h-[1rem] cursor-pointer text-xs line-clamp-2",
                image.caption
                  ? "text-muted-foreground hover:text-foreground/80"
                  : "italic text-muted-foreground/50 hover:text-muted-foreground/70",
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
                className="h-7 flex-1 text-xs"
              >
                Edit caption
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
                className="h-7 px-2 text-xs"
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
