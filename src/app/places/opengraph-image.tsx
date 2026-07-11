import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Places",
    subtitle: "Visited Pins Across The Map",
    description:
      "A minimal interactive map of places I have visited, with dates and short notes on each pin.",
    badge: "Places",
    tags: ["Map", "Travel", "Pins", "Notes"],
  });
}
