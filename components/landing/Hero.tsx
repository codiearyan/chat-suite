"use client";

import { motion } from "framer-motion";
import HeroVideoDialog from "./magicui/hero-video-dialog";

const Hero = () => {
  // YouTube video ID
  const videoId = "dcpvO7skM0I";

  // Generate YouTube thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-block">
            <div className="px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/30 shadow-lg backdrop-blur-sm">
              <p className="text-purple-300 text-sm font-medium">
                ✨ Introducing ChatSuite (Beta) – Your AI Workspace
              </p>
            </div>
          </div>

          {/* Headline - Removed motion animations */}
          <h1 className="mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight px-4">
            <span className="inline-block bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              One Login. One Chatbox.
            </span>
            <br />
            <span className="inline-block mt-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              One Tiny Price.
            </span>
            <br />
            <span className="inline-block mt-2 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
              Zero Stress
            </span>
          </h1>

          {/* Rest of the content - Removed motion animations */}
          <div className="mt-6 space-y-4 px-4">
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Access <span className="text-blue-400">OpenAI GPT-4o</span>,
              <span className="text-purple-400"> Claude Sonnet 3.5</span>,
              <span className="text-green-400"> Gemini 1.5 Pro</span>,{" "}
              <span className="text-green-400"> Meta Llama 3.3 70b</span>,
              <span className="text-green-400"> Qwen 2.5 32b</span> and more –
              all for less than{" "}
              <span className="text-green-400 font-semibold">$10/month</span>.
              Stop juggling subscriptions and simplify your AI Workflow
            </p>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"></p>
          </div>

          {/* CTA Buttons - Simplified hover effects */}
          <div className="mt-10 flex flex-col items-center justify-center gap-2 px-4">
            <div className="w-full sm:w-auto flex gap-4 items-center">
              <motion.a
                href="/auth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3 bg-purple-600 text-white rounded-full font-medium"
              >
                Try ChatSuite for Free
              </motion.a>

              <motion.a
                href="https://topmate.io/sushant_v_pai/250940"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3 border-2 border-white text-white rounded-full font-medium"
              >
                Schedule a Demo
              </motion.a>
            </div>
            <span className="mt-1 text-sm text-gray-400">
              No credit card required
            </span>
          </div>

          {/* Video Dialog - Keep this as is since it's user-triggered */}
          <div className="mt-16 px-4">
            <div className="relative max-w-3xl mx-auto">
              <HeroVideoDialog
                videoSrc={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                thumbnailSrc={thumbnailUrl}
                thumbnailAlt="Watch ChatSuite Demo"
                className="w-full aspect-video"
                animationStyle="from-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
