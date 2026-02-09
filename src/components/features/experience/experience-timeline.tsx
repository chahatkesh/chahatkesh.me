"use client";

import Image from "next/image";
import Link from "next/link";
import { experiences } from "~/data/experience";
import { MotionDiv } from "~/components/shared";
import { calculateDuration } from "~/lib/date-utils";

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
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-neutral-400">
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
            </Link>
          </MotionDiv>
        ))}
      </div>
    </MotionDiv>
  );
};

export default ExperienceTimeline;
