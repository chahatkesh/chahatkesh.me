"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionDiv } from "~/components/shared";
import { calculateDuration } from "~/lib/date-utils";
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
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-card">
                <Image
                  src={experience.logo}
                  alt={`${experience.employer} logo`}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-ubuntu text-base font-medium text-foreground group-hover:text-ring transition-colors">
                  {experience.role}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {experience.employer}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground/70">
                  <span>
                    {experience.start_date} → {experience.end_date}
                  </span>
                  <span>•</span>
                  <span>{experience.type}</span>
                  <span>•</span>
                  <span>{experience.location}</span>
                  <span>•</span>
                  <span>
                    {calculateDuration(
                      experience.start_date,
                      experience.end_date,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </MotionDiv>
      ))}
    </ol>
  );
}
