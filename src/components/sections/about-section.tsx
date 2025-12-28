"use client";

import config from "~/config";
import { cn } from "~/lib/utils";
import { typo } from "~/components/ui";
import Image from "next/image";
import chahat from "~/assets/images/chahat.png";

const AboutSection = () => {
  return (
    <section className="grid gap-8 sm:gap-4 md:grid-cols-3" aria-label="About">
      <div className="order-2 space-y-3 sm:order-1 md:col-span-2">
        <h1 className="font-ubuntu text-lg font-semibold sm:text-xl">
          Chahat Kesharwani
        </h1>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          <span className="text-white">
            About Me <br />
          </span>
          Hello! I'm a developer from India passionate about programming and technology, with multiple wins across hackathons and ideathons.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          <span className="text-white">
            What I do? <br />
          </span>{" "}
          I've delivered 15+ freelance projects, interned at two startups, and explored building my own startups in the past. I actively share my <a target="_blank" rel="noopener noreferrer" href="https://x.com/chahatkesh" className="text-white">#BuildInPublic</a>{" "} journey on X.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          I'm an <span className="text-white">EIR at iHub AWaDH</span>, aiming to build and contribute to impactful open-source projects. When not coding, I read books, go out for a run, or binge YouTube.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}></p>

        <p className={cn(typo({ variant: "paragraph", font: "sans" }), "sm:!mt-4")}>
          I'm <span className="text-white">open to work</span>, freelance, or collaborate.{" "}
          <a
            href={`mailto:${config.social.email}`}
            aria-label="Hire Me"
            className="el-focus-styles text-ring"
          >
            Contact Me.
          </a>
        </p>
      </div>

      <div className="relative order-1 block aspect-square sm:order-2 sm:hidden md:block">
        <div className="absolute inset-0 -z-10 size-full rounded-md bg-[#00adb5]"></div>
        <Image
          alt="Speaking on stage at for a hackathon presentation"
          src={chahat}
          placeholder="blur"
          className="size-full -rotate-3 transform rounded-md shadow-md"
          priority
        />
      </div>
    </section>
  );
};

export default AboutSection;
