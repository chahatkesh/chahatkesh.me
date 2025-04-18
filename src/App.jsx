import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// Importing the pages
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";

// Importing the Project pages
import Webmark from "./pages/projects/Webmark";
import Servolend from "./pages/projects/Servolend";

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

const ServolendWithTitle = () => (
  <>
    <PageTitle title="Servolend - AI Powered Loan Origination Platform" />
    <Servolend />
  </>
);

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeWithTitle />} />
        <Route path="/portfolio" element={<ProjectsLayout />}>
          <Route index element={<PortfolioWithTitle />} />
          <Route path="webmark" element={<WebmarkWithTitle />} />
          <Route path="servolend" element={<ServolendWithTitle />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
