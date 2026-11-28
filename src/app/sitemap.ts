import { type MetadataRoute } from "next";
import { getSitemap } from "~/lib/sitemap-entries";

// /sitemap renders this same array. Add URLs in getSitemapSections only.
export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getSitemap();
}
