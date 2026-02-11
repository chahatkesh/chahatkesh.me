/**
 * Barrel export for all data modules.
 *
 * Import from "~/data" instead of individual files:
 *   import { projects, experiences, links } from "~/data";
 */

// About page data
export {
  currentProjects,
  hobbies,
  deskSetup,
  portfolioVersions,
} from "./about";
export type {
  CurrentProject,
  Hobby,
  DeskItem,
  PortfolioVersion,
} from "./about";

// Experience data
export { experiences } from "./experience";
export type { Experience } from "./experience";

// Links page data
export { links } from "./links";
export type { LinkItem } from "./links";

// Projects data
export { projects } from "./projects";
export type { Project, Contributor } from "./projects";

// Tech stacks
export { LANGUAGES_TOOLS, FRONTEND_STACKS, BACKEND_DEVOPS } from "./stack";
export type { stacksProps } from "./stack";

// Timeline data
export {
  timelineEvents,
  getAllTimelineEvents,
  getEventDuration,
  formatDateRange,
  formatOngoingDate,
  categoryColors,
} from "./timeline";
export type { TimelineEvent, TimelineLink } from "./timeline";

// BTech courses data
export {
  btechCourses,
  getTotalCredits,
  getTotalCourses,
} from "./btech-courses";
export type { Course, Semester, SyllabusUnit } from "./btech-courses";

// Site metadata & tech data
export {
  techStack,
  architectureLayers,
  designPatterns,
  performanceStrategies,
  colorTokens,
  fonts,
  codeQuality,
  pages,
  codebaseMetrics,
} from "./site";
export type {
  TechItem,
  ArchitectureLayer,
  DesignPattern,
  PerformanceMetric,
  ColorToken,
  FontEntry,
  PageEntry,
  CodeQualityTool,
  QualityCategory,
  CodebaseMetric,
} from "./site";
