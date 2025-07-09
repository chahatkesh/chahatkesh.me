"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { typo } from "../ui/typograpghy";
import { ProjectJsonLd } from "./project-jsonld";
import config from "~/config";
import { Project } from "~/data/projects";
import { FRONTEND_STACKS, BACKEND_DEVOPS, LANGUAGES_TOOLS } from "~/data/stack";
import { MotionDiv } from "../motion-wrapper";

type ProjectItemProps = {
  metadata?: boolean;
} & Project;

// Combine all tech stacks for icon lookup
const ALL_STACKS = {
  ...FRONTEND_STACKS,
  ...BACKEND_DEVOPS,
  ...LANGUAGES_TOOLS
};

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  cover,
  stacks,
  slug,
  datePublished,
  dateModified,
  metadata = false,
  tagline,
  features,
}) => {
  return (
    <li role="listitem">
      {metadata && (
        <ProjectJsonLd
          title={title}
          description={description}
          slug={slug}
          datePublished={datePublished}
          dateModified={dateModified}
          image={`https://${config.domainName}${cover.src}`}
          tags={stacks}
        />
      )}
      <Link href={`/projects/${slug}`}>
        <MotionDiv 
          className="grid grid-cols-1 sm:grid-cols-5 gap-4 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3 }}
        >
          {/* Left side with full image and tagline overlay - takes 2/5 of the width */}
          <div className="sm:col-span-2 relative bg-gradient-to-br from-neutral-900 via-neutral-950 to-black overflow-hidden">              <MotionDiv 
              className="relative w-full h-full min-h-[200px] overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
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
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-500 opacity-10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-purple-500 opacity-10 rounded-full blur-xl"></div>
            </MotionDiv>
          </div>
          
          {/* Right side with content - takes 3/5 of the width */}
          <div className="sm:col-span-3 flex flex-col p-4">
            <h2 className="font-ubuntu text-base font-semibold mb-2">{title}</h2>
            
            <p className={cn(typo({ variant: "paragraph", size: "sm" }), "mb-3 line-clamp-2")}>
              {description}
            </p>
            
            {features && features.length > 0 && (
              <ul className="mb-4 space-y-1">
                {features.map((feature, index) => (
                  <li key={index} className="text-xs text-neutral-400 flex items-start">
                    <span className="mr-1 text-primary">•</span>
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            
            <div className="mt-auto">
              <div className="flex flex-wrap gap-1.5">
                {stacks.slice(0, 5).map((stack, index) => {
                  const techInfo = ALL_STACKS[stack];
                  const Icon = techInfo?.Icon;
                  const className = techInfo?.className || "text-neutral-400";
                  
                  return (
                    <MotionDiv
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px]"
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {Icon && <Icon className={className} size={12} aria-label={stack} />}
                      <span className="whitespace-nowrap">{stack}</span>
                    </MotionDiv>
                  );
                })}
                {stacks.length > 5 && (
                  <span className="text-xs text-neutral-500 self-end pl-1">
                    +{stacks.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </MotionDiv>
      </Link>
    </li>
  );
};
export default ProjectItem;
