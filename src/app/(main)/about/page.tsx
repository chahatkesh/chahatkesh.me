import Image from "next/image";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { ProfessionalExperience } from "~/components/sections";
import chahat from "~/assets/images/chahat.jpeg";
import workspaceImage from "~/assets/images/workspace-desk.jpg";
import { BackButton } from "~/components/shared";
import { MotionDiv } from "~/components/shared";
import Link from "next/link";
import {
  FaBook,
  FaRunning,
  FaYoutube,
  FaLaptop,
  FaHeadphones,
  FaMobileAlt,
  FaPenFancy,
} from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui";
import { Metadata } from "next";
import config from "~/config";

export const metadata: Metadata = getSEOTags({
  title: "About Me",
  description: `Learn more about ${config.appName}, a ${config.appDesignation} with experience in web development and product design. Discover my journey, skills, and interests.`,
  openGraph: {
    title: `About ${config.appName} - ${config.appDesignation}`,
    description: `Learn more about my background, skills, and journey as a ${config.appDesignation}. Get to know the person behind the code.`,
  },
  canonicalUrlRelative: "/about",
});

// My current projects/work
const currentProjects = [
  {
    title: "Ninja: Stop Dialing. Stop Chasing. Let AI Book Meetings for You.",
    description:
      "Transform real estate agents into high performers with AI co-pilots. Autonomous lead outreach, 24/7 follow-ups, intelligent appointment booking, and conversation management. Integrates WhatsApp Business, Vonage voice, Cal.com scheduling.",
    url: "https://staging.silentninja.tech/",
  },
];

// My hobbies
const hobbies = [
  {
    title: "Reading",
    description:
      "I enjoy reading non-fiction books on technology, psychology, and personal growth",
    icon: <FaBook className="text-amber-500" />,
  },
  {
    title: "Gym",
    description:
      "Regular workout sessions to stay fit and maintain a healthy work-life balance",
    icon: <FaRunning className="text-green-400" />,
  },
  {
    title: "Designing",
    description:
      "Creating visually appealing UI/UX designs and digital artwork in my free time",
    icon: <FaPenFancy className="text-blue-300" />,
  },
  {
    title: "Content Creation",
    description:
      "Creating fun tech content and tutorials for the developer community",
    icon: <FaYoutube className="text-red-500" />,
  },
];

// My workspace/desk setup
const deskSetup = [
  {
    name: "MacBook Pro M3 (2023)",
    icon: <FaLaptop className="text-gray-300" />,
  },
  {
    name: "CMF by Nothing Buds 2",
    icon: <FaHeadphones className="text-blue-300" />,
  },
  {
    name: "XP Pen Deco01 V2",
    icon: <FaPenFancy className="text-orange-400" />,
  },
  { name: "iPhone 15 Pro", icon: <FaMobileAlt className="text-gray-400" /> },
];

