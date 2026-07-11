"use client";

import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  Briefcase,
  File,
  FileText,
  Image,
  Loader2,
  LogIn,
  LogOut,
  MapPinned,
  Workflow,
} from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui";
import { Input } from "~/components/ui";
import { Label } from "~/components/ui";
import { MotionDiv } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
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
    description:
      "Upload, organize, and manage your image gallery with Cloudinary integration",
    icon: Image,
  },
  {
    href: "/admin/places",
    title: "Places",
    description:
      "Add visited locations with exact coordinates for your public interactive places map",
    icon: MapPinned,
  },
  {
    href: "/admin/files",
    title: "Files",
    description:
      "Upload any file and instantly get a shareable URL to send to anyone",
    icon: File,
  },
  {
    href: "/admin/diagrams",
    title: "Diagrams",
    description:
      "Build Mermaid diagram pages with live preview and copyable public teaching links",
    icon: Workflow,
  },
  {
    href: "/admin/gists",
    title: "Gists",
    description:
      "Write markdown notes and share them publicly as clean, readable document pages",
    icon: FileText,
  },
  {
    href: "/admin/experience",
    title: "Experience Gallery",
    description: "Upload and manage highlight images for each work experience",
    icon: Briefcase,
  },
];

export default function AdminPage() {
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
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setError("");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loader2 className="size-12 animate-spin text-muted-foreground/30" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 space-y-2 text-center">
            <h1 className={cn(typo({ variant: "h2" }), "text-2xl font-bold")}>
              Admin Access
            </h1>
            <p
              className={cn(
                typo({ variant: "paragraph" }),
                "text-sm text-muted-foreground",
              )}
            >
              Sign in to manage your portfolio
            </p>
          </div>

          <Card className="border-border bg-card/50 shadow-xl backdrop-blur-sm">
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="h-11 border-border bg-card/50 transition-colors focus:border-muted-foreground/30"
                    required
                    disabled={isSubmitting}
                    autoComplete="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-11 border-border bg-card/50 transition-colors focus:border-muted-foreground/30"
                    required
                    disabled={isSubmitting}
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <MotionDiv
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3"
                  >
                    <AlertCircle className="size-4 flex-shrink-0 text-red-500" />
                    <p className="text-sm text-red-500">{error}</p>
                  </MotionDiv>
                )}

                <Button
                  type="submit"
                  className="h-11 w-full font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 size-[18px]" />
                      Sign in
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </MotionDiv>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] px-4 py-8">
      <MotionDiv
        className="mx-auto max-w-4xl space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className={cn(typo({ variant: "h2" }), "text-3xl font-bold")}>
              Dashboard
            </h1>
            <p
              className={cn(
                typo({ variant: "paragraph" }),
                "text-muted-foreground",
              )}
            >
              Manage your portfolio content
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {DASHBOARD_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <AdminDashboardCard
                key={item.href}
                href={item.href}
                title={item.title}
                description={item.description}
                icon={
                  <Icon className="size-6 text-foreground/80" strokeWidth={2} />
                }
              />
            );
          })}
        </div>
      </MotionDiv>
    </div>
  );
}
