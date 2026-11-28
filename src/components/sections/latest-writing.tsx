import Link from "next/link";
import { WritingCard } from "~/components/features/writing/writing-card";
import { typo } from "~/components/ui";
import { getWritingEntries } from "~/lib/writing";

export default async function LatestWriting() {
  const entries = (await getWritingEntries()).slice(0, 3);
  if (!entries.length) return null;

  return (
    <section aria-labelledby="writing-heading" className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="writing-heading" className={typo({ variant: "h2" })}>
          Writing
        </h2>
        <Link
          href="/about/writing"
          aria-label="Read all writing"
          className="el-focus-styles text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Read all
        </Link>
      </div>
      <div className="grid gap-8 sm:grid-cols-3">
        {entries.map((entry, index) => (
          <WritingCard key={entry.slug} entry={entry} index={index} />
        ))}
      </div>
    </section>
  );
}
