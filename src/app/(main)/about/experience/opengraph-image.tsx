import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Professional Experience",
    subtitle: "Career Journey & Achievements",
    description:
      "Explore my professional journey through various roles in full-stack development, UI/UX design, and entrepreneurship.",
    badge: "Experience",
    tags: ["iHub AwaDH", "AnnamAI", "Full Stack", "UI/UX"],
  });
}
