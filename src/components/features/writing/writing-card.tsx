import Link from "next/link";
import { Clock3 } from "lucide-react";
import { RevealCard } from "~/components/shared";
import { formatDate } from "~/lib/date-utils";
import type { WritingEntry } from "~/lib/writing";
import { WritingCover } from "./writing-cover";

export type WritingCardEntry = Pick<
  WritingEntry,
  "slug" | "title" | "date" | "readingTime"
>;

type WritingCardProps = {
  entry: WritingCardEntry;
  index?: number;
};

export function WritingCard({ entry, index = 0 }: WritingCardProps) {
  return (
    <RevealCard index={index}>
      <Link
        href={`/about/writing/${entry.slug}`}
        className="el-focus-styles group block rounded-xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border/80 bg-card shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-colors duration-500 group-hover:border-muted-foreground/25">
          <WritingCover
            slug={entry.slug}
            title={entry.title}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-4 space-y-2.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs text-muted-foreground">
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1">
              <Clock3 aria-hidden className="size-3" />
              {entry.readingTime} min read
            </span>
          </div>

          <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-ring sm:text-xl">
            {entry.title}
          </h3>
        </div>
      </Link>
    </RevealCard>
  );
}
