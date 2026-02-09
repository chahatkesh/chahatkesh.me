# Git Hooks Configuration

This directory contains Git hooks managed by [Husky](https://typicode.github.io/husky/).

## Available Hooks

### pre-commit
**Runs before every commit**
- Executes `lint-staged` to format and lint only staged files
- Runs TypeScript type checking if any `.ts` or `.tsx` files are staged
- Ensures code quality before committing

**Configured checks:**
- ESLint with automatic fixes
- Prettier formatting
- TypeScript compilation check (conditional)

### commit-msg
**Validates commit message format**
- Enforces [Conventional Commits](https://www.conventionalcommits.org/) specification
- Allows merge commits and special commits to skip validation
- Accepted types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

**Example valid commit messages:**
```
feat: add user authentication
fix(api): resolve CORS issue
docs: update README
```

**Skip validation:** Use `git commit --no-verify` or `git commit -n`

### pre-push
**Runs before pushing to remote**
- Full TypeScript type checking
- Complete linting of the codebase
- Code formatting validation
- Acts as a comprehensive quality gate before push

## Bypassing Hooks

To skip hooks when necessary (use sparingly):
```bash
git commit --no-verify  # or -n
git push --no-verify    # or -n
```

## Troubleshooting

If hooks aren't running:
1. Ensure hooks are executable: `chmod +x .husky/*`
2. Verify husky is installed: `pnpm install`
3. Re-run husky setup: `pnpm prepare`
4. Check git config: `git config core.hooksPath` should output `.husky/_`

## Lint-Staged Configuration

Defined in `package.json`:
- **TypeScript files** (`.ts`, `.tsx`): ESLint fix + Prettier format
- **JSON/CSS files**: Prettier format
