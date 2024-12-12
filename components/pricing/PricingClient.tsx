"use client";

import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Video, Bot, Star, Check, X, ArrowRight } from "lucide-react";
import type { PricingPlan, PlanFeatures } from "@/config/pricing";
import { User } from "@supabase/supabase-js";

const categoryIcons: Record<string, React.ElementType> = {
  "Basic Features": Video,
  "AI Tools": Bot,
  Support: Star,
};

interface PricingClientProps {
  plans: PricingPlan[];
}

export function PricingClient({ plans }: PricingClientProps) {
  const router = useRouter();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handlePlanSelection(plan: PricingPlan) {
    if (plan.name === "Free Trial") {
      router.push("/auth");
      return;
    }
  }

  return (
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
            {Object.entries(plans[0].features).map(([section, features]) => (
              <>
                <tr key={`section-${section}`}>
                  <td
                    colSpan={plans.length + 1}
                    className="bg-slate-700/30 p-4"
                  >
                    <div className="flex items-center text-lg font-medium text-white">
                      {categoryIcons[section] &&
                        React.createElement(categoryIcons[section], {
                          className: "mr-2 w-5 h-5",
                        })}
                      {section}
                    </div>
                  </td>
                </tr>
                {Object.entries(features).map(([feature, _]) => (
                  <tr
                    key={`feature-${feature}`}
                    className={`border-t border-slate-700/30 ${
                      hoveredRow === feature ? "bg-slate-700/20" : ""
                    }`}
                    onMouseEnter={() => setHoveredRow(feature)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="p-4 text-sm text-gray-300">{feature}</td>
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
              </>
            ))}
            <tr className="border-t border-slate-700/30">
              <td className="p-6"></td>
              {plans.map((plan) => (
                <td key={`${plan.name}-cta`} className="p-6 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePlanSelection(plan)}
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
  );
}
