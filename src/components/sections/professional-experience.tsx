"use client";
import Image from "next/image";
import Link from "next/link";
import { typo } from "~/components/ui";
import { experiences, type Experience } from "~/data/experience";

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

const ProfessionalExperience = () => {
  return (
    <section
      aria-label="professional experience"
      className="mt-5 space-y-6"
      id="experience"
    >
      <h2 className={typo({ variant: "h2" })}>Professional Experience</h2>
      <div className="!mt-8">
        <ol className="grid gap-4 md:grid-cols-2 md:gap-6" role="list">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
};

const ExperienceCard = ({
  experience,
}: {
  experience: Experience;
  index: number;
}) => {
  return (
    <li role="listitem" className="transition-all duration-300">
      <Link
        href={`/about/experience/${experience.slug}`}
        className="block group"
      >
        <div className="flex flex-row items-start gap-4 border border-neutral-800 hover:border-neutral-700 rounded-lg p-4 transition-colors">
          <div className="flex-shrink-0">
            <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-800 bg-neutral-800/50">
              <Image
                src={experience.logo}
                alt={`${experience.employer} logo`}
                fill
                sizes="64px"
                className="object-contain p-2"
                priority
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-ubuntu text-base font-medium text-white group-hover:text-ring transition-colors">
                  {experience.role}
                </h3>
                <p className="text-sm text-neutral-400">
                  {experience.employer}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
              <span className="inline-flex items-center gap-1.5">
                <span>{experience.type}</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <span>{experience.location}</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <span>
                  {calculateDuration(
                    experience.start_date,
                    experience.end_date,
                  )}
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProfessionalExperience;
