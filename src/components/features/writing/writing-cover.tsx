import { cn } from "~/lib/utils";
import { generateWritingCoverSvg } from "~/lib/writing-cover";

type WritingCoverProps = {
  slug: string;
  title: string;
  className?: string;
};

export function WritingCover({ slug, title, className }: WritingCoverProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative size-full [&_svg]:block [&_svg]:size-full",
        className,
      )}
    >
      <div
        className="absolute inset-0 light:hidden"
        dangerouslySetInnerHTML={{
          __html: generateWritingCoverSvg({ slug, title, appearance: "dark" }),
        }}
      />
      <div
        className="absolute inset-0 hidden light:block"
        dangerouslySetInnerHTML={{
          __html: generateWritingCoverSvg({ slug, title, appearance: "light" }),
        }}
      />
    </div>
  );
}
