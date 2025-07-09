import Image from "next/image";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { cn } from "~/lib/utils";
import SmartLink from "../ui/smart-link";
import { typo } from "../ui/typograpghy";
import { ProjectJsonLd } from "./project-jsonld";
import config from "~/config";
import { Project } from "~/data/projects";

type FeaturedProjectItemProps = {
  metadata?: boolean;
} & Project;

const linkClass = "!p-0 h-full hover:!text-[#25dde5] !flex items-center gap-2 !text-sm !text-ring";

const FeaturedProjectItem: React.FC<FeaturedProjectItemProps> = ({
  title,
  description,
  deployedURL,
  cover,
  stacks,
  isRepo,
  repoUrl,
  slug,
  datePublished,
  dateModified,
  metadata = false,
}) => {
  return (
    <li role="listitem" className="featured-project">
      {metadata && (
        <ProjectJsonLd
          title={title}
          description={description}
          slug={slug}
          datePublished={datePublished}
          dateModified={dateModified}
          image={`https://${config.domainName}${cover.src}`}
          tags={stacks}
        />
      )}
      <div className="grid gap-4 rounded-md">
        <div className="relative aspect-video">
          <Image
            alt={`${title} not found`}
            priority
            placeholder="blur"
            src={cover}
            className="size-full rounded-md object-cover"
          />
        </div>

        <hgroup className="space-y-2 sm:space-y-1">
          <h2 className="font-ubuntu text-lg font-medium">{title}</h2>

          <p className={"text-sm text-ring"} aria-label="project stacks">
            {stacks.join(" / ")}
          </p>

          <p className={cn(typo({ variant: "paragraph", size: "sm" }), "!mt-4 line-clamp-3")}>
            {description}
          </p>

          <div className="!mt-4 flex items-center gap-4">
            {deployedURL && (
              <SmartLink
                aria-label={`visit ${title} live URL}`}
                href={deployedURL}
                className={linkClass}
              >
                <FaExternalLinkAlt size={12} />
                <span> Live Preview</span>
              </SmartLink>
            )}

            {isRepo && (
              <SmartLink
                aria-label={`visit ${title} Github Repo`}
                href={repoUrl as string}
                className={linkClass}
              >
                <FaGithub />
                <span> Repo Url</span>
              </SmartLink>
            )}
          </div>
        </hgroup>
      </div>
    </li>
  );
};

export default FeaturedProjectItem;
