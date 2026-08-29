import { type Metadata } from "next";
import dynamic from "next/dynamic";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { Skeleton } from "~/components/ui";

function BtechCoursesFallback() {
  return (
    <div className="space-y-8" aria-busy="true">
      <div className="mb-2 space-y-4">
        <div className="flex flex-col items-center space-y-3 py-10">
          <Skeleton className="h-8 w-56 sm:h-9 sm:w-72" />
          <Skeleton className="h-4 w-72 max-w-full sm:h-5 sm:w-96" />
          <Skeleton className="mt-1 h-3 w-48" />
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-8 w-full md:w-56" />
      </div>

      <div className="space-y-12">
        {Array.from({ length: 3 }).map((_, semester) => (
          <div key={semester} className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, course) => (
                <Skeleton key={course} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const BtechCoursesClient = dynamic(() => import("./page.client"), {
  loading: () => <BtechCoursesFallback />,
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
