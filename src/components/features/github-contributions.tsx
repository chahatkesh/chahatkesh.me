"use client";

import { GitHubCalendar } from "react-github-calendar";
import config from "~/config";
import {
  GITHUB_CONTRIBUTION_COLORS,
  GITHUB_CALENDAR_FONT_SIZE,
  GITHUB_CALENDAR_BLOCK_SIZE,
} from "~/constants";

const GitHubContributions = () => {
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
