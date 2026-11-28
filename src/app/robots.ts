import { type MetadataRoute } from "next";
import config from "~/config";

const PRIVATE_PATHS = ["/api/", "/admin/", "/private/"];

/**
 * Search and user-triggered retrieval crawlers. Each gets its own group so a
 * later change to the `*` rule cannot quietly lock them out. A crawler uses
 * only its most specific group, so every group repeats the private-path block.
 *
 * Training crawlers (GPTBot, Google-Extended, CCBot, Bytespider, ClaudeBot)
 * are not given a special group. They follow `*`: public pages are readable,
 * private routes are not. They are not search crawlers, and blocking them
 * would not change how this site is retrieved by AI search.
 */
const SEARCH_AGENTS = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = `https://${config.domainName}`;
  const publicAccess = {
    allow: "/",
    disallow: PRIVATE_PATHS,
  };

  return {
    rules: [
      { userAgent: "*", ...publicAccess },
      ...SEARCH_AGENTS.map((userAgent) => ({ userAgent, ...publicAccess })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
