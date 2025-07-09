import React, { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ClassValue } from "clsx";
import { cn } from "~/lib/utils";
import { buttonVariants } from "../ui/button";

interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  href: string;
  children: ReactNode;
  className?: ClassValue;
}

const SmartLink = ({ href, children, className, ...props }: SmartLinkProps) => {
  const isInternalLink = href && href.startsWith("/");

  const linkVariant = buttonVariants({
    variant: "link",
    className: cn(
      "!p-0 h-full !inline-block !whitespace-normal !text-base !text-ring",
      className
    ),
  });

  if (isInternalLink) {
    return (
      <Link className={linkVariant} href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a 
      href={href}
      target="_blank" 
      rel="external" 
      className={linkVariant} 
      {...props}
    >
      {children}
    </a>
  );
};

export default SmartLink;
