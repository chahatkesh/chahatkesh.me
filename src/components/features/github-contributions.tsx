"use client";

import { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import config from "~/config";
import {
  GITHUB_CONTRIBUTION_COLORS,
  GITHUB_CALENDAR_FONT_SIZE,
  GITHUB_CALENDAR_BLOCK_SIZE,
} from "~/constants";

const GitHubContributions = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full" aria-label="GitHub contribution graph">
        <div className="h-32 animate-pulse bg-gray-800/50 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="w-full" aria-label="GitHub contribution graph">
      <GitHubCalendar
        username={config.author.github}
        colorScheme="dark"
        fontSize={GITHUB_CALENDAR_FONT_SIZE}
        blockSize={GITHUB_CALENDAR_BLOCK_SIZE}
        theme={{
          dark: [...GITHUB_CONTRIBUTION_COLORS],
        }}
      />
    </div>
  );
};

export default GitHubContributions;
