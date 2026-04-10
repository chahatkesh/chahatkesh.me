import { type Metadata } from "next";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import BtechCoursesClient from "./page.client";

export const metadata: Metadata = getSEOTags({
  title: "BTech at NIT Jalandhar",
  description: `Everything I studied during my B.Tech in Instrumentation and Control Engineering at NIT Jalandhar. Courses, syllabi, and semesters.`,
  openGraph: {
    title: `BTech Courses - ${config.appName}`,
    description: `A complete record of my undergraduate coursework. ICE at NIT Jalandhar, semester by semester.`,
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
