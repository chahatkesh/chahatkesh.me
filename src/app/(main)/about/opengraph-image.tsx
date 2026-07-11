import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "About",
    subtitle: "Engineer · Builder · Explorer",
    description:
      "I build AI-powered products, ship production systems, and care about craft across product, design, and engineering.",
    badge: "About",
    tags: ["Layr", "Zenbase", "NIT Jalandhar"],
  });
}
