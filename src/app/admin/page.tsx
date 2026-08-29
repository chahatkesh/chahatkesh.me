"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Dumbbell,
  File,
  FileText,
  Image,
  Loader2,
  LogOut,
  MapPinned,
  Workflow,
} from "lucide-react";
import { Button, Input, Label } from "~/components/ui";
import { MotionDiv, PageLoader } from "~/components/shared";
import { AdminDashboardCard } from "~/components/admin";

const DASHBOARD_LINKS: Array<{
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    href: "/admin/gallery",
    title: "Gallery",
    description: "Upload and organize public gallery images",
    icon: Image,
  },
  {
    href: "/admin/places",
    title: "Places",
    description: "Pin visited locations on the places map",
    icon: MapPinned,
  },
  {
    href: "/admin/gym",
    title: "Gym",
    description: "Log sessions with sets, reps, and weights",
    icon: Dumbbell,
  },
  {
    href: "/admin/files",
    title: "Files",
    description: "Upload files and copy shareable URLs",
    icon: File,
  },
  {
    href: "/admin/diagrams",
    title: "Diagrams",
    description: "Build Mermaid diagrams with public links",
    icon: Workflow,
  },
  {
    href: "/admin/gists",
    title: "Gists",
    description: "Write and publish markdown notes",
    icon: FileText,
  },
  {
    href: "/admin/experience",
    title: "Experience",
    description: "Manage highlight images per company",
    icon: Briefcase,
  },
];

const fieldClassName =
  "h-10 border-border bg-background transition-colors placeholder:text-muted-foreground/50 focus-visible:border-muted-foreground/40";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch("/api/auth/session");
      const data = await response.json();

      if (data.authenticated) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Session check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    let succeeded = false;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        succeeded = true;
        setError("");
        // Refresh the server layout so the admin navbar mounts before we
        // paint the dashboard — avoids a centered flash in the login shell.
        router.refresh();
        setIsAuthenticated(true);
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Try again.");
    } finally {
      if (!succeeded) setIsSubmitting(false);
    }
  };

  // Reveal the dashboard only once the authenticated shell (navbar) is present.
  useEffect(() => {
    if (!isAuthenticated || !isSubmitting) return;

    let cancelled = false;
    const reveal = () => {
      if (!cancelled) setIsSubmitting(false);
    };

    const hasNavbar = () =>
      Boolean(document.querySelector('[aria-label="Admin navigation"]'));

    if (hasNavbar()) {
      reveal();
      return;
    }

    const observer = new MutationObserver(() => {
      if (hasNavbar()) {
        observer.disconnect();
        reveal();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const fallback = window.setTimeout(reveal, 800);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [isAuthenticated, isSubmitting]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      setUsername("");
      setPassword("");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading || (isAuthenticated && isSubmitting)) {
    return (
      <PageLoader
        minHeight={isAuthenticated ? "none" : "screen"}
        className={isAuthenticated ? "flex-1" : undefined}
        label={isAuthenticated ? "Loading dashboard" : "Checking session"}
      />
    );
  }

  if (!isAuthenticated) {
    const canSubmit = Boolean(username.trim() && password) && !isSubmitting;

    return (
      <div className="flex h-dvh items-center justify-center px-6">
        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[320px]"
        >
          <form
            onSubmit={handleLogin}
            className="space-y-6"
            noValidate
            aria-label="Admin sign in"
          >
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="username"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Username"
                  className={fieldClassName}
                  required
                  disabled={isSubmitting}
                  autoComplete="username"
                  autoFocus
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Password"
                  className={fieldClassName}
                  required
                  disabled={isSubmitting}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="h-10 w-full text-sm font-medium"
                disabled={!canSubmit}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-3.5 animate-spin" />
                    Signing in
                  </>
                ) : (
                  "Continue"
                )}
              </Button>

              <p
                role="alert"
                aria-live="polite"
                className="min-h-4 text-center text-xs text-red-500/90"
              >
                {error || "\u00A0"}
              </p>
            </div>
          </form>
        </MotionDiv>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center py-6">
      <MotionDiv
        className="mx-auto w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {DASHBOARD_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <AdminDashboardCard
                key={item.href}
                href={item.href}
                title={item.title}
                description={item.description}
                icon={<Icon className="size-[18px]" strokeWidth={1.75} />}
              />
            );
          })}
          <AdminDashboardCard
            title="Logout"
            description="Sign out of the admin dashboard"
            icon={<LogOut className="size-[18px]" strokeWidth={1.75} />}
            onClick={handleLogout}
          />
        </div>
      </MotionDiv>
    </div>
  );
}
