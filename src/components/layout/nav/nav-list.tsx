import { type Dispatch, type SetStateAction } from "react";
import { navData, type NavItemData } from "./_nav-mock";
import NavItem from "./nav-item";

interface NavProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
  items?: NavItemData[];
  isActive?: (path: string, pathname: string) => boolean;
}

const NavList: React.FC<NavProps> = ({
  setOpen,
  items = navData,
  isActive,
}) => {
  return (
    <ul
      role="list"
      className="mt-6 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center sm:gap-6"
    >
      {items.map((nav) => (
        <NavItem key={nav.id} setOpen={setOpen} isActive={isActive} {...nav} />
      ))}
    </ul>
  );
};

export default NavList;
