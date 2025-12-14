import { Metadata } from "next";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import BtechCoursesClient from "./page.client";

export const metadata: Metadata = getSEOTags({
  title: "BTech Course Details",
  description: `Explore ${config.appName}'s BTech journey at NIT Jalandhar. View detailed course information, syllabi, and academic progression across all semesters.`,
  openGraph: {
    title: `BTech Courses - ${config.appName}`,
    description: `Comprehensive overview of courses, syllabi, and academic journey throughout the undergraduate BTech degree in Instrumentation and Control Engineering.`,
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
