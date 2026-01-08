import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "BTech Course Details",
    subtitle: "NIT Jalandhar",
    description:
      "Comprehensive overview of courses, syllabi, and academic journey throughout the BTech degree in Instrumentation and Control Engineering.",
    badge: "Education",
    tags: ["BTech", "NIT Jalandhar", "ICE", "Coursework"],
  });
}
