import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Importing the pages
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Progress from "./pages/Progress";
import Now from "./pages/Now";
import Resources from "./pages/Resources";
import Blog from "./pages/Blog";

// Importing project pages
import Webmark from "./pages/projects/Webmark";

// Importing common components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Breadcrumb from "./components/common/Breadcrumb";

// PageWrapper component for consistent layout and page titles
const PageWrapper = ({
  title,
  children,
  includeBreadcrumb = true,
  includeNavFooter = true,
}) => {
  useEffect(() => {
    document.title = title || "Chahat Kesharwani";
  }, [title]);

  return (
    <>
      {includeNavFooter && <Navbar />}
      {includeBreadcrumb && <Breadcrumb />}
      {children}
      {includeNavFooter && <Footer />}
    </>
  );
};

// Route configuration object for cleaner route definitions
const routes = [
  {
    path: "/",
    element: <Home />,
    title: "Chahat Kesharwani",
    breadcrumb: false,
  },
  { path: "/about", element: <About />, title: "About Me | Chahat Kesharwani" },
  {
    path: "/portfolio",
    element: <Portfolio />,
    title: "My Projects | Chahat Kesharwani",
  },
  {
    path: "/blog",
    element: <Blog />,
    title: "Blog | Chahat Kesharwani",
  },
  {
    path: "/resources",
    element: <Resources />,
    title: "Resources | Chahat Kesharwani",
  },
  {
    path: "/now",
    element: <Now />,
    title: "Now | Chahat Kesharwani",
  },
  {
    path: "/contact",
    element: <Contact />,
    title: "Contact | Chahat Kesharwani",
  },
  {
    path: "/portfolio/webmark",
    element: <Webmark />,
    title: "Webmark | Chahat Kesharwani",
  },
];

const App = () => {
  const location = useLocation();
  // Special case for homepage - we don't want breadcrumb there
  const isHomePage = location.pathname === "/";

  return (
    <Routes>
      {routes.map(({ path, element, title, breadcrumb = true }) => (
        <Route
          key={path}
          path={path}
          element={
            <PageWrapper
              title={title}
              includeBreadcrumb={breadcrumb && !isHomePage}>
              {element}
            </PageWrapper>
          }
        />
      ))}

      {/* Fallback for non-existent routes */}
      <Route
        path="*"
        element={
          <PageWrapper
            title="Page Not Found | Chahat Kesharwani"
            includeNavFooter={false}>
            <Progress />
          </PageWrapper>
        }
      />
    </Routes>
  );
};

export default App;
