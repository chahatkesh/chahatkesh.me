import type { YouTubeVideo } from "~/data/youtube";

/** Curated page-header subtitles for video detail pages (≤72 chars). */
const VIDEO_PAGE_SUBTITLES: Record<string, string> = {
  "layr-founders-video-yc-fall-2026-application-8OnHTRBT85k":
    "Our one-minute founders video for the YC Fall 2026 application.",
  "layr-founders-video-yc-summer-2026-application-VHDx_8i3it8":
    "Our one-minute founders video for the YC Summer 2026 application.",
  "layr-product-demo-from-slack-jira-calls-to-evidence-backed-specs-tT1EGKq0d28":
    "Know what to build next — from evidence, not noise.",
  "simplify-your-bookmark-management-with-webmark-ubd_wQAHtjw":
    "A modern bookmark manager with categories, import, and AI sorting.",
  "minor-project-intelligent-pesticide-sprinkling-system-7b81tJgCdBM":
    "IoT and AI that sprays pesticide by tomato-leaf infection severity.",
  "building-openlearn-behind-the-scenes-of-development-part-1-Y7yZ_eYQ5Lo":
    "Behind the scenes of building OpenLearn — part one.",
  "kisaanmithraa-empowering-farmers-with-ai-community-smart-markets-gsc-2025-demo-rA6qcsEjAWc":
    "An AI mobile app for farmers — markets, forecasts, and community.",
  "openlearns-first-twitter-space-cohort-learning-leagues-community-at-nit-jalandha-lyXBpUsi7Us":
    "OpenLearn's debut X Space on cohorts, leagues, and community.",
  "building-satark-ai-ai-powered-legal-assistant-qCr25SQ8Zg8":
    "Building an AI legal assistant in 24 hours at Code Kshetra 2.0.",
  "servolend-ai-powered-los-team-rio-siLfjw4gTPA":
    "An AI-powered loan origination platform built at HackTU.",
};

export function getVideoPageSubtitle(video: YouTubeVideo): string {
  return VIDEO_PAGE_SUBTITLES[video.slug] ?? video.title;
}
