import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Quick Links",
    subtitle: "Connect with Chahat Kesharwani",
    description:
      "Find all my social profiles, projects, and contact information in one place.",
    badge: "Links",
    tags: ["GitHub", "LinkedIn", "Twitter", "Email"],
  });
}
