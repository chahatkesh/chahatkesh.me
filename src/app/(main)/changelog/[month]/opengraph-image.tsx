import { notFound } from "next/navigation";
import { monthlyChangelog, getChangelogEntry } from "~/data/changelog";
import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";
import { formatMonth, TYPE_CONFIG, countByType } from "../_shared";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type Props = {
  params: Promise<{ month: string }>;
};

export async function generateStaticParams() {
  return monthlyChangelog.map((entry) => ({ month: entry.month }));
}

export default async function Image({ params }: Props) {
  const { month } = await params;
  const entry = getChangelogEntry(month);

  if (!entry) {
    notFound();
  }

  const tags = countByType(entry.changes).map(
    ({ type, count }) => `${count} ${TYPE_CONFIG[type].label}`,
  );

  return generateOGImageResponse({
    title: entry.title,
    subtitle: formatMonth(entry.month),
    description: entry.summary,
    badge: "Changelog",
    tags,
  });
}
