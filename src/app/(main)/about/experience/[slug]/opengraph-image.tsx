import { experiences } from "~/data/experience";
import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";
import { notFound } from "next/navigation";
import { BRAND_ACCENT_HEX } from "~/constants";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const experience = experiences.find((exp) => exp.slug === slug);

  if (!experience) {
    notFound();
  }

  return generateOGImageResponse({
    title: experience.role,
    subtitle: experience.employer,
    description: experience.tagline,
    badge: experience.type,
    tags: experience.techStack?.slice(0, 5) || [],
    accentColor: BRAND_ACCENT_HEX,
  });
}

export async function generateStaticParams() {
  return experiences.map((experience) => ({
    slug: experience.slug,
  }));
}
