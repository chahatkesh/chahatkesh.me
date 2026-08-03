"use client";

import Link from "next/link";
import React, { type Dispatch, type SetStateAction } from "react";
import { usePathname } from "next/navigation";
import { MotionSpan } from "~/components/shared";
import { cn } from "~/lib/utils";
import { isPublicNavActive, type NavItemData } from "./_nav-mock";

type NavItemProps = NavItemData & {
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isActive?: (path: string, pathname: string) => boolean;
};

const NavItem: React.FC<NavItemProps> = ({
  label,
  path,
  setOpen,
  isActive: isActiveFn = isPublicNavActive,
}) => {
  const pathname = usePathname();

  const onClickHandler = () => {
    if (typeof setOpen === "function") {
      setOpen(false);
    }
  };

  const isActive = isActiveFn(path, pathname);

  return (
    <li
      role="listitem"
      className={cn(
        "relative flex h-7 items-center rounded-md px-2 font-medium transition-colors duration-300 sm:px-0",
        {
          "bg-ring sm:bg-transparent sm:text-ring": isActive,
        },
      )}
      onClick={onClickHandler}
    >
      <Link
        href={path}
        role="link"
        aria-label={label}
        className="el-focus-styles relative z-10 rounded-sm"
      >
        {label}
      </Link>

      {isActive && (
        <MotionSpan
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.4, bounce: 0, delay: 0.1 }}
          className="absolute left-0 top-1 hidden size-full h-full w-full items-end justify-center sm:flex"
        >
          <span className="z-0 h-[3px] w-full rounded-t-full bg-ring"></span>
        </MotionSpan>
      )}
    </li>
  );
};

export default NavItem;
