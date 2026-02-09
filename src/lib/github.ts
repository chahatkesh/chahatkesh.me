interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

interface FormattedCommit {
  message: string;
  date: string;
  sha: string;
  url: string;
}

const GITHUB_API = "https://api.github.com";
const REPO_OWNER = "chahatkesh";
const REPO_NAME = "chahatkesh.me";

/**
 * Fetch latest commits from GitHub repository
 */
export async function getLatestCommits(
  count: number = 5,
): Promise<FormattedCommit[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=${count}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const commits: GitHubCommit[] = await response.json();

    return commits.map((commit) => ({
      message: commit.commit.message.split("\n")[0], // Get first line only
      date: formatRelativeTime(commit.commit.author.date),
      sha: commit.sha.substring(0, 7), // Short SHA
      url: commit.html_url,
    }));
  } catch (error) {
    console.error("Error fetching GitHub commits:", error);
    // Return fallback data if API fails
    return [
      {
        message:
          "feat: improve date parsing logic in calculateDuration function",
        date: "recently",
        sha: "ec9bfe0",
        url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/commits/main`,
      },
    ];
  }
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }

  return "just now";
}

// ---------------------------------------------------------------------------
// Repository stats
// ---------------------------------------------------------------------------

export interface RepoStats {
  stars: number;
  forks: number;
  openIssues: number;
  size: number; // KB
  defaultBranch: string;
  createdAt: string;
  updatedAt: string;
  language: string;
  topics: string[];
  license: string | null;
}

/**
 * Fetch repository metadata from GitHub API
 */
export async function getRepoStats(): Promise<RepoStats> {
  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repo = await response.json();

    return {
      stars: repo.stargazers_count ?? 0,
      forks: repo.forks_count ?? 0,
      openIssues: repo.open_issues_count ?? 0,
      size: repo.size ?? 0,
      defaultBranch: repo.default_branch ?? "main",
      createdAt: repo.created_at ?? "",
      updatedAt: repo.updated_at ?? "",
      language: repo.language ?? "TypeScript",
      topics: repo.topics ?? [],
      license: repo.license?.spdx_id ?? null,
    };
  } catch (error) {
    console.error("Error fetching repo stats:", error);
    return {
      stars: 0,
      forks: 0,
      openIssues: 0,
      size: 0,
      defaultBranch: "main",
      createdAt: "2025-03-27T00:00:00Z",
      updatedAt: "",
      language: "TypeScript",
      topics: [],
      license: "MIT",
    };
  }
}

/**
 * Fetch language breakdown for the repository
 */
export async function getRepoLanguages(): Promise<
  { name: string; percentage: number; color: string }[]
> {
  const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    CSS: "#563d7c",
    HTML: "#e34c26",
    MDX: "#083fa1",
    Shell: "#89e051",
  };

  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/languages`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const languages: Record<string, number> = await response.json();
    const total = Object.values(languages).reduce((a, b) => a + b, 0);

    return Object.entries(languages)
      .map(([name, bytes]) => ({
        name,
        percentage: Math.round((bytes / total) * 1000) / 10,
        color: LANGUAGE_COLORS[name] ?? "#6e7681",
      }))
      .sort((a, b) => b.percentage - a.percentage);
  } catch (error) {
    console.error("Error fetching repo languages:", error);
    return [
      { name: "TypeScript", percentage: 95, color: "#3178c6" },
      { name: "CSS", percentage: 3, color: "#563d7c" },
      { name: "JavaScript", percentage: 2, color: "#f1e05a" },
    ];
  }
}

/**
 * Fetch total commit count for the repository
 */
export async function getCommitCount(): Promise<number> {
  try {
    // Use the contributors endpoint to get total commit count
    const response = await fetch(
      `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=1`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return 0;

    const contributors = await response.json();
    // Sum up contributions from all contributors
    return contributors.reduce(
      (sum: number, c: { contributions: number }) =>
        sum + (c.contributions ?? 0),
      0,
    );
  } catch {
    return 0;
  }
}
