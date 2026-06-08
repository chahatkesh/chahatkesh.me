"use client";

import { useState, type KeyboardEvent } from "react";
import { MotionDiv } from "~/components/shared";
import { Breadcrumb } from "~/components/shared";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui";
import {
  btechCourses,
  getTotalCredits,
  getTotalCourses,
  getUniqueProfessors,
  type Course,
  type ProfessorInfo,
  type Semester,
} from "~/data/btech-courses";
import { SyllabusModal, ProfessorModal } from "~/components/shared";
import { ChevronRight, Search, X } from "lucide-react";

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
    .filter((semester) => semester.courses.length > 0)
    .sort((a, b) => b.number - a.number);

  const totalCourses = getTotalCourses();
  const totalCredits = getTotalCredits();
  const professors = getUniqueProfessors();

  const matchedCourses = filteredSemesters.reduce(
    (sum, semester) => sum + semester.courses.length,
    0,
  );
  const isSearching = searchQuery.trim().length > 0;

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
            <h1 className={cn(typo({ variant: "h2" }))}>
              BTech at NIT Jalandhar
            </h1>
            <p className={cn(typo({ variant: "paragraph" }))}>
              Everything I studied, semester by semester.
            </p>
          </div>

          {/* Stats & Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>
                <span className="font-mono text-xs tabular-nums text-foreground/80">
                  {totalCourses}
                </span>{" "}
                Courses
              </span>
              <span>•</span>
              <span>
                <span className="font-mono text-xs tabular-nums text-foreground/80">
                  {totalCredits}
                </span>{" "}
                Credits
              </span>
              <span>•</span>
              <span>
                <span className="font-mono text-xs tabular-nums text-foreground/80">
                  {professors.length}
                </span>{" "}
                Professors
              </span>
            </div>

            <div className="relative w-full md:w-56">
              <Search
                size={14}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground/70 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search courses, professors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-border focus:border-ring/50 pl-6 pr-6 py-1.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none transition-colors"
              />
              {isSearching && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground/70 hover:text-foreground transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Search result count */}
          {isSearching && filteredSemesters.length > 0 && (
            <p className="text-xs text-muted-foreground" aria-live="polite">
              {matchedCourses} {matchedCourses === 1 ? "course" : "courses"}{" "}
              found across {filteredSemesters.length}{" "}
              {filteredSemesters.length === 1 ? "semester" : "semesters"}
            </p>
          )}
        </MotionDiv>

        {/* Semesters */}
        {filteredSemesters.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <p className="text-sm text-muted-foreground">
              No courses found matching &quot;{searchQuery}&quot;
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-sm text-ring hover:text-ring/80 transition-colors el-focus-styles"
            >
              Clear search
            </button>
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

        {/* Thank You — Professors */}
        {!searchQuery && <ProfessorsSection />}
      </div>
    </MotionDiv>
  );
};

