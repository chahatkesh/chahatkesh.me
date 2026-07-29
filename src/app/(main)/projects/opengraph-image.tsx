import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Projects",
    subtitle: "Things I've built and shipped",
    description:
      "Web apps, tools, and experiments — from AI products to infrastructure and open-source builds.",
    badge: "Projects",
    tags: ["Next.js", "React", "TypeScript", "Full Stack"],
  });
}
