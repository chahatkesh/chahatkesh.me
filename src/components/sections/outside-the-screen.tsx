import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { typo } from "~/components/ui";
import { hobbies } from "~/data/about";
import { HobbyIllustration } from "./hobby-illustration";

const OutsideTheScreen = () => {
  return (
    <section
      id="outside-the-screen"
      aria-labelledby="outside-the-screen-title"
      className="space-y-4"
    >
      <h2 id="outside-the-screen-title" className={typo({ variant: "h2" })}>
        Outside the Screen
      </h2>

      <ul
        role="list"
        className="grid grid-cols-2 gap-x-5 gap-y-3 pt-3 sm:grid-cols-[repeat(4,auto)] sm:justify-between"
      >
        {hobbies.map((hobby) => (
          <li key={hobby.title}>
            <Link
              href={hobby.href}
              className="el-focus-styles group flex h-full flex-col items-start rounded-sm py-2"
            >
              <HobbyIllustration kind={hobby.illustration} />
              <span className="mt-1 flex items-center gap-1.5 font-ubuntu text-base font-medium tracking-tight text-foreground group-focus-visible:underline underline-offset-4">
                {hobby.title}
                <ArrowRight
                  aria-hidden
                  className="size-3.5 text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground"
                />
              </span>
              <span className="mt-0.5 text-sm leading-snug text-muted-foreground">
                {hobby.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OutsideTheScreen;
