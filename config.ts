/// Core Website config
export const companyConfig = {
  ////// Base config used mainly for layout (@/components/navbar/Navbar-1.tsx and @/components/footer/Footer-1.tsx)
  company: {
    name: "ChatSuite",
    theme: "chatsuite",
    homeUrl: "/",
    appUrl: "/",
    description: "Experience AI-powered conversations with ChatSuite",
    logo: "/chatsuite_nobg.png",
    navbarLinks: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "NextGenAI School", href: "https://training.pivotwithai.com/" },
      { label: "Community", href: "http://chat.whatsapp.com/BmJq5FSuK7wJ389m494UL8" },
      { label: "Contact", href: "mailto:support@chatsuite.ai" },
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
export const companyName = "ChatSuite";
export const defaultTitle = "ChatSuite - All in One AI Workspace";
export const defaultDescription = 
  "ChatSuite - Your comprehensive AI workspace for intelligent conversations and productivity";
export const defaultKeywords = 
  "ai, chatbot, ai workspace, ai assistant, language models, chat interface, ai tools, productivity tools, ai solutions, business automation, natural language processing, ai communication, enterprise ai, chat automation, ai platform";
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
