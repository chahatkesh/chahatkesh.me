import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Changelog",
    subtitle: "What's New, Improved & Fixed",
    description:
      "A monthly log of every feature, refinement, and fix shipped to this portfolio.",
    badge: "Changelog",
    tags: ["Release Notes", "Updates", "Features", "Fixes"],
  });
}
