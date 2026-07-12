import Image from "next/image";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { ProfessionalExperience } from "~/components/sections";
import chahat from "~/assets/images/chahat.jpeg";
import workspaceImage from "~/assets/images/workspace-desk.jpg";
import illustration from "~/assets/images/illustration.png";
import { Breadcrumb } from "~/components/shared";
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
import { LinkPreviewImage } from "~/components/features";
import { getOgImageUrlsForLinks } from "~/lib/og";
import {
  currentProjects,
  hobbies,
  deskSetup,
  portfolioVersions,
} from "~/data/about";

export const metadata: Metadata = getSEOTags({
  title: "About",
  description:
    "I build AI-powered products, ship production systems, and care about craft across product, design, and engineering.",
  openGraph: {
    title: `About ${config.appName} — ${config.appDesignation}`,
    description:
      "I build AI-powered products, ship production systems, and care about craft across product, design, and engineering.",
  },
  canonicalUrlRelative: "/about",
});

const AboutPage = async () => {
  const visibleProjects = currentProjects.filter(
    (project) => project.showInAbout,
  );

  // Resolve Open Graph preview images for current-work links in one reusable pass.
  const currentProjectPreviewsByUrl =
    await getOgImageUrlsForLinks(visibleProjects);

  return (
    <>
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
              <h1 className="font-ubuntu text-2xl font-semibold text-foreground sm:text-3xl mb-4 sm:mb-5">
                Chahat, 20
              </h1>

              <div className="grid gap-6 sm:gap-6 md:grid-cols-3 md:items-stretch">
                <div className="order-2 space-y-4 sm:order-1 md:col-span-2">
                  <p className={typo({ variant: "paragraph", font: "sans" })}>
                    I&apos;ve been building since before I had a good reason to.
                    Websites, tools, startups that didn&apos;t work, startups
                    that did. Every project taught me something a textbook
                    couldn&apos;t.
                  </p>

                  <p className={typo({ variant: "paragraph", font: "sans" })}>
                    Late-night side projects, AI research at IIT Ropar,
                    hackathon wins, a founding engineer role at a
                    Singapore-based startup, and now co-founding Layr. Each step
                    has been less about the destination and more about how much
                    I could learn before the next one.
                  </p>

                  <p className={typo({ variant: "paragraph", font: "sans" })}>
                    What excites me isn&apos;t just the technology. It&apos;s
                    the architecture. How systems fit together. How fast a
                    focused team can ship without breaking things. How good
                    design and good engineering are actually the same
                    discipline.
                  </p>

                  <p className={typo({ variant: "paragraph", font: "sans" })}>
                    I want to build AI products that reduce unnecessary human
                    effort, and I&apos;m looking to contribute to meaningful
                    problems where I can work across product, design, and
                    engineering—not just execute tickets. If you want the full
                    picture, start with my{" "}
                    <Link
                      href="/resume"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-inline"
                    >
                      Resume
                    </Link>{" "}
                    or explore{" "}
                    <Link href="/about/journey" className="link-inline">
                      My Storyline
                    </Link>
                    .
                  </p>
                </div>

                <div className="order-1 w-full sm:order-2 md:h-full">
                  <div className="relative aspect-[4/5] w-full md:aspect-auto md:h-full">
                    <div
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-md bg-brand"
                    />
                    <Image
                      alt="Chahat Kesharwani profile picture"
                      src={chahat}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 768px) 280px, 100vw"
                      className="object-cover object-[center_18%] -rotate-2 rounded-md shadow-md md:-rotate-3"
                      priority
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* My Workspace Section */}
            <section className="mt-10 space-y-6" aria-label="My Workspace">
              <h2 className={typo({ variant: "h2" })}>Where I Work</h2>

              <div className="mt-6 space-y-6">
                {/* Full-width workspace image */}
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
                  <Image
                    src={workspaceImage}
                    alt="My workspace setup"
                    fill
                    className="object-cover"
                    sizes="(min-width: 912px) 880px, 100vw"
                    priority
                  />
                </div>

                {/* Setup list below in smaller format */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                  {deskSetup.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 text-foreground/80 transition-transform duration-300 hover:scale-105 hover:text-foreground"
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
                What I&apos;m Building Right Now
              </h2>

              <div className="mt-4 grid gap-6 sm:grid-cols-1">
                {visibleProjects.map((project, index) => {
                  const previewImage = currentProjectPreviewsByUrl[project.url];

                  return (
                    <TooltipProvider key={project.title}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="el-focus-styles group block rounded-lg"
                          >
                            <div
                              className={cn(
                                "flex flex-col gap-4 overflow-hidden rounded-lg border border-border bg-card/50 p-4 transition-all duration-300 hover:border-muted-foreground/30 hover:shadow-lg hover:shadow-black/20 sm:gap-5 sm:p-5",
                                index % 2 === 0
                                  ? "sm:flex-row"
                                  : "sm:flex-row-reverse",
                              )}
                            >
                              {previewImage && (
                                <LinkPreviewImage
                                  previewImage={previewImage}
                                  alt={`${project.title} preview`}
                                  sizes="(max-width: 640px) 100vw, 224px"
                                  className="shrink-0 rounded-md border border-border/60 sm:aspect-auto sm:w-52 sm:self-stretch sm:-mb-5 sm:rounded-b-none sm:border-b-0 md:w-56"
                                />
                              )}
                              <div className="flex-1 sm:py-1">
                                <h3 className="font-ubuntu text-base font-medium text-foreground mb-3">
                                  {project.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {project.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to view</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
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
                  className="el-focus-styles group block rounded-lg"
                >
                  <div className="h-full rounded-lg border-2 border-ring/30 bg-ring/5 p-6 transition-all duration-300 hover:border-ring/50 hover:bg-ring/10">
                    <div className="mb-3 flex items-center gap-3">
                      <h3 className="font-ubuntu text-base font-medium text-foreground">
                        Book a Call
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
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
                <Link
                  href="/links"
                  className="el-focus-styles group block rounded-lg"
                >
                  <div className="h-full rounded-lg border border-border bg-card/50 p-6 transition-all duration-300 hover:border-muted-foreground/30 hover:bg-muted/50 hover:shadow-lg hover:shadow-black/20">
                    <div className="mb-3 flex items-center gap-3">
                      <h3 className="font-ubuntu text-base font-medium text-foreground">
                        All My Links
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
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
              <div className="relative mt-6 overflow-hidden rounded-xl border border-border bg-card/30 px-7 py-9 sm:px-9 sm:py-10">
                <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl bg-ring opacity-45" />
                <span
                  aria-hidden="true"
                  className="absolute -top-2 left-5 select-none font-poem text-[7rem] leading-none text-ring/15 sm:text-[8.5rem]"
                >
                  &ldquo;
                </span>
                {/* Decorative illustration */}
                <Image
                  src={illustration}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-auto select-none object-contain sm:block"
                />
                <div className="relative z-10 space-y-5 pl-2 font-poem text-[0.98rem] italic leading-[1.85] text-muted-foreground sm:text-[1.03rem]">
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
                  <p className="not-italic text-foreground/90">
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
                  <Link
                    key={hobby.title}
                    href={hobby.href}
                    className="el-focus-styles group block rounded-lg border border-border bg-card/50 p-6 transition-all duration-300 hover:border-muted-foreground/30 hover:shadow-lg hover:shadow-black/20"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 transition-transform duration-300 group-hover:rotate-6">
                        {hobby.icon}
                      </div>
                      <h3 className="font-ubuntu text-base font-medium text-foreground">
                        {hobby.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {hobby.description}
                    </p>
                  </Link>
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
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-border via-muted-foreground/30 to-border opacity-50 md:left-0 md:right-0 md:top-2 md:bottom-auto md:h-0.5 md:w-auto md:bg-gradient-to-r" />

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
                            "relative z-10 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-background transition-all duration-300",
                            v.isCurrent
                              ? "bg-ring shadow-lg shadow-ring/20 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-ring/30"
                              : "bg-muted group-hover:bg-muted-foreground/30",
                          )}
                        />
                        <div className="flex-1 md:space-y-1">
                          <span className="block font-ubuntu text-sm font-medium text-foreground transition-colors group-hover:text-ring">
                            {v.version}
                          </span>
                          <span
                            className={cn(
                              "block text-xs transition-colors",
                              v.isCurrent
                                ? "text-ring group-hover:text-ring/80"
                                : "text-muted-foreground group-hover:text-foreground/80",
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
                          className="el-focus-styles group relative flex items-center gap-4 rounded-md transition-all duration-300 md:flex-col md:items-start md:space-y-3"
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
    </>
  );
};

export default AboutPage;
