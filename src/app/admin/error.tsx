"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-12">
      <div className="container flex flex-col items-center gap-6 text-center">
        <div className="rounded-xl border border-border bg-card p-8">
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Admin Error
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Something went wrong in the admin panel.
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
