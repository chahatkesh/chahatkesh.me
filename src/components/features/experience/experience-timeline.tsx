"use client";

import Image from "next/image";
import Link from "next/link";
import { experiences } from "~/data/experience";
import { MotionDiv } from "~/components/shared";
import { calculateDuration } from "~/lib/date-utils";
import {
  groupExperiencesByCompany,
  type ExperienceGroup,
} from "~/lib/experience-utils";
import { type Experience } from "~/data/experience";

const ExperienceTimeline = () => {
  const groups = groupExperiencesByCompany(experiences);

  return (
    <MotionDiv
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative space-y-8">
        {/* Vertical timeline line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-border" />

        {groups.map((group, index) =>
          group.positions.length === 1 ? (
            <SinglePositionEntry
              key={group.companyId}
              experience={group.positions[0]}
              index={index}
            />
          ) : (
            <MultiPositionEntry
              key={group.companyId}
              group={group}
              index={index}
            />
          ),
        )}
      </div>
    </MotionDiv>
  );
};

// ---------------------------------------------------------------------------
// Single-position timeline entry (unchanged visual behaviour)
// ---------------------------------------------------------------------------

function SinglePositionEntry({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <MotionDiv
      className="relative pl-12"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-4">
        <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-border bg-card">
          <Image
            src={experience.logo}
            alt={`${experience.employer} logo`}
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>
      </div>

      <Link
        href={`/about/experience/${experience.slug}`}
        className="block group"
      >
        <div className="border border-border hover:border-muted-foreground/30 rounded-lg p-4 transition-colors bg-background">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div className="flex-1">
              <h3 className="font-ubuntu text-lg font-medium text-foreground group-hover:text-ring transition-colors">
                {experience.role}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {experience.employer}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
              <span>{experience.start_date}</span>
              <span>→</span>
              <span>{experience.end_date}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
            <span>{experience.type}</span>
            <span>•</span>
            <span>{experience.location}</span>
            <span>•</span>
            <span>
              {calculateDuration(experience.start_date, experience.end_date)}
            </span>
          </div>
        </div>
      </Link>
    </MotionDiv>
  );
}

// ---------------------------------------------------------------------------
// Multi-position timeline entry — company header + nested positions
// ---------------------------------------------------------------------------

function MultiPositionEntry({
  group,
  index,
}: {
  group: ExperienceGroup;
  index: number;
}) {
  return (
    <MotionDiv
      className="relative pl-12"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-4">
        <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-border bg-card">
          <Image
            src={group.logo}
            alt={`${group.employer} logo`}
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-background">
        {/* Company header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 px-4 py-3 border-b border-border">
          <div>
            <h3 className="font-ubuntu text-lg font-medium text-foreground">
              {group.employer}
            </h3>
            <p className="text-xs text-muted-foreground/70 mt-0.5">
              {group.positions.length} positions
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/70 flex-shrink-0">
            <span>{group.earliestStart}</span>
            <span>→</span>
            <span>{group.latestEnd}</span>
          </div>
        </div>

        {/* Individual positions */}
        {group.positions.map((position, posIdx) => (
          <Link
            key={position.slug}
            href={`/about/experience/${position.slug}`}
            className="block group"
          >
            <div
              className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 px-4 py-3 hover:bg-muted/40 transition-colors ${
                posIdx < group.positions.length - 1
                  ? "border-b border-border/60"
                  : ""
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Connector indent */}
                <span className="text-muted-foreground/50 mt-0.5 text-sm select-none flex-shrink-0">
                  ↳
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground/90 group-hover:text-ring transition-colors">
                    {position.role}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground/70 mt-1">
                    <span>{position.type}</span>
                    <span>•</span>
                    <span>{position.location}</span>
                    <span>•</span>
                    <span>
                      {calculateDuration(
                        position.start_date,
                        position.end_date,
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground/70 flex-shrink-0 pl-6 sm:pl-0">
                <span>{position.start_date}</span>
                <span>→</span>
                <span>{position.end_date}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-ring"
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
    </MotionDiv>
  );
}

export default ExperienceTimeline;
