import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";
import config from "~/config";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "The Record",
    subtitle: "A calibrated map of work, writing, and life",
    description: `Every dated thing on ${config.appName}, placed with care.`,
    badge: "Timeline",
    tags: ["Work", "Projects", "Writing", "Life"],
  });
}
