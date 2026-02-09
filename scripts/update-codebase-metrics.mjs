#!/usr/bin/env node

import { readdir, readFile, writeFile } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, "..");

/**
 * Count lines of code in a file
 */
async function countLinesInFile(filePath) {
  try {
    const content = await readFile(filePath, "utf-8");
    // Count non-empty lines (trim whitespace)
    return content.split("\n").filter((line) => line.trim().length > 0).length;
  } catch {
    return 0;
  }
}

/**
 * Recursively get all files in a directory
 */
async function getAllFiles(dir, extensions = []) {
  const files = [];

  async function traverse(currentPath) {
    try {
      const entries = await readdir(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(currentPath, entry.name);

        // Skip node_modules, .next, .git, etc.
        if (
          entry.name === "node_modules" ||
          entry.name === ".next" ||
          entry.name === ".git" ||
          entry.name === "dist" ||
          entry.name === "build" ||
          entry.name === ".turbo"
        ) {
          continue;
        }

        if (entry.isDirectory()) {
          await traverse(fullPath);
        } else if (entry.isFile()) {
          const ext = extname(entry.name);
          if (extensions.length === 0 || extensions.includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    } catch (err) {
      // Skip directories we can't read
    }
  }

  await traverse(dir);
  return files;
}

/**
 * Count files in a specific directory
 */
async function countFilesInDir(dir, extensions = []) {
  try {
    const files = await getAllFiles(dir, extensions);
    return files.length;
  } catch {
    return 0;
  }
}

/**
 * Count API routes (route.ts/route.tsx files in app/api)
 */
async function countApiRoutes(apiDir) {
  try {
    let count = 0;

    async function traverse(currentPath) {
      try {
        const entries = await readdir(currentPath, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = join(currentPath, entry.name);

          if (entry.isDirectory()) {
            await traverse(fullPath);
          } else if (entry.isFile() && entry.name.startsWith("route.")) {
            count++;
          }
        }
      } catch {}
    }

    await traverse(apiDir);
    return count;
  } catch {
    return 0;
  }
}

/**
 * Main function to calculate all metrics
 */
async function calculateMetrics() {
  console.log("📊 Calculating codebase metrics...\n");

  // 1. Total Lines of Code (TypeScript + TSX + CSS)
  console.log("🔢 Counting lines of code...");
  const srcDir = join(ROOT_DIR, "src");
  const codeFiles = await getAllFiles(srcDir, [
    ".ts",
    ".tsx",
    ".css",
    ".mjs",
  ]);
  let totalLines = 0;
  for (const file of codeFiles) {
    totalLines += await countLinesInFile(file);
  }
  const formattedLines = totalLines.toLocaleString();
  console.log(`   ✓ Total Lines: ${formattedLines}`);

  // 2. Components
  console.log("🧩 Counting components...");
  const componentsDir = join(ROOT_DIR, "src/components");
  const componentFiles = await getAllFiles(componentsDir, [".tsx"]);
  // Exclude index.ts files
  const componentCount = componentFiles.filter(
    (f) => !f.endsWith("index.ts") && !f.endsWith("index.tsx")
  ).length;
  console.log(`   ✓ Components: ${componentCount}`);

  // 3. Custom Hooks
  console.log("🪝 Counting custom hooks...");
  const hooksDir = join(ROOT_DIR, "src/hooks");
  const hookCount = await countFilesInDir(hooksDir, [".tsx", ".ts"]);
  // Subtract index.ts
  const actualHookCount = Math.max(hookCount - 1, 0);
  console.log(`   ✓ Custom Hooks: ${actualHookCount}`);

  // 4. API Routes
  console.log("🛣️  Counting API routes...");
  const apiDir = join(ROOT_DIR, "src/app/api");
  const apiRouteCount = await countApiRoutes(apiDir);
  console.log(`   ✓ API Routes: ${apiRouteCount}`);

  // 5. Type Definition Files
  console.log("📝 Counting type definitions...");
  const typesDir = join(ROOT_DIR, "src/types");
  const typeCount = await countFilesInDir(typesDir, [".ts", ".d.ts"]);
  console.log(`   ✓ Type Files: ${typeCount}`);

  // 6. Constant Modules
  console.log("📌 Counting constant modules...");
  const constantsDir = join(ROOT_DIR, "src/constants");
  const constantCount = await countFilesInDir(constantsDir, [".ts", ".tsx"]);
  console.log(`   ✓ Constant Modules: ${constantCount}`);

  // 7. Data Modules
  console.log("📚 Counting data modules...");
  const dataDir = join(ROOT_DIR, "src/data");
  const dataCount = await countFilesInDir(dataDir, [".ts", ".tsx"]);
  console.log(`   ✓ Data Modules: ${dataCount}`);

  // 8. Mongoose Models
  console.log("🗄️  Counting mongoose models...");
  const modelsDir = join(ROOT_DIR, "src/models");
  const modelCount = await countFilesInDir(modelsDir, [".ts"]);
  console.log(`   ✓ Mongoose Models: ${modelCount}`);

  return {
    totalLines: formattedLines,
    components: componentCount,
    hooks: actualHookCount,
    apiRoutes: apiRouteCount,
    types: typeCount,
    constants: constantCount,
    data: dataCount,
    models: modelCount,
  };
}

/**
 * Update the site.tsx file with new metrics
 */
async function updateSiteFile(metrics) {
  const siteFilePath = join(ROOT_DIR, "src/data/site.tsx");
  let content = await readFile(siteFilePath, "utf-8");

  // Define replacements
  const replacements = [
    {
      pattern: /(label: "Total Lines of Code",\s+value: )"[^"]+"/,
      replacement: `$1"${metrics.totalLines}+"`,
    },
    {
      pattern: /(label: "Components",\s+value: )"[^"]+"/,
      replacement: `$1"${metrics.components}"`,
    },
    {
      pattern: /(label: "Custom Hooks",\s+value: )"[^"]+"/,
      replacement: `$1"${metrics.hooks}"`,
    },
    {
      pattern: /(label: "API Routes",\s+value: )"[^"]+"/,
      replacement: `$1"${metrics.apiRoutes}"`,
    },
    {
      pattern: /(label: "Type Definition Files",\s+value: )"[^"]+"/,
      replacement: `$1"${metrics.types}"`,
    },
    {
      pattern: /(label: "Constant Modules",\s+value: )"[^"]+"/,
      replacement: `$1"${metrics.constants}"`,
    },
    {
      pattern: /(label: "Data Modules",\s+value: )"[^"]+"/,
      replacement: `$1"${metrics.data}"`,
    },
    {
      pattern: /(label: "Mongoose Models",\s+value: )"[^"]+"/,
      replacement: `$1"${metrics.models}"`,
    },
  ];

  // Apply all replacements
  for (const { pattern, replacement } of replacements) {
    content = content.replace(pattern, replacement);
  }

  await writeFile(siteFilePath, content, "utf-8");
  console.log("\n✅ Updated src/data/site.tsx with new metrics!");
}

/**
 * Run the script
 */
async function main() {
  try {
    const metrics = await calculateMetrics();
    await updateSiteFile(metrics);

    console.log("\n📈 Summary:");
    console.log("━".repeat(50));
    console.log(`Total Lines of Code: ${metrics.totalLines}+`);
    console.log(`Components: ${metrics.components}`);
    console.log(`Custom Hooks: ${metrics.hooks}`);
    console.log(`API Routes: ${metrics.apiRoutes}`);
    console.log(`Type Definition Files: ${metrics.types}`);
    console.log(`Constant Modules: ${metrics.constants}`);
    console.log(`Data Modules: ${metrics.data}`);
    console.log(`Mongoose Models: ${metrics.models}`);
    console.log("━".repeat(50));
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

main();
