import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Briefcase,
  FileText,
  BookOpen,
  Link2,
  User,
  Clock,
  MessageSquare,
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Track scroll position to add shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  // Function to handle link clicks
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { path: "/", label: "Home", icon: <Home size={16} /> },
    { path: "/portfolio", label: "Portfolio", icon: <Briefcase size={16} /> },
    { path: "/blog", label: "Blog", icon: <FileText size={16} /> },
    { path: "/resources", label: "Resources", icon: <Link2 size={16} /> },
    { path: "/about", label: "About", icon: <User size={16} /> },
    { path: "/now", label: "Now", icon: <Clock size={16} /> },
    { path: "/contact", label: "Contact", icon: <MessageSquare size={16} /> },
  ];

  // Mobile navigation links (reduced to 5 key items)
  const mobileNavLinks = [
    { path: "/", label: "Home", icon: <Home size={20} /> },
    { path: "/portfolio", label: "Work", icon: <Briefcase size={20} /> },
    { path: "/blog", label: "Blog", icon: <FileText size={20} /> },
    { path: "/about", label: "About", icon: <User size={20} /> },
    { path: "/contact", label: "Contact", icon: <MessageSquare size={20} /> },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes subtleBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
      }
      
      .animate-subtleBounce {
        animation: subtleBounce 0.5s ease-in-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Desktop Navigation Header */}
      <header
        className={`sticky top-0 z-50 bg-white py-4 transition-shadow duration-300 justify-center w-full md:flex hidden ${
          isScrolled ? "shadow-sm" : "border-b border-gray-100"
        }`}>
        <nav className="w-full max-w-[70%] px-4 flex justify-center items-center">
          {/* Desktop Navigation */}
          <div className="flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleLinkClick}
                className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${
                  isActive(link.path)
                    ? "bg-[#f7f6f3] text-[#37352f] font-medium"
                    : "text-[#6b6b6b] hover:bg-gray-50 hover:text-[#37352f]"
                }`}>
                <span className="mr-1.5">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg animate-fadeIn">
        <div className="flex justify-around items-center">
          {mobileNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              className={`flex flex-col items-center justify-center py-3 px-2 flex-1 transition-all duration-200 ease-in-out hover:scale-110 ${
                isActive(link.path)
                  ? "text-gray-800 animate-subtleBounce"
                  : "text-gray-500 hover:text-gray-800"
              }`}>
              <div
                className={`mb-1 transition-transform ${
                  isActive(link.path) ? "scale-110" : ""
                }`}>
                {link.icon}
              </div>
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Add padding to prevent content from being hidden behind the fixed bottom nav on mobile */}
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default Navbar;
