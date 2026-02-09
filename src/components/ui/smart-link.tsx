import React, { AnchorHTMLAttributes, ReactNode, forwardRef } from "react";
import Link from "next/link";
import { ClassValue } from "clsx";
import { cn } from "~/lib/utils";
import { buttonVariants } from "../ui/button";

interface SmartLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className"
> {
  href: string;
  children: ReactNode;
  className?: ClassValue;
}

const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(
  ({ href, children, className, ...props }, ref) => {
    const isInternalLink = href && href.startsWith("/");

    const linkVariant = buttonVariants({
      variant: "link",
      className: cn(
        "!p-0 h-full !inline-block !whitespace-normal !text-base !text-ring",
        className,
      ),
    });

    if (isInternalLink) {
      return (
        <Link className={linkVariant} href={href} ref={ref} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkVariant}
        ref={ref}
        {...props}
      >
        {children}
      </a>
    );
  },
);

SmartLink.displayName = "SmartLink";

export default SmartLink;
