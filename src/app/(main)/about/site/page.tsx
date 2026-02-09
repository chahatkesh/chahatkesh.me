import { Metadata } from "next";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import {
  MotionDiv,
  Breadcrumb,
  TabGroup,
  AccordionSection,
} from "~/components/shared";
import { MetricsChart, CommitActivity } from "~/components/features";
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

  // Prepare data for charts
  const languageChartData = repoLanguages.map((lang) => ({
    language: lang.name,
    percentage: lang.percentage,
    color: lang.color,
  }));

  // Featured tech stack items (priority 1)
  const featuredTech = techStack.filter((t) => t.priority === 1);
  const regularTech = techStack.filter((t) => !t.priority || t.priority > 1);

  // Group tech by category
  const techByCategory = {
    core: regularTech.filter((t) => t.category === "core"),
    ui: regularTech.filter((t) => t.category === "ui"),
    data: regularTech.filter((t) => t.category === "data"),
    infra: regularTech.filter((t) => t.category === "infra"),
  };

  // Prepare metrics chart data with normalized values
  const metricsChartData = codebaseMetrics.slice(0, 4).map((metric) => {
    const numValue = parseInt(metric.value.replace(/[^0-9]/g, ""));
    return {
      label: metric.label,
      value: numValue,
      max: Math.max(numValue * 1.2, 100),
      color: "hsl(182.7, 100%, 35.5%)",
    };
  });

  // Performance chart with impact scores
  const performanceChartData = performanceStrategies.map((strategy) => ({
    label: strategy.label,
    value: strategy.impact || 50,
    max: 100,
    color: "hsl(182.7, 100%, 35.5%)",
    unit: "",
  }));

  // Format commits for timeline
  const formattedCommits = latestCommits.map((commit) => ({
    sha: commit.sha,
    message: commit.message,
    author: commit.author,
    date: commit.date,
    url: commit.url,
  }));

  return (
    <>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
        { name: "About This Site", url: "/about/site" },
      ])}

      <MotionDiv>
        <div className="space-y-12">
          {/* Header */}
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
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className={cn(typo({ variant: "h2" }))}>
                    Under the Hood
                  </h1>
                  <p
                    className={cn(
                      typo({ variant: "paragraph", size: "sm" }),
                      "mt-3 max-w-2xl text-neutral-400",
                    )}
                  >
                    A deep technical breakdown of how this portfolio is built —
                    architecture decisions, design patterns, performance
                    strategies, and the engineering philosophy behind every line
                    of code.
                  </p>
                </div>
                {/* Version Badge */}
                <div className="flex-shrink-0 rounded-lg border border-neutral-800 bg-neutral-950/50 px-4 py-2">
                  <div className="font-mono text-sm text-neutral-400">v4.0</div>
                </div>
              </div>
            </MotionDiv>
          </div>

          {/* Hero Section: Repository Overview */}
          <section className="space-y-6">
            <h2 className={cn(typo({ variant: "h2" }))}>Repository Overview</h2>

            <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
              {/* Metrics Grid */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
                    <div
                      key={stat.label}
                      className="rounded-lg border border-neutral-800 bg-neutral-950/50 p-4 hover:border-neutral-700 transition-colors"
                    >
                      <stat.icon className="mb-2 text-lg text-neutral-400" />
                      <p className="font-mono text-xl font-semibold text-white">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 rounded-lg bg-neutral-900/30 p-4 text-xs text-neutral-500">
                  <span>
                    Age:{" "}
                    <span className="font-mono text-neutral-300">
                      {repoAge}
                    </span>
                  </span>
                  <span>•</span>
                  <span>
                    Branch:{" "}
                    <span className="font-mono text-neutral-300">
                      {repoStats.defaultBranch}
                    </span>
                  </span>
                  <span>•</span>
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
                </div>
              </div>

              {/* Language Breakdown */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-300">
                  Language Breakdown
                </h3>
                <div className="space-y-3">
                  {languageChartData.map((lang) => (
                    <div key={lang.language} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-300">
                          {lang.language}
                        </span>
                        <span className="font-mono text-xs text-neutral-500">
                          {lang.percentage}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-neutral-900">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${lang.percentage}%`,
                            backgroundColor: lang.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Tabbed Content */}
          <TabGroup
            sticky
            tabs={[
              {
                id: "stack",
                label: "Stack & Architecture",
                content: (
                  <div className="space-y-12">
                    {/* Featured Tech Stack */}
                    {featuredTech.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-base font-semibold text-neutral-100">
                          Core Technologies
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-3">
                          {featuredTech.map((tech) => (
                            <div
                              key={tech.name}
                              className="rounded-lg border border-neutral-800 bg-neutral-950/50 p-5 hover:border-neutral-700 transition-colors"
                            >
                              <tech.icon
                                className={cn("mb-3 text-xl", tech.color)}
                              />
                              <div className="mb-2 flex items-baseline justify-between">
                                <span className="text-lg font-semibold text-neutral-100">
                                  {tech.name}
                                </span>
                                <span className="font-mono text-xs text-neutral-500">
                                  v{tech.version}
                                </span>
                              </div>
                              <p className="text-sm leading-relaxed text-neutral-400">
                                {tech.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack by Category */}
                    <div className="space-y-6">
                      <h3 className="text-base font-semibold text-neutral-100">
                        Technology Stack
                      </h3>
                      {(
                        Object.entries(techByCategory) as [
                          keyof typeof techByCategory,
                          typeof techStack,
                        ][]
                      ).map(([cat, items]) => {
                        if (items.length === 0) return null;
                        const categoryLabel = {
                          core: "Core Framework",
                          ui: "UI & Animation",
                          data: "Data & Validation",
                          infra: "Infrastructure",
                        }[cat];
                        return (
                          <div key={cat} className="space-y-3">
                            <p className="text-xs uppercase tracking-wider text-neutral-500">
                              {categoryLabel}
                            </p>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {items.map((tech) => (
                                <div
                                  key={tech.name}
                                  className="flex items-start gap-3 rounded-lg border border-neutral-800 bg-neutral-950/30 px-4 py-3 hover:border-neutral-700 transition-colors"
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
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Architecture Layers */}
                    <div className="space-y-6">
                      <h3 className="text-base font-semibold text-neutral-100">
                        Architecture Layers
                      </h3>
                      <p className="max-w-2xl text-sm leading-relaxed text-neutral-400">
                        Four clean layers with strict dependency direction:
                        Presentation → State → Data → Infrastructure. No
                        circular imports, no spaghetti.
                      </p>
                      <div className="space-y-3">
                        {architectureLayers.map((layer) => {
                          const Icon = LAYER_ICONS[layer.name] ?? FiLayers;
                          return (
                            <AccordionSection
                              key={layer.name}
                              title={layer.name}
                              defaultOpen={false}
                              icon={<Icon />}
                            >
                              <div className="space-y-4">
                                <p className="text-sm leading-relaxed text-neutral-400">
                                  {layer.description}
                                </p>
                                <div className="grid gap-2 sm:grid-cols-2">
                                  {layer.items.map((item) => (
                                    <div
                                      key={item.label}
                                      className="flex items-start gap-2 rounded-md bg-neutral-900/50 px-3 py-2"
                                    >
                                      <span className="mt-1 text-[10px] text-cyan-400">
                                        ●
                                      </span>
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
                              </div>
                            </AccordionSection>
                          );
                        })}
                      </div>
                    </div>

                    {/* Design Patterns */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-neutral-100">
                        Design Patterns
                      </h3>
                      <p className="max-w-2xl text-sm leading-relaxed text-neutral-400">
                        Patterns that keep the codebase maintainable, DRY, and
                        easy to extend — each learned by solving a real problem
                        during development.
                      </p>
                      <div className="space-y-3">
                        {designPatterns.map((pattern) => (
                          <div
                            key={pattern.name}
                            className="rounded-lg border border-neutral-800 bg-neutral-950/30 p-5 hover:border-neutral-700 transition-colors"
                          >
                            <h4 className="mb-1.5 font-ubuntu text-sm font-medium text-white">
                              {pattern.name}
                            </h4>
                            <p className="mb-3 text-sm leading-relaxed text-neutral-400">
                              {pattern.description}
                            </p>
                            <code className="block overflow-x-auto rounded bg-neutral-900 px-3 py-2 font-mono text-xs text-cyan-400/80">
                              {pattern.example}
                            </code>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                id: "design",
                label: "Design System",
                content: (
                  <div className="space-y-12">
                    {/* Philosophy Callout */}
                    <div className="rounded-lg border border-neutral-800 bg-neutral-950/30 p-6">
                      <h3 className="mb-4 text-base font-semibold text-white">
                        Design Philosophy
                      </h3>
                      <div className="space-y-3 text-sm leading-relaxed text-neutral-300">
                        <p>
                          Every pixel follows a single principle:{" "}
                          <strong className="font-semibold text-cyan-400">
                            content-first minimalism
                          </strong>
                          . Pure black (#000) background creates focus, the cyan
                          accent (hsl 182.7 100% 35.5%) guides attention without
                          shouting, and animations follow &quot;motion with
                          meaning&quot; — movements ≤20px, durations 200–500ms.
                        </p>
                        <p className="text-neutral-400">
                          Inspired by Apple&apos;s design language: know what to
                          take away, not what to add.
                        </p>
                      </div>
                    </div>

                    {/* Color Tokens */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-neutral-100">
                        Color Palette
                      </h3>
                      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                        {colorTokens.map((token) => (
                          <div
                            key={token.name}
                            className="rounded-lg border border-neutral-800 p-4 hover:border-neutral-700 transition-colors"
                          >
                            <div
                              className={cn(
                                "mb-3 h-20 w-full rounded-lg",
                                token.color,
                                token.border && "border-2 border-neutral-700",
                              )}
                            />
                            <p className="font-medium text-neutral-200">
                              {token.name}
                            </p>
                            <p className="mt-1 font-mono text-xs text-neutral-500">
                              {token.hex}
                            </p>
                            <p className="mt-1 text-xs text-neutral-600">
                              {token.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Typography Specimens */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-neutral-100">
                        Typography
                      </h3>
                      <div className="space-y-4">
                        {fonts.map((font) => (
                          <div
                            key={font.family}
                            className="rounded-lg border border-neutral-800 bg-neutral-950/30 p-6 hover:border-neutral-700 transition-colors"
                          >
                            <p
                              className={cn(
                                "mb-3 text-4xl text-white",
                                font.className,
                                font.className === "font-ubuntu"
                                  ? "font-bold"
                                  : "font-medium",
                              )}
                            >
                              {font.family}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <span className="text-neutral-400">
                                {font.usage}
                              </span>
                              <span className="text-neutral-600">•</span>
                              <span className="font-mono text-neutral-500">
                                Weights: {font.weights}
                              </span>
                            </div>
                            <p
                              className={cn(
                                "mt-4 text-neutral-400",
                                font.className,
                              )}
                            >
                              The quick brown fox jumps over the lazy dog
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Responsive Breakpoints */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-neutral-100">
                        Responsive Breakpoints
                      </h3>
                      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {[
                          {
                            name: "Mobile",
                            size: "< 640px",
                            prefix: "default",
                          },
                          { name: "Tablet", size: "≥ 640px", prefix: "sm:" },
                          { name: "Laptop", size: "≥ 1024px", prefix: "lg:" },
                          { name: "Desktop", size: "≥ 1280px", prefix: "xl:" },
                        ].map((bp) => (
                          <div
                            key={bp.name}
                            className="rounded-lg border border-neutral-800 bg-neutral-950/30 p-4 hover:border-neutral-700 transition-colors"
                          >
                            <p className="font-semibold text-neutral-200">
                              {bp.name}
                            </p>
                            <p className="mt-1 text-sm text-neutral-400">
                              {bp.size}
                            </p>
                            <p className="mt-2 font-mono text-xs text-neutral-600">
                              {bp.prefix}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                id: "performance",
                label: "Performance & Quality",
                content: (
                  <div className="space-y-12">
                    {/* Performance Strategies with Chart */}
                    <div className="space-y-6">
                      <h3 className="text-base font-semibold text-neutral-100">
                        Performance Strategies
                      </h3>
                      <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-4">
                          {performanceStrategies.map((item) => (
                            <div
                              key={item.label}
                              className="space-y-2 rounded-lg border border-neutral-800 bg-neutral-950/30 p-4 hover:border-neutral-700 transition-colors"
                            >
                              <div className="flex items-baseline justify-between gap-2">
                                <span className="font-medium text-neutral-200">
                                  {item.label}
                                </span>
                                <span className="font-mono text-xs text-cyan-400">
                                  {item.value}
                                </span>
                              </div>
                              <p className="text-xs leading-relaxed text-neutral-500">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center rounded-lg border border-neutral-800 bg-neutral-950/30 p-6">
                          <MetricsChart data={performanceChartData} />
                        </div>
                      </div>
                    </div>

                    {/* Code Quality */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-neutral-100">
                        Code Quality Tools
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {codeQuality.map((category) => (
                          <div
                            key={category.category}
                            className="rounded-lg border border-neutral-800 bg-neutral-950/30 p-5 hover:border-neutral-700 transition-colors"
                          >
                            <h4 className="mb-3 font-ubuntu font-semibold text-neutral-100">
                              {category.category}
                            </h4>
                            <div className="space-y-2">
                              {category.tools.map((tool) => (
                                <div
                                  key={tool.name}
                                  className="flex items-start gap-2 rounded-md bg-neutral-900/50 px-3 py-2"
                                >
                                  <span className="mt-0.5 text-[10px] text-cyan-400">
                                    ●
                                  </span>
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
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Codebase Metrics Chart */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-neutral-100">
                        Codebase Metrics
                      </h3>
                      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
                        <div className="rounded-lg border border-neutral-800 bg-neutral-950/30 p-6">
                          <MetricsChart data={metricsChartData} showValues />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {codebaseMetrics.slice(4).map((metric) => (
                            <div
                              key={metric.label}
                              className="rounded-lg border border-neutral-800 bg-neutral-950/30 p-4"
                            >
                              <p className="font-mono text-xl font-bold text-white">
                                {metric.value}
                              </p>
                              <p className="mt-1 text-xs font-medium text-neutral-300">
                                {metric.label}
                              </p>
                              <p className="mt-1 text-[10px] text-neutral-600">
                                {metric.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Route Map */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-neutral-100">
                        Route Map
                      </h3>
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
                                      "group-hover:text-cyan-400 transition-colors",
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
                          <span className="text-neutral-400">Static</span> —
                          pre-rendered at build
                        </span>
                        <span>
                          <span className="text-green-500">SSG</span> —
                          generateStaticParams
                        </span>
                        <span>
                          <span className="text-yellow-500">ISR</span> —
                          incremental revalidation
                        </span>
                        <span>
                          <span className="text-blue-400">SSR</span> —
                          server-rendered on demand
                        </span>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />

          {/* Recent Activity */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={cn(typo({ variant: "h2" }), "text-2xl")}>
                Recent Activity
              </h2>
              <Link
                href={`https://github.com/${config.author.github}/chahatkesh.me/commits/main`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-cyan-400 transition-colors"
              >
                View all <FiExternalLink className="text-[10px]" />
              </Link>
            </div>
            <CommitActivity commits={formattedCommits} />
          </section>

          {/* Footer */}
          <section className="rounded-xl border border-neutral-800 bg-neutral-950/50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="font-ubuntu text-sm font-semibold text-white">
                  Version 4.0 • Built with Next.js & TypeScript
                </p>
                <p className="text-xs text-neutral-500">
                  Last updated: {latestCommits[0]?.date || "recently"} ·
                  Inspired by Apple Design Principles
                </p>
              </div>
              <Link
                href={`https://github.com/${config.author.github}/chahatkesh.me`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/50 px-4 py-2 text-sm hover:border-cyan-500 hover:bg-neutral-900 hover:text-cyan-400 transition-all"
              >
                <FiCode className="text-sm" />
                View Source Code
              </Link>
            </div>
          </section>
        </div>
      </MotionDiv>
    </>
  );
};

export default SitePage;
