import { notFound } from "next/navigation";
import dbConnect from "~/lib/mongodb";
import Diagram from "~/models/diagram";
import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type DiagramLean = {
  title: string;
  slug: string;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;

  await dbConnect();
  const diagram = await Diagram.findOne({ slug }).lean<DiagramLean>();

  if (!diagram) {
    notFound();
  }

  return generateOGImageResponse({
    title: diagram.title,
    subtitle: "Shared Mermaid diagram",
    description: `${diagram.title} — interactive Mermaid diagram from chahatkesh.me`,
    badge: "Diagram",
    tags: ["Mermaid", "Public"],
  });
}
