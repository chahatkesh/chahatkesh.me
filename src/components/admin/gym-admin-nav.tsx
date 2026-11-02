import Link from "next/link";

import { cn } from "~/lib/utils";

export type GymAdminSection = "log" | "photos" | "wallpaper" | "exercises";

const ITEMS: Array<{
  id: GymAdminSection;
  href: string;
  label: string;
}> = [
  { id: "log", href: "/admin/gym", label: "Log" },
  { id: "photos", href: "/admin/gym/photos", label: "Photos" },
  { id: "wallpaper", href: "/admin/gym/wallpaper", label: "Wallpaper" },
  { id: "exercises", href: "/admin/gym/exercises", label: "Exercises" },
];

interface GymAdminNavProps {
  /** Currently viewed gym admin section. */
  active: GymAdminSection;
}

/**
 * Quiet gym section links — same language as the site nav:
 * words, muted until current, no chrome.
 */
export function GymAdminNav({ active }: GymAdminNavProps) {
  return (
    <nav aria-label="Gym sections">
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
        {ITEMS.map((item) => {
          const isActive = item.id === active;

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "el-focus-styles inline-flex min-h-9 items-center text-sm transition-colors duration-200",
                  isActive
                    ? "text-ring"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
