import Image from "next/image";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { ProfessionalExperience } from "~/components/sections";
import chahat from "~/assets/images/chahat.jpeg";
import workspaceImage from "~/assets/images/workspace-desk.jpg";
import { Breadcrumb } from "~/components/shared";
import { MotionDiv } from "~/components/shared";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui";
import { type Metadata } from "next";
import config from "~/config";
import {
  currentProjects,
  hobbies,
  deskSetup,
  portfolioVersions,
} from "~/data/about";

export const metadata: Metadata = getSEOTags({
  title: "About Me",
  description: `Learn more about ${config.appName}, a ${config.appDesignation} with experience in web development and product design. Discover my journey, skills, and interests.`,
  openGraph: {
    title: `About ${config.appName} - ${config.appDesignation}`,
    description: `Learn more about my background, skills, and journey as a ${config.appDesignation}. Get to know the person behind the code.`,
  },
  canonicalUrlRelative: "/about",
});

const AboutPage = () => {
  return (
    <MotionDiv>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Me", url: "/about" },
      ])}
      <div className="space-y-12">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "About Me", url: "/about" },
          ]}
        />
        <section className="space-y-4">
          {/* Hero Section */}
          <div className="!mt-8 space-y-14">
            <section aria-label="About Me">
              <h1 className="font-ubuntu text-2xl font-semibold text-white sm:text-3xl mb-4 sm:mb-5">
                Chahat, 20
              </h1>

              <div className="grid gap-8 sm:gap-6 md:grid-cols-3">
                <div className="order-2 space-y-4 sm:order-1 md:col-span-2">
                  <p className={typo({ variant: "paragraph", font: "sans" })}>
                    I&apos;ve been building since before I had a good reason to.
                    Websites, tools, startups that didn&apos;t work, startups
                    that did. Every project taught me something a textbook
                    couldn&apos;t.
                  </p>

                  <p className={typo({ variant: "paragraph", font: "sans" })}>
                    Late-night side projects, AI research at IIT Ropar,
                    hackathon wins, and now a founding engineer role at a
                    Singapore-based startup. Each step was less about the
                    destination and more about how much I could learn before the
                    next one.
                  </p>

                  <p className={typo({ variant: "paragraph", font: "sans" })}>
                    What excites me isn&apos;t just the technology. It&apos;s
                    the architecture. How systems fit together. How fast a
                    focused team can ship without breaking things. How good
                    design and good engineering are actually the same
                    discipline.
                  </p>

                  <p className={typo({ variant: "paragraph", font: "sans" })}>
                    I&apos;m working towards building AI products that reduce
                    unnecessary human effort, and learning something new every
                    day along the way. If you want the full picture, start with
                    my{" "}
                    <Link
                      href="https://drive.google.com/file/d/1V1oHB7fOUaQdKLrHFtQv1ehIoqUkrwYv/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="el-focus-styles text-ring"
                    >
                      Resume
                    </Link>{" "}
                    or explore{" "}
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
                  <div className="absolute inset-0 -z-10 size-full rounded-md bg-brand"></div>
                  <Image
                    alt="Chahat Kesharwani profile picture"
                    src={chahat}
                    placeholder="blur"
                    className="size-full -rotate-3 transform rounded-md shadow-md"
                    priority
                  />
                </div>
              </div>
            </section>

            {/* My Workspace Section */}
            <section className="mt-10 space-y-6" aria-label="My Workspace">
              <h2 className={typo({ variant: "h2" })}>Where I Work</h2>

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
                  {deskSetup.map((item) => (
                    <div
                      key={item.name}
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
                What I&apos;m Built On Right Now
              </h2>

              <div className="mt-4 grid gap-6 sm:grid-cols-1">
                {currentProjects.map((project) => (
                  <TooltipProvider key={project.title}>
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
              <h2 className={typo({ variant: "h2" })}>Get in Touch</h2>
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
                      30 minutes. Your project, your idea, or just a
                      conversation about something you&apos;re building.
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
                      Every place I exist online, in one spot.
                    </p>
                    <div className="flex items-center gap-2 text-ring text-sm font-medium">
                      <span>View Links</span>
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </div>
            </section>

            {/* Poem Section */}
            <section aria-label="A note on me" className="mt-10">
              <h2 className={typo({ variant: "h2" })}>
                A note I wrote to myself
              </h2>
              <div className="relative mt-6 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/30 px-7 py-9 sm:px-9 sm:py-10">
                <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl bg-ring opacity-45" />
                <span
                  aria-hidden="true"
                  className="absolute -top-2 left-5 select-none font-poem text-[7rem] leading-none text-ring/15 sm:text-[8.5rem]"
                >
                  &ldquo;
                </span>
                <div className="relative space-y-5 pl-2 font-poem text-[0.98rem] italic leading-[1.85] text-neutral-400 sm:text-[1.03rem]">
                  <p>
                    I build things with care,
                    <br />
                    and sometimes I hate how much I care.
                  </p>
                  <p>
                    I overthink everything.
                    <br />
                    the work, the words, the weight of it all.
                    <br />
                    I fix what I can,
                    <br />
                    and apologize for what I can&apos;t.
                  </p>
                  <p>
                    I hold on too long.
                    <br />
                    to ideas, to people.
                    <br />
                    even when they&apos;ve already let go.
                  </p>
                  <p>
                    And sometimes I feel alone,
                    <br />
                    not because no one&apos;s there,
                    <br />
                    but because I go deeper than most.
                  </p>
                  <p className="not-italic text-neutral-200">
                    still waiting to meet someone
                    <br />
                    who loves as <em className="italic text-ring">
                      fiercely
                    </em>{" "}
                    as I build.
                  </p>
                </div>
              </div>
            </section>

            {/* Beyond Code Section */}
            <section className="mt-10 space-y-6" aria-label="Beyond Code">
              <h2 className={typo({ variant: "h2" })}>Outside the Screen</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {hobbies.map((hobby) => (
                  <div
                    key={hobby.title}
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

                <div
                  className="space-y-6 md:gap-6 md:space-y-0 md:grid"
                  style={{
                    gridTemplateColumns: `repeat(${portfolioVersions.length}, minmax(0, 1fr))`,
                  }}
                >
                  {portfolioVersions.map((v) => {
                    const inner = (
                      <>
                        <div
                          className={cn(
                            "relative z-10 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-neutral-900",
                            v.isCurrent
                              ? "bg-ring shadow-lg shadow-ring/20"
                              : "bg-neutral-800 group-hover:bg-neutral-700 transition-colors",
                          )}
                        />
                        <div className="flex-1 md:space-y-1">
                          <span
                            className={cn(
                              "block font-ubuntu text-sm font-medium",
                              v.isCurrent
                                ? "text-white"
                                : "text-white group-hover:text-ring transition-colors",
                            )}
                          >
                            {v.version}
                          </span>
                          <span
                            className={cn(
                              "block text-xs",
                              v.isCurrent
                                ? "text-ring"
                                : "text-neutral-400 group-hover:text-neutral-300 transition-colors",
                            )}
                          >
                            {v.label}
                          </span>
                        </div>
                      </>
                    );

                    if (v.url) {
                      return (
                        <Link
                          key={v.version}
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center gap-4 transition-all duration-300 md:flex-col md:items-start md:space-y-3"
                        >
                          {inner}
                        </Link>
                      );
                    }

                    return (
                      <div
                        key={v.version}
                        className="group relative flex items-center gap-4 md:flex-col md:items-start md:space-y-3"
                      >
                        {inner}
                      </div>
                    );
                  })}
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
