// Import a widget from its own file when a route only needs that widget.
// This barrel re-exports client modules such as markdown highlighting, maps,
// and diagrams, and a single import from it pulls those into the page bundle.
// Feature Components
export { default as CodingActivity } from "./coding-activity";
export { CodingActivityStatusBar } from "./coding-activity";
export { default as SpotifyNowPlaying } from "./spotify-now-playing";
export { default as VisitorCounter } from "./visitor-counter";
export { default as LinkStats } from "./link-stats";
export * from "./links";
export { LanguageChart } from "./language-chart";
export { MetricsChart } from "./metrics-chart";
export { LinkPreviewImage } from "./link-preview-image";

// Experience
export * from "./experience";

// Gallery
export * from "./gallery";

// Projects
export * from "./project";

// Diagrams
export * from "./diagram";

// Gists
export * from "./gist";

// Places
export * from "./place";

// Videos
export * from "./video";

export * from "./changelog";

export * from "./timeline";
