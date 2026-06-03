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
    <section
      className="flex min-h-dvh items-center justify-center px-6"
      id="main-content"
    >
      <div className="max-w-md text-center">
        <p
          aria-hidden="true"
          className="font-poem text-[8rem] font-semibold leading-none tracking-tighter text-foreground/[0.04] sm:text-[12rem]"
        >
          500
        </p>

        <div className="-mt-10 space-y-4 sm:-mt-14">
          <h1 className="font-ubuntu text-lg font-medium text-foreground sm:text-xl">
            Something broke.
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Something went wrong in the admin panel. Try again, or head back to
            the dashboard.
          </p>

          <button
            onClick={reset}
            className="el-focus-styles inline-block rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card"
          >
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}
