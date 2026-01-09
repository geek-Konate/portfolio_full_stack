// components/NavBar.jsx
import React, { useState } from "react";

import ScrollLink from "../../composents/ScrollLink/ScrollLink";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "hero", label: "Accueil" },
    { id: "about", label: "À propos" },
    { id: "skills", label: "Compétences" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-8">
          {/* Logo */}
          <ScrollLink
            to="hero"
            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition"
          >
            Mamadou<span className="text-blue-600">.dev</span>
          </ScrollLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <ScrollLink
                key={item.id}
                to={item.id}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                offset={item.id === "hero" ? 0 : 80} // Ajuste l'offset
              >
                {item.label}
              </ScrollLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.id}
                  to={item.id}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </ScrollLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
