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
  free: {
    title: "Free",
    description: "Perfect for trying out our AI chat capabilities.",
    price: "₹0",
    period: "/50 credits",
    features: [
      "Access to basic AI chat features",
      "Up to 50 message exchanges",
      "Standard response time",
      "Basic file attachments",
      "Community support",
    ],
    special: false,
    buttonText: "Start Free",
  },
  basic: {
    title: "Starter",
    description: "Perfect for casual users",
    price: "₹499",
    period: "/100 credits",
    features: [
      "Access to GPT-4o and Claude Sonnet",
      "Access to Websearch",
      "100 message exchanges",
      "Standard response time",
      "File attachments support",
      "Email support",
    ],
    special: true,
    buttonText: "Get 100 Credits",
    link: "https://buy.stripe.com/eVa15danKdvB6Jy7su",
  },
  pro: {
    title: "Premium",
    description: "Ideal for working professionals.",
    price: "₹1499",
    period: "/500 credits",
    features: [
      "Access to multi ai models",
      "Access to Websearch",
      "500 message exchanges",
      "Priority response time",
      "Enhanced file handling",
      "Priority email support",
      "Bulk credit discounts",
    ],
    special: false,
    buttonText: "Get 500 Credits",
    link: "https://buy.stripe.com/00g5lt3Zmajpgk86or",
  },
} as const;

export const getLandingPagePlans = (): PricingPlan[] => [
  { ...pricingPlans.free, features: [...pricingPlans.free.features] },
  { ...pricingPlans.basic, features: [...pricingPlans.basic.features] },
  { ...pricingPlans.pro, features: [...pricingPlans.pro.features], special: true },
];

export const getPaymentPlans = (userEmail?: string): PricingPlan[] => [
  {
    ...pricingPlans.basic,
    features: [...pricingPlans.basic.features],
    link: `${pricingPlans.basic.link}?prefilled_email=${encodeURIComponent(userEmail || '')}`,
  },
  {
    ...pricingPlans.pro,
    features: [...pricingPlans.pro.features],
    link: `${pricingPlans.pro.link}?prefilled_email=${encodeURIComponent(userEmail || '')}`,
  },
];

export const getThanksPagePlans = (): PricingPlan[] => getPaymentPlans(); 