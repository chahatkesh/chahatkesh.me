"use client";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { NavType } from "./_nav-mock";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { MotionSpan } from "~/components/motion-wrapper";

const NavItem: React.FC<NavType[0] & { setOpen?: Dispatch<SetStateAction<boolean>> }> = ({
  label,
  path,
  setOpen,
}) => {
  const pathname = usePathname();

  const onClickHandler = () => {
    if (typeof setOpen === "function") {
      setOpen(false);
    }
  };

  // Check if we're on a project detail page when the path is /projects
  // or on an about sub-page when the path is /about
  const isProjectDetailPage = path === "/projects" && pathname.startsWith("/projects/");
  const isAboutSubPage = path === "/about" && pathname.startsWith("/about/");
  const isActive = pathname === path || isProjectDetailPage || isAboutSubPage;
  
  return (
    <li
      role="listitem"
      className={cn(
        "relative flex h-7 items-center rounded-md px-2 font-medium transition-colors duration-300 sm:px-0",
        {
          "bg-ring sm:bg-transparent sm:text-ring": isActive,
        }
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
