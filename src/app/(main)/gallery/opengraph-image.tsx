import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Gallery",
    subtitle: "Visual Moments & Memories",
    description:
      "Browse through a curated collection of photos, screenshots, and visual highlights from my journey.",
    badge: "Gallery",
    tags: ["Photos", "Moments", "Memories"],
  });
}
