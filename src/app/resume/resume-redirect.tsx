"use client";

import { useEffect } from "react";

export function ResumeRedirect({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-muted-foreground text-sm">Opening resume…</p>
      <a
        href={href}
        className="text-foreground text-sm underline underline-offset-4"
      >
        Continue to resume
      </a>
    </main>
  );
}
