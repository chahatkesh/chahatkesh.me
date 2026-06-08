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
            Right now I&apos;m looking for a summer internship. I previously
            worked at{" "}
            <Link
              href="/about/experience/zenbase-technologies-founding-frontend-engineer"
              className="text-foreground link-inline"
            >
              Zenbase
            </Link>{" "}
            as a Founding Frontend Engineer, building Ninja, an AI platform that
            turns real estate agents into high performers.
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
            I love sharing what I&apos;m building on{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={config.social.twitter}
              className="link-inline text-foreground"
              aria-label="Follow on X"
            >
              X (Twitter)
            </a>
            . You can also check my{" "}
            <Link href="/resume" className="link-inline text-foreground">
              Resume
            </Link>
            . If this sounds interesting,{" "}
            <a
              href={`mailto:${config.social.email}`}
              aria-label="Contact Chahat"
              className="link-inline"
            >
              reach out.
            </a>
          </p>
        </div>

        <div className="relative order-1 block aspect-square sm:order-2 sm:hidden md:block">
          <div className="absolute inset-0 -z-10 size-full rounded-md bg-brand"></div>
          <Image
            alt="Profile picture of Chahat Kesharwani"
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
