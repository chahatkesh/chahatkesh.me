"use client";

import { useEffect, useRef } from "react";
import { Users } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "~/constants";
import { fetcher, postFetcher } from "~/lib/fetcher";

type VisitorData = { count: number };

const VISITOR_QUERY_KEY = ["visitor-count"] as const;

const VisitorCounter = () => {
  const queryClient = useQueryClient();
  const hasIncremented = useRef(false);

  const { data, isLoading } = useQuery<VisitorData>({
    queryKey: VISITOR_QUERY_KEY,
    queryFn: () => fetcher<VisitorData>(API_ROUTES.VISITORS),
    staleTime: Infinity, // Count won't change during session
    retry: 1,
  });

  // Increment once on mount
  useEffect(() => {
    if (hasIncremented.current) return;
    hasIncremented.current = true;

    postFetcher<VisitorData>(API_ROUTES.VISITORS_INCREMENT)
      .then((result) => {
        queryClient.setQueryData(VISITOR_QUERY_KEY, result);
      })
      .catch(() => {
        // Silently fail — visitor increment is non-critical
      });
  }, [queryClient]);

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <Users className="h-4 w-4" aria-hidden="true" />
      <span>
        Visitor #{isLoading ? "..." : data?.count?.toLocaleString() || "0"}
      </span>
    </div>
  );
};

export default VisitorCounter;
