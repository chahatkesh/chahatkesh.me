"use client";
import config from "~/config";
import { Socials } from "~/components/shared";
import { typo } from "~/components/ui";
import { SmartLink } from "~/components/ui";
import { SpotifyNowPlaying } from "~/components/features";
import { cn } from "~/lib/utils";

const ContactUs = () => {
  return (
    <section aria-label="contact">
      <div className="space-y-8">
        <h2 className={typo({ variant: "h2" })}>Get in Touch</h2>
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Column - Contact Info */}
          <div className="space-y-4 md:col-span-2">
            <p className={cn(typo({ variant: "paragraph", size: "sm" }), "text-neutral-300")}>
              Have a project in mind or want to collaborate? I'm always open to discussing new opportunities, 
              creative ideas, or just having a chat about technology and design.
            </p>
            <p className={cn(typo({ variant: "paragraph", size: "sm" }), "text-neutral-300")}>
              Reach out via email at{" "}
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
          <h3 className={cn(typo({ variant: "h2" }), "!text-lg")}>Connect with me</h3>
          <Socials />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
