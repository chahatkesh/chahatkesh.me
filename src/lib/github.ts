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
