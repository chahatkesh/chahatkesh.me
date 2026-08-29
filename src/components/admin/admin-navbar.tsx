import SiteHeader from "~/components/layout/site-header";

/** Admin navbar — same sticky chrome as the public navbar, with admin routes. */
export function AdminNavbar() {
  return <SiteHeader variant="admin" />;
}
