import { promisify } from "util";
import { exec } from "child_process";

// Unused for now but available for local git operations
const _execAsync = promisify(exec);

export interface GitCommitDates {
  firstCommit: string | null;
  lastCommit: string | null;
}

/**
 * Fetches the first and last commit dates for a given repository URL
 * @param repoUrl - The GitHub repository URL
 * @returns Object containing firstCommit and lastCommit dates in ISO format
 */
export async function getGitCommitDates(
  repoUrl: string,
): Promise<GitCommitDates> {
  try {
    // Extract repo path from GitHub URL (e.g., "chahatkesh/webmark")
    const repoMatch = repoUrl.match(/github\.com\/([^\/]+\/[^\/]+)/);
    if (!repoMatch) {
      console.warn(`Invalid GitHub URL: ${repoUrl}`);
      return { firstCommit: null, lastCommit: null };
    }

    const repoPath = repoMatch[1].replace(".git", "");

    // These commands would work if you have the repos cloned locally
    // For now, we use GitHub API instead
    const _firstCommitCommand = `git log --reverse --format=%aI --max-count=1 ${repoPath} 2>/dev/null || echo ""`;
    const _lastCommitCommand = `git log --format=%aI --max-count=1 ${repoPath} 2>/dev/null || echo ""`;

    // Use GitHub API approach
    return await fetchGitHubCommitDates(repoPath);
  } catch (error) {
    console.error(`Error fetching commit dates for ${repoUrl}:`, error);
    return { firstCommit: null, lastCommit: null };
  }
}

/**
 * Fetches commit dates using GitHub API
 * @param repoPath - Repository path in format "owner/repo"
 * @returns Object containing firstCommit and lastCommit dates
 */
async function fetchGitHubCommitDates(
  repoPath: string,
): Promise<GitCommitDates> {
  try {
    const [owner, repo] = repoPath.split("/");

    // Fetch the latest commit
    const latestResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          // Add your GitHub token here if needed to avoid rate limiting
          // 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!latestResponse.ok) {
      throw new Error(`GitHub API error: ${latestResponse.status}`);
    }

    const latestCommits = await latestResponse.json();
    const lastCommit = latestCommits[0]?.commit?.author?.date || null;

    // Fetch the first commit (oldest)
    // This response is used to check pagination headers
    const _oldestResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1&sha=main`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      },
    );

    // Get the SHA of the first commit from the default branch
    const repoInfoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      },
    );

    const repoInfo = await repoInfoResponse.json();
    const defaultBranch = repoInfo.default_branch || "main";

    // Get all commits to find the first one
    // This is a simplified approach - for large repos, you'd want pagination
    const allCommitsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?sha=${defaultBranch}&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!allCommitsResponse.ok) {
      // If we can't get all commits, just use the last commit for both
      return { firstCommit: lastCommit, lastCommit };
    }

    const allCommits = await allCommitsResponse.json();
    const firstCommit =
      allCommits[allCommits.length - 1]?.commit?.author?.date || lastCommit;

    return {
      firstCommit: firstCommit
        ? new Date(firstCommit).toISOString().split("T")[0]
        : null,
      lastCommit: lastCommit
        ? new Date(lastCommit).toISOString().split("T")[0]
        : null,
    };
  } catch (error) {
    console.error(`Error fetching GitHub commit dates for ${repoPath}:`, error);
    return { firstCommit: null, lastCommit: null };
  }
}

/**
 * Batch fetch commit dates for multiple repositories
 * @param repoUrls - Array of GitHub repository URLs
 * @returns Map of repo URL to commit dates
 */
export async function batchGetGitCommitDates(
  repoUrls: string[],
): Promise<Map<string, GitCommitDates>> {
  const results = new Map<string, GitCommitDates>();

  // Fetch all repos in parallel (but be mindful of rate limits)
  const promises = repoUrls.map(async (url) => {
    const dates = await getGitCommitDates(url);
    results.set(url, dates);
  });

  await Promise.all(promises);
  return results;
}

/**
 * Format date to YYYY-MM-DD format
 * @param date - Date string or Date object
 * @returns Formatted date string
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}
