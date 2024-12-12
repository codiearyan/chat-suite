import { getPaymentPlans } from "@/config/pricing";
import { getSession } from "@/lib/db/cached-queries";
import { redirect } from "next/navigation";
import { PricingClient } from "./PricingClient";

export default async function Pricing() {
  const user = await getSession();

  if (!user) {
    return redirect("/auth");
  }

  const pricingInfo = getPaymentPlans(user?.email);

  const freePlan = {
    name: "Free Trial",
    badge: "Try it Now",
    price: "Free",
    credits: 10,
    description: "Experience ChatSuite for Free!",
    ctaText: "Sign Up for Free",
    link: "/auth",
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
        "GPT-4o": "✓",
        "Claude Sonnet 3.5": "✓",
        "Google Gemini 1.5 Pro": "✓",
        "Meta Llama 3.3 70b": "✓",
        "Qwen 2.5 32b": "✓",
        "Image Analysis": "-",
        "Text to Image": "-",
        "Text to Speech": "-",
      },
      Support: {
        "Community Support": "✓",
        "Priority Support": "-",
        "Training Sessions": "-",
      },
    },
  };

  const allPlans = [freePlan, ...pricingInfo];

  return (
    <div
      id="pricing"
      className="relative min-h-screen bg-slate-900 py-24 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/30 to-slate-900" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <PricingClient plans={allPlans} />
      </div>
    </div>
  );
}
