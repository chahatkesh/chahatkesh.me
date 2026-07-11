import "maplibre-gl/dist/maplibre-gl.css";

import { type Metadata } from "next";
import { PlacesMap } from "~/components/features/place";
import { getSEOTags } from "~/lib/seo";
import config from "~/config";

export const metadata: Metadata = getSEOTags({
  title: "Places",
  description: "Places I've visited — dates and short notes on each pin.",
  canonicalUrlRelative: "/places",
  openGraph: {
    title: `Places — ${config.appName}`,
    description: "Pins on the map — places I've visited with dates and notes.",
  },
});

export default function PlacesPage() {
  return <PlacesMap />;
}
