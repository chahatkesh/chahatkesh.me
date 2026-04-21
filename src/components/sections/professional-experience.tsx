import Image from "next/image";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui";
import { experiences, type Experience } from "~/data/experience";
import { calculateDuration } from "~/lib/date-utils";
import {
  groupExperiencesByCompany,
  type ExperienceGroup,
} from "~/lib/experience-utils";
import { MAX_DISPLAYED_EXPERIENCES } from "~/constants";

const ProfessionalExperience = () => {
  const groups = groupExperiencesByCompany(experiences);
  const visibleGroups = groups.slice(0, MAX_DISPLAYED_EXPERIENCES);

  return (
    <section
      aria-label="professional experience"
      className="mt-5 space-y-6"
      id="experience"
    >
      <h2 className={typo({ variant: "h2" })}> Where I&apos;ve Shipped</h2>

      <div className="relative">
        {/* Outer thread — runs the full height of the list, centre-aligned with logos */}
        <div
          className="pointer-events-none absolute inset-y-0 left-5 w-px bg-gradient-to-b from-transparent via-border to-transparent"
          aria-hidden="true"
        />

        <ol className="relative">
          {visibleGroups.map((group, idx) => {
            const isLast = idx === visibleGroups.length - 1;
            return group.positions.length === 1 ? (
              <SingleRole key={group.companyId} group={group} isLast={isLast} />
            ) : (
              <MultiRole key={group.companyId} group={group} isLast={isLast} />
            );
          })}
        </ol>
      </div>

      {groups.length > MAX_DISPLAYED_EXPERIENCES && (
        <div className="flex justify-end">
          <Link
            href="/about/experience"
            className="text-sm text-muted-foreground transition-colors hover:text-ring"
          >
            View all
          </Link>
        </div>
      )}
    </section>
  );
};

/* ── Logo — acts as the node on the outer thread ─────────────────── */

const Logo = ({ src, alt }: { src: Experience["logo"]; alt: string }) => (
  <div className="relative z-10 h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-background">
    <Image
      src={src}
      alt={alt}
      fill
      sizes="40px"
      className="object-contain p-1.5"
    />
  </div>
);

/* ── Dates column ────────────────────────────────────────────────── */

const Dates = ({
  start,
  end,
  duration,
}: {
  start: string;
  end: string;
  duration?: string;
}) => (
  <div className="flex-shrink-0 text-right">
    <p className="text-xs text-muted-foreground whitespace-nowrap">
      {start} &ndash;{" "}
      <span className={cn(end === "present" && "text-ring")}>{end}</span>
    </p>
    {duration && (
      <p className="mt-0.5 text-[11px] text-muted-foreground/60">{duration}</p>
    )}
  </div>
);

/* ── Single position ─────────────────────────────────────────────── */

const SingleRole = ({
  group,
  isLast,
}: {
  group: ExperienceGroup;
  isLast: boolean;
}) => {
  const exp = group.positions[0];
  const duration = calculateDuration(exp.start_date, exp.end_date);

  return (
    <li className="relative">
      <div className={cn("flex items-start gap-4", !isLast && "pb-3")}>
        <Logo src={group.logo} alt={group.employer} />
        <Link
          href={`/about/experience/${exp.slug}`}
          className="group flex flex-1 min-w-0 items-start justify-between gap-4"
        >
          <div className="min-w-0">
            <h3 className="font-ubuntu text-[15px] font-medium leading-snug text-foreground transition-colors group-hover:text-ring">
              {group.employer}
            </h3>
            <p className="mt-0.5 text-[13px] text-muted-foreground leading-snug">
              {exp.role}
            </p>
            <p className="mt-2 text-xs text-muted-foreground/60">
              {exp.type} &middot; {exp.location}
            </p>
          </div>
          <Dates
            start={exp.start_date}
            end={exp.end_date}
            duration={duration}
          />
        </Link>
      </div>
      {!isLast && (
        <div className="ml-[52px] mb-3 h-px bg-border/60" aria-hidden="true" />
      )}
    </li>
  );
};

/* ── Multi position ──────────────────────────────────────────────── */

const MultiRole = ({
  group,
  isLast,
}: {
  group: ExperienceGroup;
  isLast: boolean;
}) => (
  <li className="relative">
    <div className={cn("flex items-start gap-4", !isLast && "pb-3")}>
      <Logo src={group.logo} alt={group.employer} />

      <div className="flex-1 min-w-0">
        {/* Company header */}
        <div className="flex items-start gap-4">
          <h3 className="font-ubuntu text-[15px] font-medium text-foreground">
            {group.employer}
          </h3>
        </div>

        <div className="mt-3 space-y-2.5">
          {group.positions.map((position) => {
            const duration = calculateDuration(
              position.start_date,
              position.end_date,
            );
            return (
              <Link
                key={position.slug}
                href={`/about/experience/${position.slug}`}
                className="group flex items-start justify-between gap-4 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-foreground/80 transition-colors group-hover:text-ring">
                    {position.role}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground/60">
                    {position.type} &middot; {position.location}
                  </p>
                </div>
                <Dates
                  start={position.start_date}
                  end={position.end_date}
                  duration={duration}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
    {!isLast && (
      <div className="ml-[52px] mb-3 h-px bg-border/60" aria-hidden="true" />
    )}
  </li>
);

export default ProfessionalExperience;
