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

      <div className="grid gap-6 sm:gap-4 md:grid-cols-3 md:items-stretch md:gap-6">
        <div className="order-2 space-y-3 sm:order-1 md:col-span-2">
          <p className={typo({ variant: "paragraph", font: "sans" })}>
            I build things. Sometimes because someone needs them, sometimes
            because I just can&apos;t leave the idea alone. Engineering student
            at NIT Jalandhar, a few hackathon wins, a lot of late nights, and
            things actually live in production.
          </p>

          <p className={typo({ variant: "paragraph", font: "sans" })}>
            Right now I&apos;m co-founding{" "}
            <Link
              href="https://uselayr.com"
              className="text-foreground link-inline"
            >
              Layr
            </Link>
            , an AI product decision layer that turns scattered customer signals
            into evidence-backed priorities, specs, and task drafts.
          </p>

          <p className={typo({ variant: "paragraph", font: "sans" })}>
            Previously, I was a Founding Engineer at Zenbase and an EIR and AI
            researcher at Annam.ai, a Centre of Excellence by the Ministry of
            Education at IIT Ropar. I prefer working close to the problem and
            thinking in systems, not just shipping features.
          </p>

          <p
            className={cn(
              typo({ variant: "paragraph", font: "sans" }),
              "sm:!mt-3",
            )}
          >
            I&apos;m looking to contribute to meaningful work where product
            thinking, design, and engineering can create something genuinely
            useful. I also share what I&apos;m building on{" "}
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

        <div className="order-1 w-full sm:order-2 md:h-full">
          <div className="relative aspect-[4/5] w-full md:aspect-auto md:h-full">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-md bg-brand"
            />
            <Image
              alt="Profile picture of Chahat Kesharwani"
              src={chahat}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 280px, 100vw"
              className="object-cover object-[center_18%] -rotate-2 rounded-md shadow-md md:-rotate-3"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
