import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Sitemap",
    subtitle: "Every public URL",
    description:
      "The same pages search engines get from sitemap.xml, listed for people.",
    badge: "Sitemap",
  });
}
