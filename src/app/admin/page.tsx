"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui";
import { Input } from "~/components/ui";
import { Label } from "~/components/ui";
import { MotionDiv } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if already authenticated
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
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-800 dark:border-neutral-200"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center space-y-2">
            <h1 className={cn(typo({ variant: "h2" }), "text-2xl font-bold")}>
              Admin Access
            </h1>
            <p
              className={cn(
                typo({ variant: "paragraph" }),
                "text-muted-foreground text-sm",
              )}
            >
              Sign in to manage your portfolio
            </p>
          </div>

          <Card className="border-neutral-800 bg-neutral-950/50 backdrop-blur-sm shadow-xl">
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
                    className="bg-neutral-900/50 border-neutral-800 h-11 focus:border-neutral-700 transition-colors"
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
                    className="bg-neutral-900/50 border-neutral-800 h-11 focus:border-neutral-700 transition-colors"
                    required
                    disabled={isSubmitting}
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <MotionDiv
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-500 flex-shrink-0"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    <p className="text-sm text-red-500">{error}</p>
                  </MotionDiv>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1="15" x2="3" y1="12" y2="12" />
                      </svg>
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
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            Logout
          </Button>
        </div>

        {/* Content Management Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Gallery Card */}
          <Card
            className="border-neutral-800 bg-neutral-950/50 backdrop-blur-sm hover:border-neutral-700 hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden relative"
            onClick={() => router.push("/admin/gallery")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 group-hover:from-neutral-700 group-hover:to-neutral-800 transition-all shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-300"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <div className="p-2 rounded-lg bg-neutral-900/50 group-hover:bg-neutral-800/50 transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-500 group-hover:text-neutral-400 group-hover:translate-x-0.5 transition-all"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Gallery</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Upload, organize, and manage your image gallery with
                  Cloudinary integration
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Projects Card - Coming Soon */}
          <Card className="border-neutral-800 bg-neutral-950/50 backdrop-blur-sm opacity-60 cursor-not-allowed relative overflow-hidden">
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-neutral-800/80 backdrop-blur-sm">
              <span className="text-xs font-medium text-neutral-400">
                Coming Soon
              </span>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-neutral-900 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-500"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Projects</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Manage your project portfolio, descriptions, and links
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Experience Card - Coming Soon */}
          <Card className="border-neutral-800 bg-neutral-950/50 backdrop-blur-sm opacity-60 cursor-not-allowed relative overflow-hidden">
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-neutral-800/80 backdrop-blur-sm">
              <span className="text-xs font-medium text-neutral-400">
                Coming Soon
              </span>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-neutral-900 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-500"
                  >
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Experience</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Update your professional experience and career timeline
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Settings Card - Coming Soon */}
          <Card className="border-neutral-800 bg-neutral-950/50 backdrop-blur-sm opacity-60 cursor-not-allowed relative overflow-hidden">
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-neutral-800/80 backdrop-blur-sm">
              <span className="text-xs font-medium text-neutral-400">
                Coming Soon
              </span>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-neutral-900 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-500"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Settings</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Configure site settings, integrations, and preferences
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </MotionDiv>
    </div>
  );
}
