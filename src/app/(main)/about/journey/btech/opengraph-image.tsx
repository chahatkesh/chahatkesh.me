import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "BTech at NIT Jalandhar",
    subtitle: "Instrumentation & Control",
    description:
      "Every course and syllabus from my undergraduate degree — semester by semester.",
    badge: "Education",
    tags: ["ICE", "NIT Jalandhar", "Coursework"],
  });
}
