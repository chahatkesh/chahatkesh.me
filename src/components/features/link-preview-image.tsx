import Image from "next/image";
import { cn } from "~/lib/utils";
import { API_ROUTES } from "~/constants";

interface LinkPreviewImageProps {
  /** The OG preview image identifier/url to render through the OG image route. */
  previewImage: string;
  /** Accessible alt text for the preview image. */
  alt: string;
  /** Extra classes for the wrapping container. */
  className?: string;
  /** Responsive `sizes` hint forwarded to `next/image`. */
  sizes?: string;
}

/**
 * Renders an Open Graph preview image for a link, scaling on hover when placed
 * inside a `group`. Shared between the About "current work" cards and the
 * experience detail "related links" cards.
 */
export const LinkPreviewImage = ({
  previewImage,
  alt,
  className,
  sizes,
}: LinkPreviewImageProps) => (
  <div
    className={cn(
      "relative aspect-[1200/630] w-full overflow-hidden bg-muted/40",
      className,
    )}
  >
    <Image
      src={API_ROUTES.OG_IMAGE(previewImage)}
      alt={alt}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      sizes={sizes}
    />
  </div>
);
