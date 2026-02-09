import { Metadata } from "next";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { MotionDiv } from "~/components/shared";
import { Breadcrumb } from "~/components/shared";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui";
import Link from "next/link";
import {
  getLatestCommits,
  getRepoStats,
  getRepoLanguages,
  getCommitCount,
} from "~/lib/github";
import {
  techStack,
  architectureLayers,
  designPatterns,
  performanceStrategies,
  colorTokens,
  fonts,
  codeQuality,
  pages,
  codebaseMetrics,
} from "~/data/site";
import {
  FiGitCommit,
  FiStar,
  FiGitBranch,
  FiAlertCircle,
  FiExternalLink,
  FiCode,
  FiLayers,
  FiZap,
  FiLayout,
  FiDatabase,
  FiCpu,
} from "react-icons/fi";
import { PageTableOfContents } from "~/components/shared/page-toc";

export const metadata: Metadata = getSEOTags({
  title: "About This Site",
  description:
    "A deep technical breakdown of this portfolio — architecture, design patterns, performance strategies, and codebase metrics.",
  openGraph: {
    title: `About This Site - ${config.appName}`,
    description:
      "Explore the architecture, design patterns, codebase metrics, and engineering decisions behind this portfolio.",
  },
  canonicalUrlRelative: "/about/site",
});

const LAYER_ICONS: Record<string, typeof FiLayers> = {
  "Presentation Layer": FiLayout,
  "State Management": FiCpu,
  "Data Layer": FiDatabase,
  Infrastructure: FiZap,
};

const sections = [
  { id: "repository", title: "Repository" },
  { id: "language-breakdown", title: "Language Breakdown" },
  { id: "codebase-metrics", title: "Codebase Metrics" },
  { id: "tech-stack", title: "Tech Stack" },
  { id: "architecture", title: "Architecture" },
  { id: "design-patterns", title: "Design Patterns" },
  { id: "performance", title: "Performance" },
  { id: "design-system", title: "Design System" },
  { id: "code-quality", title: "Code Quality" },
  { id: "route-map", title: "Route Map" },
  { id: "latest-commits", title: "Latest Commits" },
];

