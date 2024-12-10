"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import VerticalDateRuler from "./VerticalDateRuler";
import { motion } from "framer-motion";

import { DollarSign, Clock, Users, Hand, Wallet, Boxes } from "lucide-react";
// import { IconType } from "lucide-react";

export interface Benefit {
  name: string;
  text: string;
  date: string;
  icon: any;
}

// Initialize benefits with dates spread across 2024
export const sortedBenefits: Benefit[] = [
  {
    icon: DollarSign,
    name: "Save Money",
    text: "ChatSuite consolidates everything, saving you over $500 annually.",
    date: "2024-01-15",
  },
  {
    icon: Clock,
    name: "Save Time",
    text: "No more switching between apps. Streamline everything—writing, creating, and collaborating in one place.",
    date: "2024-02-01",
  },
  {
    icon: Users,
    name: "Simplified for Everyone",
    text: "Designed for everyone, from students to entrepreneurs, with zero learning curve.",
    date: "2024-03-15",
  },
  {
    icon: Hand,
    name: "Ease of Use",
    text: "Sleek interface combining writing, research, and design—at a fraction of the cost.",
    date: "2024-04-01",
  },
  {
    icon: Wallet,
    name: "Reduce Costs",
    text: "Say goodbye to paying for 10+ AI subscriptions. Reduce the cost from $80 to less than $10/month with no limits on usage.",
    date: "2024-05-15",
  },
  {
    icon: Boxes,
    name: "Cost-Effective",
    text: "Access all the AI tools you need in one place at a fraction of the usual cost. We make premium AI tools affordable, leveling the playing field for all.",
    date: "2024-06-01",
  },
];

const Benefits: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const displayedBenefits = useMemo(() => sortedBenefits, []);

  const filteredBenefits = useMemo(() => {
    return displayedBenefits.filter((benefit: any) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        benefit.name.toLowerCase().includes(searchLower) ||
        benefit.text.toLowerCase().includes(searchLower)
      );
    });
  }, [displayedBenefits, searchTerm]);

  const totalHeight = 800; // Fixed height for the UI section

  return (
    <div className="relative min-h-screen bg-slate-900 py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-slate-900/50" />
        {/* Vertical Light Beams */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent"
              style={{
                left: `${20 + i * 15}%`,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                height: ["100%", "120%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              ChatSuite
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Experience the future of AI productivity with our all-in-one
            solution
          </p>
        </motion.div>

        <div className="w-full h-full flex flex-col">
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search benefit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-1.5 pl-9 bg-neutral-900 border border-neutral-800/50 text-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-light"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                size={12}
              />
            </div>
          </div>
          <div className="flex flex-grow">
            <div
              className="mr-8 sticky top-0 self-start hidden md:block"
              style={{ height: `${totalHeight}px` }}
            >
              <VerticalDateRuler height={totalHeight} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 flex-grow">
              {filteredBenefits.map((benefit: Benefit, index: number) => (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={`benefit-${index}`}
                  className="relative"
                >
                  <div
                    className="p-8 rounded-xl flex flex-col text-neutral-300 bg-slate-800/50 relative overflow-hidden 
                                hover:brightness-150 transition-all duration-300 ease-in-out shine hover:scale-105 
                                cursor-pointer group backdrop-blur-md border border-purple-500/20 h-full"
                  >
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                            <benefit.icon size={24} />
                          </div>
                          <h3 className="text-xl font-medium text-white">
                            {benefit.name}
                          </h3>
                        </div>
                        <p className="text-base text-neutral-400 leading-relaxed">
                          {benefit.text}
                        </p>
                      </div>
                    </div>

                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
