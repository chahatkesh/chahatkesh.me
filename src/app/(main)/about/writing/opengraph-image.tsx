import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Writing",
    subtitle: "Ideas worth carrying forward",
    description:
      "Lessons, open questions, and reflections shaped by building, reading, work, and experience.",
    badge: "Writing",
    tags: ["Learning", "Building", "Reflection"],
  });
}
