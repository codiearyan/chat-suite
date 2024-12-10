"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { companyConfig } from "@/config";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Use navigation from config
  const navLinks = companyConfig.company.navbarLinks.map((link) => ({
    name: link.label,
    sectionId: link.href.replace("/", ""),
    href: link.href,
  }));

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      href: "#",
      color: "hover:text-blue-400",
    },
    {
      name: "Twitter",
      icon: <Twitter />,
      href: "#",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: <Instagram />,
      href: "#",
      color: "hover:text-pink-400",
    },
    {
      name: "Facebook",
      icon: <Facebook />,
      href: "#",
      color: "hover:text-blue-500",
    },
    {
      name: "YouTube",
      icon: <Youtube />,
      href: "#",
      color: "hover:text-red-500",
    },
  ];

  return (
    <footer className="relative bg-slate-900 pt-24 pb-12 overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-purple-900/20 to-slate-900" />

        {/* Animated Star Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1024),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 768),
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Experience the Future of AI?
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-purple-600 text-white rounded-full 
                     font-medium hover:bg-purple-700 transition-all duration-300 
                     shadow-lg hover:shadow-purple-500/50 group"
          >
            <span>Get Started—Your All-in-One AI Workspace Awaits</span>
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-slate-700/50">
          {/* Brand Section with config */}
          <div className="space-y-4">
            <a
              href={companyConfig.company.homeUrl}
              className="flex items-center"
            >
              <img
                src={companyConfig.company.logo}
                alt={companyConfig.company.name}
                className="h-8 w-8"
              />
              <span className="text-lg font-bold ml-2 text-white">
                {companyConfig.company.name}
              </span>
            </a>
            <p className="text-gray-400">{companyConfig.company.description}</p>
          </div>

          {/* Navigation Links using config */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() =>
                      link.href.startsWith("http")
                        ? (window.location.href = link.href)
                        : scrollToSection(link.sectionId)
                    }
                    className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center 
                             text-gray-400 transition-colors duration-200 ${social.color}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar with config */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {companyConfig.company.name}. All
            rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a
              href={companyConfig.legal.privacyPolicyUrl}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href={companyConfig.legal.tosUrl}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href={companyConfig.legal.refundPolicyUrl}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
