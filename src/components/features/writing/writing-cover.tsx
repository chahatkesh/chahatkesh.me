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
      className={cn("size-full [&_svg]:block [&_svg]:size-full", className)}
      dangerouslySetInnerHTML={{
        __html: generateWritingCoverSvg({ slug, title }),
      }}
    />
  );
}
