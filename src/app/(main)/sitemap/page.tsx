import { type Metadata, type MetadataRoute } from "next";
import Link from "next/link";
import config from "~/config";
import { PageHeader } from "~/components/shared";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { getSitemap, getSitemapSections } from "~/lib/sitemap-entries";

export const metadata: Metadata = getSEOTags({
  title: "Sitemap",
  description:
    "Every public URL on this site, in the same order as sitemap.xml.",
  openGraph: {
    title: `Sitemap — ${config.appName}`,
    description: "A readable index of every URL in the XML sitemap.",
  },
  canonicalUrlRelative: "/sitemap",
});

const updatedFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function pathnameOf(url: string) {
  const pathname = new URL(url).pathname;
  return pathname.length > 0 ? pathname : "/";
}

function updatedDate(value: string | Date | undefined) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function formatPriority(priority: number | undefined) {
  if (priority == null) return "—";
  const fixed = priority.toFixed(2);
  return fixed.endsWith("0") ? priority.toFixed(1) : fixed;
}

function SitemapRow({ entry }: { entry: MetadataRoute.Sitemap[number] }) {
  const pathname = pathnameOf(entry.url);
  const updated = updatedDate(entry.lastModified);
  const frequency = entry.changeFrequency ?? "—";
  const priority = formatPriority(entry.priority);
  const isFile = pathname.includes(".");

  const className =
    "group el-focus-styles -mx-3 grid gap-1 rounded-md px-3 py-2.5 transition-colors hover:bg-card/40 sm:grid-cols-[minmax(0,1fr)_7rem_5rem_7.5rem] sm:items-baseline sm:gap-x-6";

  const content = (
    <>
      <span className="truncate font-mono text-sm text-foreground/90 transition-colors group-hover:text-ring">
        {pathname}
      </span>
      <span className="font-mono text-[11px] text-muted-foreground sm:hidden">
        {frequency} · {priority}
        {updated ? ` · ${updatedFormatter.format(updated)}` : ""}
      </span>
      <span className="hidden font-mono text-xs text-muted-foreground sm:block">
        {frequency}
      </span>
      <span className="hidden text-right font-mono text-xs tabular-nums text-muted-foreground sm:block">
        {priority}
      </span>
      {updated ? (
        <time
          dateTime={updated.toISOString()}
          className="hidden text-right font-mono text-xs text-muted-foreground sm:block"
        >
          {updatedFormatter.format(updated)}
        </time>
      ) : (
        <span className="hidden text-right font-mono text-xs text-muted-foreground sm:block">
          —
        </span>
      )}
    </>
  );

  if (isFile) {
    return (
      <a href={pathname} title={pathname} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link
      href={pathname}
      title={pathname}
      prefetch={false}
      className={className}
    >
      {content}
    </Link>
  );
}

function groupEntries(
  entries: MetadataRoute.Sitemap,
  sections: Awaited<ReturnType<typeof getSitemapSections>>,
) {
  const sectionByUrl = new Map(
    sections.flatMap((section) =>
      section.entries.map((entry) => [entry.url, section] as const),
    ),
  );

  const groups: {
    id: string;
    label: string;
    entries: MetadataRoute.Sitemap;
  }[] = [];

  for (const entry of entries) {
    const section = sectionByUrl.get(entry.url);
    const id = section?.id ?? "other";
    const label = section?.label ?? "Other";
    const current = groups[groups.length - 1];

    if (current?.id === id) current.entries.push(entry);
    else groups.push({ id, label, entries: [entry] });
  }

  return groups;
}

function SitemapSectionBlock({
  group,
}: {
  group: ReturnType<typeof groupEntries>[number];
}) {
  return (
    <section
      id={group.id}
      aria-labelledby={`${group.id}-heading`}
      className="scroll-mt-[calc(var(--header-height)+1rem)]"
    >
      <div className="mb-1 flex items-baseline justify-between border-b border-border pb-2">
        <h2
          id={`${group.id}-heading`}
          className="font-ubuntu text-sm font-semibold text-foreground"
        >
          {group.label}
        </h2>
        <span className="font-mono text-[11px] text-muted-foreground">
          {group.entries.length}
        </span>
      </div>
      <ul>
        {group.entries.map((entry) => (
          <li key={entry.url}>
            <SitemapRow entry={entry} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function SitemapPage() {
  const entries = await getSitemap();
  const groups = groupEntries(entries, await getSitemapSections());

  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Sitemap", url: "/sitemap" },
      ])}

      <PageHeader
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Sitemap", url: "/sitemap" },
        ]}
        title="Sitemap"
        subtitle={
          <>
            Every public URL on this site, in the same order as{" "}
            <a href="/sitemap.xml" className="link-inline">
              sitemap.xml
            </a>
            .
          </>
        }
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="font-mono text-xs text-muted-foreground">
          {entries.length} URLs
        </p>
        <nav
          aria-label="Sitemap sections"
          className="flex flex-wrap gap-x-4 gap-y-2"
        >
          {groups.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="el-focus-styles rounded-sm text-sm text-muted-foreground transition-colors hover:text-ring"
            >
              {group.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="space-y-10">
        {groups.map((group) => (
          <SitemapSectionBlock key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
