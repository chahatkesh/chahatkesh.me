"use client";

import Link from "next/link";
import { ExperienceLogo } from "~/components/features/experience/experience-logo";
import { MotionDiv } from "~/components/shared";
import type { Experience } from "~/data/experience";

interface StackExperienceListProps {
  experiences: Experience[];
}

export function StackExperienceList({ experiences }: StackExperienceListProps) {
  if (experiences.length === 0) return null;

  return (
    <ol className="grid gap-4 md:grid-cols-2" role="list">
      {experiences.map((experience, index) => (
        <MotionDiv
          key={experience.slug}
          role="listitem"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Link
            href={`/about/experience/${experience.slug}`}
            className="el-focus-styles block h-full rounded-lg border border-border bg-background p-4 transition-colors hover:border-muted-foreground/30 group"
          >
            <div className="flex gap-3">
              <ExperienceLogo
                src={experience.logo}
                alt=""
                size="md"
                className="bg-transparent"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-ubuntu text-base font-medium text-foreground group-hover:text-ring transition-colors">
                  {experience.role}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {experience.employer}
                </p>
                <p className="mt-3 text-xs text-muted-foreground/70">
                  {experience.start_date} - {experience.end_date} •{" "}
                  {experience.location}
                </p>
              </div>
            </div>
          </Link>
        </MotionDiv>
      ))}
    </ol>
  );
}
