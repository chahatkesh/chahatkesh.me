import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Places",
    subtitle: "Pins on the map",
    description: "Places I've visited — dates and short notes on each pin.",
    badge: "Places",
    tags: ["Map", "Travel"],
  });
}
