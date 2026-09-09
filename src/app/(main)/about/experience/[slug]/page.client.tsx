"use client";

import Link from "next/link";
import useSWR from "swr";
import { MotionDiv, PageHeader } from "~/components/shared";
import {
  ExperienceCarousel,
  ExperienceDates,
  ExperienceLogo,
  type CarouselItem,
} from "~/components/features/experience";
import { TechStackBadges } from "~/components/features/project";
import { LinkPreviewImage } from "~/components/features";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui";
import { type Experience } from "~/data/experience";
import { API_ROUTES } from "~/constants";
import { calculateDuration } from "~/lib/date-utils";
import { getLinkIcon } from "~/lib/link-icons";
import { simpleFetcher as fetcher } from "~/lib/fetcher";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ExperienceGalleryApiResponse {
  success: boolean;
  data: { _id: string; imageUrl: string; caption?: string; order: number }[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ExperienceDetailClientProps {
  experience: Experience;
  relatedLinkPreviews: Record<string, string | null>;
}

const ExperienceDetailClient = ({
  experience,
  relatedLinkPreviews,
}: ExperienceDetailClientProps) => {
  // For multi-role companies (companyId present), use the shared gallery key.
  // For single-role entries, fall back to the experience slug (backward-compatible).
  const gallerySlug = experience.companyId ?? experience.slug;

  // Prefer DB-managed images; fall back to static gallery in data file
  const { data: galleryData } = useSWR<ExperienceGalleryApiResponse>(
    API_ROUTES.EXPERIENCE_GALLERY(gallerySlug),
    fetcher,
  );

  const galleryItems: CarouselItem[] =
    galleryData?.data && galleryData.data.length > 0
      ? galleryData.data.map((img) => ({
          url: img.imageUrl,
          caption: img.caption,
        }))
      : (experience.gallery
          ?.filter((g): g is string => typeof g === "string")
          .map((url) => ({ url })) ?? []);

  const duration = calculateDuration(
    experience.start_date,
    experience.end_date,
  );

  return (
    <div className="space-y-8">
      <PageHeader
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
          { name: "Experience", url: "/about/experience" },
          {
            name: experience.role,
            url: `/about/experience/${experience.slug}`,
          },
        ]}
        title={experience.role}
        subtitle={experience.tagline}
      />

      <MotionDiv
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-center justify-between gap-6">
          <div className="flex min-w-0 items-center gap-4">
            <ExperienceLogo
              src={experience.logo}
              alt={`${experience.employer} logo`}
              size="lg"
            />
            <div className="min-w-0">
              <p className="font-ubuntu text-lg font-medium leading-none text-foreground">
                {experience.employer}
              </p>
              <p className="mt-2 text-sm leading-none text-muted-foreground">
                {experience.type} &middot; {experience.location}
              </p>
              <ExperienceDates
                start={experience.start_date}
                end={experience.end_date}
                duration={duration}
                align="inline"
                className="mt-2 leading-none sm:hidden"
              />
            </div>
          </div>
          <ExperienceDates
            start={experience.start_date}
            end={experience.end_date}
            duration={duration}
            size="md"
            className="hidden sm:block"
          />
        </div>
      </MotionDiv>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* About Organization */}
        {experience.about && (
          <section className="space-y-3">
            <h2 className="font-ubuntu text-xl font-medium text-foreground">
              About {experience.employer}
            </h2>
            <p
              className={cn(
                typo({ variant: "paragraph", size: "sm" }),
                "text-foreground/80 text-justify",
              )}
            >
              {experience.about}
            </p>
          </section>
        )}

        {/* Full Description */}
        <section className="space-y-3">
          <h2 className="font-ubuntu text-xl font-medium text-foreground">
            Overview
          </h2>
          <p
            className={cn(
              typo({ variant: "paragraph", size: "sm" }),
              "text-foreground/80 text-justify",
            )}
          >
            {experience.description}
          </p>
        </section>

        {/* Gallery Carousel — DB images preferred, static fallback */}
        {galleryItems.length > 0 && (
          <ExperienceCarousel
            items={galleryItems}
            experienceName={experience.employer}
          />
        )}

        {/* Key Contributions */}
        {experience.contributions && experience.contributions.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-ubuntu text-xl font-medium text-foreground">
              Key Contributions
            </h2>
            <ul className="space-y-2">
              {experience.contributions.map((contribution) => (
                <li
                  key={contribution}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <span className="text-ring mt-0.5">•</span>
                  <span className="text-justify">{contribution}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tech Stack */}
        {experience.techStack && experience.techStack.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-ubuntu text-xl font-medium text-foreground">
              Technologies Used
            </h2>
            <TechStackBadges stacks={experience.techStack} />
          </section>
        )}

        {/* Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-ubuntu text-xl font-medium text-foreground">
              Impact & Achievements
            </h2>
            <ul className="space-y-2">
              {experience.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <span className="text-ring mt-0.5">✓</span>
                  <span className="text-justify">{achievement}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Links */}
        {experience.links && experience.links.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-ubuntu text-xl font-medium text-foreground">
              Related Links
            </h2>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
              {experience.links.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-lg border border-border bg-card/50 text-foreground/80 transition-colors hover:border-muted-foreground/30 hover:bg-muted/50 hover:text-foreground"
                >
                  {relatedLinkPreviews[link.url] && (
                    <LinkPreviewImage
                      previewImage={relatedLinkPreviews[link.url]!}
                      alt={`${link.title} preview`}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="border-b border-border/60"
                    />
                  )}
                  <div className="flex items-center gap-2 p-4 text-sm">
                    {getLinkIcon(link.icon, {
                      default: 14,
                      globe: 14,
                      file: 12,
                    })}
                    <span>{link.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ExperienceDetailClient;
