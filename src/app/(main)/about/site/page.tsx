import { Metadata } from "next";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { MotionDiv } from "~/components/shared";
import { Breadcrumb } from "~/components/shared";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui";
import Link from "next/link";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiVercel,
} from "react-icons/si";
import { getLatestCommits } from "~/lib/github";

export const metadata: Metadata = getSEOTags({
  title: "About This Site",
  description:
    "Technical details about this portfolio website - tech stack, design system, typography, and architecture.",
  openGraph: {
    title: `About This Site - ${config.appName}`,
    description:
      "Explore the technical stack, design philosophy, and architecture behind this portfolio.",
  },
  canonicalUrlRelative: "/about/site",
});

const SitePage = async () => {
  const latestCommits = await getLatestCommits(5);
  const techStack = [
    {
      name: "Next.js",
      version: "16.1.1",
      icon: SiNextdotjs,
      color: "text-neutral-400",
    },
    {
      name: "React",
      version: "19.2.3",
      icon: SiReact,
      color: "text-sky-500",
    },
    {
      name: "TypeScript",
      version: "5.9.3",
      icon: SiTypescript,
      color: "text-blue-400",
    },
    {
      name: "Tailwind CSS",
      version: "3.4.1",
      icon: SiTailwindcss,
      color: "text-cyan-300",
    },
    {
      name: "MongoDB",
      version: "9.0.2",
      icon: SiMongodb,
      color: "text-green-500",
    },
    {
      name: "Vercel",
      version: "Latest",
      icon: SiVercel,
      color: "text-neutral-400",
    },
  ];

  const testingStrategy = [
    {
      category: "Code Quality",
      tools: [
        { name: "ESLint", purpose: "JavaScript/TypeScript linting" },
        { name: "Prettier", purpose: "Code formatting" },
        { name: "TypeScript", purpose: "Type checking" },
      ],
    },
    {
      category: "Pre-commit Hooks",
      tools: [
        { name: "Husky", purpose: "Git hooks management" },
        { name: "lint-staged", purpose: "Run linters on staged files" },
      ],
    },
    {
      category: "Build & Deploy",
      tools: [
        { name: "Next.js Build", purpose: "Production build validation" },
        { name: "Type Check", purpose: "TypeScript compilation check" },
        { name: "Vercel", purpose: "Automated deployment checks" },
      ],
    },
  ];

  const pages = [
    { path: "/", name: "Home", description: "Landing page with introduction" },
    {
      path: "/about",
      name: "About",
      description: "Personal information and bio",
    },
    {
      path: "/about/journey",
      name: "Journey",
      description: "Timeline of life events",
    },
    {
      path: "/about/journey/btech",
      name: "Btech Learning Details",
      description: "Academic course details",
    },
    {
      path: "/about/experience",
      name: "Experience",
      description: "Professional work timeline",
    },
    {
      path: "/projects",
      name: "Projects",
      description: "Portfolio projects showcase",
    },
    { path: "/gallery", name: "Gallery", description: "Photo collection" },
    {
      path: "/about/site",
      name: "About This Site",
      description: "Technical details of this portfolio",
    },
  ];

  return (
    <>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
        { name: "About This Site", url: "/about/site" },
      ])}

      <MotionDiv>
        <div className="space-y-8">
          <Breadcrumb
            items={[
              { name: "Home", url: "/" },
              { name: "About", url: "/about" },
              { name: "About This Site", url: "/about/site" },
            ]}
          />

          <MotionDiv
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={cn(typo({ variant: "h2" }))}>About This Site</h1>
            <p className={cn(typo({ variant: "paragraph" }))}>
              Technical details, design philosophy, and architecture behind this
              portfolio.
            </p>
          </MotionDiv>

          {/* Tech Stack with Versions */}
          <section className="space-y-4">
            <h2 className={cn(typo({ variant: "h2" }))}>Tech Stack</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {techStack.map((tech, index) => (
                <MotionDiv
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <tech.icon className={cn("text-xl", tech.color)} />
                    <span className="text-sm font-medium text-neutral-200">
                      {tech.name}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">
                    v{tech.version}
                  </span>
                </MotionDiv>
              ))}
            </div>
          </section>

          {/* Design Philosophy */}
          <section className="space-y-4">
            <h2 className={cn(typo({ variant: "h2" }))}>Design Philosophy</h2>
            <div className="space-y-3 text-neutral-300 text-justify">
              <p className={cn(typo({ variant: "paragraph", size: "sm" }))}>
                Every pixel on this site tells a story of{" "}
                <strong className="text-white font-medium">
                  intentional choices
                </strong>
                . I believe that great design isn't about adding more—it's about{" "}
                <strong className="text-white font-medium">
                  knowing what to take away
                </strong>
                . This portfolio embraces a minimal, content-first philosophy
                inspired by Apple's timeless elegance, where every element
                serves a purpose.
              </p>
              <p className={cn(typo({ variant: "paragraph", size: "sm" }))}>
                The{" "}
                <strong className="text-white font-medium">
                  pure black background
                </strong>{" "}
                (#000000) creates a sanctuary where your attention flows
                naturally to what matters. Combined with the carefully chosen{" "}
                <strong className="text-white font-medium">cyan accent</strong>{" "}
                (hsl(182.7 100.0% 35.5%)) - bright enough to guide, calm enough
                to maintain sophistication - it strikes the perfect balance
                between personality and professionalism.
              </p>
              <p className={cn(typo({ variant: "paragraph", size: "sm" }))}>
                Typography became my silent storyteller.{" "}
                <strong className="text-white font-medium">
                  League Spartan
                </strong>{" "}
                carries the narrative with warmth and readability, while{" "}
                <strong className="text-white font-medium">Ubuntu</strong>{" "}
                punctuates with distinctive headings that command attention
                without shouting. Each font size and spacing decision was made
                with the reader's comfort in mind.
              </p>
              <p className={cn(typo({ variant: "paragraph", size: "sm" }))}>
                Every animation follows a simple mantra:{" "}
                <strong className="text-white font-medium">
                  "motion with meaning."
                </strong>{" "}
                Movements are gentle (≤20px), durations are brief (200-500ms),
                because I respect your time and attention. This site reflects
                how I approach problem-solving—understand the core need,
                eliminate the noise, and craft something that simply works,
                beautifully.
              </p>
            </div>
          </section>

          {/* Color Palette */}
          <section className="space-y-4">
            <h2 className={cn(typo({ variant: "h2" }))}>Color Palette</h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                {
                  name: "Background",
                  hex: "#000000",
                  desc: "Pure Black",
                  color: "bg-black",
                  border: true,
                },
                {
                  name: "Accent",
                  hex: "hsl(182.7 100% 35.5%)",
                  desc: "Cyan",
                  color: "bg-ring",
                },
                {
                  name: "Text Primary",
                  hex: "#FFFFFF",
                  desc: "White",
                  color: "bg-white",
                  border: true,
                },
                {
                  name: "Text Secondary",
                  hex: "#A3A3A3",
                  desc: "Neutral 400",
                  color: "bg-neutral-400",
                },
              ].map((item, index) => (
                <MotionDiv
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="space-y-3 border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-all cursor-pointer"
                >
                  <div
                    className={cn(
                      "w-full h-20 rounded-lg",
                      item.color,
                      item.border && "border border-neutral-700",
                    )}
                  />
                  <div>
                    <p className="text-sm font-medium text-neutral-300">
                      {item.name}
                    </p>
                    <p className="text-xs text-neutral-500 font-mono mt-1">
                      {item.hex}
                    </p>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </section>

          {/* Typography Examples */}
          <section className="space-y-4">
            <h2 className={cn(typo({ variant: "h2" }))}>Typography</h2>
            <div className="border border-neutral-800 rounded-lg p-6 space-y-6 hover:border-neutral-700 transition-colors">
              <div className="space-y-3">
                <p className="text-xs text-neutral-500 uppercase tracking-wider">
                  Headings - Ubuntu
                </p>
                <h1 className="font-ubuntu text-5xl font-bold text-white hover:text-ring transition-colors">
                  Heading 1
                </h1>
                <h2 className="font-ubuntu text-4xl font-semibold text-white hover:text-ring transition-colors">
                  Heading 2
                </h2>
                <h3 className="font-ubuntu text-2xl font-medium text-white hover:text-ring transition-colors">
                  Heading 3
                </h3>
              </div>

              <div className="border-t border-neutral-800 pt-6 space-y-2">
                <p className="text-xs text-neutral-500 uppercase tracking-wider">
                  Body Text - League Spartan
                </p>
                <p className="font-sans text-lg text-neutral-300">
                  Large paragraph - The quick brown fox jumps over the lazy dog
                </p>
                <p className="font-sans text-base text-neutral-300">
                  Regular paragraph - The quick brown fox jumps over the lazy
                  dog
                </p>
                <p className="font-sans text-sm text-neutral-400">
                  Small text - The quick brown fox jumps over the lazy dog
                </p>
                <p className="font-sans text-xs text-neutral-500">
                  Extra small - The quick brown fox jumps over the lazy dog
                </p>
              </div>

              <div className="border-t border-neutral-800 pt-6 space-y-2">
                <p className="text-xs text-neutral-500 uppercase tracking-wider">
                  Code & Monospace
                </p>
                <code className="font-mono text-sm text-cyan-400 bg-neutral-900 px-2 py-1 rounded hover:bg-neutral-800 transition-colors">
                  const portfolio = "chahatkesh.me"
                </code>
              </div>
            </div>
          </section>

          {/* Responsive Design */}
          <section className="space-y-4">
            <h2 className={cn(typo({ variant: "h2" }))}>Responsive Design</h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                {
                  name: "Mobile",
                  size: "≥ 640px",
                  breakpoint: "sm:",
                  width: "w-8",
                  height: "h-12",
                },
                {
                  name: "Tablet",
                  size: "≥ 768px",
                  breakpoint: "md:",
                  width: "w-10",
                  height: "h-14",
                },
                {
                  name: "Laptop",
                  size: "≥ 1024px",
                  breakpoint: "lg:",
                  width: "w-14",
                  height: "h-10",
                },
                {
                  name: "Desktop",
                  size: "≥ 1280px",
                  breakpoint: "xl:",
                  width: "w-16",
                  height: "h-10",
                },
              ].map((device, index) => (
                <MotionDiv
                  key={device.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="border border-neutral-800 rounded-lg p-4 space-y-2 hover:border-neutral-700 transition-all cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium text-neutral-300">
                      {device.name}
                    </p>
                    <p className="text-xs text-neutral-500">{device.size}</p>
                  </div>
                  <p className="text-xs text-neutral-600">
                    {device.breakpoint} breakpoint
                  </p>
                </MotionDiv>
              ))}
            </div>
            <div className="border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-colors">
              <h3 className="text-sm font-medium text-neutral-300 mb-3">
                Design Approach
              </h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="text-ring mt-0.5">•</span>
                  <span>Mobile-first responsive design strategy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ring mt-0.5">•</span>
                  <span>Fluid typography and spacing scales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ring mt-0.5">•</span>
                  <span>Touch-friendly interface for mobile devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ring mt-0.5">•</span>
                  <span>Optimized images with responsive srcset</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Testing Strategy */}
          <section className="space-y-4">
            <h2 className={cn(typo({ variant: "h2" }))}>Testing Strategy</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {testingStrategy.map((strategy, index) => (
                <MotionDiv
                  key={strategy.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="space-y-3 border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-all"
                >
                  <h3 className="font-ubuntu text-base font-medium text-white">
                    {strategy.category}
                  </h3>
                  <div className="space-y-2">
                    {strategy.tools.map((tool, index) => (
                      <div
                        key={index}
                        className="space-y-1 p-2 rounded hover:bg-neutral-900/50 transition-colors"
                      >
                        <p className="text-sm font-medium text-neutral-300">
                          {tool.name}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {tool.purpose}
                        </p>
                      </div>
                    ))}
                  </div>
                </MotionDiv>
              ))}
            </div>
          </section>

          {/* Latest Commits */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={cn(typo({ variant: "h2" }))}>Latest Commits</h2>
              <Link
                href="https://github.com/chahatkesh/chahatkesh.me/commits/main"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-400 hover:text-ring transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="space-y-2">
              {latestCommits.map((commit, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-neutral-300 group-hover:text-white transition-colors line-clamp-2">
                          {commit.message}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
                          <span className="font-mono">{commit.sha}</span>
                          <span>•</span>
                          <span>{commit.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </MotionDiv>
              ))}
            </div>
          </section>

          {/* Pages Structure */}
          <section className="space-y-4">
            <h2 className={cn(typo({ variant: "h2" }))}>Pages in Portfolio</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {pages.map((page, index) => (
                <MotionDiv
                  key={page.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <Link
                    href={page.path}
                    className="flex items-start justify-between gap-4 p-4 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-all group"
                  >
                    <div className="flex-1">
                      <h3 className="font-ubuntu text-base font-medium text-white group-hover:text-ring transition-colors">
                        {page.name}
                      </h3>
                      <p className="text-sm text-neutral-400 mt-0.5">
                        {page.description}
                      </p>
                    </div>
                    <code className="text-xs text-neutral-500 mt-1 group-hover:text-neutral-400 transition-colors">
                      {page.path}
                    </code>
                  </Link>
                </MotionDiv>
              ))}
            </div>
          </section>

          {/* Source & Version */}
          <section className="space-y-4">
            <h2 className={cn(typo({ variant: "h2" }))}>Source & Version</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <MotionDiv
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03, y: -2 }}
                className="border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-all"
              >
                <h3 className="font-ubuntu text-base font-medium text-white mb-2">
                  Version v4.0
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Last updated: {latestCommits[0]?.date || "recently"}
                </p>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.03, y: -2 }}
                className="border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-all"
              >
                <h3 className="font-ubuntu text-base font-medium text-white mb-2">
                  Inspiration
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Apple Design Principles
                </p>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ scale: 1.03, y: -2 }}
              >
                <Link
                  href="https://github.com/chahatkesh/chahatkesh.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-ubuntu text-base font-medium text-white group-hover:text-ring transition-colors">
                      Source Code
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-400">View on GitHub</p>
                </Link>
              </MotionDiv>
            </div>
          </section>
        </div>
      </MotionDiv>
    </>
  );
};

export default SitePage;
