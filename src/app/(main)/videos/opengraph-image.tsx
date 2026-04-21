import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Videos",
    subtitle: "Tutorials, Talks & Builds",
    description:
      "Watch developer tutorials, tech talks, and behind-the-scenes of building real products.",
    badge: "Videos",
    tags: ["YouTube", "Tutorials", "Developer", "Tech"],
  });
}
