import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";
import config from "~/config";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Resume",
    subtitle: config.appDesignation,
    description:
      "CV of Chahat Kesharwani — engineer and co-founder of Layr. Experience, projects, and skills.",
    badge: "Resume",
    tags: ["Layr", "Engineer", "Full Stack", "AI Products"],
  });
}
