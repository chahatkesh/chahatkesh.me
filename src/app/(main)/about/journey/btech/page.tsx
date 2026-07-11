import { type Metadata } from "next";
import dynamic from "next/dynamic";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";

const BtechCoursesClient = dynamic(() => import("./page.client"), {
  loading: () => (
    <div className="mt-8 space-y-6" aria-hidden="true">
      <div className="h-8 w-64 animate-pulse rounded bg-muted/40" />
      <div className="h-96 animate-pulse rounded-lg bg-muted/40" />
    </div>
  ),
});

export const metadata: Metadata = getSEOTags({
  title: "BTech at NIT Jalandhar",
  description:
    "Every course and syllabus from my undergraduate degree in Instrumentation and Control Engineering — semester by semester.",
  openGraph: {
    title: `BTech at NIT Jalandhar — ${config.appName}`,
    description:
      "Every course and syllabus from my undergraduate degree — semester by semester.",
  },
  canonicalUrlRelative: "/about/journey/btech",
});

const BtechCoursesPage = () => {
  return (
    <>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Me", url: "/about" },
        { name: "Journey", url: "/about/journey" },
        { name: "BTech Courses", url: "/about/journey/btech" },
      ])}
      <BtechCoursesClient />
    </>
  );
};

export default BtechCoursesPage;
