"use client";

import { useEffect, useState } from "react";
import { GitCommit } from "lucide-react";

interface GitHubStats {
  totalContributions: number;
}

const LinkStats = () => {
  const [stats, setStats] = useState<GitHubStats>({
    totalContributions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch all-time contribution data
        const contributionsResponse = await fetch(
          `https://github-contributions-api.jogruber.de/v4/chahatkesh`,
        );
        const contributionsData = await contributionsResponse.json();

        // Calculate total lifetime contributions by summing all years
        const totalContributions = Object.values<number>(
          contributionsData.total || {},
        ).reduce((sum, yearContributions) => sum + (yearContributions || 0), 0);

        setStats({
          totalContributions,
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-4 animate-pulse">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 bg-muted rounded" />
          <div className="h-4 w-12 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
      <GitCommit className="size-4" />
      <span className="font-semibold">
        {stats.totalContributions.toLocaleString()}
      </span>
      <span>Contributions</span>
    </div>
  );
};

export default LinkStats;
