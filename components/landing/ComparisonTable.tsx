"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useState, useEffect } from "react";

interface ComparisonRow {
  feature: string;
  chatSuite: string;
  others: string;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "All-in-One AI Platform",
    chatSuite: "Yes",
    others: "No",
  },
  {
    feature: "Affordable Pricing",
    chatSuite: "Less than $10/month, Save $800/year",
    others: "Expensive",
  },
  {
    feature: "Ease of Use",
    chatSuite: "Beginner-Friendly",
    others: "Complicated",
  },
  {
    feature: "Multi-Model Integration",
    chatSuite: "OpenAI, Claude, Gemini, Llama, Qwen, Luma AI, Flux 1.1 + More",
    others: "Limited Models",
  },
  {
    feature: "Overall Value",
    chatSuite: "Best in Class",
    others: "Limited & Expensive",
  },
];

const ComparisonTable = () => {
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 }); // Default fallback values

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      handleResize(); // Set initial size
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="relative min-h-screen py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-blue-900/20" />
        {typeof window !== "undefined" &&
          [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500 rounded-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              ChatSuite combines simplicity, affordability, and power into one
              seamless platform
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get unlimited access to leading AI models for less than $10/month.
            Experience the best-in-class AI solution.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-purple-500/20"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-slate-700/50 border-b border-purple-500/20">
            <div className="font-semibold text-gray-300">Feature</div>
            <div className="font-semibold text-purple-400">ChatSuite</div>
            <div className="font-semibold text-gray-400">Others</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-purple-500/20">
            {comparisonData.map((row, index) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-3 gap-4 p-6 hover:bg-purple-500/5 transition-colors"
              >
                <div className="text-white font-medium">{row.feature}</div>
                <div className="flex items-center gap-2 text-green-400">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span>{row.chatSuite}</span>
                </div>
                <div className="flex items-center gap-2 text-red-400">
                  <X className="w-5 h-5 flex-shrink-0" />
                  <span>{row.others}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-purple-600 text-white rounded-full font-medium 
                     hover:bg-purple-700 transition-all duration-300 shadow-lg 
                     hover:shadow-purple-500/50 animate-glow"
          >
            Start Your Free Trial
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ComparisonTable;
