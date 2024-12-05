export interface PricingPlan {
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  special: boolean;
  buttonText: string;
  link?: string;
}

export const pricingPlans = {
  // free: {
  //   title: "Free Trial",
  //   description: "Experience ChatSuite for Free!",
  //   price: "₹0",
  //   period: "/10 credits",
  //   features: [
  //     "10 credits upon sign-up",
  //     "Access to all AI models",
  //     "Web Search capability",
  //     "Canvas Editor access",
  //     "Basic features included",
  //   ],
  //   special: false,
  //   buttonText: "Sign Up for Free",
  // },
  lite: {
    title: "Lite",
    description: "Affordable Flexibility for Casual Users",
    price: "₹499",
    period: "/100 credits",
    features: [
      "Access to all AI models",
      "Web Search & Canvas Editor",
      "Image Analysis tools",
      "PDF chat functionality",
      "AI Image Generation (coming soon)",
      "Text-to-Speech (coming soon)",
    ],
    special: false,
    buttonText: "Get Started for ₹499",
    link: "https://buy.stripe.com/00g5lt3Zmajpgk86or",
  },
  pro: {
    title: "Pro",
    description: "Perfect for Power Users",
    price: "₹1499",
    period: "/500 credits",
    features: [
      "Everything in Lite plan",
      "500 message credits",
      "Advanced AI tools access",
      "Larger capacity",
      "Best for frequent users",
      "Priority support",
    ],
    special: true,
    buttonText: "Upgrade to Pro",
    link: "https://buy.stripe.com/00g5lt3Zmajpgk86or",
  },
  bulk: {
    title: "Bulk Credits",
    description: "Need More Credits? Save with Bulk Purchases!",
    price: "₹2999",
    period: "/2000 credits",
    features: [
      "Maximum savings on credits",
      "2000 message credits",
      "All premium features included",
      "Use credits anytime",
      "Highest value for money",
      "Priority support",
    ],
    special: false,
    buttonText: "Buy Bulk Credits",
    link: "https://buy.stripe.com/9AQ29hanKbnt7NC28c?prefilled_promo_code=BULK25",
  },
} as const;

export const getLandingPagePlans = (): PricingPlan[] => [
  // { ...pricingPlans.free, features: [...pricingPlans.free.features] },
  { ...pricingPlans.lite, features: [...pricingPlans.lite.features] },
  { ...pricingPlans.pro, features: [...pricingPlans.pro.features] },
  { ...pricingPlans.bulk, features: [...pricingPlans.bulk.features]},
];

export const getPaymentPlans = (userEmail?: string): PricingPlan[] => [
  {
    ...pricingPlans.lite,
    features: [...pricingPlans.lite.features],
    link: `${pricingPlans.lite.link}?prefilled_email=${encodeURIComponent(userEmail || '')}`,
  },
  {
    ...pricingPlans.pro,
    features: [...pricingPlans.pro.features],
    link: `${pricingPlans.pro.link}?prefilled_email=${encodeURIComponent(userEmail || '')}`,
  },
  {
    ...pricingPlans.bulk,
    features: [...pricingPlans.bulk.features],
    link: `${pricingPlans.bulk.link}?prefilled_email=${encodeURIComponent(userEmail || '')}`,
  },
];

export const getThanksPagePlans = (): PricingPlan[] => getPaymentPlans(); 