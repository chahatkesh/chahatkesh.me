import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "About Me",
    subtitle: "Chahat Kesharwani",
    description:
      "Engineer, builder, and explorer. Building AI-powered products, shipping fast, and caring deeply about craft. The story behind the code.",
    badge: "About",
    tags: ["Engineer", "Builder", "Explorer"],
  });
}
