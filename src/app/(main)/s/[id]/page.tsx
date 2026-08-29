import { type Metadata } from "next";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { Download, ExternalLink, File as FileIcon } from "lucide-react";
import dbConnect from "~/lib/mongodb";
import SharedFile from "~/models/shared-file";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { PageHeader, MotionDiv } from "~/components/shared";
import { buttonVariants } from "~/components/ui";
import { cn } from "~/lib/utils";
import { formatRelativeDate } from "~/lib/date-utils";
import config from "~/config";

export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{ id: string }>;
};

type SharedFileLean = {
  fileName: string;
  fileUrl: string;
  format: string;
  bytes: number;
  resourceType: string;
  createdAt: string;
};

const IMAGE_FORMATS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "svg",
  "avif",
  "bmp",
];

async function getFile(id: string): Promise<SharedFileLean | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  await dbConnect();
  return SharedFile.findById(id).lean<SharedFileLean>();
}

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const file = await getFile(id);

  if (!file) {
    return getSEOTags({ title: "File not found", noIndex: true });
  }

  const format = (file.format || "").toUpperCase();
  const formattedSize = formatBytes(file.bytes);
  const description =
    format && formattedSize
      ? `${format} · ${formattedSize} — shared by ${config.appName}.`
      : `A file shared by ${config.appName}.`;

  return getSEOTags({
    title: file.fileName,
    description,
    canonicalUrlRelative: `/s/${id}`,
    noIndex: true,
    openGraph: {
      title: file.fileName,
      description,
    },
  });
}

export default async function SharedFilePage({ params }: Params) {
  const { id } = await params;
  const file = await getFile(id);

  if (!file) notFound();

  // Include the filename as the last path segment so the browser tab title
  // shows the real name instead of "raw" when previewing/opening/downloading.
  const rawUrl = `/api/files/${id}/raw/${encodeURIComponent(file.fileName)}`;
  const downloadUrl = `${rawUrl}?dl=1`;
  const format = (file.format || "").toLowerCase();
  const isImage =
    file.resourceType === "image" && IMAGE_FORMATS.includes(format);
  const isPdf = format === "pdf";

  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Shared file", url: `/s/${id}` },
      ])}
      <PageHeader
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Shared file", url: `/s/${id}` },
        ]}
        title={file.fileName}
        titleClassName="break-words text-xl"
        subtitle={`A shared ${format ?? "file"}. Uploaded ${formatRelativeDate(file.createdAt)}.`}
      />

      {/* Preview */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="overflow-hidden rounded-xl border border-border bg-card/40">
          {isImage ? (
            <div className="flex items-center justify-center p-4 sm:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={rawUrl}
                alt={file.fileName}
                className="max-h-[68vh] w-auto rounded-lg object-contain"
              />
            </div>
          ) : isPdf ? (
            <iframe
              src={rawUrl}
              title={file.fileName}
              className="h-[72vh] w-full border-0 bg-white"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-card">
                <FileIcon className="size-7 text-muted-foreground" />
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Preview isn&apos;t available for this file type. Use the buttons
                below to open or download it.
              </p>
            </div>
          )}
        </div>
      </MotionDiv>

      {/* Actions */}
      <MotionDiv
        className="flex flex-row gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <a
          href={rawUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "lg" }),
            "flex-1 gap-2 sm:flex-none sm:px-6",
          )}
        >
          <ExternalLink className="size-4" />
          Open file
        </a>
        <a
          href={downloadUrl}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "flex-1 gap-2 sm:flex-none sm:px-6",
          )}
        >
          <Download className="size-4" />
          Download
        </a>
      </MotionDiv>
    </div>
  );
}
