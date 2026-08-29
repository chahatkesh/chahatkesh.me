import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";
import config from "~/config";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "What I Build With",
    subtitle: "Languages, frameworks, and tools across projects and roles",
    description: `Explore the toolkit behind ${config.appName}'s work.`,
    badge: "Stack",
    tags: ["TypeScript", "React", "Next.js", "Node.js"],
  });
}
