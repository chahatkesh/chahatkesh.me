#!/usr/bin/env node

/**
 * Script to fetch Git commit dates for all projects and update projects.ts
 * 
 * Usage: npm run update-project-dates
 * or: node scripts/update-project-dates.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function fetchGitHubCommitDates(repoPath) {
  try {
    const [owner, repo] = repoPath.split('/');
    
    console.log(`Fetching commits for ${owner}/${repo}...`);

    // Fetch repository info to get default branch
    const repoInfoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-Project-Updater',
        },
      }
    );

    if (!repoInfoResponse.ok) {
      console.error(`Failed to fetch repo info: ${repoInfoResponse.status}`);
      return { firstCommit: null, lastCommit: null };
    }

    const repoInfo = await repoInfoResponse.json();
    const defaultBranch = repoInfo.default_branch || 'main';
    const createdAt = repoInfo.created_at;

    // Fetch the latest commit
    const latestResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1&sha=${defaultBranch}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-Project-Updater',
        },
      }
    );

    if (!latestResponse.ok) {
      console.error(`Failed to fetch latest commit: ${latestResponse.status}`);
      return { firstCommit: null, lastCommit: null };
    }

    const latestCommits = await latestResponse.json();
    const lastCommit = latestCommits[0]?.commit?.author?.date;

    // For the first commit, we need to paginate through all commits
    // Or use the repo creation date as approximation
    let firstCommit = createdAt;

    // Try to get the first commit by fetching commits in reverse order
    try {
      // Get commits sorted oldest first
      const firstCommitResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1&sha=${defaultBranch}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-Project-Updater',
          },
        }
      );

      if (firstCommitResponse.ok) {
        const linkHeader = firstCommitResponse.headers.get('Link');
        
        // If there's a Link header with pagination info
        if (linkHeader) {
          const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (lastPageMatch) {
            const lastPage = parseInt(lastPageMatch[1]);
            
            // Fetch the last page to get the first commit
            const oldestCommitsResponse = await fetch(
              `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1&page=${lastPage}&sha=${defaultBranch}`,
              {
                headers: {
                  'Accept': 'application/vnd.github.v3+json',
                  'User-Agent': 'Portfolio-Project-Updater',
                },
              }
            );

            if (oldestCommitsResponse.ok) {
              const oldestCommits = await oldestCommitsResponse.json();
              if (oldestCommits[0]?.commit?.author?.date) {
                firstCommit = oldestCommits[0].commit.author.date;
              }
            }
          }
        }
      }
    } catch (error) {
      console.warn(`Could not fetch first commit, using repo creation date`);
    }

    const formatDate = (dateStr) => {
      return dateStr ? new Date(dateStr).toISOString().split('T')[0] : null;
    };

    return {
      firstCommit: formatDate(firstCommit),
      lastCommit: formatDate(lastCommit),
    };
  } catch (error) {
    console.error(`Error fetching commits for ${repoPath}:`, error.message);
    return { firstCommit: null, lastCommit: null };
  }
}

async function updateProjectDates() {
  const projectsPath = join(__dirname, '../src/data/projects.ts');
  
  console.log('Reading projects.ts...');
  let content = readFileSync(projectsPath, 'utf-8');
  
  // Extract all GitHub repo URLs
  const repoUrlRegex = /repoUrl:\s*"(https:\/\/github\.com\/[^"]+)"/g;
  const matches = [...content.matchAll(repoUrlRegex)];
  
  console.log(`Found ${matches.length} repositories to update\n`);

  for (const match of matches) {
    const fullUrl = match[1];
    const repoPathMatch = fullUrl.match(/github\.com\/([^\/]+\/[^\/]+)/);
    
    if (!repoPathMatch) continue;
    
    const repoPath = repoPathMatch[1].replace('.git', '');
    
    // Fetch commit dates
    const { firstCommit, lastCommit } = await fetchGitHubCommitDates(repoPath);
    
    if (firstCommit && lastCommit) {
      console.log(`${repoPath}:`);
      console.log(`  First commit: ${firstCommit}`);
      console.log(`  Last commit:  ${lastCommit}\n`);
      
      // Update dateStarted and dateModified in the content
      // Find the project block that contains this repoUrl
      const projectBlockRegex = new RegExp(
        `(\\{[^}]*repoUrl:\\s*"${fullUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*)(dateStarted:\\s*"[^"]*")([^}]*)(dateModified:\\s*"[^"]*"|)(.*?\\})`,
        's'
      );
      
      const projectMatch = content.match(projectBlockRegex);
      if (projectMatch) {
        // Replace dateStarted
        content = content.replace(
          new RegExp(`(repoUrl:\\s*"${fullUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*?dateStarted:\\s*")[^"]*"`, 's'),
          `$1${firstCommit}"`
        );
        
        // Check if dateModified exists, if not add it
        if (content.includes(`repoUrl: "${fullUrl}"`) && content.match(new RegExp(`repoUrl:\\s*"${fullUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*dateModified:`, 's'))) {
          // Replace existing dateModified
          content = content.replace(
            new RegExp(`(repoUrl:\\s*"${fullUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*?dateModified:\\s*")[^"]*"`, 's'),
            `$1${lastCommit}"`
          );
        } else {
          // Add dateModified after dateStarted
          content = content.replace(
            new RegExp(`(repoUrl:\\s*"${fullUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*?dateStarted:\\s*"[^"]*",)`, 's'),
            `$1\n    dateModified: "${lastCommit}",`
          );
        }
      }
    } else {
      console.warn(`Failed to fetch dates for ${repoPath}\n`);
    }
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('Writing updated projects.ts...');
  writeFileSync(projectsPath, content, 'utf-8');
  console.log('Done! ✅');
}

// Run the script
updateProjectDates().catch(console.error);
