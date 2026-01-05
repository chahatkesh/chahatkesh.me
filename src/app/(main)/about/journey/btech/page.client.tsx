"use client";

import { useState } from "react";
import { MotionDiv } from "~/components/shared";
import { Breadcrumb } from "~/components/shared";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui";
import {
  btechCourses,
  getTotalCredits,
  getTotalCourses,
  type Course,
  type Semester,
} from "~/data/btech-courses";
import { SyllabusModal } from "~/components/shared";

const BtechCoursesClient = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on search query and sort alphabetically by name
  const filteredSemesters = btechCourses
    .map((semester) => ({
      ...semester,
      courses: semester.courses
        .filter(
          (course) =>
            course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.professor.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .filter((semester) => semester.courses.length > 0);

  const totalCourses = getTotalCourses();
  const totalCredits = getTotalCredits();

  return (
    <MotionDiv>
      <div className="space-y-8">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "About Me", url: "/about" },
            { name: "Journey", url: "/about/journey" },
            { name: "BTech Courses", url: "/about/journey/btech" },
          ]}
        />

        {/* Header */}
        <MotionDiv
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-1">
            <h1 className={cn(typo({ variant: "h2" }))}>BTech Journey</h1>
            <p className={cn(typo({ variant: "paragraph" }))}>
              A comprehensive overview of courses throughout my undergraduate
              degree.
            </p>
          </div>

          {/* Stats & Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-4 text-sm text-neutral-400">
              <span>{btechCourses.length} Semesters</span>
              <span>•</span>
              <span>{totalCourses} Courses</span>
              <span>•</span>
              <span>{totalCredits} Credits</span>
            </div>

            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-48 bg-transparent border-b border-neutral-800 focus:border-ring/50 px-0 py-1.5 text-sm text-neutral-400 placeholder:text-neutral-500 focus:outline-none transition-colors"
            />
          </div>
        </MotionDiv>

        {/* Semesters */}
        {filteredSemesters.length === 0 ? (
          <div className="text-center py-12 text-neutral-400">
            No courses found matching &quot;{searchQuery}&quot;
          </div>
        ) : (
          <div className="space-y-12">
            {filteredSemesters.map((semester, index) => (
              <SemesterSection
                key={semester.id}
                semester={semester}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </MotionDiv>
  );
};

// Semester Section Component
interface SemesterSectionProps {
  semester: Semester;
  index: number;
}

const SemesterSection = ({ semester, index }: SemesterSectionProps) => {
  const totalCredits = semester.courses.reduce(
    (sum, course) => sum + course.credits,
    0,
  );

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="space-y-6"
    >
      {/* Semester Header */}
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-ubuntu text-2xl font-medium text-white">
              Semester {semester.number}
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              {semester.academicYear}
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <span>{semester.courses.length} Courses</span>
            <span>•</span>
            <span>{totalCredits} Credits</span>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {semester.courses.map((course, courseIndex) => (
          <CourseCard
            key={`${semester.id}-${course.code}`}
            course={course}
            index={courseIndex}
          />
        ))}
      </div>
    </MotionDiv>
  );
};

// Course Card Component
interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard = ({ course, index }: CourseCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const typeColors = {
    Theory: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    Lab: "text-green-400 border-green-400/30 bg-green-400/10",
    Elective: "text-purple-400 border-purple-400/30 bg-purple-400/10",
    Project: "text-ring border-ring/30 bg-ring/10",
  };

  const hasSyllabus = course.syllabus && course.syllabus.length > 0;

  return (
    <>
      <MotionDiv
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
        className={cn(
          "bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all duration-200 rounded-lg p-4 group",
          hasSyllabus && "cursor-pointer hover:border-ring/50",
        )}
        onClick={() => hasSyllabus && setIsModalOpen(true)}
      >
        <div className="space-y-3">
          {/* Course Code & Type */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-ring group-hover:text-ring/80 transition-colors">
              {course.code}
            </span>
            <span
              className={cn(
                "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border flex-shrink-0",
                typeColors[course.type],
              )}
            >
              {course.type}
            </span>
          </div>

          {/* Course Name & Professor */}
          <div className="space-y-1.5">
            <h3 className="text-base text-white font-medium leading-snug line-clamp-2 min-h-[2.5rem]">
              {course.name}
            </h3>

            {/* Professor */}
            <p className="text-sm text-neutral-400 truncate">
              {course.professor}
            </p>
          </div>
        </div>
      </MotionDiv>

      {/* Syllabus Modal */}
      <SyllabusModal
        course={course}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default BtechCoursesClient;
