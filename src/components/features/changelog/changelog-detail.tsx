import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { MonthlyChangelog } from "~/data/changelog";
import {
  TYPE_CONFIG,
  TYPE_ORDER,
  formatChangelogDateTime,
  formatMonthShort,
  getChangelogHeroImage,
  groupByType,
} from "~/app/changelog/_shared";

type ChangelogDetailProps = {
  entry: MonthlyChangelog;
  newer: MonthlyChangelog | null;
  older: MonthlyChangelog | null;
};

export function ChangelogDetail({ entry, newer, older }: ChangelogDetailProps) {
  const groups = groupByType(entry.changes);
  const heroImage = getChangelogHeroImage(entry);

  const stats = [
    {
      value: entry.changes.length,
      label: entry.changes.length === 1 ? "update" : "updates",
    },
    {
      value: entry.stats.commits,
      label: entry.stats.commits === 1 ? "commit" : "commits",
    },
    { value: entry.stats.files, label: "files touched" },
  ];

  return (
    <article className="mx-auto max-w-[1024px] px-4 pb-20 pt-6 sm:px-8 sm:pb-24 sm:pt-10">
      <Link
        href="/changelog"
        className="el-focus-styles inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      <header className="mx-auto mt-10 max-w-3xl text-center sm:mt-16">
        <time
          dateTime={entry.publishedAt}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs"
        >
          {formatChangelogDateTime(entry.publishedAt)}
        </time>

        <h1 className="mt-4 font-sans text-[clamp(1.75rem,5vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em] text-balance text-foreground sm:mt-5">
          {entry.title}
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base">
          {entry.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground/80">
          {stats.map((stat, index) => (
            <span key={stat.label} className="flex items-center gap-2">
              {index > 0 ? (
                <span className="text-muted-foreground/40">·</span>
              ) : null}
              <span>
                <span className="font-medium tabular-nums text-foreground/80">
                  {stat.value}
                </span>{" "}
                {stat.label}
              </span>
            </span>
          ))}
        </div>
      </header>

      {heroImage ? (
        <div className="mx-auto mt-10 w-full overflow-hidden rounded-xl border border-border/60 bg-card shadow-2xl shadow-black/25 sm:mt-12">
          <Image
            src={heroImage}
            alt=""
            width={1024}
            height={512}
            unoptimized
            className="aspect-[2/1] w-full object-cover"
            priority
          />
        </div>
      ) : null}

      <div className="mx-auto mt-10 max-w-[42rem] sm:mt-12">
        <p className="text-base leading-[1.75] text-muted-foreground sm:text-[1.0625rem]">
          {entry.overview}
        </p>

        <div className="mt-12 border-t border-border/70 pt-10 sm:mt-14 sm:pt-12">
          <div className="space-y-12 sm:space-y-14">
            {TYPE_ORDER.map((type) => {
              const changes = groups[type];
              if (!changes?.length) return null;
              const { label: typeLabel } = TYPE_CONFIG[type];

              return (
                <section key={type}>
                  <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
                    {typeLabel}
                  </h2>

                  <ul className="mt-5 space-y-8 sm:space-y-9">
                    {changes.map((change, index) => (
                      <li key={`${type}-${index}`}>
                        <h3 className="text-lg font-medium leading-snug text-foreground sm:text-xl">
                          {change.title}
                        </h3>
                        <p className="mt-2 text-base leading-[1.75] text-muted-foreground sm:text-[1.0625rem]">
                          {change.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      <nav
        aria-label="Changelog navigation"
        className="mx-auto mt-16 grid max-w-[42rem] grid-cols-2 gap-6 border-t border-border/70 pt-8 sm:mt-20"
      >
        {newer ? (
          <Link
            href={`/changelog/${newer.month}`}
            className="el-focus-styles group block min-w-0"
          >
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/60 sm:text-[11px]">
              <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              {formatMonthShort(newer.month)}
            </span>
            <span className="mt-2 block truncate text-sm font-medium text-foreground/90 transition-colors group-hover:text-foreground sm:text-base">
              {newer.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {older ? (
          <Link
            href={`/changelog/${older.month}`}
            className="el-focus-styles group col-start-2 block min-w-0 text-right"
          >
            <span className="flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/60 sm:text-[11px]">
              {formatMonthShort(older.month)}
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
            <span className="mt-2 block truncate text-sm font-medium text-foreground/90 transition-colors group-hover:text-foreground sm:text-base">
              {older.title}
            </span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
