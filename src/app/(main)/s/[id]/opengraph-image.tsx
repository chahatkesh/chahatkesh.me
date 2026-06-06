import { notFound } from "next/navigation";
import mongoose from "mongoose";
import dbConnect from "~/lib/mongodb";
import SharedFile from "~/models/shared-file";
import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";
import config from "~/config";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

export default async function Image({ params }: Props) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await dbConnect();
  const file = await SharedFile.findById(id).lean<{
    fileName: string;
    format: string;
    bytes: number;
  }>();

  if (!file) {
    notFound();
  }

  const format = (file.format || "").toUpperCase();
  const tags = [format, formatBytes(file.bytes)].filter(Boolean);

  return generateOGImageResponse({
    title: file.fileName,
    subtitle: format ? `${format} file` : "Shared file",
    description: `A file shared by ${config.appName}.`,
    badge: "Shared file",
    tags,
  });
}
