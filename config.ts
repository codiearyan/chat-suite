/// Core Website config
export const companyConfig = {
  ////// Base config used mainly for layout (@/components/navbar/Navbar-1.tsx and @/components/footer/Footer-1.tsx)
  company: {
    name: "Pivot With AI",
    theme: "anotherwrapper",
    homeUrl: "/",
    appUrl: "/",
    description: "Experience AI-powered conversations with ChatSuite",
    logo: "/logo.png",
    navbarLinks: [
      { label: "Home", href: "/" },
      { label: "Chat Suite", href: "/chat" },
      { label: "Training", href: "https://training.pivotwithai.com/" },
    ],
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
export const companyName = "Holding Company Name";
export const defaultTitle =
  "Pivot with AI - AI tools to make your life easier";
export const defaultDescription =
  "We provide AI tools to make your life easier";
export const defaultKeywords =
  "ai, ai tools, ai apps, ai services, ai solutions, ai products, ai tools for life, ai tools for business, ai tools for marketing, ai tools for sales, ai tools for customer support, ai tools for product development, ai tools for research, ai tools for education, ai tools for healthcare, ai tools for finance, ai tools for legal, ai tools for creative, ai tools for entertainment, ai tools for travel, ai tools for personal, ai tools for small business, ai tools for enterprise, ai tools for startups, ai tools for non-profits, ai tools for government, ai tools for research, ai tools for education, ai tools for healthcare, ai tools for finance, ai tools for legal, ai tools for creative, ai tools for entertainment, ai tools for travel, ai tools for personal, ai tools for small business, ai tools for enterprise, ai tools for startups, ai tools for non-profits, ai tools for government";
export const defaultOgImage = "/og.png";
export const favicon = "/favicon.ico";

// LEGAL STUFF
export const privacyPolicyUrl = "https://anotherwrapper.com/privacy";
export const tosUrl = "https://anotherwrapper.com/terms";

// Auth
export const authImage = "/hero.webp";

// Inside routing
export const homePage = "/";
const getRedirectUrl = () => {
  const baseUrl = process.env.PRODUCTION_URL || "http://localhost:3000";
  return `${baseUrl}/auth/confirm`;
};

export const redirectTo = getRedirectUrl();
