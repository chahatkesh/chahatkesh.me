import { notFound } from "next/navigation";
import { generateWritingOGImage } from "~/lib/writing-og";
import { OG_IMAGE_SIZE } from "~/lib/og-template";
import { getWritingEntries, getWritingEntry } from "~/lib/writing";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const entries = await getWritingEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const entry = await getWritingEntry(slug);

  if (!entry || entry.draft) {
    notFound();
  }

  return generateWritingOGImage({
    slug: entry.slug,
    title: entry.title,
    subtitle: entry.subtitle,
  });
}
