export type NavItemData = {
  id: string;
  label: string;
  path: string;
};

export const navData: NavItemData[] = [
  {
    id: "nav-home",
    label: "Home",
    path: "/",
  },
  {
    id: "nav-projects",
    label: "Projects",
    path: "/projects",
  },
  {
    id: "nav-gallery",
    label: "Gallery",
    path: "/gallery",
  },
  {
    id: "nav-videos",
    label: "Videos",
    path: "/videos",
  },
  {
    id: "nav-journey",
    label: "Journey",
    path: "/about/journey",
  },
  {
    id: "nav-about",
    label: "About",
    path: "/about",
  },
];

export const adminNavData: NavItemData[] = [
  { id: "admin-dashboard", label: "Dashboard", path: "/admin" },
  { id: "admin-gallery", label: "Gallery", path: "/admin/gallery" },
  { id: "admin-places", label: "Places", path: "/admin/places" },
  { id: "admin-gym", label: "Gym", path: "/admin/gym" },
  { id: "admin-files", label: "Files", path: "/admin/files" },
  { id: "admin-diagrams", label: "Diagrams", path: "/admin/diagrams" },
  { id: "admin-gists", label: "Gists", path: "/admin/gists" },
  { id: "admin-experience", label: "Experience", path: "/admin/experience" },
];

/** Default active matcher for the public site nav. */
export function isPublicNavActive(path: string, pathname: string): boolean {
  if (path === "/") return pathname === "/";
  if (path === "/projects")
    return pathname === "/projects" || pathname.startsWith("/projects/");
  if (path === "/videos")
    return pathname === "/videos" || pathname.startsWith("/videos/");
  if (path === "/about")
    return (
      pathname === "/about" ||
      (pathname.startsWith("/about/") && !pathname.startsWith("/about/journey"))
    );
  return pathname === path;
}

/** Active matcher for admin section nav. */
export function isAdminNavActive(path: string, pathname: string): boolean {
  if (path === "/admin") return pathname === "/admin";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export type NavType = typeof navData;
