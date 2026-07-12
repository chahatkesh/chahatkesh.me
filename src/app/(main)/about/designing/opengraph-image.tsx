import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Designing",
    subtitle: "Visual thinking in progress",
    description:
      "UI explorations, Figma experiments, and design notes on making software feel intentional.",
    badge: "Design",
    tags: ["Figma", "UI", "Product Design"],
  });
}
