"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui";
import { ProjectJsonLd } from "./project-jsonld";
import config from "~/config";
import { Project } from "~/data/projects";
import { FRONTEND_STACKS, BACKEND_DEVOPS, LANGUAGES_TOOLS } from "~/data/stack";
import { MotionDiv } from "~/components/shared";

// Helper function to get image src
const getImageSrc = (cover: string | StaticImageData): string => {
  return typeof cover === "string" ? cover : cover.src;
};

type FeaturedProjectItemProps = {
  metadata?: boolean;
} & Project;

// Combine all tech stacks for icon lookup
const ALL_STACKS = {
  ...FRONTEND_STACKS,
  ...BACKEND_DEVOPS,
  ...LANGUAGES_TOOLS,
};

const FeaturedProjectItem: React.FC<FeaturedProjectItemProps> = ({
  title,
  description,
  cover,
  stacks,
  slug,
  datePublished,
  dateStarted,
  dateModified,
  metadata = false,
  tagline,
  features,
}) => {
  return (
    <li role="listitem" className="featured-project">
      {metadata && (
        <ProjectJsonLd
          title={title}
          description={description}
          slug={slug}
          datePublished={datePublished}
          dateStarted={dateStarted}
          dateModified={dateModified}
          image={`https://${config.domainName}${getImageSrc(cover)}`}
          tags={stacks}
        />
      )}
      <Link href={`/projects/${slug}`} className="block">
        <MotionDiv
          className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Left side with full image and tagline overlay */}
          <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-950 to-black overflow-hidden">
            {" "}
            <MotionDiv
              className="relative w-full h-full min-h-[300px] overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                alt={`${title} screenshot`}
                priority
                placeholder="blur"
                src={cover}
                className="w-full h-full object-cover object-center"
                fill
              />

              {/* Tagline overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent z-20 p-6 pt-16">
                <p className="text-sm text-neutral-200">{tagline}</p>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500 opacity-10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-500 opacity-10 rounded-full blur-xl"></div>
            </MotionDiv>
          </div>

          {/* Right side with content */}
          <div className="p-8 flex flex-col h-full">
            <h2 className="font-ubuntu text-xl font-bold mb-3">{title}</h2>

            <p
              className={cn(typo({ variant: "paragraph", size: "sm" }), "mb-4")}
            >
              {description}
            </p>

            <h3 className="text-sm font-medium text-neutral-300 mb-2">
              Key Features
            </h3>
            <ul className="mb-6 space-y-1">
              {features.slice(0, 3).map((feature, index) => (
                <li
                  key={index}
                  className="text-sm text-neutral-400 flex items-start"
                >
                  <span className="mr-2 text-primary">•</span>
                  {feature}
                </li>
              ))}
              {features.length > 3 && (
                <li className="text-sm text-neutral-500 flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span className="italic">
                    +{features.length - 3} more features
                  </span>
                </li>
              )}
            </ul>

            <div className="mt-auto">
              <h3 className="text-sm font-medium text-neutral-300 mb-2">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {stacks.slice(0, 3).map((stack, index) => {
                  const techInfo = ALL_STACKS[stack];
                  const Icon = techInfo?.Icon;
                  const className = techInfo?.className || "text-neutral-400";

                  return (
                    <MotionDiv
                      key={index}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {Icon && (
                        <Icon
                          className={className}
                          size={14}
                          aria-label={stack}
                        />
                      )}
                      <span className="whitespace-nowrap">{stack}</span>
                    </MotionDiv>
                  );
                })}
                {stacks.length > 3 && (
                  <div className="flex items-center px-3 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 text-xs text-neutral-400">
                    <span className="whitespace-nowrap">
                      +{stacks.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </MotionDiv>
      </Link>
    </li>
  );
};

export default FeaturedProjectItem;
