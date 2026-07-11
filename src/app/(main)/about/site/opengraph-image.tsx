import { generateOGImageResponse, OG_IMAGE_SIZE } from "~/lib/og-template";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return generateOGImageResponse({
    title: "About This Site",
    subtitle: "How chahatkesh.me is built",
    description:
      "Stack, features, and design decisions behind this portfolio — Next.js, React, TypeScript, MongoDB.",
    badge: "Site Info",
    tags: ["Next.js 15", "React 19", "TypeScript", "MongoDB"],
  });
}