const SitePage = async () => {
  const [latestCommits, repoStats, repoLanguages, commitCount] =
    await Promise.all([
      getLatestCommits(6),
      getRepoStats(),
      getRepoLanguages(),
      getCommitCount(),
    ]);

  const repoAge = repoStats.createdAt
    ? (() => {
        const created = new Date(repoStats.createdAt);
        const now = new Date();
        const months =
          (now.getFullYear() - created.getFullYear()) * 12 +
          (now.getMonth() - created.getMonth());
        if (months >= 12) {
          const years = Math.floor(months / 12);
          const rem = months % 12;
          return rem > 0 ? `${years}y ${rem}mo` : `${years}y`;
        }
        return `${months}mo`;
      })()
    : "—";

  return (
    <>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
        { name: "About This Site", url: "/about/site" },
      ])}

      <MotionDiv>
        <div className="space-y-12">
          <div className="space-y-6">
            <Breadcrumb
              items={[
                { name: "Home", url: "/" },
                { name: "About", url: "/about" },
                { name: "About This Site", url: "/about/site" },
              ]}
            />

            <MotionDiv
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className={cn(typo({ variant: "h2" }))}>Under the Hood</h1>
              <p
                className={cn(
                  typo({ variant: "paragraph", size: "sm" }),
                  "max-w-2xl text-neutral-400",
                )}
              >
                A deep technical breakdown of how this portfolio is built —
                architecture decisions, design patterns, performance strategies,
                and the engineering philosophy behind every line of code.
              </p>
            </MotionDiv>
          </div>

          <PageTableOfContents sections={sections} />

          {/* ============================================================= */}
          {/* Repository Overview                                            */}
          {/* ============================================================= */}
          <section id="repository" className="space-y-4 scroll-mt-20">
            <h2 className={cn(typo({ variant: "h2" }))}>Repository</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[
                {
                  icon: FiGitCommit,
                  label: "Commits",
                  value:
                    commitCount > 0 ? commitCount.toLocaleString() : "100+",
                },
                {
                  icon: FiStar,
                  label: "Stars",
                  value: repoStats.stars.toString(),
                },
                {
                  icon: FiGitBranch,
                  label: "Forks",
                  value: repoStats.forks.toString(),
                },
                {
                  icon: FiAlertCircle,
                  label: "Issues",
                  value: repoStats.openIssues.toString(),
                },
                {
                  icon: FiCode,
                  label: "Language",
                  value: repoStats.language,
                },
                {
                  icon: FiExternalLink,
                  label: "License",
                  value: repoStats.license ?? "MIT",
                },
              ].map((stat) => (
                <MotionDiv
                  key={stat.label}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border border-neutral-800 bg-neutral-950/50 p-3 text-center hover:border-neutral-700 transition-colors"
                >
                  <stat.icon className="mx-auto mb-1.5 text-lg text-ring" />
                  <p className="text-lg font-semibold text-white font-mono">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wider text-neutral-500">
                    {stat.label}
                  </p>
                </MotionDiv>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
              <span>
                Age:{" "}
                <span className="font-mono text-neutral-300">{repoAge}</span>
              </span>
              <span>
                Branch:{" "}
                <span className="font-mono text-neutral-300">
                  {repoStats.defaultBranch}
                </span>
              </span>
              <span>
                Updated:{" "}
                <span className="text-neutral-300">
                  {repoStats.updatedAt
                    ? new Date(repoStats.updatedAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" },
                      )
                    : "recently"}
                </span>
              </span>
              <Link
                href={`https://github.com/${config.author.github}/chahatkesh.me`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1 text-neutral-400 hover:text-ring transition-colors"
              >
                View on GitHub <FiExternalLink className="text-[10px]" />
              </Link>
            </div>
          </section>

          {/* ============================================================= */}
          {/* Language Breakdown                                             */}
          {/* ============================================================= */}
          <section id="language-breakdown" className="space-y-4 scroll-mt-20">
            <h2 className={cn(typo({ variant: "h2" }))}>Language Breakdown</h2>
            <div className="flex h-3 overflow-hidden rounded-full border border-neutral-800 bg-neutral-900">
              {repoLanguages.map((lang) => (
                <div
                  key={lang.name}
                  className="h-full transition-all"
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color,
                    minWidth: lang.percentage > 0.5 ? undefined : "3px",
                  }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {repoLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-neutral-300">{lang.name}</span>
                  <span className="font-mono text-xs text-neutral-500">
                    {lang.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================================= */}
          {/* Codebase Metrics                                               */}
          {/* ============================================================= */}
          <section id="codebase-metrics" className="space-y-4 scroll-mt-20">
            <h2 className={cn(typo({ variant: "h2" }))}>
              Codebase at a Glance
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {codebaseMetrics.map((metric) => (
                <MotionDiv
                  key={metric.label}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border border-neutral-800 p-4 hover:border-neutral-700 transition-colors"
                >
                  <p className="font-mono text-2xl font-bold text-white">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-neutral-300">
                    {metric.label}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {metric.description}
                  </p>
                </MotionDiv>
              ))}
            </div>
          </section>

          {/* ============================================================= */}
          {/* Tech Stack                                                     */}
          {/* ============================================================= */}
          <section id="tech-stack" className="space-y-4 scroll-mt-20">
            <h2 className={cn(typo({ variant: "h2" }))}>Tech Stack</h2>
            {(["core", "ui", "data", "infra"] as const).map((cat) => {
              const items = techStack.filter((t) => t.category === cat);
              const categoryLabel = {
                core: "Core Framework",
                ui: "UI & Animation",
                data: "Data & Validation",
                infra: "Infrastructure",
              }[cat];
              return (
                <div key={cat} className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-neutral-500">
                    {categoryLabel}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((tech) => (
                      <MotionDiv
                        key={tech.name}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="flex cursor-default items-start gap-3 rounded-lg border border-neutral-800 bg-neutral-950/50 px-4 py-3 hover:border-neutral-700 transition-colors"
                      >
                        <tech.icon
                          className={cn(
                            "mt-0.5 flex-shrink-0 text-xl",
                            tech.color,
                          )}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-sm font-medium text-neutral-200">
                              {tech.name}
                            </span>
                            <span className="flex-shrink-0 font-mono text-[11px] text-neutral-500">
                              v{tech.version}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
                            {tech.description}
                          </p>
                        </div>
                      </MotionDiv>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {/* ============================================================= */}
          {/* Architecture                                                   */}
          {/* ============================================================= */}
          <section id="architecture" className="space-y-4 scroll-mt-20">
            <h2 className={cn(typo({ variant: "h2" }))}>Architecture</h2>
            <p
              className={cn(
                typo({ variant: "paragraph", size: "sm" }),
                "max-w-2xl text-neutral-400",
              )}
            >
              Four clean layers with strict dependency direction: Presentation →
              State → Data → Infrastructure. No circular imports, no spaghetti.
            </p>
            <div className="space-y-4">
              {architectureLayers.map((layer, idx) => {
                const Icon = LAYER_ICONS[layer.name] ?? FiLayers;
                return (
                  <MotionDiv
                    key={layer.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                    className="rounded-lg border border-neutral-800 p-5 hover:border-neutral-700 transition-colors"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-ring/10 text-ring">
                        <Icon className="text-lg" />
                      </div>
                      <h3 className="font-ubuntu text-base font-medium text-white">
                        {layer.name}
                      </h3>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-neutral-400">
                      {layer.description}
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {layer.items.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-start gap-2 rounded-md bg-neutral-900/50 px-3 py-2"
                        >
                          <span className="mt-1 text-[10px] text-ring">●</span>
                          <div className="min-w-0">
                            <div className="flex items-baseline gap-2">
                              <span className="text-sm font-medium text-neutral-200">
                                {item.label}
                              </span>
                              {item.count !== undefined && (
                                <span className="rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400">
                                  {item.count}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-xs text-neutral-500">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          </section>

          {/* ============================================================= */}
          {/* Design Patterns                                                */}
          {/* ============================================================= */}
          <section id="design-patterns" className="space-y-4 scroll-mt-20">
            <h2 className={cn(typo({ variant: "h2" }))}>Design Patterns</h2>
            <p
              className={cn(
                typo({ variant: "paragraph", size: "sm" }),
                "max-w-2xl text-neutral-400",
              )}
            >
              Patterns that keep the codebase maintainable, DRY, and easy to
              extend — each learned by solving a real problem during
              development.
            </p>
            <div className="space-y-3">
              {designPatterns.map((pattern) => (
                <MotionDiv
                  key={pattern.name}
                  whileHover={{ x: 4 }}
                  className="rounded-lg border border-neutral-800 p-5 hover:border-neutral-700 transition-colors"
                >
                  <h3 className="mb-1.5 font-ubuntu text-sm font-medium text-white">
                    {pattern.name}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-neutral-400">
                    {pattern.description}
                  </p>
                  <code className="block overflow-x-auto rounded bg-neutral-900 px-3 py-2 font-mono text-xs text-cyan-400/80">
                    {pattern.example}
                  </code>
                </MotionDiv>
              ))}
            </div>
          </section>

          {/* ============================================================= */}
          {/* Performance Strategies                                         */}
          {/* ============================================================= */}
          <section id="performance" className="space-y-4 scroll-mt-20">
            <h2 className={cn(typo({ variant: "h2" }))}>
              Performance Strategies
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {performanceStrategies.map((item) => (
                <MotionDiv
                  key={item.label}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border border-neutral-800 p-4 hover:border-neutral-700 transition-colors"
                >
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="text-sm font-medium text-neutral-200">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-ring">
                      {item.value}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-500">
                    {item.description}
                  </p>
                </MotionDiv>
              ))}
            </div>
          </section>

          {/* ============================================================= */}
          {/* Design System                                                  */}
          {/* ============================================================= */}
          <section id="design-system" className="space-y-6 scroll-mt-20">
            <h2 className={cn(typo({ variant: "h2" }))}>Design System</h2>

            {/* Philosophy */}
            <div className="space-y-3 rounded-lg border border-neutral-800 p-5 hover:border-neutral-700 transition-colors">
              <h3 className="font-ubuntu text-base font-medium text-white">
                Philosophy
              </h3>
              <div className="space-y-2 text-justify text-sm leading-relaxed text-neutral-400">
                <p>
                  Every pixel follows a single principle:{" "}
                  <strong className="font-medium text-white">
                    content-first minimalism
                  </strong>
                  . Pure black (#000) background creates focus, the cyan accent
                  (hsl 182.7 100% 35.5%) guides attention without shouting, and
                  animations follow &quot;motion with meaning&quot; — movements
                  ≤20px, durations 200–500ms.
                </p>
                <p>
                  Inspired by Apple&apos;s design language: know what to take
                  away, not what to add.
                </p>
              </div>
            </div>

            {/* Color Tokens */}
            <div className="space-y-3">
              <h3 className="font-ubuntu text-sm font-medium uppercase tracking-wider text-neutral-300">
                Color Tokens
              </h3>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                {colorTokens.map((token) => (
                  <div
                    key={token.name}
                    className="rounded-lg border border-neutral-800 p-3 hover:border-neutral-700 transition-colors"
                  >
                    <div
                      className={cn(
                        "mb-2 h-14 w-full rounded-md",
                        token.color,
                        token.border && "border border-neutral-700",
                      )}
                    />
                    <p className="text-sm font-medium text-neutral-300">
                      {token.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-neutral-500">
                      {token.hex}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-3">
              <h3 className="font-ubuntu text-sm font-medium uppercase tracking-wider text-neutral-300">
                Typography
              </h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {fonts.map((font) => (
                  <div
                    key={font.family}
                    className="rounded-lg border border-neutral-800 p-4 hover:border-neutral-700 transition-colors"
                  >
                    <p
                      className={cn(
                        "mb-2 text-xl text-white",
                        font.className,
                        font.className === "font-ubuntu"
                          ? "font-bold"
                          : "font-medium",
                      )}
                    >
                      {font.family}
                    </p>
                    <p className="text-xs text-neutral-400">{font.usage}</p>
                    <p className="mt-1 font-mono text-[11px] text-neutral-500">
                      Weights: {font.weights}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Responsive Breakpoints */}
            <div className="space-y-3">
              <h3 className="font-ubuntu text-sm font-medium uppercase tracking-wider text-neutral-300">
                Responsive Breakpoints
              </h3>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  { name: "Mobile", size: "< 640px", prefix: "default" },
                  { name: "Tablet", size: "≥ 640px", prefix: "sm:" },
                  { name: "Laptop", size: "≥ 1024px", prefix: "lg:" },
                  { name: "Desktop", size: "≥ 1280px", prefix: "xl:" },
                ].map((bp) => (
                  <div
                    key={bp.name}
                    className="rounded-lg border border-neutral-800 p-3 hover:border-neutral-700 transition-colors"
                  >
                    <p className="text-sm font-medium text-neutral-300">
                      {bp.name}
                    </p>
                    <p className="text-xs text-neutral-500">{bp.size}</p>
                    <p className="mt-1 font-mono text-[11px] text-neutral-600">
                      {bp.prefix}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================= */}
          {/* Code Quality                                                   */}
          {/* ============================================================= */}
          <section id="code-quality" className="space-y-4 scroll-mt-20">
            <h2 className={cn(typo({ variant: "h2" }))}>Code Quality</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {codeQuality.map((category) => (
                <MotionDiv
                  key={category.category}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border border-neutral-800 p-4 hover:border-neutral-700 transition-colors"
                >
                  <h3 className="mb-3 font-ubuntu text-base font-medium text-white">
                    {category.category}
                  </h3>
                  <div className="space-y-2">
                    {category.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="flex items-start gap-2 rounded-md bg-neutral-900/50 px-3 py-2"
                      >
                        <span className="mt-0.5 text-[10px] text-ring">●</span>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-medium text-neutral-300">
                              {tool.name}
                            </span>
                            {tool.config && (
                              <span className="font-mono text-[10px] text-neutral-600">
                                {tool.config}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-500">
                            {tool.purpose}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </MotionDiv>
              ))}
            </div>
          </section>

          {/* ============================================================= */}
          {/* Route Map                                                      */}
          {/* ============================================================= */}
          <section id="route-map" className="space-y-4 scroll-mt-20">
            <h2 className={cn(typo({ variant: "h2" }))}>Route Map</h2>
            <div className="overflow-hidden rounded-lg border border-neutral-800">
              <div className="hidden border-b border-neutral-800 bg-neutral-950/80 px-4 py-2 text-[11px] uppercase tracking-wider text-neutral-500 sm:grid sm:grid-cols-[1fr_2fr_100px] sm:gap-4">
                <span>Path</span>
                <span>Description</span>
                <span className="text-right">Render</span>
              </div>
              {pages.map((page) => {
                const isDynamic = page.path.includes("[slug]");
                const renderColor =
                  page.renderType === "SSG"
                    ? "text-green-500"
                    : page.renderType === "ISR"
                      ? "text-yellow-500"
                      : page.renderType === "SSR"
                        ? "text-blue-400"
                        : "text-neutral-500";

                const inner = (
                  <>
                    <div>
                      <span
                        className={cn(
                          "text-sm font-medium text-neutral-300",
                          !isDynamic &&
                            "group-hover:text-ring transition-colors",
                        )}
                      >
                        {page.name}
                      </span>
                      <p className="font-mono text-[11px] text-neutral-600 sm:hidden">
                        {page.path}
                      </p>
                    </div>
                    <p className="hidden text-sm text-neutral-500 sm:block">
                      {page.description}
                    </p>
                    <span
                      className={cn(
                        "font-mono text-[11px] text-right",
                        renderColor,
                      )}
                    >
                      {page.renderType}
                    </span>
                  </>
                );

                return isDynamic ? (
                  <div
                    key={page.path}
                    className="grid gap-1 border-b border-neutral-800/50 px-4 py-3 hover:bg-neutral-900/30 transition-colors sm:grid-cols-[1fr_2fr_100px] sm:gap-4"
                  >
                    {inner}
                  </div>
                ) : (
                  <Link
                    key={page.path}
                    href={page.path}
                    className="group grid gap-1 border-b border-neutral-800/50 px-4 py-3 hover:bg-neutral-900/30 transition-colors sm:grid-cols-[1fr_2fr_100px] sm:gap-4"
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
              <span>
                <span className="text-neutral-400">Static</span> — pre-rendered
                at build
              </span>
              <span>
                <span className="text-green-500">SSG</span> —
                generateStaticParams
              </span>
              <span>
                <span className="text-yellow-500">ISR</span> — incremental
                revalidation
              </span>
              <span>
                <span className="text-blue-400">SSR</span> — server-rendered on
                demand
              </span>
            </div>
          </section>

          {/* ============================================================= */}
          {/* Latest Commits                                                 */}
          {/* ============================================================= */}
          <section id="latest-commits" className="space-y-4 scroll-mt-20">
            <div className="flex items-center justify-between">
              <h2 className={cn(typo({ variant: "h2" }))}>Latest Commits</h2>
              <Link
                href={`https://github.com/${config.author.github}/chahatkesh.me/commits/main`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-ring transition-colors"
              >
                View all <FiExternalLink className="text-[10px]" />
              </Link>
            </div>
            <div className="space-y-2">
              {latestCommits.map((commit, index) => (
                <MotionDiv
                  key={commit.sha}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                >
                  <Link
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 rounded-lg border border-neutral-800 px-4 py-3 hover:border-neutral-700 transition-all"
                  >
                    <div className="mt-1.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm text-neutral-300 group-hover:text-white transition-colors">
                        {commit.message}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-neutral-500">
                        <span className="font-mono">{commit.sha}</span>
                        <span>•</span>
                        <span>{commit.date}</span>
                      </div>
                    </div>
                  </Link>
                </MotionDiv>
              ))}
            </div>
          </section>

          {/* ============================================================= */}
          {/* Footer                                                         */}
          {/* ============================================================= */}
          <section className="rounded-lg border border-neutral-800 p-5 hover:border-neutral-700 transition-colors">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="font-ubuntu text-sm font-medium text-white">
                  Version 4.0
                </p>
                <p className="text-xs text-neutral-500">
                  Last updated: {latestCommits[0]?.date || "recently"} ·
                  Inspired by Apple Design Principles
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`https://github.com/${config.author.github}/chahatkesh.me`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-sm hover:border-ring hover:text-ring transition-colors"
                >
                  <FiCode className="text-sm" />
                  Source Code
                </Link>
              </div>
            </div>
          </section>
        </div>
      </MotionDiv>
    </>
  );
};

export default SitePage;