const AboutPage = () => {
  return (
    <MotionDiv>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Me", url: "/about" },
      ])}
      <div className="space-y-12">
        <BackButton>Back</BackButton>
        <section className="space-y-4">
          {/* Hero Section */}
          <div className="!mt-8 space-y-14">
            <section
              className="grid gap-8 sm:gap-6 md:grid-cols-3"
              aria-label="About Me"
            >
              <div className="order-2 space-y-4 sm:order-1 md:col-span-2">
                <h1 className="font-ubuntu text-2xl font-semibold text-white sm:text-3xl">
                  Chahat Kesharwani
                </h1>

                <p className={typo({ variant: "paragraph", font: "sans" })}>
                  <span className="text-white">Hello there!</span> I'm a
                  passionate developer and engineering student from India,
                  focused on creating beautiful, functional web experiences.
                </p>

                <p className={typo({ variant: "paragraph", font: "sans" })}>
                  I specialize in modern web development using React, Next.js,
                  and TypeScript. My journey in tech has been filled with
                  learning, building, and collaborating on projects that solve
                  real problems.
                </p>

                <p className={typo({ variant: "paragraph", font: "sans" })}>
                  Currently, I'm pursuing my engineering degree while working on
                  freelance projects and open-source contributions. If you’d
                  like to know more about the work I do, feel free to browse
                  through my{" "}
                  <Link
                    href="https://drive.google.com/file/d/1HEdKZYNu8Q_0Cu2zM0BMCR5lf8XpO_gs/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="el-focus-styles text-ring"
                  >
                    Resume
                  </Link>
                  .
                </p>

                <p
                  className={cn(
                    typo({ variant: "paragraph", font: "sans" }),
                    "sm:!mt-4",
                  )}
                >
                  And if you're curious about the moments that shaped me,
                  explore{" "}
                  <Link
                    href="/about/journey"
                    className="el-focus-styles text-ring"
                  >
                    My Storyline
                  </Link>
                  .
                </p>
              </div>

              <div className="relative order-1 block aspect-square sm:order-2">
                <div className="absolute inset-0 -z-10 size-full rounded-md bg-[#00adb5]"></div>
                <Image
                  alt="Chahat Kesharwani profile picture"
                  src={chahat}
                  placeholder="blur"
                  className="size-full -rotate-3 transform rounded-md shadow-md"
                  priority
                />
              </div>
            </section>

            {/* My Workspace Section */}
            <section className="mt-10 space-y-6" aria-label="My Workspace">
              <h2 className={typo({ variant: "h2" })}>My Workspace</h2>

              <div className="mt-6 space-y-6">
                {/* Full-width workspace image */}
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-800">
                  <Image
                    src={workspaceImage}
                    alt="My workspace setup"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                </div>

                {/* Setup list below in smaller format */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                  {deskSetup.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-neutral-300 transition-transform duration-300 hover:scale-105 hover:text-white"
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Professional Experience Section */}
            <ProfessionalExperience />

            {/* Current Work Section */}
            <section className="mt-10 space-y-6" aria-label="Current Work">
              <h2 className={typo({ variant: "h2" })}>
                What I'm Currently Working On
              </h2>

              <div className="mt-4 grid gap-6 sm:grid-cols-1">
                {currentProjects.map((project, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-900/20">
                            <h3 className="font-ubuntu text-base font-medium text-white mb-3">
                              {project.title}
                            </h3>
                            <p className="text-sm text-neutral-400">
                              {project.description}
                            </p>
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to view</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </section>

            {/* Let's Connect Section */}
            <section className="mt-10 space-y-6" aria-label="Let's Connect">
              <h2 className={typo({ variant: "h2" })}>Let's Connect</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {/* Book a Call CTA */}
                <Link
                  href="https://cal.com/chahatkesh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="h-full rounded-lg border-2 border-ring/30 bg-ring/5 p-6 transition-all duration-300 hover:border-ring/50 hover:bg-ring/10">
                    <div className="mb-3 flex items-center gap-3">
                      <h3 className="font-ubuntu text-base font-medium text-white">
                        Book a Call
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-400 mb-3">
                      Schedule a 30-minute 1:1 meeting to discuss your project,
                      ideas, or just chat about tech.
                    </p>
                    <div className="flex items-center gap-2 text-ring text-sm font-medium">
                      <span>Schedule Now</span>
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>

                {/* All Links CTA */}
                <Link href="/links" className="group block">
                  <div className="h-full rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-800/50 hover:shadow-lg hover:shadow-neutral-900/20">
                    <div className="mb-3 flex items-center gap-3">
                      <h3 className="font-ubuntu text-base font-medium text-white">
                        All My Links
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-400 mb-3">
                      Find all my social profiles, projects, and ways to connect
                      with me in one place.
                    </p>
                    <div className="flex items-center gap-2 text-ring text-sm font-medium">
                      <span>View Links</span>
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </div>
            </section>

            {/* Beyond Code Section */}
            <section className="mt-10 space-y-6" aria-label="Beyond Code">
              <h2 className={typo({ variant: "h2" })}>Beyond Code</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {hobbies.map((hobby, index) => (
                  <div
                    key={index}
                    className="group rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-900/20"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800/50 transition-transform duration-300 group-hover:rotate-6">
                        {hobby.icon}
                      </div>
                      <h3 className="font-ubuntu text-base font-medium text-white">
                        {hobby.title}
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-400">
                      {hobby.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Portfolio Evolution Section */}
            <section
              className="mt-10 space-y-6"
              aria-label="Portfolio Evolution"
            >
              <h2 className={typo({ variant: "h2" })}>Portfolio Evolution</h2>
              <div className="relative">
                {/* Timeline line - vertical on mobile, horizontal on desktop */}
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-800 opacity-50 md:left-0 md:right-0 md:top-2 md:bottom-auto md:h-0.5 md:w-auto md:bg-gradient-to-r" />

                <div className="space-y-6 md:grid md:grid-cols-4 md:gap-6 md:space-y-0">
                  {/* Version 4.0 - Current */}
                  <div className="group relative flex items-center gap-4 md:flex-col md:items-start md:space-y-3">
                    <div className="relative z-10 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-ring border-2 border-neutral-900 shadow-lg shadow-ring/20" />
                    <div className="flex-1 md:space-y-1">
                      <span className="block font-ubuntu text-sm font-medium text-white">
                        v4.0
                      </span>
                      <span className="block text-xs text-ring">
                        Next.js - Current Version
                      </span>
                    </div>
                  </div>

                  {/* Version 3.0 */}
                  <Link
                    href="https://v3.chahatkesh.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 transition-all duration-300 md:flex-col md:items-start md:space-y-3"
                  >
                    <div className="relative z-10 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-neutral-800 border-2 border-neutral-900 group-hover:bg-neutral-700 transition-colors" />
                    <div className="flex-1 md:space-y-1">
                      <span className="block font-ubuntu text-sm font-medium text-white group-hover:text-ring transition-colors">
                        v3.0
                      </span>
                      <span className="block text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
                        React + Tailwind - My Minimal Era
                      </span>
                    </div>
                  </Link>

                  {/* Version 2.0 */}
                  <Link
                    href="https://v2.chahatkesh.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 transition-all duration-300 md:flex-col md:items-start md:space-y-3"
                  >
                    <div className="relative z-10 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-neutral-800 border-2 border-neutral-900 group-hover:bg-neutral-700 transition-colors" />
                    <div className="flex-1 md:space-y-1">
                      <span className="block font-ubuntu text-sm font-medium text-white group-hover:text-ring transition-colors">
                        v2.0
                      </span>
                      <span className="block text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
                        Stepping into React
                      </span>
                    </div>
                  </Link>

                  {/* Version 1.0 */}
                  <Link
                    href="https://v1.chahatkesh.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 transition-all duration-300 md:flex-col md:items-start md:space-y-3"
                  >
                    <div className="relative z-10 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-neutral-800 border-2 border-neutral-900 group-hover:bg-neutral-700 transition-colors" />
                    <div className="flex-1 md:space-y-1">
                      <span className="block font-ubuntu text-sm font-medium text-white group-hover:text-ring transition-colors">
                        v1.0
                      </span>
                      <span className="block text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
                        HTML/CSS Beginnings
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </MotionDiv>
  );
};

export default AboutPage;
