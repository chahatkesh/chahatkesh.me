# Code Quality Setup

This project enforces code quality automatically at multiple stages.

## Automated Quality Checks

### 1. **Pre-Commit Hooks** (Local)
Every time you commit, the following checks run automatically:
- ✅ **ESLint** - Fixes linting issues
- ✅ **Prettier** - Auto-formats code
- ✅ **TypeScript** - Checks for type errors

**Pre-commit hooks run on staged files only**, so they're fast!

### 2. **CI/CD Pipeline** (GitHub Actions)
On every push/PR to main/dev branches:
- ✅ ESLint check
- ✅ TypeScript type check
- ✅ Prettier formatting check
- ✅ Build verification

### 3. **VS Code Auto-Format** (On Save)
When you save a file in VS Code:
- ✅ Prettier formats the file
- ✅ ESLint auto-fixes issues

## Manual Commands

Run these anytime:

```bash
# Run all checks
pnpm validate

# Individual checks
pnpm lint              # ESLint
pnpm type-check        # TypeScript
pnpm format:check      # Check formatting
pnpm format            # Fix formatting
```

## How It Works

1. **Husky** - Manages git hooks
2. **lint-staged** - Runs checks only on staged files
3. **GitHub Actions** - Runs full checks on CI/CD
4. **VS Code settings** - Auto-format on save

## Bypassing Hooks (Not Recommended)

If you absolutely need to skip pre-commit hooks:
```bash
git commit --no-verify -m "your message"
```

**Note:** CI/CD will still catch issues!

## Setup for Team Members

After cloning:
```bash
pnpm install
```

This automatically sets up git hooks via the `prepare` script.
