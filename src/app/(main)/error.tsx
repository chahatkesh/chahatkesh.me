"use client";

import { useEffect } from "react";

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-12">
      <div className="container flex flex-col items-center gap-6 text-center">
        <div className="rounded-xl border border-border bg-card p-8">
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Something went wrong
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand/90"
          >
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}
