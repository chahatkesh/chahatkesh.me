import { type Metadata } from "next";
import { notFound } from "next/navigation";
import config from "~/config";
import { getSEOTags } from "~/lib/seo";
import { ResumeRedirect } from "./resume-redirect";

export const metadata: Metadata = getSEOTags({
  title: "Resume",
  description:
    "Resume of Chahat Kesharwani — engineer and co-founder of Layr. Experience building AI-powered products across product, design, and engineering.",
  openGraph: {
    title: `Resume — ${config.appName}`,
    description:
      "Engineer · Builder · Explorer. CV covering experience at Layr, Zenbase, and beyond.",
  },
  canonicalUrlRelative: "/resume",
});

export default function ResumePage() {
  const resumeUrl = config.resumeUrl;

  if (!resumeUrl) {
    notFound();
  }

  return <ResumeRedirect href={resumeUrl} />;
}
