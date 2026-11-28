import config from "~/config";
import { timelineEvents } from "~/data/timeline";
import { getAge } from "~/lib/date-utils";
import Image, { type StaticImageData } from "next/image";
import { Dancing_Script } from "next/font/google";
import type { ReactNode } from "react";
import { Trophy } from "lucide-react";
import { FaGoogleDrive, FaXTwitter } from "react-icons/fa6";
import { LinkPreviewImage } from "~/components/features/link-preview-image";
import tweet from "~/assets/images/preview/tweet.png";
import resume from "~/assets/images/preview/resume.png";
import hackathon from "~/assets/images/preview/hackathon.jpg";
import annamPhoto from "~/assets/images/preview/annam.jpg";
import { ImagePreview } from "./image-preview";
import chahat from "~/assets/images/preview/chahat-portrait.jpg";
import layr from "~/assets/images/experience/Layr.svg";
import zenbase from "~/assets/images/experience/Zenbase.png";
import annam from "~/assets/images/experience/AnnamAI.png";

const signature = Dancing_Script({ subsets: ["latin"], weight: "400" });
const hackathonCount = timelineEvents.filter(
  (event) => event.category === "hackathon",
).length;
const badgeClass =
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-1.5 py-0.5 align-baseline text-[0.88em] font-medium leading-tight text-foreground focus-visible:outline-ring";

function PreviewBadge({
  name,
  logo,
  href,
  tint,
  preview,
  social = false,
}: {
  name: string;
  logo?: StaticImageData | string;
  href?: string;
  tint: string;
  preview?: ReactNode;
  social?: boolean;
}) {
  const content = (
    <>
      {social ? (
        <>
          <FaXTwitter aria-hidden="true" className="size-4" />
          <span className="sr-only">X </span>
        </>
      ) : (
        logo && (
          <Image
            src={logo}
            alt=""
            width={16}
            height={16}
            className="size-4 rounded-sm object-contain"
          />
        )
      )}
      {name}
    </>
  );
  const className = `${badgeClass} ${tint}`;
  if (!preview) return <span className={className}>{content}</span>;

  return (
    <ImagePreview
      label={`${name} image preview`}
      preview={preview}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </ImagePreview>
  );
}

const AboutSection = () => {
  return (
    <section aria-labelledby="home-intro">
      <ImagePreview
        label="Full portrait of Chahat Kesharwani"
        preview={
          <Image
            src={chahat}
            alt="Chahat Kesharwani"
            sizes="320px"
            className="h-auto max-h-[min(50dvh,var(--radix-tooltip-content-available-height))] w-full object-contain"
          />
        }
        className="block w-fit rounded-2xl focus-visible:outline-ring"
      >
        <Image
          alt="Chahat Kesharwani"
          src={chahat}
          width={72}
          height={72}
          placeholder="blur"
          className="size-16 rounded-2xl object-cover object-[center_18%] sm:size-[72px]"
          preload
        />
      </ImagePreview>
      <h1
        id="home-intro"
        className="mt-4 font-ubuntu text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        Hi, I’m{" "}
        <span className={`${signature.className} tracking-normal`}>Chahat</span>
        .
      </h1>
      <div className="mt-3 space-y-4 font-mono text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
        <p>
          I’m a {getAge()}-year-old engineering student at{" "}
          <strong className="font-medium text-foreground">NIT Jalandhar</strong>
          , looking for a{" "}
          <strong className="font-medium text-foreground">
            Software Engineering role
          </strong>{" "}
          where I can build, learn, and contribute to real products.
        </p>

        <p>
          I co-founded{" "}
          <PreviewBadge
            name="Layr"
            preview={
              <LinkPreviewImage
                previewImage="https://uselayr.com/og?title=Know+what+to+build+next.&subtitle=The+AI+product+decision+layer.&variant=default"
                alt="Layr: Know what to build next"
                sizes="320px"
              />
            }
            href="https://uselayr.com/"
            logo={layr}
            tint="bg-orange-500/15"
          />
          , where we built a product to help teams trace product decisions back
          to the customer feedback behind them. We built a technically strong
          product, but things didn't work out as planned. The{" "}
          <strong className="font-medium text-foreground">experience</strong>{" "}
          taught me a lot about building from scratch.
        </p>

        <p>
          Previously, I worked as a Founding Engineer at{" "}
          <PreviewBadge name="Zenbase" logo={zenbase} tint="bg-muted" />,
          building tools for real estate agents. At{" "}
          <PreviewBadge
            name="Annam.ai"
            preview={
              <Image
                src={annamPhoto}
                alt="Photo from Annam.ai"
                sizes="320px"
                className="h-auto max-h-[var(--radix-tooltip-content-available-height)] w-full object-contain"
              />
            }
            logo={annam}
            tint="bg-emerald-500/15"
          />
          , I worked on agricultural AI at IIT Ropar, first as a Research Intern
          and later as an Entrepreneur in Residence.
        </p>

        <p>
          Outside of work, I’m particularly drawn to{" "}
          <ImagePreview
            label="Hackathon photo preview"
            preview={
              <Image
                src={hackathon}
                alt="Photo from a hackathon"
                sizes="320px"
                className="h-auto max-h-[var(--radix-tooltip-content-available-height)] w-full object-contain"
              />
            }
            className={`${badgeClass} bg-violet-500/15`}
          >
            <Trophy aria-hidden="true" className="size-4 text-warning" />
            hackathons({hackathonCount})
          </ImagePreview>
          , where I enjoy turning ideas into working prototypes. I share what
          I’m building and learning on{" "}
          <PreviewBadge
            name={config.author.twitter}
            preview={
              <Image
                src={tweet}
                alt="Screenshot of Chahat’s post on X"
                sizes="320px"
                className="h-auto w-full"
              />
            }
            href={config.social.twitter}
            tint="bg-muted"
            social
          />
          .
          {config.resumeUrl && (
            <>
              {" "}
              You can find more about my experience in my{" "}
              <ImagePreview
                label="Résumé preview"
                preview={
                  <Image
                    src={resume}
                    alt="Chahat Kesharwani’s résumé"
                    sizes="320px"
                    className="h-auto max-h-[var(--radix-tooltip-content-available-height)] w-full object-contain"
                  />
                }
                href={config.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${badgeClass} bg-yellow-400/25`}
              >
                <FaGoogleDrive aria-hidden="true" className="size-4" />
                résumé
              </ImagePreview>
              .
            </>
          )}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
