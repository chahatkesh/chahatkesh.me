# Scripts

Utility scripts for managing project data and codebase metrics.

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

---

## update-codebase-metrics.mjs

Automatically calculates codebase metrics and updates the values in `src/data/site.tsx`.

### Usage

```bash
npm run update-metrics
```

or

```bash
node scripts/update-codebase-metrics.mjs
```

### What it does

Scans your codebase and updates the following metrics:

- **Total Lines of Code**: Counts non-empty lines in all `.ts`, `.tsx`, `.css`, and `.mjs` files in `src/`
- **Components**: Counts React component files in `src/components/` (excludes index files)
- **Custom Hooks**: Counts hook files in `src/hooks/` (excludes index files)
- **API Routes**: Counts `route.ts/tsx` files in `src/app/api/`
- **Type Definition Files**: Counts `.ts` and `.d.ts` files in `src/types/`
- **Constant Modules**: Counts files in `src/constants/`
- **Data Modules**: Counts files in `src/data/`
- **Mongoose Models**: Counts model files in `src/models/`

### When to run

Run this script whenever you want to update the metrics displayed on your `/about/site` page:

- Before deploying a new version
- After adding/removing major features
- When preparing release notes
- As part of your CI/CD pipeline (optional)

### Notes

- The script automatically skips common build directories (`node_modules`, `.next`, `.git`, etc.)
- Counts only non-empty lines (lines with actual code, excluding blank lines)
- Updates are made directly to the `codebaseMetrics` array in `src/data/site.tsx`
- Total lines count is formatted with commas for readability (e.g., "13,300")

---

## update-tech-versions.mjs

Automatically syncs tech stack versions in `src/data/site.tsx` with the versions from `package.json`.

### Usage

```bash
npm run update-tech-versions
```

or

```bash
node scripts/update-tech-versions.mjs
```

### What it does

Reads `package.json` and updates version numbers for:

- **Next.js** - Shows major.minor (e.g., "16.1")
- **React** - Shows major version only (e.g., "19")
- **TypeScript** - Shows major.minor (e.g., "5.9")
- **Tailwind CSS** - Shows major.minor (e.g., "3.4")
- **Framer Motion** - Shows major version (e.g., "12")
- **Radix UI** - Shows major.x format (e.g., "1.x")
- **MongoDB** (via mongoose) - Shows major.minor (e.g., "9.1")
- **React Query** - Shows major version (e.g., "5")
- **Cloudinary** - Shows major.minor (e.g., "2.9")
- **Lenis** - Shows major.minor (e.g., "1.3")

### When to run

- After running `npm install` or `pnpm install`
- After upgrading dependencies with `npm upgrade-interactive`
- Before deploying to ensure displayed versions match actual package versions
- When preparing documentation or release notes

### Update all metrics at once

For convenience, you can update both codebase metrics and tech versions:

```bash
npm run update-all
```

This runs both `update-metrics` and `update-tech-versions` in sequence.

### Notes

- Version numbers are cleaned (removes `^`, `~`, `>=` prefixes)
- Display format is optimized for readability (e.g., shows "19" instead of "19.2.4" for React)
- If a package is not found in `package.json`, a warning is displayed but the script continues
- Updates are made directly to the `techStack` array in `src/data/site.tsx`
