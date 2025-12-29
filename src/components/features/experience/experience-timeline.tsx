"use client";

import Image from "next/image";
import Link from "next/link";
import { experiences } from "~/data/experience";
import { MotionDiv } from "~/components/shared";
import { FaMapMarkerAlt, FaBriefcase, FaClock } from "react-icons/fa";

// Helper function to calculate duration
const calculateDuration = (startDate: string, endDate: string): string => {
  // Parse dates in format "MMM YYYY" (e.g., "Oct 2025")
  const parseDate = (dateStr: string): Date => {
    if (dateStr.toLowerCase() === "present") {
      return new Date();
    }
    // Format: "Oct 2025" -> "Oct 01 2025"
    return new Date(`${dateStr} 01`);
  };

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  // Check if dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "Invalid date";
  }

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (months < 1) return "< 1 month";
  if (months === 1) return "1 month";
  if (months < 12) return `${months} months`;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) return years === 1 ? "1 year" : `${years} years`;
  return `${years} ${years === 1 ? "year" : "years"} ${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
};

const ExperienceTimeline = () => {
  return (
    <MotionDiv
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative space-y-8">
        {/* Vertical timeline line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-neutral-800" />

        {experiences.map((experience, index) => (
          <MotionDiv
            key={experience.slug}
            className="relative pl-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-4">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-neutral-800 bg-neutral-900">
                <Image
                  src={experience.logo}
                  alt={`${experience.employer} logo`}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <Link
              href={`/about/experience/${experience.slug}`}
              className="block group"
            >
              <div className="border border-neutral-800 hover:border-neutral-700 rounded-lg p-4 transition-colors bg-background">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div className="flex-1">
                    <h3 className="font-ubuntu text-lg font-medium text-white group-hover:text-ring transition-colors">
                      {experience.role}
                    </h3>
                    <p className="text-sm text-neutral-400 mt-0.5">
                      {experience.employer}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span>{experience.start_date}</span>
                    <span>→</span>
                    <span>{experience.end_date}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-400">
                  <span className="inline-flex items-center gap-1.5">
                    <FaBriefcase size={12} />
                    <span>{experience.type}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FaMapMarkerAlt size={12} />
                    <span>{experience.location}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FaClock size={12} />
                    <span>
                      {calculateDuration(
                        experience.start_date,
                        experience.end_date,
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </MotionDiv>
        ))}
      </div>
    </MotionDiv>
  );
};

export default ExperienceTimeline;
