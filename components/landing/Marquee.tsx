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
      {/* Simplified gradient overlays */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-900 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-800 to-transparent z-10" />

      {/* Trust Badge - Removed motion animations */}
      <div className="text-center mb-12 relative z-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">
              Trusted AI Models
            </span>
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Access Premium AI Models
          </h2>
          <p className="text-xl bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text font-medium">
            All in One Platform, One Tiny Price
          </p>
        </div>
      </div>

      {/* Simplified Marquee Container */}
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
    </div>
  );
};

const MarqueeCard = ({ partner }: { partner: PartnerLogo }) => {
  return (
    <div className="relative flex-shrink-0 group">
      <div className="relative w-48 h-24 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm" />
        <div className="relative h-full flex flex-col items-center justify-center p-4 border border-white/10">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center mb-2">
            <img
              src={partner.iconUrl}
              alt={partner.name}
              className="w-6 h-6"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
          <p className="text-white font-medium text-sm">{partner.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
