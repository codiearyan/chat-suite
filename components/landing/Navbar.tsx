"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { companyConfig } from "@/config";

const Navbar = () => {
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
      setIsMobileMenuOpen(false);
    }
  };

  const navigationItems = companyConfig.company.navbarLinks.map((link) => ({
    name: link.label,
    sectionId: link.href.replace("/", ""),
    href: link.href,
  }));

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
      <div className="max-w-7xl mx-auto flex items-center justify-evenly">
        <Link
          href={companyConfig.company.homeUrl}
          className="flex items-center justify-center"
        >
          <Image
            src={companyConfig.company.logo}
            alt={companyConfig.company.name}
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="text-lg font-bold ml-2 text-white">
            {companyConfig.company.name}
          </span>
        </Link>

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

        <div className="hidden md:flex items-center justify-center space-x-6">
          {navigationItems.map((item) => (
            <motion.div key={item.name}>
              {item.href.startsWith("http") ? (
                <a
                  href={item.href}
                  className="relative group px-4 py-2 rounded-full text-white flex items-center space-x-2 hover:bg-white/10 transition-all duration-300"
                >
                  <span>{item.name}</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="relative group px-4 py-2 rounded-full text-white flex items-center space-x-2 hover:bg-white/10 transition-all duration-300"
                >
                  <span>{item.name}</span>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        <Link
          href="/auth"
          className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors animate-pulse"
        >
          Get Started
        </Link>
      </div>

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
                onClick={() =>
                  item.href.startsWith("http")
                    ? (window.location.href = item.href)
                    : scrollToSection(item.sectionId)
                }
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-white"
              >
                <span>{item.name}</span>
              </button>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col space-y-4">
              {/* <motion.a
                href="/auth"
                className="w-full p-3 text-center text-white hover:bg-white/10 rounded-lg transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.a> */}
              <motion.a
                href="/auth"
                className="w-full p-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
