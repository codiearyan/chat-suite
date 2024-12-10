"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Video, Bot, Star, Check, X, ArrowRight } from "lucide-react";

type PlanFeatures = {
  [key: string]: {
    [key: string]: string;
  };
};

type Plan = {
  name: string;
  badge?: string;
  price: number | string;
  description: string;
  features: PlanFeatures;
  ctaText: string;
  ctaHoverText?: string;
  isPopular?: boolean;
  credits: number;
};

const Pricing = () => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const plans: Plan[] = [
    {
      name: "Free Trial",
      badge: "Try it Now",
      price: "Free",
      credits: 10,
      description: "Experience ChatSuite for Free!",
      ctaText: "Sign Up for Free",
      features: {
        "Basic Features": {
          "AI Models": "Access to all models",
          "Real Time WebSearch": "✓",
          "Canvas Editor": "✓",
          "Microphone Input": "✓",
          "Chat with Docs": "✓",
          Credits: "10 credits",
          "Access Duration": "Unlimited",
        },
        "AI Tools": {
          "GPT-4": "✓",
          "Claude 3.5": "✓",
          "Google Gemini": "✓",
          "Meta Llama": "✓",
          "Image Analysis": "-",
          "Text to Image": "-",
          "Text to Speech": "-",
        },
        Support: {
          "Community Support": "✓",
          "Priority Support": "-",
          "Dedicated Manager": "-",
          "Training Sessions": "-",
        },
      },
    },
    {
      name: "Lite Model",
      price: 499,
      credits: 100,
      description: "Affordable Flexibility for Casual Users",
      ctaText: "Get Started for ₹499",
      ctaHoverText: "Use credits anytime!",
      features: {
        "Basic Features": {
          "AI Models": "Access to all models",
          "Real Time WebSearch": "✓",
          "Canvas Editor": "✓",
          "Microphone Input": "✓",
          "Chat with Docs": "✓",
          Credits: "100 credits",
          "Access Duration": "Unlimited",
        },
        "AI Tools": {
          "GPT-4": "✓",
          "Claude 3.5": "✓",
          "Google Gemini": "✓",
          "Meta Llama": "✓",
          "Image Analysis": "✓",
          "Text to Image": "Coming Soon",
          "Text to Speech": "Coming Soon",
        },
        Support: {
          "Community Support": "✓",
          "Priority Support": "-",
          "Dedicated Manager": "-",
          "Training Sessions": "-",
        },
      },
    },
    {
      name: "Pro Model",
      badge: "Most Popular",
      price: 1499,
      credits: 500,
      description: "Perfect for Power Users",
      ctaText: "Upgrade to Pro",
      ctaHoverText: "Save more with bulk credits!",
      isPopular: true,
      features: {
        "Basic Features": {
          "AI Models": "Access to all models",
          "Real Time WebSearch": "✓",
          "Canvas Editor": "✓",
          "Microphone Input": "✓",
          "Chat with Docs": "✓",
          Credits: "500 credits",
          "Access Duration": "Unlimited",
        },
        "AI Tools": {
          "GPT-4": "✓",
          "Claude 3.5": "✓",
          "Google Gemini": "✓",
          "Meta Llama": "✓",
          "Image Analysis": "✓",
          "Text to Image": "Priority Access",
          "Text to Speech": "Priority Access",
        },
        Support: {
          "Community Support": "✓",
          "Priority Support": "✓",
          "Dedicated Manager": "-",
          "Training Sessions": "1 Session",
        },
      },
    },
    {
      name: "Bulk Credits",
      price: 2999,
      credits: 2000,
      description: "Need More Credits? Save with Bulk Purchases!",
      ctaText: "Buy Bulk Credits",
      ctaHoverText: "Get the best value for your credits!",
      features: {
        "Basic Features": {
          "AI Models": "Access to all models",
          "Real Time WebSearch": "✓",
          "Canvas Editor": "✓",
          "Microphone Input": "✓",
          "Chat with Docs": "✓",
          Credits: "2000 credits",
          "Access Duration": "Unlimited",
        },
        "AI Tools": {
          "GPT-4": "✓",
          "Claude 3.5": "✓",
          "Google Gemini": "✓",
          "Meta Llama": "✓",
          "Image Analysis": "✓",
          "Text to Image": "Priority Access",
          "Text to Speech": "Priority Access",
        },
        Support: {
          "Community Support": "✓",
          "Priority Support": "✓",
          "Dedicated Manager": "✓",
          "Training Sessions": "3 Sessions",
        },
      },
    },
  ];

  const categoryIcons: { [key: string]: React.ElementType } = {
    "Basic Features": Video,
    "AI Tools": Bot,
    Support: Star,
  };

  return (
    <div className="relative min-h-screen bg-slate-900 py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/30 to-slate-900" />

        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [1, 2, 1],
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Get Started with ChatSuite
            </span>
            <br />
            <span className="text-white">
              Affordable Pricing, Maximum Value
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Only pay for what you use. No monthly subscriptions, no hidden fees.
            <br />
            <span className="text-blue-400">
              1 credit = 1 message or 1 image analysis
            </span>
          </p>
        </motion.div>

        {/* Pricing Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-6 text-left bg-slate-700/30"></th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      className={`p-6 text-center ${
                        plan.isPopular ? "bg-purple-900/30" : "bg-slate-700/30"
                      }`}
                    >
                      {plan.badge && (
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2
                          ${
                            plan.isPopular
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          {plan.badge}
                        </div>
                      )}
                      <h3 className="text-xl font-medium text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-2xl font-light text-white/90 mb-2">
                        {typeof plan.price === "string"
                          ? plan.price
                          : `₹${plan.price}`}
                      </p>
                      <p className="text-sm text-gray-300 mb-4">
                        {plan.credits} credits
                      </p>
                      <p className="text-sm text-gray-400 mb-4">
                        {plan.description}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(plans[0].features).map(
                  ([section, features]) => (
                    <React.Fragment key={section}>
                      <tr>
                        <td
                          colSpan={plans.length + 1}
                          className="bg-slate-700/30 p-4"
                        >
                          <div className="flex items-center text-lg font-medium text-white">
                            {React.createElement(categoryIcons[section], {
                              className: "mr-2 w-5 h-5",
                            })}
                            {section}
                          </div>
                        </td>
                      </tr>
                      {Object.entries(features).map(([feature, _]) => (
                        <tr
                          key={feature}
                          className={`border-t border-slate-700/30 ${
                            hoveredRow === feature ? "bg-slate-700/20" : ""
                          }`}
                          onMouseEnter={() => setHoveredRow(feature)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          <td className="p-4 text-sm text-gray-300">
                            {feature}
                          </td>
                          {plans.map((plan) => (
                            <td
                              key={`${plan.name}-${feature}`}
                              className={`p-4 text-center text-sm ${
                                plan.isPopular ? "bg-purple-900/10" : ""
                              }`}
                            >
                              <span className="text-gray-300">
                                {plan.features[section][feature] === "✓" ? (
                                  <Check className="w-5 h-5 text-green-400 mx-auto" />
                                ) : plan.features[section][feature] === "-" ? (
                                  <X className="w-5 h-5 text-red-400 mx-auto" />
                                ) : (
                                  plan.features[section][feature]
                                )}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  )
                )}
                {/* CTA Row */}
                <tr className="border-t border-slate-700/30">
                  <td className="p-6"></td>
                  {plans.map((plan) => (
                    <td key={`${plan.name}-cta`} className="p-6 text-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300
                          ${
                            plan.isPopular
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                        title={plan.ctaHoverText}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {plan.ctaText}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </motion.button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section (comparison info) retained from original */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            Why ChatSuite's Pricing Works for You
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-slate-800/30 border border-blue-500/20">
              <Video className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">
                Flexible and Transparent
              </h4>
              <p className="text-gray-300">
                Only pay for the credits you need, when you need them.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/30 border border-purple-500/20">
              <Star className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">
                No Wasted Subscriptions
              </h4>
              <p className="text-gray-300">
                Credits never expire—use them anytime.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/30 border border-blue-500/20">
              <Bot className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">
                Access to Everything
              </h4>
              <p className="text-gray-300">
                All features and models available, no matter the plan.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
