import { notFound } from "next/navigation";
import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";
import { OG_MAX_TAGS } from "~/constants";
import { clipAtWord, STACK_TEXT_LIMITS } from "~/lib/page-header-subtitle";
import {
  getAllStacks,
  getStackBySlug,
  getStackCategoryLabel,
  getStackUsage,
} from "~/lib/stack-utils";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const stack = getStackBySlug(slug);

  if (!stack) {
    notFound();
  }

  const usage = getStackUsage(stack.name);
  const tags = [
    getStackCategoryLabel(stack.category),
    ...(usage.projectCount > 0 ? [`${usage.projectCount} projects`] : []),
    ...(usage.experienceCount > 0 ? [`${usage.experienceCount} roles`] : []),
  ].slice(0, OG_MAX_TAGS);

  return generateOGImageResponse({
    title: stack.name,
    subtitle: stack.subtitle,
    description: clipAtWord(stack.description, STACK_TEXT_LIMITS.ogDescription),
    badge: "Stack",
    tags,
  });
}

export async function generateStaticParams() {
  return getAllStacks().map((stack) => ({
    slug: stack.slug,
  }));
}
