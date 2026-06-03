import { NextResponse } from "next/server";
import { getLeetCodeStats, type LeetCodeStats } from "~/lib/leetcode";
import config from "~/config";

export const revalidate = 3600;

const EMPTY_STATS: LeetCodeStats = {
  username: config.author.leetcode,
  ranking: 0,
  totalSolved: 0,
  easy: 0,
  medium: 0,
  hard: 0,
  totalEasy: 0,
  totalMedium: 0,
  totalHard: 0,
};

export async function GET() {
  try {
    const stats = await getLeetCodeStats(config.author.leetcode);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("LeetCode API error:", error);
    return NextResponse.json(EMPTY_STATS);
  }
}
