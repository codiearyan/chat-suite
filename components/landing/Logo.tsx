"use client";

import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";

export default function Logo() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2"
    >
      <motion.div
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 
          flex items-center justify-center shadow-lg shadow-purple-500/25"
      >
        <RotateCw className="w-5 h-5 text-white" />
      </motion.div>
      <motion.span
        className="text-white font-bold text-xl tracking-tight bg-clip-text text-transparent 
          bg-gradient-to-r from-white to-gray-200"
      >
        PivotWithAI
      </motion.span>
    </motion.div>
  );
}
