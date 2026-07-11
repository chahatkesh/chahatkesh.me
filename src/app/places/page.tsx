import "maplibre-gl/dist/maplibre-gl.css";

import { type Metadata } from "next";
import { PlacesMap } from "~/components/features/place";
import { getSEOTags } from "~/lib/seo";
import config from "~/config";

export const metadata: Metadata = getSEOTags({
  title: "Places",
  description:
    "An interactive map of places I have visited, with notes and timelines behind each pin.",
  canonicalUrlRelative: "/places",
  openGraph: {
    title: `Places | ${config.appName}`,
    description:
      "A minimal, interactive map of places I have visited, each pin carrying a short memory.",
  },
});

export default function PlacesPage() {
  return <PlacesMap />;
}
