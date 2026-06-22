import { type MetadataRoute } from "next";
import config from "~/config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = `https://${config.domainName}`;

  // A single "*" group keeps the rules unambiguous. Per the robots protocol a
  // crawler obeys only its most-specific matching group, so per-bot groups that
  // omit a path (as the old Googlebot/Bingbot groups did) silently re-allow it.
  // Notes:
  // - We intentionally do NOT block "/_next/" — that hides JS/CSS from crawlers
  //   and prevents correct rendering/scoring.
  // - We do NOT block "/s/" (shared files). Those pages are kept out of the
  //   index via a page-level `noindex` tag instead, so social crawlers can still
  //   fetch them to render link previews (opengraph-image).
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
