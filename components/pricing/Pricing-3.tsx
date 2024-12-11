import { getLandingPagePlans } from "@/config/pricing";
import { getSession } from "@/lib/db/cached-queries";
import { Video, Bot, Star, Check, X, ArrowRight } from "lucide-react";
import { PricingClient } from "./PricingClient";

const categoryIcons = {
  "Basic Features": Video,
  "AI Tools": Bot,
  Support: Star,
} as const;

export default async function Pricing() {
  const plans = getLandingPagePlans();
  const user = await getSession();

  return (
    <div
      id="pricing"
      className="relative min-h-screen bg-slate-900 py-24 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
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
        </div>

        {/* Pricing Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden">
          <div className="w-full overflow-x-auto">
            <PricingClient
              plans={plans}
              user={user}
              categoryIcons={categoryIcons}
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Why ChatSuite's Pricing Works for You
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ... Bottom section cards ... */}
          </div>
        </div>
      </div>
    </div>
  );
}
