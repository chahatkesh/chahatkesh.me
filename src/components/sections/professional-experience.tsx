import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  ExperienceDates,
  ExperienceLogo,
} from "~/components/features/experience";
import { typo } from "~/components/ui";
import { experiences } from "~/data/experience";

const ProfessionalExperience = () => (
  <section
    id="experience"
    aria-labelledby="experience-heading"
    className="mt-5 space-y-6"
  >
    <h2 id="experience-heading" className={typo({ variant: "h2" })}>
      Where I&apos;ve Shipped
    </h2>

    <ol>
      {experiences.map((position) => (
        <li
          key={position.slug}
          className="relative pb-5 before:absolute before:bottom-0 before:left-6 before:top-12 before:w-px before:bg-border last:pb-0 last:before:hidden"
        >
          <details name="shipped-experiences">
            <summary className="el-focus-styles group relative flex cursor-pointer list-none items-start gap-4 rounded-lg font-mono [&::-webkit-details-marker]:hidden">
              <ExperienceLogo
                src={position.logo}
                alt=""
                size="md"
                className="size-12 bg-transparent"
              />
              <div className="min-w-0 flex-1 self-center">
                <h3 className="text-sm font-medium uppercase leading-snug tracking-wide text-foreground transition-colors group-hover:text-ring sm:text-base">
                  {position.role}
                </h3>
                <div className="mt-1 flex flex-col gap-1 text-muted-foreground sm:flex-row sm:items-center sm:gap-3">
                  <span className="text-sm">{position.employer}</span>
                  <span
                    aria-hidden="true"
                    className="hidden flex-1 border-t border-dashed border-border sm:block"
                  />
                  <ExperienceDates
                    start={position.start_date}
                    end={position.end_date}
                    align="inline"
                    className="text-xs"
                  />
                </div>
              </div>
            </summary>
            <div className="ml-10 mt-4 space-y-4 sm:ml-16">
              <ul
                aria-label="Key contributions"
                className="list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-ring"
              >
                {position.contributions?.slice(0, 4).map((contribution) => (
                  <li key={contribution}>{contribution}</li>
                ))}
              </ul>
              <Link
                href={`/about/experience/${position.slug}`}
                className="el-focus-styles inline-flex items-center gap-1.5 rounded-sm text-sm text-ring hover:opacity-80"
              >
                View more
                <ArrowRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only">
                  {" "}
                  about {position.role} at {position.employer}
                </span>
              </Link>
            </div>
          </details>
        </li>
      ))}
    </ol>
  </section>
);

export default ProfessionalExperience;
