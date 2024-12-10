"use client";

import { motion } from "framer-motion";
import { Menu, X, Home, PieChart, School, Book, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
// import { createClient } from "@/lib/utils/supabase/server";

const Navbar = async () => {
  // const supabase = createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  const navigationItems = [
    { name: "Features", icon: <Home size={18} />, sectionId: "features" },
    { name: "Pricing", icon: <PieChart size={18} />, sectionId: "pricing" },
    {
      name: "NextGenAI School",
      icon: <School size={18} />,
      sectionId: "school",
    },
    { name: "Blog", icon: <Book size={18} />, sectionId: "blog" },
    { name: "Support", icon: <Settings size={18} />, sectionId: "support" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 transition-all duration-300 ${
        hasScrolled
          ? "bg-gradient-to-r from-indigo-900 to-purple-900 shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <motion.button
              key={item.name}
              onClick={() => scrollToSection(item.sectionId)}
              className="relative group px-4 py-2 rounded-full text-white flex items-center space-x-2 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {item.icon}
              <span>{item.name}</span>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}

          {/* Desktop CTA Buttons */}
          <motion.a
            href="#signin"
            className="text-white hover:text-blue-300 transition-colors relative group"
            whileHover={{ scale: 1.05 }}
          >
            Sign In
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </motion.a>
          <motion.button
            className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors animate-pulse"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 p-4 shadow-lg"
        >
          <div className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.sectionId)}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-white"
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col space-y-4">
              <motion.a
                href="#signin"
                className="w-full p-3 text-center text-white hover:bg-white/10 rounded-lg transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.a>
              <motion.button
                className="w-full p-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
