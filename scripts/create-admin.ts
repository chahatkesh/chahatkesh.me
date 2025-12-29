/**
 * Admin Setup Script
 *
 * This script creates an admin user in the database with a hashed password.
 * Run this once to set up your admin account.
 *
 * Usage: pnpm create-admin
 */

import dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import * as readline from "readline";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI not found in environment variables");
  console.error("📝 Make sure .env.local exists and contains MONGODB_URI");
  process.exit(1);
}

interface IAdmin {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new mongoose.Schema<IAdmin>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Admin =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  try {
    console.log("🔐 Admin User Setup\n");

    // Connect to MongoDB
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    await mongoose.connect(MONGODB_URI);
    console.log("✓ Connected to MongoDB\n");

    // Get username
    const username = await question("Enter admin username: ");
    if (!username.trim()) {
      console.error("❌ Username cannot be empty");
      process.exit(1);
    }

    // Check if user already exists
    const existingAdmin = await Admin.findOne({ username: username.trim() });
    if (existingAdmin) {
      const overwrite = await question(
        `⚠️  User "${username}" already exists. Overwrite? (yes/no): `,
      );
      if (overwrite.toLowerCase() !== "yes") {
        console.log("❌ Operation cancelled");
        process.exit(0);
      }
    }

    // Get password
    const password = await question("Enter admin password: ");
    if (!password || password.length < 6) {
      console.error("❌ Password must be at least 6 characters");
      process.exit(1);
    }

    // Confirm password
    const confirmPassword = await question("Confirm password: ");
    if (password !== confirmPassword) {
      console.error("❌ Passwords do not match");
      process.exit(1);
    }

    console.log("\n🔄 Creating admin user...");

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create or update admin user
    if (existingAdmin) {
      await Admin.updateOne(
        { username: username.trim() },
        { password: hashedPassword },
      );
      console.log(`✅ Admin user "${username}" password updated successfully!`);
    } else {
      await Admin.create({
        username: username.trim(),
        password: hashedPassword,
      });
      console.log(`✅ Admin user "${username}" created successfully!`);
    }

    console.log("\n📝 You can now login with these credentials at /admin");
    console.log(`   Username: ${username}`);
    console.log("   Password: [hidden]\n");
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  } finally {
    rl.close();
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();
