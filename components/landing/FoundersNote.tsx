"use client";

import { motion } from "framer-motion";
import { ArrowRight, Quote, Sparkles } from "lucide-react";

const FoundersNote = () => {
  return (
    <div className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-screen filter blur-xl opacity-70"
            animate={{
              x: [0, 30, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
            }}
            style={{
              background: `radial-gradient(circle, ${
                i === 0
                  ? "rgba(147, 51, 234, 0.3)"
                  : i === 1
                  ? "rgba(59, 130, 246, 0.3)"
                  : "rgba(236, 72, 153, 0.3)"
              }, transparent)`,
              width: `${400 + i * 100}px`,
              height: `${400 + i * 100}px`,
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-4xl"
        >
          {/* Decorative Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Quote className="w-8 h-8 text-purple-400" />
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
            </motion.div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Founder's{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
                Note
              </span>
            </h2>
          </div>

          {/* Note Content */}
          <div className="relative">
            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-8 md:p-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/20"
            >
              {/* Content Grid */}
              <div className="grid md:grid-cols-5 gap-8 items-start">
                {/* Profile Section */}
                <div className="md:col-span-2 text-center md:text-left">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative inline-block"
                  >
                    <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden ring-2 ring-purple-500/30">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sushant&backgroundColor=b6e3f4"
                        alt="Sushant"
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-6 space-y-2"
                  >
                    <h3 className="text-2xl font-bold text-white">Sushant</h3>
                    <p className="text-purple-400 font-medium">
                      Founder, PivotWithAI
                    </p>
                  </motion.div>
                </div>

                {/* Letter Content */}
                <div className="md:col-span-3 space-y-6">
                  {/* Decorative Quote */}
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-4 w-8 h-8 text-purple-500/20" />

                    {/* Letter Paragraphs */}
                    <div className="space-y-6 text-gray-300 leading-relaxed relative z-10">
                      <p className="text-lg font-medium text-purple-300">
                        Hi, it's Sushant from Pivot With AI,
                      </p>

                      <p>
                        I used to feel overwhelmed by technology. Juggling
                        multiple AI tools, paying for countless subscriptions,
                        and constantly switching between platforms—it was
                        exhausting and inefficient.
                      </p>

                      <div className="py-4 px-6 bg-purple-500/10 rounded-xl border border-purple-500/20 my-8">
                        <p className="text-lg font-medium text-purple-300">
                          ChatSuite changed everything.
                        </p>
                      </div>

                      <p>
                        I went from frustrated and overworked to calm and
                        confident. I now have a single platform that does it
                        all—content creation, image generation, document
                        analysis, and more.
                      </p>

                      <p>
                        That's why I created ChatSuite, your all-in-one AI
                        workspace designed to save time, reduce costs, and boost
                        productivity.
                      </p>

                      <div className="py-4 px-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <p className="text-lg font-medium text-blue-300">
                          With ChatSuite, you'll save 100+ hours of wasted
                          effort and keep more money in your pocket.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 
                             text-white rounded-xl font-medium shadow-xl hover:shadow-purple-500/25 
                             flex items-center justify-center space-x-2 group transition-all duration-300"
                  >
                    <span>Start Your Journey with ChatSuite</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl -z-10" />
          </div>
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        />
      </div>
    </div>
  );
};

export default FoundersNote;
