"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui";
import { PageLoader } from "~/components/shared";
import { isSafeAdminReturnPath } from "~/lib/admin-path";

function expiredLoginHref() {
  const from = `${window.location.pathname}${window.location.search}`;
  const params = new URLSearchParams({ reason: "expired" });
  if (isSafeAdminReturnPath(from) && window.location.pathname !== "/admin") {
    params.set("from", from);
  }
  return `/admin?${params.toString()}`;
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [checkFailed, setCheckFailed] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        const response = await fetch("/api/auth/session");
        if (cancelled) return;

        if (response.status >= 500) {
          setCheckFailed(true);
          setIsLoading(false);
          return;
        }

        const data = (await response.json()) as { authenticated?: boolean };
        if (cancelled) return;

        if (!data.authenticated) {
          router.replace(expiredLoginHref());
          return;
        }

        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Session check failed:", error);
        if (cancelled) return;
        setCheckFailed(true);
        setIsLoading(false);
      }
    }

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, [router, retryCount]);

  if (isLoading && !checkFailed) {
    return <PageLoader minHeight="section" label="Checking session" />;
  }

  if (checkFailed) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
        <p className="text-sm text-muted-foreground">
          Couldn&apos;t verify session.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setIsLoading(true);
            setCheckFailed(false);
            setRetryCount((count) => count + 1);
          }}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PageLoader minHeight="section" label="Checking session" />;
  }

  return <>{children}</>;
}
