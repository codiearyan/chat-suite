/// Core Website config
export const companyConfig = {
  ////// Base config used mainly for layout (@/components/navbar/Navbar-1.tsx and @/components/footer/Footer-1.tsx)
  company: {
    name: "Pivot With AI",
    theme: "pivotwithai",
    homeUrl: "/",
    appUrl: "/",
    description: "Experience AI-powered conversations with ChatSuite",
    logo: "/chatsuite_nobg.png",
    navbarLinks: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "NextGenAI School", href: "https://training.pivotwithai.com/" },
      { label: "Community", href: "http://chat.whatsapp.com/BmJq5FSuK7wJ389m494UL8" },
      { label: "Contact", href: "mailto:support@pivotwithai.com" },
    ],
  },

  legal: {
    privacyPolicyUrl: "/privacy",
    tosUrl: "/terms",
    refundPolicyUrl: "/refund",
  },

  ////// UI config
  navbarLanding: {
    bgColor: "base-100",
    textColor: "base-content",
    buttonColor: "primary",
  },

  footerLanding: {
    bgColor: "base-200",
    textColor: "base-content",
  },
};

/// Core Website config
export const companyName = "Pivot With AI";
export const defaultTitle =
  "Pivot with AI - AI tools to make your life easier";
export const defaultDescription =
  "We provide AI tools to make your life easier";
export const defaultKeywords =
  "ai, ai tools, ai apps, ai services, ai solutions, ai products, ai tools for life, ai tools for business, ai tools for marketing, ai tools for sales, ai tools for customer support, ai tools for product development, ai tools for research, ai tools for education, ai tools for healthcare, ai tools for finance, ai tools for legal, ai tools for creative, ai tools for entertainment, ai tools for travel, ai tools for personal, ai tools for small business, ai tools for enterprise, ai tools for startups, ai tools for non-profits, ai tools for government, ai tools for research, ai tools for education, ai tools for healthcare, ai tools for finance, ai tools for legal, ai tools for creative, ai tools for entertainment, ai tools for travel, ai tools for personal, ai tools for small business, ai tools for enterprise, ai tools for startups, ai tools for non-profits, ai tools for government";
export const defaultOgImage = "/steps/step1.png";
export const favicon = "/favicon.ico";

// LEGAL STUFF
export const privacyPolicyUrl = "/privacy";
export const tosUrl = "/terms";
export const refundPolicyUrl = "/refund";

// Auth
export const authImage = "/auth/image-1.jpg";

// Refund


// Inside routing
export const homePage = "/";
const getRedirectUrl = () => {
  const baseUrl = process.env.PRODUCTION_URL || "http://localhost:3000";
  return `${baseUrl}/auth/confirm`;
};

export const redirectTo = getRedirectUrl();
