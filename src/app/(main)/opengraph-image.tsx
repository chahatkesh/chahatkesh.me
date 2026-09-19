import config from "~/config";
import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: config.appName,
    subtitle: config.appDesignation,
    description:
      "I build AI-powered products, ship production-grade systems, and contribute across product, design, and engineering.",
    badge: "Portfolio",
  });
}
