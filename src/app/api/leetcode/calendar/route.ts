import { NextResponse } from "next/server";
import { getLeetCodeCalendar, type LeetCodeCalendar } from "~/lib/leetcode";
import config from "~/config";

export const revalidate = 3600;

const EMPTY_CALENDAR: LeetCodeCalendar = {
  days: [],
  streak: 0,
  totalActiveDays: 0,
};

export async function GET() {
  try {
    const calendar = await getLeetCodeCalendar(config.author.leetcode);
    return NextResponse.json(calendar);
  } catch (error) {
    console.error("LeetCode Calendar API error:", error);
    return NextResponse.json(EMPTY_CALENDAR);
  }
}
