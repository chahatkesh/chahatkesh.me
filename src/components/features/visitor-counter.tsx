"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  // Use _error variable to avoid linting issue while still tracking errors
  const [_error, setError] = useState(false);

  useEffect(() => {
    // Function to increment visitor count
    const incrementVisitorCount = async () => {
      // Add a console log to help debug
      console.log("Incrementing visitor count");
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        // Add a timestamp query parameter to bust any caching
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/visitors/increment?t=${timestamp}`, {
          signal: controller.signal,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
          // Set cache property to no-store to prevent browser caching
          cache: "no-store",
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        } else {
          console.error("Failed to increment visitor count");
          setError(true);
          // Fallback to just getting the count without incrementing
          fetchVisitorCount();
        }
      } catch (error) {
        console.error("Error incrementing visitor count:", error);
        setError(true);
        // Fallback to just getting the count without incrementing
        fetchVisitorCount();
      } finally {
        setLoading(false);
      }
    };

    // Fallback function to just get the visitor count without incrementing
    const fetchVisitorCount = async () => {
      try {
        // Add a timestamp query parameter to bust any caching
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/visitors?t=${timestamp}`, {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        }
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function initially
    incrementVisitorCount();

    // Add an event listener for page visibility changes
    // This will help with detecting when a user returns to the tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        incrementVisitorCount();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <Users className="h-4 w-4" aria-hidden="true" />
      <span>Visitor #{loading ? "..." : count?.toLocaleString() || 0}</span>
    </div>
  );
};

export default VisitorCounter;
