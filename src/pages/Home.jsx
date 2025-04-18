import React from "react";
import Hero from "../components/home/Hero";
import FeaturedProject from "../components/home/FeaturedProject";
import About from "../components/home/About";
import LetsTalk from "../components/home/LetsTalk";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <FeaturedProject />
      <LetsTalk />
    </div>
  );
};

export default Home;
