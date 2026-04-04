import Image from "next/image";
import Link from "next/link";
import { typo } from "~/components/ui";
import { experiences, type Experience } from "~/data/experience";
import { calculateDuration } from "~/lib/date-utils";
import {
  groupExperiencesByCompany,
  type ExperienceGroup,
} from "~/lib/experience-utils";
import { MAX_DISPLAYED_EXPERIENCES, EXPERIENCE_LOGO_SIZE } from "~/constants";

const ProfessionalExperience = () => {
  const groups = groupExperiencesByCompany(experiences);
  const visibleGroups = groups.slice(0, MAX_DISPLAYED_EXPERIENCES);

  return (
    <section
      aria-label="professional experience"
      className="mt-5 space-y-6"
      id="experience"
    >
      <h2 className={typo({ variant: "h2" })}>Professional Experience</h2>
      <div className="!mt-8">
        <ol className="grid gap-3 md:gap-4">
          {visibleGroups.map((group) =>
            group.positions.length === 1 ? (
              <ExperienceCard
                key={group.companyId}
                experience={group.positions[0]}
              />
            ) : (
              <CompanyGroupCard key={group.companyId} group={group} />
            ),
          )}
        </ol>
        {groups.length > MAX_DISPLAYED_EXPERIENCES && (
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

// ---------------------------------------------------------------------------
// Single-position card (unchanged visual)
// ---------------------------------------------------------------------------

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
                sizes={`(max-width: 768px) ${EXPERIENCE_LOGO_SIZE.mobile}px, ${EXPERIENCE_LOGO_SIZE.desktop}px`}
                className="object-contain rounded-md p-1 md:p-1.5"
                priority
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="flex flex-1 items-start justify-between gap-3 md:gap-4 min-w-0">
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

// ---------------------------------------------------------------------------
// Multi-position company card
// ---------------------------------------------------------------------------

const CompanyGroupCard = ({ group }: { group: ExperienceGroup }) => {
  return (
    <li className="transition-all duration-300">
      <div className="border border-neutral-800 rounded-lg overflow-hidden">
        {/* Company header */}
        <div className="flex gap-3 md:gap-4 p-3 md:p-4 border-b border-neutral-800">
          <div className="flex-shrink-0">
            <div className="relative h-[60px] w-[60px] md:h-[72px] md:w-[72px] overflow-hidden rounded-md border border-neutral-800 bg-neutral-800/50">
              <Image
                src={group.logo}
                alt={`${group.employer} logo`}
                fill
                sizes={`(max-width: 768px) ${EXPERIENCE_LOGO_SIZE.mobile}px, ${EXPERIENCE_LOGO_SIZE.desktop}px`}
                className="object-contain rounded-md p-1 md:p-1.5"
                priority
              />
            </div>
          </div>
          <div className="flex flex-1 items-center justify-between gap-3 min-w-0">
            <div className="min-w-0">
              <h3 className="font-ubuntu text-base md:text-lg font-medium text-white leading-tight">
                {group.employer}
              </h3>
              <p className="text-[11px] md:text-xs text-neutral-500 mt-0.5">
                {group.positions.length} positions
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="hidden md:block text-sm text-neutral-300 leading-tight whitespace-nowrap">
                {group.earliestStart} - {group.latestEnd}
              </p>
            </div>
          </div>
        </div>

        {/* Individual positions */}
        {group.positions.map((position, idx) => (
          <Link
            key={position.slug}
            href={`/about/experience/${position.slug}`}
            className="block group"
          >
            <div
              className={`flex items-center justify-between px-3 md:px-4 py-2.5 hover:bg-neutral-900/50 transition-colors ${
                idx < group.positions.length - 1
                  ? "border-b border-neutral-800/60"
                  : ""
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="text-neutral-600 text-sm mt-0.5 select-none flex-shrink-0">
                  ↳
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-300 group-hover:text-ring transition-colors leading-tight">
                    {position.role}
                  </p>
                  <p className="text-[11px] md:text-xs text-neutral-500 mt-0.5">
                    {position.type}
                    {" • "}
                    {calculateDuration(position.start_date, position.end_date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0 ml-3">
                <span className="hidden md:inline text-xs text-neutral-500 whitespace-nowrap">
                  {position.start_date} - {position.end_date}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5 text-neutral-600 group-hover:text-ring transition-colors flex-shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </li>
  );
};

export default ProfessionalExperience;
