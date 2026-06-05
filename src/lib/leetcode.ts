const LEETCODE_GRAPHQL_ENDPOINT = "https://leetcode.com/graphql";

const STATS_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      profile {
        ranking
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

// ---------- Stats types ----------

export type LeetCodeStats = {
  username: string;
  ranking: number;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
};

type AcSubmission = { difficulty: string; count: number };
type QuestionCount = { difficulty: string; count: number };

type LeetCodeStatsResponse = {
  data: {
    matchedUser: {
      profile: { ranking: number };
      submitStatsGlobal: { acSubmissionNum: AcSubmission[] };
    };
    allQuestionsCount: QuestionCount[];
  };
};

// ---------- Helpers ----------

function findCount(
  items: { difficulty: string; count: number }[],
  key: string,
) {
  return items.find((i) => i.difficulty === key)?.count ?? 0;
}

function toDateString(ts: number): string {
  const d = new Date(ts * 1000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

async function queryLeetCode<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`LeetCode API error: ${response.status}`);
  }

  return (await response.json()) as T;
}

// ---------- Public API ----------

export async function getLeetCodeStats(
  username: string,
): Promise<LeetCodeStats> {
  const json = await queryLeetCode<LeetCodeStatsResponse>(STATS_QUERY, {
    username,
  });
  const { matchedUser, allQuestionsCount } = json.data;
  const solved = matchedUser.submitStatsGlobal.acSubmissionNum;

  return {
    username,
    ranking: matchedUser.profile.ranking,
    totalSolved: findCount(solved, "All"),
    easy: findCount(solved, "Easy"),
    medium: findCount(solved, "Medium"),
    hard: findCount(solved, "Hard"),
    totalEasy: findCount(allQuestionsCount, "Easy"),
    totalMedium: findCount(allQuestionsCount, "Medium"),
    totalHard: findCount(allQuestionsCount, "Hard"),
  };
}

// ---------- Multi-year submission history ----------

const ACTIVE_YEARS_QUERY = `
  query getActiveYears($username: String!) {
    matchedUser(username: $username) {
      userCalendar {
        activeYears
      }
    }
  }
`;

const YEAR_CALENDAR_QUERY = `
  query getYearCalendar($username: String!, $year: Int!) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        submissionCalendar
      }
    }
  }
`;

type ActiveYearsResponse = {
  data: { matchedUser: { userCalendar: { activeYears: number[] } } | null };
};

type YearCalendarResponse = {
  data: {
    matchedUser: { userCalendar: { submissionCalendar: string } } | null;
  };
};

/**
 * Returns LeetCode submission counts keyed by `YYYY-MM-DD`, covering every year
 * the user has been active. Used to build a multi-year activity calendar.
 */
export async function getLeetCodeSubmissionCounts(
  username: string,
): Promise<Record<string, number>> {
  const activeYearsJson = await queryLeetCode<ActiveYearsResponse>(
    ACTIVE_YEARS_QUERY,
    { username },
  );
  const activeYears =
    activeYearsJson.data.matchedUser?.userCalendar?.activeYears ?? [];

  const countByDate: Record<string, number> = {};

  await Promise.all(
    activeYears.map(async (year) => {
      const yearJson = await queryLeetCode<YearCalendarResponse>(
        YEAR_CALENDAR_QUERY,
        { username, year },
      );
      const rawCalendar =
        yearJson.data.matchedUser?.userCalendar?.submissionCalendar;
      if (!rawCalendar) return;

      const calendarMap = JSON.parse(rawCalendar) as Record<string, number>;
      for (const [timestamp, count] of Object.entries(calendarMap)) {
        countByDate[toDateString(Number(timestamp))] = count;
      }
    }),
  );

  return countByDate;
}
