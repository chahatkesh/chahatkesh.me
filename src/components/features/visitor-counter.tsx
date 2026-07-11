"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { API_ROUTES } from "~/constants";
import { fetcher, postFetcher } from "~/lib/fetcher";

type VisitorData = { count: number };

const SESSION_INCREMENT_KEY = "visitor-incremented";

/**
 * Shows the live visitor count, and increments once per browser session.
 * GET runs immediately for display; POST is session-guarded so React Strict
 * Mode remounts cannot cancel the request and leave the UI stuck on "...".
 */
const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const current = await fetcher<VisitorData>(API_ROUTES.VISITORS);
        if (!cancelled) setCount(current.count);

        if (sessionStorage.getItem(SESSION_INCREMENT_KEY)) return;

        sessionStorage.setItem(SESSION_INCREMENT_KEY, "1");
        const updated = await postFetcher<VisitorData>(
          API_ROUTES.VISITORS_INCREMENT,
        );
        if (!cancelled) setCount(updated.count);
      } catch {
        // Silently fail — visitor count is non-critical
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <Users className="h-4 w-4" aria-hidden="true" />
      <span>Visitor #{count === null ? "..." : count.toLocaleString()}</span>
    </div>
  );
};

export default VisitorCounter;
