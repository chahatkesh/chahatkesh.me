#!/usr/bin/env node

import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, "..");

/**
 * Map of tech names in site.tsx to their package.json keys
 */
const TECH_TO_PACKAGE_MAP = {
  "Next.js": "next",
  React: "react",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwindcss",
  "Framer Motion": "framer-motion",
  "Radix UI": "@radix-ui/react-dialog", // Use any radix package as reference
  MongoDB: "mongoose", // Using mongoose package for MongoDB version
  "React Query": "@tanstack/react-query",
  Cloudinary: "cloudinary",
  Zod: "zod",
};

/**
 * Extract version from package string (removes ^, ~, >=, etc.)
 */
function cleanVersion(versionString) {
  if (!versionString) return null;
  // Remove ^ ~ >= <= > < and any spaces
  return versionString.replace(/^[\^~><=\s]+/, "").trim();
}

/**
 * Format version for display (e.g., "16.1.6" -> "16.1" for minor versions)
 */
function formatVersion(version, techName) {
  if (!version) return null;

  const parts = version.split(".");

  // Special cases for cleaner display
  switch (techName) {
    case "React":
    case "Framer Motion":
    case "React Query":
    case "Zod":
      // Show only major version
      return parts[0];

    case "Next.js":
    case "TypeScript":
    case "Tailwind CSS":
    case "MongoDB":
    case "Cloudinary":
      // Show major.minor
      return parts.slice(0, 2).join(".");

    case "Radix UI":
      // Show major.x format
      return `${parts[0]}.x`;

    default:
      return version;
  }
}

/**
 * Main function to update tech versions
 */
async function updateTechVersions() {
  console.log("📦 Updating tech stack versions from package.json...\n");

  // Read package.json
  const packageJsonPath = join(ROOT_DIR, "package.json");
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf-8"));

  const allDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  // Read site.tsx
  const siteFilePath = join(ROOT_DIR, "src/data/site.tsx");
  let siteContent = await readFile(siteFilePath, "utf-8");

  // Track updates
  const updates = [];

  // Update each tech version
  for (const [techName, packageKey] of Object.entries(TECH_TO_PACKAGE_MAP)) {
    const packageVersion = allDependencies[packageKey];

    if (packageVersion) {
      const cleanedVersion = cleanVersion(packageVersion);
      const displayVersion = formatVersion(cleanedVersion, techName);

      if (displayVersion) {
        // Create regex to match the tech entry and update version
        // Match: name: "Tech Name", \n    version: "old-version",
        const pattern = new RegExp(
          `(name: "${techName}",\\s+version: )"[^"]+"`,
          "g",
        );

        const beforeUpdate = siteContent;
        siteContent = siteContent.replace(pattern, `$1"${displayVersion}"`);

        if (beforeUpdate !== siteContent) {
          updates.push({
            tech: techName,
            version: displayVersion,
            packageVersion: cleanedVersion,
          });
          console.log(
            `✓ ${techName.padEnd(20)} → v${displayVersion} (${packageKey}@${cleanedVersion})`,
          );
        }
      }
    } else {
      console.log(
        `⚠ ${techName.padEnd(20)} → Package "${packageKey}" not found`,
      );
    }
  }

  // Write updated content back to file
  if (updates.length > 0) {
    await writeFile(siteFilePath, siteContent, "utf-8");
    console.log(
      `\n✅ Updated ${updates.length} tech versions in src/data/site.tsx!`,
    );
  } else {
    console.log("\n✅ All tech versions are already up to date!");
  }

  // Summary
  console.log("\n📊 Summary:");
  console.log("━".repeat(60));
  updates.forEach(({ tech, version }) => {
    console.log(`${tech}: v${version}`);
  });
  console.log("━".repeat(60));
}

/**
 * Run the script
 */
async function main() {
  try {
    await updateTechVersions();
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

main();
