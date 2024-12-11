"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Image as ImageIcon,
  Globe,
  Users,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

const Features = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const features = [
    {
      title: "Multiple AI Models",
      description:
        "Seamlessly switch between GPT-4, Claude 3.5 Sonnet, Google Gemini 1.5 Pro, and Meta Llama 3.3",
      icon: <MessageSquare className="w-8 h-8" />,
      gradient: "from-blue-500 to-purple-500",
    },
    {
      title: "Visual Intelligence",
      description:
        "Drag-and-drop images for instant AI-powered analysis and insights",
      icon: <ImageIcon className="w-8 h-8" />,
      gradient: "from-green-500 to-teal-500",
    },
    {
      title: "Smart Web Search",
      description: "Explore and analyze web content with AI-enhanced accuracy",
      icon: <Globe className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Canvas Collaboration",
      description:
        "Real-time document editing and co-authoring with AI assistance",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-pink-500 to-purple-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="features" className="relative min-h-screen bg-slate-900 py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 opacity-90" />
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500 rounded-full"
            initial={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Sparkles className="w-12 h-12 mx-auto text-blue-500 mb-4" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Modern AI Workflows
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of AI tools, all unified in one
            powerful platform
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              {/* Feature Card */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-800/50 p-8 backdrop-blur-sm border border-slate-700/50">
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} p-4 mb-6`}
                >
                  <div className="text-white">{feature.icon}</div>
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>

                {/* Interactive Elements */}
                <div className="absolute bottom-4 right-4">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  </motion.div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        />
      </div>
    </section>
  );
};

export default Features;
