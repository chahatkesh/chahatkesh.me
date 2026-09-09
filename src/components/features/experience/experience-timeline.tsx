"use client";

import Link from "next/link";
import { experiences, type Experience } from "~/data/experience";
import { MotionDiv } from "~/components/shared";
import { TechStackBadges } from "~/components/features/project";
import { calculateDuration } from "~/lib/date-utils";
import {
  groupExperiencesByCompany,
  type ExperienceGroup,
} from "~/lib/experience-utils";
import { MAX_VISIBLE_EXPERIENCE_STACKS } from "~/constants";
import { cn } from "~/lib/utils";
import { ExperienceDates } from "./experience-dates";
import { ExperienceLogo } from "./experience-logo";
import { ExperienceThread } from "./experience-thread";

const ExperienceTimeline = () => {
  const groups = groupExperiencesByCompany(experiences);

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <ExperienceThread />

        <ol className="relative">
          {groups.map((group, index) => (
            <CompanyEntry
              key={group.companyId}
              group={group}
              index={index}
              isLast={index === groups.length - 1}
            />
          ))}
        </ol>
      </div>
    </MotionDiv>
  );
};

function CompanyEntry({
  group,
  index,
  isLast,
}: {
  group: ExperienceGroup;
  index: number;
  isLast: boolean;
}) {
  const location = group.positions[0]?.location ?? "";

  return (
    <li className="relative">
      <MotionDiv
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <div className={cn("flex items-start gap-4", !isLast && "pb-5")}>
          <ExperienceLogo src={group.logo} alt={group.employer} />

          <div className="min-w-0 flex-1">
            <h3 className="font-ubuntu text-base font-medium leading-none text-foreground sm:text-[17px]">
              {group.employer}
            </h3>
            {location && (
              <p className="mt-1.5 text-xs leading-none text-muted-foreground/60">
                {location}
              </p>
            )}

            <div className="relative mt-4 space-y-4 border-l border-border pl-4">
              {group.positions.map((position) => (
                <RoleRow key={position.slug} position={position} />
              ))}
            </div>
          </div>
        </div>
        {!isLast && (
          <div className="mb-5 ml-14 h-px bg-border/60" aria-hidden="true" />
        )}
      </MotionDiv>
    </li>
  );
}

function RoleRow({ position }: { position: Experience }) {
  const duration = calculateDuration(position.start_date, position.end_date);

  return (
    <Link
      href={`/about/experience/${position.slug}`}
      className="el-focus-styles group block"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-snug text-foreground/90 transition-colors group-hover:text-ring">
            {position.role}
          </p>
          <ExperienceDates
            start={position.start_date}
            end={position.end_date}
            duration={duration}
            align="inline"
            className="mt-1.5 text-xs sm:hidden"
          />
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
            {position.tagline}
          </p>
          {position.techStack && position.techStack.length > 0 && (
            <div className="mt-2.5">
              <TechStackBadges
                stacks={position.techStack}
                max={MAX_VISIBLE_EXPERIENCE_STACKS}
                size="sm"
                linked={false}
              />
            </div>
          )}
        </div>
        <ExperienceDates
          start={position.start_date}
          end={position.end_date}
          duration={duration}
          className="hidden pt-0.5 sm:block"
        />
      </div>
    </Link>
  );
}

export default ExperienceTimeline;
