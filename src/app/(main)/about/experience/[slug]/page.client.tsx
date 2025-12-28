"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionDiv } from "~/components/shared";
import { BackButton } from "~/components/shared";
import { ExperienceCarousel } from "~/components/features/experience";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui";
import { type Experience } from "~/data/experience";
import { FaExternalLinkAlt, FaGlobe } from "react-icons/fa";

interface ExperienceDetailClientProps {
  experience: Experience;
}

const ExperienceDetailClient = ({ experience }: ExperienceDetailClientProps) => {
  return (
    <MotionDiv>
      <div className="space-y-8">
        <BackButton href="/about/experience">Back to Experience</BackButton>

        {/* Hero Section */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header with Logo */}
          <div className="flex items-start gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-800/50 flex-shrink-0">
              <Image
                src={experience.logo}
                alt={`${experience.employer} logo`}
                fill
                sizes="80px"
                className="object-contain p-3"
                priority
              />
            </div>
            
            <div className="flex-1 space-y-2">
              <h1 className={cn(typo({ variant: "h2" }))}>
                {experience.role}
              </h1>
              <p className="text-lg text-neutral-300">{experience.employer}</p>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <span>{experience.start_date} - {experience.end_date}</span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className={cn(typo({ variant: "paragraph" }), "text-neutral-300 text-lg")}>
            {experience.tagline}
          </p>
        </MotionDiv>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* About Organization */}
          {experience.about && (
            <section className="space-y-3">
              <h2 className="font-ubuntu text-xl font-medium text-white">
                About {experience.employer}
              </h2>
              <p className={cn(typo({ variant: "paragraph", size: "sm" }), "text-neutral-300 text-justify")}>
                {experience.about}
              </p>
            </section>
          )}

          {/* Full Description */}
          <section className="space-y-3">
            <h2 className="font-ubuntu text-xl font-medium text-white">Overview</h2>
            <p className={cn(typo({ variant: "paragraph", size: "sm" }), "text-neutral-300 text-justify")}>
              {experience.description}
            </p>
          </section>

          {/* Gallery Carousel */}
          {experience.gallery && experience.gallery.length > 0 && (
            <ExperienceCarousel 
              images={experience.gallery} 
              experienceName={experience.employer}
            />
          )}

          {/* Key Contributions */}
          {experience.contributions && experience.contributions.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-ubuntu text-xl font-medium text-white">
                Key Contributions
              </h2>
              <ul className="space-y-2">
                {experience.contributions.map((contribution, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-neutral-300"
                  >
                    <span className="text-ring mt-0.5">•</span>
                    <span>{contribution}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tech Stack */}
          {experience.techStack && experience.techStack.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-ubuntu text-xl font-medium text-white">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {experience.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {experience.achievements && experience.achievements.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-ubuntu text-xl font-medium text-white">
                Impact & Achievements
              </h2>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-neutral-300"
                  >
                    <span className="text-ring mt-0.5">✓</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Links */}
          {experience.links && experience.links.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-ubuntu text-xl font-medium text-white">
                Related Links
              </h2>
              <div className="flex flex-wrap gap-3">
                {experience.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800/50 rounded-lg transition-colors text-neutral-300 hover:text-white"
                  >
                    {link.icon === 'website' ? <FaGlobe size={14} /> : <FaExternalLinkAlt size={12} />}
                    <span>{link.title}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </MotionDiv>
  );
};

export default ExperienceDetailClient;
