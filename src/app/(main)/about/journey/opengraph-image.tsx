import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "My Journey",
    subtitle: "Timeline & Milestones",
    description:
      "Follow my journey through education, projects, and professional growth in the world of software development.",
    badge: "Journey",
    tags: ["Timeline", "Growth", "Milestones"],
  });
}
