import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Experience",
    subtitle: "Where I've shipped",
    description:
      "Founding Engineer at Zenbase. Former EIR at Annam.ai / IIT Ropar. Roles, builds, and what came out of them.",
    badge: "Experience",
    tags: ["Zenbase", "Annam.ai", "Level SuperMind", "NITJ"],
  });
}
