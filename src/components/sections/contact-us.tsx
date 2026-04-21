import config from "~/config";
import { Socials } from "~/components/shared";
import { typo, SmartLink } from "~/components/ui";
import { SpotifyNowPlaying } from "~/components/features";
import { cn } from "~/lib/utils";

const ContactUs = () => {
  return (
    <section aria-label="contact">
      <div className="space-y-8">
        <h2 className={typo({ variant: "h2" })}>Let&apos;s Build Something</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Column - Contact Info */}
          <div className="space-y-4 md:col-span-2">
            <p
              className={cn(
                typo({ variant: "paragraph", size: "sm" }),
                "text-foreground/80",
              )}
            >
              The best things I&apos;ve built started with a message from
              someone I didn&apos;t know yet. If you have an idea, a product, a
              problem worth solving, or just want to talk about architecture and
              craft, my inbox is always open.
            </p>
            <p
              className={cn(
                typo({ variant: "paragraph", size: "sm" }),
                "text-foreground/80",
              )}
            >
              Reach out at{" "}
              <SmartLink
                href={`mailto:${config.social.email}`}
                aria-label={config.social.email}
                className="text-ring hover:underline"
              >
                {config.social.email}
              </SmartLink>
            </p>
          </div>

          {/* Right Column - Spotify Now Playing */}
          <div>
            <SpotifyNowPlaying />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className={cn(typo({ variant: "h2" }), "!text-lg")}>
            Find me here
          </h3>
          <Socials />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
