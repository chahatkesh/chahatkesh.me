import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Videos",
    subtitle: "Tutorials, talks & builds",
    description:
      "Developer tutorials, tech talks, and behind-the-scenes of shipping real products.",
    badge: "Videos",
    tags: ["YouTube", "Tutorials"],
  });
}
