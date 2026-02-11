"use client";

import { useState } from "react";
import { FiGitCommit } from "react-icons/fi";
import { cn } from "~/lib/utils";
import { formatRelativeDate } from "~/lib/date-utils";

interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

interface CommitActivityProps {
  commits: Commit[];
  className?: string;
}

export function CommitActivity({ commits, className }: CommitActivityProps) {
  const [expandedCommit, setExpandedCommit] = useState<string | null>(null);

  const isRecent = (dateString: string) => {
    const commitDate = new Date(dateString);
    const now = new Date();
    const hoursDiff = (now.getTime() - commitDate.getTime()) / (1000 * 60 * 60);
    return hoursDiff < 24;
  };

  return (
    <div className={cn("space-y-3", className)}>
      {commits.map((commit) => {
        const recent = isRecent(commit.date);
        const isExpanded = expandedCommit === commit.sha;

        return (
          <button
            key={commit.sha}
            onClick={() => setExpandedCommit(isExpanded ? null : commit.sha)}
            className={cn(
              "w-full rounded-lg border bg-neutral-950/50 p-4 text-left transition-colors",
              recent
                ? "border-cyan-500/30 hover:border-cyan-500/50"
                : "border-neutral-800 hover:border-neutral-700",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
            )}
          >
            <div className="flex items-start gap-4">
              {/* Commit Icon */}
              <div
                className={cn(
                  "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full",
                  recent ? "bg-cyan-500/10" : "bg-neutral-900",
                )}
              >
                <FiGitCommit
                  className={cn(
                    "h-3.5 w-3.5",
                    recent ? "text-cyan-400" : "text-neutral-400",
                  )}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium text-neutral-100 line-clamp-2">
                  {commit.message}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                  <span>{commit.author}</span>
                  <span>•</span>
                  <span>{formatRelativeDate(commit.date)}</span>
                  <span>•</span>
                  <code
                    className={cn(
                      "rounded bg-neutral-900 px-1.5 py-0.5 font-mono",
                      recent ? "text-cyan-400" : "text-neutral-400",
                    )}
                  >
                    {commit.sha.substring(0, 7)}
                  </code>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="mt-4 space-y-2 border-t border-neutral-800 pt-4">
                    <div className="text-sm text-neutral-400">
                      Full SHA:{" "}
                      <code className="text-neutral-300">{commit.sha}</code>
                    </div>
                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300"
                    >
                      View on GitHub
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
