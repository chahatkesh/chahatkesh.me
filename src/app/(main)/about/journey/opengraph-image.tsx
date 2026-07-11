import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "My Storyline",
    subtitle: "Not just the wins",
    description:
      "Projects, hackathons, travel, community, and the moments that shaped how I build.",
    badge: "Journey",
  });
}
