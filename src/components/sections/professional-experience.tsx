import Image from "next/image";
import Link from "next/link";
import { typo } from "~/components/ui";
import { experiences, type Experience } from "~/data/experience";
import { calculateDuration } from "~/lib/date-utils";

const MAX_DISPLAYED_EXPERIENCES = 4;

const ProfessionalExperience = () => {
  return (
    <section
      aria-label="professional experience"
      className="mt-5 space-y-6"
      id="experience"
    >
      <h2 className={typo({ variant: "h2" })}>Professional Experience</h2>
      <div className="!mt-8">
        <ol className="grid gap-3 md:gap-4">
          {experiences.slice(0, MAX_DISPLAYED_EXPERIENCES).map((exp) => (
            <ExperienceCard key={exp.slug} experience={exp} />
          ))}
        </ol>
        {experiences.length > MAX_DISPLAYED_EXPERIENCES && (
          <div className="flex justify-end mt-4">
            <Link
              href="/about/experience"
              className="text-sm text-neutral-400 hover:text-ring transition-colors inline-flex items-center gap-1.5"
            >
              View all
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  const duration = calculateDuration(
    experience.start_date,
    experience.end_date,
  );

  return (
    <li className="transition-all duration-300">
      <Link
        href={`/about/experience/${experience.slug}`}
        className="block group"
      >
        <div className="flex gap-3 md:gap-4 border border-neutral-800 hover:border-neutral-700 rounded-lg p-3 md:p-4 transition-colors">
          {/* Logo Column - Fixed Width */}
          <div className="flex-shrink-0">
            <div className="relative h-[60px] w-[60px] md:h-[72px] md:w-[72px] overflow-hidden rounded-md border border-neutral-800 bg-neutral-800/50">
              <Image
                src={experience.logo}
                alt={`${experience.employer} logo`}
                fill
                sizes="(max-width: 768px) 60px, 72px"
                className="object-contain rounded-md p-1 md:p-1.5"
                priority
              />
            </div>
          </div>

          {/* Content Column - Flexible */}
          <div className="flex flex-1 items-start justify-between gap-3 md:gap-4 min-w-0">
            {/* Left Content */}
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="font-ubuntu text-base md:text-lg font-medium text-white group-hover:text-ring transition-colors leading-tight">
                {experience.role}
              </h3>
              <p className="text-sm text-neutral-400 mt-0.5 leading-tight">
                {experience.employer}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2 text-[11px] md:text-xs text-neutral-400 mt-2.5 leading-tight">
                <span>{experience.type}</span>
                <span>•</span>
                <span>{experience.location}</span>
              </div>
            </div>

            {/* Right Content - Date */}
            <div className="text-right flex-shrink-0">
              <p className="hidden md:block text-sm text-neutral-300 leading-tight whitespace-nowrap">
                {experience.start_date} - {experience.end_date}
              </p>
              <p className="text-[11px] md:text-xs text-neutral-500 md:mt-0.5 leading-tight">
                {duration}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProfessionalExperience;
