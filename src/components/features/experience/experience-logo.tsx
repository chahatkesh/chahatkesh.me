import Image from "next/image";
import { cn } from "~/lib/utils";
import { type Experience } from "~/data/experience";

type ExperienceLogoSize = "sm" | "md" | "lg";

const sizeClasses: Record<
  ExperienceLogoSize,
  { container: string; image: string; sizes: string }
> = {
  sm: {
    container: "h-10 w-10",
    image: "p-1.5",
    sizes: "40px",
  },
  md: {
    container: "h-14 w-14",
    image: "p-2",
    sizes: "56px",
  },
  lg: {
    container: "h-[4.5rem] w-[4.5rem]",
    image: "p-2.5",
    sizes: "72px",
  },
};

interface ExperienceLogoProps {
  src: Experience["logo"];
  alt: string;
  size?: ExperienceLogoSize;
  className?: string;
}

export function ExperienceLogo({
  src,
  alt,
  size = "sm",
  className,
}: ExperienceLogoProps) {
  const { container, image, sizes } = sizeClasses[size];

  return (
    <div
      className={cn(
        "relative z-10 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-background",
        container,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn("object-contain", image)}
      />
    </div>
  );
}
