import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = () => {
  const location = useLocation();

  // Skip breadcrumb on homepage
  if (location.pathname === "/") return null;

  // Generate breadcrumb items from pathname
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Custom labels for routes (to display user-friendly names)
  const getRouteLabel = (route) => {
    const labels = {
      portfolio: "Portfolio",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      resources: "Resources",
      booknotes: "Book Notes",
      now: "Now",
      webmark: "Webmark",
      servolend: "Servolend AI",
      repocraft: "RepoCraft",
    };

    return labels[route] || route.charAt(0).toUpperCase() + route.slice(1);
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="pt-0 md:pt-12 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
      <ol className="flex items-center flex-wrap text-sm">
        <li className="flex items-center">
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-700 transition-colors flex items-center">
            <Home size={16} className="mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name} className="flex items-center">
              <ChevronRight size={14} className="mx-2 text-gray-400" />
              {isLast ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {getRouteLabel(name)}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-gray-500 hover:text-gray-700 transition-colors">
                  {getRouteLabel(name)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
