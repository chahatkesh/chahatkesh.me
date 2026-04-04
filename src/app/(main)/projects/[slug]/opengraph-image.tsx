import { projects } from "~/data/projects";
import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";
import { notFound } from "next/navigation";
import { OG_MAX_TAGS } from "~/constants";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return generateOGImageResponse({
    title: project.title,
    subtitle: project.tagline,
    description: project.description,
    badge: "Project",
    tags: project.stacks.slice(0, OG_MAX_TAGS),
  });
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
