import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Reading",
    subtitle: "Notes from books and ideas",
    description:
      "Non-fiction, systems thinking, psychology, and startup stories that shape how I build.",
    badge: "Reading",
    tags: ["Books", "Psychology", "Systems Thinking"],
  });
}
