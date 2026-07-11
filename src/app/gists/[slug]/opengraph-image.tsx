import { notFound } from "next/navigation";
import dbConnect from "~/lib/mongodb";
import Gist from "~/models/gist";
import { markdownToSnippet } from "~/lib/gist-utils";
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

export default async function Image({ params }: Props) {
  const { slug } = await params;

  await dbConnect();
  const gist = await Gist.findOne({ slug }).lean<GistLean>();

  if (!gist) {
    notFound();
  }

  return generateOGImageResponse({
    title: gist.title,
    subtitle: "Markdown gist",
    description: markdownToSnippet(gist.markdownContent),
    badge: "Gist",
    tags: ["Gist", "Markdown"],
  });
}
