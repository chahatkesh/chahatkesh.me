import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Projects",
    subtitle: "Building Innovative Solutions",
    description:
      "Explore my portfolio of web applications, tools, and innovative projects built with modern technologies.",
    badge: "Projects",
    tags: ["Next.js", "React", "TypeScript", "Full Stack"],
  });
}
