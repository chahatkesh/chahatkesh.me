import Image from "next/image";
import { cn } from "~/lib/utils";
import { type Experience } from "~/data/experience";

type ExperienceLogoSize = "sm" | "md" | "lg";

const sizeClasses: Record<
  ExperienceLogoSize,
  { container: string; sizes: string }
> = {
  sm: {
    container: "h-10 w-10",
    sizes: "40px",
  },
  md: {
    container: "h-14 w-14",
    sizes: "56px",
  },
  lg: {
    container: "h-[4.5rem] w-[4.5rem]",
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
  const { container, sizes } = sizeClasses[size];

  return (
    <div
      className={cn(
        "relative z-10 shrink-0 bg-background",
        container,
        className,
      )}
    >
      <div className="absolute inset-x-0 inset-y-[12.5%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain"
        />
      </div>
    </div>
  );
}
