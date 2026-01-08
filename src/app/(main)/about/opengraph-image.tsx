import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "About Me",
    subtitle: "Chahat Kesharwani",
    description:
      "Learn more about my journey as a Full Stack Developer, my passion for UI/UX design, and the experiences that shaped my career.",
    badge: "About",
    tags: ["Developer", "Designer", "Problem Solver"],
  });
}
