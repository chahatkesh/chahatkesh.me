import config from "~/config";
import { getAge } from "~/lib/date-utils";
import Image, { type StaticImageData } from "next/image";
import { Dancing_Script } from "next/font/google";
import type { ReactNode } from "react";
import { FaGoogleDrive, FaXTwitter } from "react-icons/fa6";
import { LinkPreviewImage } from "~/components/features/link-preview-image";
import tweet from "~/assets/images/tweet.png";
import resume from "~/assets/images/resume.png";
import { ImagePreview } from "./image-preview";
import chahat from "~/assets/images/chahat-portrait.jpg";
import layr from "~/assets/images/experience/Layr.svg";
import zenbase from "~/assets/images/experience/Zenbase.png";
import annam from "~/assets/images/experience/AnnamAI.png";

const signature = Dancing_Script({ subsets: ["latin"], weight: "400" });
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
  href: string;
  tint: string;
  preview: ReactNode;
  social?: boolean;
}) {
  return (
    <ImagePreview
      label={`${name} image preview`}
      preview={preview}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${badgeClass} ${tint}`}
    >
      {social ? (
        <>
          <FaXTwitter aria-hidden="true" className="size-4" />
          <span className="sr-only">X: </span>
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
          I’m {getAge()} and an engineering student at{" "}
          <strong className="font-medium text-foreground">NIT Jalandhar</strong>
          . I co-founded{" "}
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
          , where we help product teams trace a decision back to the customer
          feedback that sparked it.
        </p>

        <p>
          Previously, I built tools for real estate agents as a founding
          engineer at{" "}
          <PreviewBadge
            name="Zenbase"
            preview={
              <Image
                src={zenbase}
                alt="Zenbase logo"
                sizes="320px"
                className="h-36 w-full object-contain"
              />
            }
            href="https://zenbasetech.com/"
            logo={zenbase}
            tint="bg-muted"
          />
          . At{" "}
          <PreviewBadge
            name="Annam.ai"
            preview={
              <LinkPreviewImage
                previewImage="https://res.cloudinary.com/dgwhmqdhr/image/upload/v1778587469/annam_og_banner_aq10uy.png"
                alt="Annam.ai website preview"
                sizes="320px"
              />
            }
            href="https://annam.ai/"
            logo={annam}
            tint="bg-emerald-500/15"
          />
          , I worked on agricultural AI at IIT Ropar, first as a researcher and
          then as an entrepreneur in residence.
        </p>

        <p>
          I share what I’m building on{" "}
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
              For the longer version, read my{" "}
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
          )}{" "}
          Want to build something together?{" "}
          <a href={`mailto:${config.social.email}`} className="link-inline">
            Say hello.
          </a>
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
