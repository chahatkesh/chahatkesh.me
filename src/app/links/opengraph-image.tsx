import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Links",
    subtitle: "Every place I exist online",
    description:
      "GitHub, socials, resume, and ways to reach me — pick your platform.",
    badge: "Links",
    tags: ["GitHub", "LinkedIn", "Twitter", "Email"],
  });
}
