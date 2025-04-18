import React from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import FeaturedProject from "../components/home/FeaturedProject";
import About from "../components/home/About";
import LetsTalk from "../components/home/LetsTalk";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <FeaturedProject />
      <LetsTalk />
      <Footer />
    </div>
  );
};

export default Home;
