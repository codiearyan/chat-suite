"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface PartnerLogo {
  name: string;
  gradient: string;
  iconUrl: string;
}

const partners: PartnerLogo[] = [
  {
    name: "Claude",
    gradient: "from-blue-500 to-purple-500",
    iconUrl:
      "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/anthropic.svg",
  },
  {
    name: "ChatGPT",
    gradient: "from-green-500 to-teal-500",
    iconUrl:
      "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/openai.svg",
  },
  {
    name: "Gemini",
    gradient: "from-blue-500 to-cyan-500",
    iconUrl:
      "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/google.svg",
  },
  {
    name: "Meta AI",
    gradient: "from-purple-500 to-pink-500",
    iconUrl:
      "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/meta.svg",
  },
  {
    name: "Perplexity",
    gradient: "from-violet-500 to-purple-500",
    iconUrl:
      "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/perplexity.svg",
  },
  {
    name: "Tencent",
    gradient: "from-blue-400 to-green-400",
    iconUrl:
      "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/tencent.svg",
  },
  {
    name: "Mistral AI",
    gradient: "from-red-500 to-pink-500",
    iconUrl:
      "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/mistral.svg",
  },
  {
    name: "Grok",
    gradient: "from-blue-600 to-indigo-600",
    iconUrl: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/xai.svg",
  },
  {
    name: "Luma AI",
    gradient: "from-purple-400 to-pink-400",
    iconUrl:
      "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/luma.svg",
  },
  {
    name: "DeepSeek",
    gradient: "from-blue-500 to-indigo-500",
    iconUrl:
      "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/deepseek.svg",
  },
  {
    name: "ChatGLM",
    gradient: "from-cyan-500 to-blue-500",
    iconUrl:
      "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/zhipu.svg",
  },
  {
    name: "Stability AI",
    gradient: "from-indigo-500 to-purple-500",
    iconUrl:
      "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/stability.svg",
  },
];

const Marquee = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-900 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-800 to-transparent z-10" />
      <div className="absolute left-0 w-20 top-20 bottom-20 bg-gradient-to-r from-slate-900 to-transparent z-10" />
      <div className="absolute right-0 w-20 top-20 bottom-20 bg-gradient-to-l from-slate-900 to-transparent z-10" />

      {/* Trust Badge */}
      <div className="text-center mb-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">
              Trusted AI Models
            </span>
            <Sparkles className="w-6 h-6 text-purple-400" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Access Premium AI Models
          </h2>
          <p className="text-xl bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text font-medium">
            All in One Platform, One Tiny Price
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* First Row */}
        <div className="flex space-x-8 animate-marquee">
          {[...partners, ...partners].map((partner, index) => (
            <MarqueeCard key={`${partner.name}-1-${index}`} partner={partner} />
          ))}
        </div>

        {/* Second Row (Reversed) */}
        <div className="flex space-x-8 animate-marquee2 mt-8">
          {[...partners, ...partners].reverse().map((partner, index) => (
            <MarqueeCard key={`${partner.name}-2-${index}`} partner={partner} />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

const MarqueeCard = ({ partner }: { partner: PartnerLogo }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative flex-shrink-0 group"
    >
      <div className="relative w-48 h-24 rounded-xl overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm" />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${partner.gradient} opacity-10 
                        group-hover:opacity-20 transition-opacity duration-300`}
        />

        {/* Animated Border */}
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${partner.gradient} opacity-0 
                          group-hover:opacity-100 animate-spin-slow transition-opacity duration-300`}
            style={{ clipPath: "inset(2px round 0.5rem)" }}
          />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-4 border border-white/10">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 360 }}
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${partner.gradient} 
                       flex items-center justify-center mb-2`}
          >
            <img
              src={partner.iconUrl}
              alt={partner.name}
              className="w-6 h-6"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </motion.div>
          <p className="text-white font-medium text-sm">{partner.name}</p>
        </div>

        {/* Shine Effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-500"
        >
          <div
            className="absolute inset-0 transform -rotate-45 translate-y-full 
                        group-hover:translate-y-0 transition-transform duration-700
                        bg-gradient-to-t from-white/0 via-white/10 to-white/0"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Marquee;
