import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Gym",
    subtitle: "Discipline outside the terminal",
    description:
      "Training routines, consistency lessons, and how physical discipline sharpens my engineering focus.",
    badge: "Gym",
    tags: ["Training", "Consistency", "Discipline"],
  });
}
