// Please read the @/lib/types/toolconfig file for more details on each field.
import { ToolConfig } from "@/lib/types/toolconfig";

export const toolConfig: ToolConfig = {
  ////// Base config
  company: {
    name: "ChatSuite",
    theme: "anotherwrapper",
    homeUrl: "/chat",
    appUrl: "/chat",
    description:
      "Advanced AI Assistant with multiple models, multimodal capabilities, web search, and document generation features.",
    logo: "https://cdn3.iconfinder.com/data/icons/aami-web-internet/64/aami4-68-512.png",
    navbarLinks: [
      { label: "App", href: `/chat` },
      { label: "Home", href: "/" },
    ],
  },

  ////// Metadata for SEO
  metadata: {
    title: "ChatSuite - AI Assistant",
    description:
      "AI Assistant powered by OpenAI, Anthropic and Groq, featuring multimodal capabilities, web search via Serper API and Jina AI, and document generation with Canvas.",
    og_image: "https://anotherwrapper.com/og.png",
    canonical: "https://anotherwrapper.com/apps/chat",
  },

  ////// Payments
  paywall: true,
  credits: 10,

  ////// Location
  toolPath: "/chat",

  ////// Default AI model
  aiModel: "gpt-4o",
};
