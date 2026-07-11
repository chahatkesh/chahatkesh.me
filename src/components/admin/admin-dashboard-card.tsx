"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

interface AdminDashboardCardProps {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
}

/**
 * Nav card for the admin dashboard grid. Shared shell for all content sections.
 */
export function AdminDashboardCard({
  href,
  title,
  description,
  icon,
}: AdminDashboardCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="group relative cursor-pointer overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-muted-foreground/30 hover:shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <CardContent className="relative p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-xl bg-gradient-to-br from-muted to-card p-3 shadow-lg transition-all group-hover:from-muted-foreground/30 group-hover:to-muted">
              {icon}
            </div>
            <div className="rounded-lg bg-card/50 p-2 transition-all group-hover:bg-muted/50">
              <ChevronRight
                className="size-[18px] text-muted-foreground/70 transition-all group-hover:translate-x-0.5 group-hover:text-muted-foreground"
                strokeWidth={2}
              />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
