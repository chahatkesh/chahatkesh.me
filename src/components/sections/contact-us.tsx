import dynamic from "next/dynamic";
import config from "~/config";
import { Socials } from "~/components/shared";
import { Skeleton, typo } from "~/components/ui";
import { cn } from "~/lib/utils";

const SpotifyNowPlaying = dynamic(
  () => import("~/components/features/spotify-now-playing"),
  {
    loading: () => (
      <div className="flex gap-3">
        <Skeleton className="h-16 w-16 rounded" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-2 w-1/2" />
        </div>
      </div>
    ),
  },
);

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
              <a
                href={`mailto:${config.social.email}`}
                aria-label={config.social.email}
                className="link-inline"
              >
                {config.social.email}
              </a>
            </p>
          </div>

          {/* Right Column - Spotify Now Playing */}
          <div className="min-w-0">
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
