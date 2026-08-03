"use client";

import MobileNav from "./mobile-nav";
import NavList from "./nav-list";
import {
  adminNavData,
  isAdminNavActive,
  isPublicNavActive,
  navData,
  type NavItemData,
} from "./_nav-mock";

export type NavbarVariant = "public" | "admin";

interface NavbarProps {
  items?: NavItemData[];
  variant?: NavbarVariant;
}

const Navbar = ({ variant = "public", items }: NavbarProps) => {
  const resolvedItems = items ?? (variant === "admin" ? adminNavData : navData);
  const isActive = variant === "admin" ? isAdminNavActive : isPublicNavActive;

  return (
    <nav
      className="mb-4 mt-2 flex items-center justify-end gap-4"
      role="navigation"
    >
      <div className="hidden sm:block">
        <NavList items={resolvedItems} isActive={isActive} />
      </div>

      <div className="block sm:hidden">
        <MobileNav items={resolvedItems} isActive={isActive} />
      </div>
    </nav>
  );
};

export default Navbar;
