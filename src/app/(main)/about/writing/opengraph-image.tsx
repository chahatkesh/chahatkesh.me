import { generateWritingOGImage } from "~/lib/writing-og";
import { OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateWritingOGImage({
    slug: "writing",
    title: "Writing",
    subtitle:
      "Lessons, open questions, and reflections worth carrying forward.",
  });
}
