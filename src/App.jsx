import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

// Importing the pages
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";

// Importing the Project pages
import Webmark from "./pages/projects/Webmark";

// PageTitle component to set document title
const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

// Wrapper components with page titles
const HomeWithTitle = () => (
  <>
    <PageTitle title="Chahat Kesharwani" />
    <Home />
  </>
);

const PortfolioWithTitle = () => (
  <>
    <PageTitle title="My Projects | Chahat Kesharwani" />
    <Portfolio />
  </>
);

// Projects wrapper to handle nested routing
const ProjectsLayout = () => {
  return <Outlet />;
};

const WebmarkWithTitle = () => (
  <>
    <PageTitle title="Webmark - Your Bookmark Management Tool" />
    <Webmark />
  </>
);

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeWithTitle />} />
        <Route path="/projects" element={<ProjectsLayout />}>
          <Route index element={<PortfolioWithTitle />} />
          <Route path="webmark" element={<WebmarkWithTitle />} />
          {/* Add more project routes here as needed */}
          {/* Example: <Route path="projectname" element={<ProjectNameWithTitle />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
