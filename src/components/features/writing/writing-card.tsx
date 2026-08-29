import Link from "next/link";
import { Clock3 } from "lucide-react";
import { RevealCard, RevealSection } from "~/components/shared";
import { formatDate } from "~/lib/date-utils";
import { cn } from "~/lib/utils";
import type { WritingEntry } from "~/lib/writing";
import { WritingCover } from "./writing-cover";

export type WritingCardEntry = Pick<
  WritingEntry,
  "slug" | "title" | "date" | "readingTime"
>;

type WritingCardProps = {
  entry: WritingCardEntry;
  variant?: "featured" | "archive";
  index?: number;
};

function WritingMeta({
  entry,
  featured = false,
}: {
  entry: WritingCardEntry;
  featured?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs text-muted-foreground">
      {featured && <span className="text-ring">Latest</span>}
      {featured && <span aria-hidden>·</span>}
      <time dateTime={entry.date}>{formatDate(entry.date)}</time>
      <span aria-hidden>·</span>
      <span className="flex items-center gap-1">
        <Clock3 aria-hidden className="size-3" />
        {entry.readingTime} min read
      </span>
    </div>
  );
}

export function WritingCard({
  entry,
  variant = "archive",
  index = 0,
}: WritingCardProps) {
  const isFeatured = variant === "featured";

  const card = (
    <Link
      href={`/about/writing/${entry.slug}`}
      className="el-focus-styles group block rounded-xl"
    >
      <div
        className={cn(
          "relative overflow-hidden border border-border/80 bg-card shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-colors duration-500 group-hover:border-muted-foreground/25",
          isFeatured ? "aspect-[16/9] rounded-xl" : "aspect-[16/10] rounded-lg",
        )}
      >
        <WritingCover
          slug={entry.slug}
          title={entry.title}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className={cn("space-y-2.5", isFeatured ? "mt-6" : "mt-4")}>
        <WritingMeta entry={entry} featured={isFeatured} />
        {isFeatured ? (
          <h2 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-ring sm:text-3xl">
            {entry.title}
          </h2>
        ) : (
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-ring sm:text-xl">
            {entry.title}
          </h3>
        )}
      </div>
    </Link>
  );

  if (isFeatured) {
    return <RevealSection>{card}</RevealSection>;
  }

  return <RevealCard index={index}>{card}</RevealCard>;
}
