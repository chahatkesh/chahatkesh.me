import { notFound } from "next/navigation";
import dbConnect from "~/lib/mongodb";
import Gist from "~/models/gist";
import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type GistLean = {
  title: string;
  slug: string;
  markdownContent: string;
};

function markdownToSnippet(markdown: string): string {
  const snippet = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~\-|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return snippet || "Shared markdown document";
}

export default async function Image({ params }: Props) {
  const { slug } = await params;

  await dbConnect();
  const gist = await Gist.findOne({ slug }).lean<GistLean>();

  if (!gist) {
    notFound();
  }

  return generateOGImageResponse({
    title: gist.title,
    subtitle: "Shared document",
    description: markdownToSnippet(gist.markdownContent),
    badge: "Gist",
    tags: ["Markdown", "Public"],
  });
}
