import Image from "next/image";
import config from "~/config";
import chahat from "~/assets/images/chahat.jpg";
import { LinkStats } from "~/components/features";
import { LocalTime } from "~/components/features/links/local-time";

export function LinksHero() {
  return (
    <div className="relative w-full">
      <div className="absolute top-0 right-0 hidden md:block">
        <LocalTime variant="corner" />
      </div>

      <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:gap-6 md:text-left">
        <div className="relative size-[5.5rem] shrink-0 overflow-hidden rounded-xl border border-border md:size-[6.5rem]">
          <Image
            src={chahat}
            alt={config.appName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 88px, 104px"
            priority
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
          />
        </div>

        <div className="flex min-w-0 flex-col items-center gap-2 md:items-start md:gap-2.5 md:pr-28">
          <div>
            <h1 className="font-ubuntu text-[1.375rem] font-semibold leading-tight tracking-tight md:text-[1.75rem]">
              {config.appName}
            </h1>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground/80 md:text-[15px]">
              {config.appDesignation}
            </p>
          </div>
          <LinkStats className="md:justify-start" />
        </div>
      </div>
    </div>
  );
}
