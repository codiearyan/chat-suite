"use client";

import { motion } from "framer-motion";
import { UserCircle2, Cog, Clock } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    icon: <UserCircle2 className="w-12 h-12" />,
    title: "Sign Up Instantly",
    description:
      "No credit card. No fuss. Get started in seconds. Choose from multiple sign-up options and dive right into the world of AI-powered productivity. Our streamlined onboarding process ensures you're up and running in under a minute.",
    gradient: "from-blue-500 to-purple-500",
    delay: 0.2,
    imagePosition: "right",
    image: "/steps/step1.png",
  },
  {
    icon: <Cog className="w-12 h-12" />,
    title: "Choose Your Tools",
    description:
      "Pick the AI features you need—writing, visuals, research, and more. Customize your workspace with the exact tools that match your workflow. Access GPT-4, Claude, Gemini, and other top AI models all in one place.",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.4,
    imagePosition: "left",
    image: "/steps/step2.png",
  },
  {
    icon: <Clock className="w-12 h-12" />,
    title: "Unlock Productivity",
    description:
      "Let AI handle the hard work while you focus on what matters most. Create content, analyze data, and generate insights faster than ever. Watch your productivity soar with our intuitive interface and powerful AI capabilities.",
    gradient: "from-pink-500 to-blue-500",
    delay: 0.6,
    imagePosition: "right",
    image: "/steps/step3.png",
  },
];

const HowItWorks = () => {
  return (
    <div className="relative min-h-screen bg-slate-900 py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-blue-900/20" />

        {/* Animated Light Beams */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent"
            style={{
              left: `${30 + i * 20}%`,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              height: ["100%", "120%", "100%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            How{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              ChatSuite
            </span>{" "}
            Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get Started with ChatSuite in 3 Easy Steps
          </p>
        </motion.div>

        {/* Steps with Alternating Layout */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step.delay }}
              className="relative"
            >
              <div
                className={`flex flex-col ${
                  step.imagePosition === "right"
                    ? "lg:flex-row"
                    : "lg:flex-row-reverse"
                } items-center gap-8`}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                  {/* Icon Container */}
                  <motion.div
                    className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.gradient} p-4
                               flex items-center justify-center relative group-hover:animate-pulse`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="text-white">{step.icon}</div>
                  </motion.div>

                  {/* Step Number */}
                  <div
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 
                                text-purple-400 text-sm font-medium mb-4"
                  >
                    {index + 1}
                  </div>

                  {/* Content */}
                  <h3 className="text-3xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Step Image */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative rounded-2xl overflow-hidden border border-purple-500/20 
                              hover:border-purple-500/40 transition-all duration-300 shadow-2xl"
                  >
                    {/* Glow Effect */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 
                                opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                    />

                    {/* Step Image */}
                    <div className="relative aspect-video">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Connecting Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 40 }}
                    viewport={{ once: true }}
                    className="w-px bg-gradient-to-b from-purple-500 to-transparent"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

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

export default HowItWorks;
