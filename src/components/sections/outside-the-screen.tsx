import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArtistPalette } from "@fluentui-emoji/react/flat/artist-palette";
import { Airplane } from "@fluentui-emoji/react/flat/airplane";
import { NotebookWithDecorativeCover } from "@fluentui-emoji/react/flat/notebook-with-decorative-cover";
import { PersonLiftingWeightsDefault } from "@fluentui-emoji/react/flat/person-lifting-weights-default";
import type { FluentEmojiComponent } from "@fluentui-emoji/react";
import { RevealCard } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import { hobbies } from "~/data/about";

type OutsideTheScreenProps = {
  /** Full copy for About; compact labels for Home. */
  variant?: "full" | "minimal";
};

const STICKERS: Record<string, { icon: FluentEmojiComponent; rotate: string }> =
  {
    Writing: { icon: NotebookWithDecorativeCover, rotate: "-rotate-6" },
    Gym: { icon: PersonLiftingWeightsDefault, rotate: "rotate-3" },
    Designing: { icon: ArtistPalette, rotate: "-rotate-2" },
    Travelling: { icon: Airplane, rotate: "rotate-6" },
  };

const OutsideTheScreen = ({ variant = "full" }: OutsideTheScreenProps) => {
  const isMinimal = variant === "minimal";

  return (
    <section
      id="outside-the-screen"
      aria-label="Outside the Screen"
      className={cn(isMinimal ? "space-y-5" : "mt-10 space-y-8")}
    >
      <h2 className={typo({ variant: "h2" })}>Outside the Screen</h2>

      <ul
        role="list"
        className={cn(
          "grid",
          isMinimal
            ? "grid-cols-2 gap-2 sm:grid-cols-4"
            : "grid-cols-1 gap-3 sm:grid-cols-2",
        )}
      >
        {hobbies.map((hobby, index) => {
          const sticker = STICKERS[hobby.title];
          const Sticker = sticker?.icon;

          return (
            <li key={hobby.title} role="listitem" className="min-w-0">
              <RevealCard index={index}>
                <Link
                  href={hobby.href}
                  className={cn(
                    "el-focus-styles group flex h-full flex-col rounded-3xl",
                    "focus-visible:ring-inset focus-visible:ring-offset-0",
                    isMinimal ? "px-4 py-5" : "px-6 py-7",
                  )}
                >
                  {Sticker ? (
                    <span
                      className={cn(
                        "mb-5 block origin-bottom will-change-transform",
                        "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        "group-hover:-translate-y-1.5 group-hover:scale-[1.03]",
                        sticker.rotate,
                        isMinimal ? "size-14" : "size-20",
                      )}
                    >
                      <span className="activity-sticker block size-full">
                        <Sticker className="size-full" aria-hidden />
                      </span>
                    </span>
                  ) : null}

                  <span className="flex items-center gap-1.5">
                    <h3 className="font-ubuntu text-[15px] font-medium tracking-tight text-foreground">
                      {hobby.title}
                    </h3>
                    <ArrowUpRight
                      aria-hidden
                      className="size-3.5 text-muted-foreground transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-foreground"
                    />
                  </span>

                  <p
                    className={cn(
                      "mt-1.5 max-w-[28ch] leading-relaxed text-muted-foreground",
                      isMinimal ? "text-[13px]" : "text-sm",
                    )}
                  >
                    {isMinimal ? hobby.label : hobby.description}
                  </p>
                </Link>
              </RevealCard>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default OutsideTheScreen;