// Professors Thank You Section
const ProfessorsSection = () => {
  const professors = getUniqueProfessors();
  const [selectedProfessor, setSelectedProfessor] =
    useState<ProfessorInfo | null>(null);

  const handleProfessorKeyDown = (
    e: KeyboardEvent,
    professor: ProfessorInfo,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedProfessor(professor);
    }
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Section Header */}
      <div className="border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-ubuntu text-2xl font-medium text-foreground">
            Thank You, Professors
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Grateful to the {professors.length} professors who shaped my
          engineering journey, each and every one of you.
        </p>
      </div>

      {/* Professors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {professors.map((professor, index) => (
          <MotionDiv
            key={professor.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.3) }}
            role="button"
            tabIndex={0}
            aria-label={`View courses taught by ${professor.name}`}
            aria-haspopup="dialog"
            onClick={() => setSelectedProfessor(professor)}
            onKeyDown={(e: KeyboardEvent) =>
              handleProfessorKeyDown(e, professor)
            }
            className="bg-card/50 border border-border hover:border-ring/50 cursor-pointer el-focus-styles transition-colors duration-200 rounded-lg px-4 py-3 flex items-center justify-between gap-3 group"
          >
            <span className="text-sm text-foreground font-medium truncate">
              {professor.name}
            </span>
            <span className="text-xs text-muted-foreground group-hover:text-ring transition-colors flex-shrink-0">
              {professor.courseCount}{" "}
              {professor.courseCount === 1 ? "course" : "courses"}
            </span>
          </MotionDiv>
        ))}
      </div>

      {/* Professor Courses Modal */}
      <ProfessorModal
        professor={selectedProfessor}
        onClose={() => setSelectedProfessor(null)}
      />
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
    >
      {/* Sticky header — semester info + column labels */}
      <div className="sticky top-0 z-10 -mx-3 px-3 pt-3 border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
        {/* Semester Header — single line */}
        <div className="flex items-baseline justify-between gap-4 pb-3">
          <div className="flex items-baseline gap-3 min-w-0">
            <h2 className="font-ubuntu text-xl font-medium text-foreground whitespace-nowrap">
              Semester {semester.number}
            </h2>
            <span className="hidden sm:inline text-sm text-muted-foreground whitespace-nowrap">
              {semester.academicYear}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground whitespace-nowrap">
            <span className="hidden sm:inline">
              <span className="font-mono text-xs tabular-nums text-foreground/80">
                {semester.courses.length}
              </span>{" "}
              Courses
            </span>
            <span className="hidden sm:inline">•</span>
            <span>
              <span className="font-mono text-xs tabular-nums text-foreground/80">
                {totalCredits}
              </span>{" "}
              Credits
            </span>
          </div>
        </div>

        {/* Column labels — tablet & desktop */}
        <div className="hidden md:grid md:grid-cols-[5.5rem_minmax(0,1fr)_4.5rem_3.5rem_1rem] lg:grid-cols-[6.5rem_minmax(0,1.4fr)_minmax(0,1fr)_4.5rem_3.5rem_1rem] gap-4 items-center px-3 pt-2 pb-2 border-t border-border text-[10px] uppercase tracking-widest text-muted-foreground/60 select-none">
          <span>Code</span>
          <span>Course</span>
          <span className="hidden lg:block">Professor</span>
          <span>Type</span>
          <span className="text-right">Credits</span>
          <span />
        </div>
      </div>

      {/* Course Rows */}
      <div className="divide-y divide-border border-b border-border">
        {semester.courses.map((course, courseIndex) => (
          <CourseRow
            key={`${semester.id}-${course.code}`}
            course={course}
            index={courseIndex}
          />
        ))}
      </div>
    </MotionDiv>
  );
};

// Course Row Component
interface CourseRowProps {
  course: Course;
  index: number;
}

const CourseRow = ({ course, index }: CourseRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasSyllabus = Boolean(course.syllabus && course.syllabus.length > 0);

  const openModal = () => {
    if (hasSyllabus) setIsModalOpen(true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!hasSyllabus) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <MotionDiv
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.25) }}
        {...(hasSyllabus && {
          role: "button",
          tabIndex: 0,
          "aria-label": `View syllabus for ${course.name}`,
          "aria-haspopup": "dialog",
          onKeyDown: handleKeyDown,
        })}
        onClick={openModal}
        className={cn(
          "group transition-colors duration-200",
          hasSyllabus
            ? "cursor-pointer hover:bg-card/60 el-focus-styles"
            : "hover:bg-card/30",
        )}
      >
        {/* Tablet & desktop row */}
        <div className="hidden md:grid md:grid-cols-[5.5rem_minmax(0,1fr)_4.5rem_3.5rem_1rem] lg:grid-cols-[6.5rem_minmax(0,1.4fr)_minmax(0,1fr)_4.5rem_3.5rem_1rem] gap-4 items-center px-3 py-3.5">
          <span className="font-mono text-xs text-muted-foreground/80 group-hover:text-ring transition-colors">
            {course.code}
          </span>
          <span className="min-w-0">
            <span className="block text-sm text-foreground font-medium leading-snug">
              {course.name}
            </span>
            {/* Professor inline on tablet where the column is hidden */}
            <span className="block lg:hidden text-xs text-muted-foreground truncate mt-0.5">
              {course.professor}
            </span>
          </span>
          <span className="hidden lg:block text-sm text-muted-foreground truncate">
            {course.professor}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
            {course.type}
          </span>
          <span className="font-mono text-xs text-muted-foreground text-right tabular-nums">
            {course.credits}
          </span>
          <span className="flex justify-end">
            {hasSyllabus && (
              <ChevronRight
                size={14}
                className="text-muted-foreground/40 group-hover:text-ring group-hover:translate-x-0.5 transition-all duration-200"
                aria-hidden="true"
              />
            )}
          </span>
        </div>

        {/* Mobile row */}
        <div className="md:hidden px-3 py-3 space-y-1">
          <div className="flex items-start justify-between gap-3">
            <span className="text-sm text-foreground font-medium leading-snug">
              {course.name}
            </span>
            {hasSyllabus && (
              <ChevronRight
                size={14}
                className="text-muted-foreground/50 flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
            )}
          </div>
          <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span className="truncate">{course.professor}</span>
            <span className="font-mono tabular-nums text-muted-foreground/70 flex-shrink-0">
              {course.credits} cr
            </span>
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
