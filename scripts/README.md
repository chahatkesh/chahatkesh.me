# Scripts

Utility scripts for managing project data.

## update-project-dates.mjs

Automatically fetches Git commit dates from GitHub repositories and updates the `dateStarted` and `dateModified` fields in `src/data/projects.ts`.

### Usage

```bash
npm run update-project-dates
```

or

```bash
node scripts/update-project-dates.mjs
```

### What it does

For each project with a GitHub repository:
- **dateStarted**: Set to the date of the first commit in the repository
- **dateModified**: Set to the date of the most recent commit

### GitHub API Rate Limits

The script uses the GitHub API without authentication, which has a rate limit of 60 requests per hour. If you need to fetch dates for many repositories, you can add a GitHub personal access token:

1. Create a token at https://github.com/settings/tokens
2. Add it to your environment or modify the script to use it:

```javascript
headers: {
  'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
}
```

### Notes

- The script adds a 1-second delay between API calls to avoid rate limiting
- Dates are formatted as YYYY-MM-DD
- The script preserves the `datePublished` field and only updates `dateStarted` and `dateModified`
- If a repository has few commits, the first commit date is used directly
- For repositories with many commits, pagination is used to find the actual first commit
