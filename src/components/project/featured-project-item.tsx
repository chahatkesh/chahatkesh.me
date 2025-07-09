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

type FeaturedProjectItemProps = {
  metadata?: boolean;
} & Project;

// Combine all tech stacks for icon lookup
const ALL_STACKS = {
  ...FRONTEND_STACKS,
  ...BACKEND_DEVOPS,
  ...LANGUAGES_TOOLS
};

const FeaturedProjectItem: React.FC<FeaturedProjectItemProps> = ({
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
    <li role="listitem" className="featured-project">
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
      <Link href={`/projects/${slug}`} className="block">
        <MotionDiv 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Left side with gradient and image */}
          <div className="relative flex flex-col justify-center items-center p-8 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black overflow-hidden">
            <p className="text-sm text-neutral-400 mb-6 text-center">{tagline}</p>
            
            <MotionDiv 
              className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                alt={`${title} screenshot`}
                priority
                placeholder="blur"
                src={cover}
                className="w-full h-full object-cover"
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500 opacity-10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-500 opacity-10 rounded-full blur-xl"></div>
            </MotionDiv>
          </div>
          
          {/* Right side with content */}
          <div className="p-8 flex flex-col h-full">
            <h2 className="font-ubuntu text-xl font-bold mb-3">{title}</h2>
            
            <p className={cn(typo({ variant: "paragraph", size: "sm" }), "mb-4")}>
              {description}
            </p>
            
            <h3 className="text-sm font-medium text-neutral-300 mb-2">Key Features</h3>
            <ul className="mb-6 space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-sm text-neutral-400 flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <div className="mt-auto">
              <h3 className="text-sm font-medium text-neutral-300 mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {stacks.map((stack, index) => {
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
                      {Icon && <Icon className={className} size={14} aria-label={stack} />}
                      <span className="whitespace-nowrap">{stack}</span>
                    </MotionDiv>
                  );
                })}
              </div>
            </div>
          </div>
        </MotionDiv>
      </Link>
    </li>
  );
};

export default FeaturedProjectItem;
