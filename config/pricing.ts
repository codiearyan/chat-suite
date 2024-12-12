export interface PlanFeatures {
  [key: string]: {
    [key: string]: string;
  };
}

export interface PricingPlan {
  name: string;
  badge?: string;
  price: string | number;
  period?: string;
  credits: number;
  description: string;
  features: PlanFeatures;
  ctaText: string;
  ctaHoverText?: string;
  isPopular?: boolean;
  link?: string;
  special?: boolean;
}

export const pricingPlans = {
  lite: {
    name: "Lite Model",
    price: 499,
    credits: 100,
    description: "Affordable Flexibility for Casual Users",
    ctaText: "Get Started for ₹499",
    ctaHoverText: "Use credits anytime!",
    link: "https://buy.stripe.com/eVa15danKdvB6Jy7su",
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
        "GPT-4o": "✓",
        "Claude Sonnet 3.5": "✓",
        "Google Gemini 1.5 Pro": "✓",
        "Meta Llama 3.3 70b": "✓",
        "Qwen 2.5 32b": "✓",
        "Image Analysis": "✓",
        "Text to Image": "Coming Soon",
        "Text to Speech": "Coming Soon",
      },
      Support: {
        "Community Support": "✓",
        "Priority Support": "-",
        "Training Sessions": "-",
      },
    },
  },
  pro: {
    name: "Pro Model",
    price: 1499,
    credits: 500,
    description: "Perfect for Power Users",
    ctaText: "Upgrade to Pro",
    ctaHoverText: "Use credits anytime!",
    link: "https://buy.stripe.com/00g5lt3Zmajpgk86or",
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
        "GPT-4o": "✓",
        "Claude Sonnet 3.5": "✓",
        "Google Gemini 1.5 Pro": "✓",
        "Meta Llama 3.3 70b": "✓",
        "Qwen 2.5 32b": "✓",
        "Image Analysis": "✓",
        "Text to Image": "Coming Soon",
        "Text to Speech": "Coming Soon",
      },
      Support: {
        "Community Support": "✓",
        "Priority Support": "✓",
        "Training Sessions": "-",
      },
    },
  },
  bulk: {
    name: "Bulk Credits",
    price: 3999,
    credits: 2000,
    description: "Need More Credits? Save with Bulk Purchases!",
    ctaText: "Buy Bulk Credits",
    ctaHoverText: "Use credits anytime!",
    link: "https://buy.stripe.com/9AQ29hanKbnt7NC28c?prefilled_promo_code=BULK25",
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
        "GPT-4o": "✓",
        "Claude Sonnet 3.5": "✓",
        "Google Gemini 1.5 Pro": "✓",
        "Meta Llama 3.3 70b": "✓",
        "Qwen 2.5 32b": "✓",
        "Image Analysis": "✓",
        "Text to Image": "Coming Soon",
        "Text to Speech": "Coming Soon",
      },
      Support: {
        "Community Support": "✓",
        "Priority Support": "✓",
        "Training Sessions": "✓",
      },
    },
  },
} as const;

export const getLandingPagePlans = (): PricingPlan[] => [
  { ...pricingPlans.lite },
  { ...pricingPlans.pro },
  { ...pricingPlans.bulk },
];

export const getPaymentPlans = (userEmail?: string): PricingPlan[] => [
  {
    ...pricingPlans.lite,
    link: `${pricingPlans.lite.link}?prefilled_email=${encodeURIComponent(userEmail || '')}`,
  },
  {
    ...pricingPlans.pro,
    link: `${pricingPlans.pro.link}?prefilled_email=${encodeURIComponent(userEmail || '')}`,
  },
  {
    ...pricingPlans.bulk,
    link: `${pricingPlans.bulk.link}&prefilled_email=${encodeURIComponent(userEmail || '')}`,
  },
];

export const getThanksPagePlans = (): PricingPlan[] => getPaymentPlans(); 