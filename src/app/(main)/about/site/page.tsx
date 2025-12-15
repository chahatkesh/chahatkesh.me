import { Metadata } from "next";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { MotionDiv } from "~/components/motion-wrapper";
import BackButton from "~/components/back-btn";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui/typograpghy";
import Link from "next/link";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiFramer, 
  SiMongodb,
  SiVercel 
} from "react-icons/si";

export const metadata: Metadata = getSEOTags({
  title: "About This Site",
  description: "Technical details about this portfolio website - tech stack, design system, typography, and architecture.",
  openGraph: {
    title: `About This Site - ${config.appName}`,
    description: "Explore the technical stack, design philosophy, and architecture behind this portfolio.",
  },
  canonicalUrlRelative: "/about/site",
});

const SitePage = () => {
  const techStack = [
    { name: "Next.js 15", icon: SiNextdotjs, color: "text-neutral-400" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-300" },
    { name: "Framer Motion", icon: SiFramer, color: "text-purple-400" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
    { name: "Vercel", icon: SiVercel, color: "text-neutral-400" },
  ];

  const pages = [
    { path: "/", name: "Home", description: "Landing page with introduction" },
    { path: "/about", name: "About", description: "Personal information and bio" },
    { path: "/about/journey", name: "Journey", description: "Timeline of life events" },
    { path: "/about/journey/btech", name: "Btech Learning Details", description: "Academic course details" },
    { path: "/about/experience", name: "Experience", description: "Professional work timeline" },
    { path: "/projects", name: "Projects", description: "Portfolio projects showcase" },
    { path: "/gallery", name: "Gallery", description: "Photo collection" },
    { path: "/about/site", name: "About This Site", description: "Technical details of this portfolio" },
  ];

  const designTokens = [
    { 
      category: "Colors", 
      items: [
        { label: "Background", value: "Pure Black (#000000)" },
        { label: "Accent", value: "Cyan (hsl(182.7 100.0% 35.5%))" },
        { label: "Neutral", value: "Gray scale (800-300)" }
      ] 
    },
    { 
      category: "Typography", 
      items: [
        { label: "Body", value: "League Spartan" },
        { label: "Headings", value: "Ubuntu" },
        { label: "Sizes", value: "10px - 48px" }
      ] 
    },
    { 
      category: "Spacing", 
      items: [
        { label: "Gap", value: "4px - 32px" },
        { label: "Padding", value: "8px - 64px" },
        { label: "Margins", value: "Auto responsive" }
      ] 
    },
    { 
      category: "Animation", 
      items: [
        { label: "Duration", value: "200-500ms" },
        { label: "Easing", value: "Ease-out" },
        { label: "Transform", value: "Subtle (≤20px)" }
      ] 
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
          <BackButton href="/about">Back to About</BackButton>
          
          <MotionDiv 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={cn(typo({ variant: "h2" }))}>About This Site</h1>
            <p className={cn(typo({ variant: "paragraph" }))}>
              Technical details, design philosophy, and architecture behind this portfolio.
            </p>
          </MotionDiv>

          {/* Tech Stack */}
          <section className="space-y-4">
            <h2 className={cn(typo({ variant: "h2" }))}>Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 text-sm text-neutral-300 hover:border-neutral-700 transition-colors"
                >
                  <tech.icon className={cn("text-base", tech.color)} />
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
          </section>

          {/* Design Philosophy */}
          <section className="space-y-4">
            <h2 className={cn(typo({ variant: "h2" }))}>Design Philosophy</h2>
            <div className="space-y-3 text-neutral-300 text-justify">
              <p className={cn(typo({ variant: "paragraph", size: "sm" }))}>
                Every pixel on this site tells a story of <strong className="text-white font-medium">intentional choices</strong>. I believe that great design isn't about adding more—it's about <strong className="text-white font-medium">knowing what to take away</strong>. This portfolio embraces a minimal, content-first philosophy inspired by Apple's timeless elegance, where every element serves a purpose.
              </p>
              <p className={cn(typo({ variant: "paragraph", size: "sm" }))}>
                The <strong className="text-white font-medium">pure black background</strong> (#000000) creates a sanctuary where your attention flows naturally to what matters. Combined with the carefully chosen <strong className="text-white font-medium">cyan accent</strong> (hsl(182.7 100.0% 35.5%)) - bright enough to guide, calm enough to maintain sophistication - it strikes the perfect balance between personality and professionalism.
              </p>
              <p className={cn(typo({ variant: "paragraph", size: "sm" }))}>
                Typography became my silent storyteller. <strong className="text-white font-medium">League Spartan</strong> carries the narrative with warmth and readability, while <strong className="text-white font-medium">Ubuntu</strong> punctuates with distinctive headings that command attention without shouting. Each font size and spacing decision was made with the reader's comfort in mind.
              </p>
              <p className={cn(typo({ variant: "paragraph", size: "sm" }))}>
                Every animation follows a simple mantra: <strong className="text-white font-medium">"motion with meaning."</strong> Movements are gentle (≤20px), durations are brief (200-500ms), because I respect your time and attention. This site reflects how I approach problem-solving—understand the core need, eliminate the noise, and craft something that simply works, beautifully.
              </p>
            </div>
          </section>

          {/* Design System */}
          <section className="space-y-4">
            <h2 className={cn(typo({ variant: "h2" }))}>Design System</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {designTokens.map((token) => (
                <div key={token.category} className="space-y-3 border border-neutral-800 rounded-lg p-4">
                  <h3 className="font-ubuntu text-lg font-medium text-white">{token.category}</h3>
                  <div className="space-y-2">
                    {token.items.map((item, index) => (
                      <div key={index} className="flex items-start justify-between gap-4 text-sm">
                        <span className="text-neutral-400">{item.label}</span>
                        <span className="text-neutral-300 text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pages Structure */}
          <section className="space-y-4">
            <h2 className={cn(typo({ variant: "h2" }))}>Pages in Portfolio</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {pages.map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  className="flex items-start justify-between gap-4 p-3 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors group"
                >
                  <div className="flex-1">
                    <h3 className="font-ubuntu text-base font-medium text-white group-hover:text-ring transition-colors">
                      {page.name}
                    </h3>
                    <p className="text-sm text-neutral-400 mt-0.5">{page.description}</p>
                  </div>
                  <code className="text-xs text-neutral-500 mt-1">{page.path}</code>
                </Link>
              ))}
            </div>
          </section>

          {/* Source & Version */}
          <section className="space-y-4">
            <h2 className={cn(typo({ variant: "h2" }))}>Source & Version</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border border-neutral-800 rounded-lg p-4">
                <h3 className="font-ubuntu text-base font-medium text-white mb-2">Version v4.0</h3>
                <p className="text-xs text-neutral-500 mt-1">Last updated: December 2025</p>
              </div>
              <div className="border border-neutral-800 rounded-lg p-4">
                <h3 className="font-ubuntu text-base font-medium text-white mb-2">Inspiration</h3>
                <p className="text-xs text-neutral-400 mt-1">Apple Design Principles</p>
              </div>
              <Link
                href="https://github.com/chahatkesh/chahatkesh.me"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-ubuntu text-base font-medium text-white group-hover:text-ring transition-colors">
                    Source Code
                  </h3>
                </div>
                <p className="text-sm text-neutral-400">View on GitHub</p>
              </Link>
            </div>
          </section>
        </div>
      </MotionDiv>
    </>
  );
};

export default SitePage;
