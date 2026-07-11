import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "Gallery",
    subtitle: "Moments that mattered",
    description:
      "Trips, meet-ups, hackathons, and places — captured as they happened.",
    badge: "Gallery",
  });
}
