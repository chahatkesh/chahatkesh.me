"use client";
import Image from "next/image";
import { typo } from "./ui/typograpghy";
import { cn } from "~/lib/utils";

// Import images
import AnnamAILogo from "../assets/images/experience/AnnamAI.png";
import LevelSuperMindLogo from "../assets/images/experience/LevelSuperMind.png";
import XceedLogo from "../assets/images/experience/Xceed.png";

type Experience = {
  employer: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
  logo: any; // StaticImageData type
};

const experiences: Experience[] = [
  {
    employer: "Annam.ai (IIT Ropar)",
    role: "Research Intern - AI Systems",
    start_date: "May 2025",
    end_date: "Present",
    description: "Contributed to the development of an internal AI engine with modular pipelines for classification and inference. Built domain-specific classifiers and optimized data modeling strategies to improve AI inference accuracy.",
    logo: AnnamAILogo
  },
  {
    employer: "Level SuperMind",
    role: "Fullstack Developer",
    start_date: "Jan 2025",
    end_date: "Feb 2025",
    description: "Developed 15+ reusable UI components and integrated 5+ third-party APIs, resulting in 30% faster load times. Revamped onboarding with optimized API flows, reducing user setup time by 20%. Tech stack: Next.js, TypeScript, Tailwind CSS, ShadCN UI, LiveKit, Framer Motion.",
    logo: LevelSuperMindLogo
  },
  {
    employer: "Xceed NITJ",
    role: "Fullstack Developer",
    start_date: "Nov 2023",
    end_date: "Jun 2024",
    description: "Collaborated with a 22-member team to build a Certificate Module for bulk certificate generation and distribution. Designed and shipped a user dashboard, used by 20+ college clubs for streamlined certificate distribution. Tech stack: React.js, Tailwind CSS, Chakra UI, Axios, Framer Motion, html2Canvas.",
    logo: XceedLogo
  }
];

const ProfessionalExperience = () => {
  return (
    <section aria-label="professional experience" className="mt-5 space-y-6" id="experience">
      <h2 className={typo({ variant: "h2" })}>Professional Experience</h2>
      <div className="!mt-8">
        <ol className="grid gap-8" role="list">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
};

const ExperienceCard = ({ experience }: { experience: Experience; index: number }) => {
  return (
    <li role="listitem" className="transition-all duration-300">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="flex-shrink-0 hidden md:block">
            <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-800 bg-neutral-800/50">
              <Image
                src={experience.logo}
                alt={`${experience.employer} logo`}
                fill
                sizes="64px"
                className="object-contain p-2"
                priority
              />
            </div>
          </div>
          
          <div className="flex flex-1 flex-col space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-ubuntu text-base font-medium text-white">{experience.role}</h3>
                <p className="text-sm text-neutral-400">{experience.employer}</p>
              </div>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs font-medium text-neutral-300">
                  {experience.start_date} - {experience.end_date}
                </span>
              </div>
            </div>
            
            
            
            <p className={cn(typo({ variant: "paragraph", size: "sm" }), "text-neutral-300 mt-1")}>
              {experience.description}
            </p>
          </div>
        </div>

    </li>
  );
};

export default ProfessionalExperience;
