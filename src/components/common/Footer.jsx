import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden md:flex justify-center py-5 px-5 border-t border-gray-100 w-full bg-white">
      <div className="w-full max-w-screen-md px-4 flex justify-center items-center">
        <p className="text-xs tracking-wide text-gray-500 font-light transition-colors duration-300 hover:text-gray-700">
          © {currentYear} Chahat Kesharwani
        </p>
      </div>
    </footer>
  );
};

export default Footer;
