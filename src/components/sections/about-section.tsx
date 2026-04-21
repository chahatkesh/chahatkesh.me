import config from "~/config";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui";
import Image from "next/image";
import Link from "next/link";
import chahat from "~/assets/images/chahat.png";

const AboutSection = () => {
  return (
    <section aria-label="About">
      <h1 className="mb-4 font-ubuntu text-xl font-semibold text-foreground sm:mb-4 sm:text-2xl">
        Chahat, 20
      </h1>

      <div className="grid gap-8 sm:gap-4 md:grid-cols-3">
        <div className="order-2 space-y-3 sm:order-1 md:col-span-2">
          <p className={typo({ variant: "paragraph", font: "sans" })}>
            I build things. Sometimes because someone needs them, sometimes
            because I just can&apos;t leave the idea alone. Engineering student
            at NIT Jalandhar, a few hackathon wins, a lot of late nights, and
            things actually live in production.
          </p>

          <p className={typo({ variant: "paragraph", font: "sans" })}>
            Right now I&apos;m a{" "}
            <Link
              href="/about/experience/zenbase-technologies-frontend-engineer"
              className="text-foreground hover:opacity-80 transition-opacity"
            >
              Founding Frontend Engineer at Zenbase
            </Link>
            , building Ninja, an AI platform that turns real estate agents into
            high performers. It&apos;s architecture-heavy, fast-paced, and
            exactly the kind of work I want to be doing.
          </p>

          <p className={typo({ variant: "paragraph", font: "sans" })}>
            Before this, I was an EIR and AI researcher at Annam.ai, a Centre of
            Excellence by the Ministry of Education at IIT Ropar. I prefer
            working close to the problem and thinking in systems, not just
            shipping features.
          </p>

          <p
            className={cn(
              typo({ variant: "paragraph", font: "sans" }),
              "sm:!mt-3",
            )}
          >
            Building in public on{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={config.social.twitter}
              className="text-foreground"
              aria-label="Follow on X"
            >
              X
            </a>
            . If something here resonates,{" "}
            <a
              href={`mailto:${config.social.email}`}
              aria-label="Contact Chahat"
              className="el-focus-styles text-ring"
            >
              reach out.
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
