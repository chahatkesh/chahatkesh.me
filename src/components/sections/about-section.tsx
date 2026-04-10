import config from "~/config";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui";
import Image from "next/image";
import chahat from "~/assets/images/chahat.png";

const AboutSection = () => {
  return (
    <section aria-label="About">
      <h1 className="mb-4 font-ubuntu text-2xl font-semibold text-white sm:mb-5 sm:text-3xl">
        Chahat, 20
      </h1>

      <div className="grid gap-8 sm:gap-4 md:grid-cols-3">
        <div className="order-2 space-y-3 sm:order-1 md:col-span-2">
          <p className={typo({ variant: "paragraph", font: "sans" })}>
            I build things. Sometimes because someone needs them, sometimes
            because I can&apos;t stop thinking about how they should work.
            Engineering student at NIT Jalandhar with a handful of hackathon
            wins and a habit of shipping things that actually run in production.
          </p>

          <p className={typo({ variant: "paragraph", font: "sans" })}>
            I&apos;ve worked across freelance products, AI research at IIT
            Ropar, and built tools used by real people. Right now I&apos;m a{" "}
            <span className="text-white">
              Founding Frontend Engineer at Zenbase
            </span>
            , building Ninja, an AI platform that turns real estate agents into
            high performers. Architecture-heavy, fast-paced, and exactly where I
            want to be.
          </p>

          <p className={typo({ variant: "paragraph", font: "sans" })}>
            I share the journey on{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={config.social.twitter}
              className="text-white"
              aria-label="Follow on X"
            >
              X
            </a>{" "}
            as I build. When I&apos;m not coding, I&apos;m reading, at the gym,
            or somewhere on a bike trip in the hills.
          </p>

          <p
            className={cn(
              typo({ variant: "paragraph", font: "sans" }),
              "sm:!mt-4",
            )}
          >
            I&apos;m always building. If you&apos;re building something
            interesting too,{" "}
            <a
              href={`mailto:${config.social.email}`}
              aria-label="Contact Chahat"
              className="el-focus-styles text-ring"
            >
              let&apos;s talk.
            </a>
          </p>
        </div>

        <div className="relative order-1 block aspect-square sm:order-2 sm:hidden md:block">
          <div className="absolute inset-0 -z-10 size-full rounded-md bg-brand"></div>
          <Image
            alt="Speaking on stage at a hackathon presentation"
            src={chahat}
            placeholder="blur"
            className="size-full -rotate-3 transform rounded-md shadow-md"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
