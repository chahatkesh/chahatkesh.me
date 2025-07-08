"use client";
import config from "~/config";
import Socials from "./socials";
import { typo } from "./ui/typograpghy";
import SmartLink from "~/components/ui/smart-link";

const ContactUs = () => {
  return (
    <section aria-label="contact" className="!mt-5">
      <div className="flex w-full flex-col items-center gap-4 md:flex-row">
        <div className="size-full space-y-4 md:max-w-xs">
          <h2 className={typo({ variant: "h2" })}>Get in Touch</h2>
          <p className="text-base text-muted-foreground">
            If you have any inquiries, please feel free to reach out. You can contact me via email
            at{" "}
            <SmartLink href={`mailto:${config.social.email}`} aria-label={config.social.email}>
              {config.social.email}
            </SmartLink>{" "}
          </p>
          <div className="space-y-3">
            <h3>Follow me </h3>
            <Socials />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
