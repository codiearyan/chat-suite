import { motion } from "framer-motion";
import {
  BrainCircuitIcon,
  GlobeIcon,
  FileTextIcon,
  ImageIcon,
  WrenchIcon,
  LinkIcon,
  RocketIcon,
  SparklesIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";

export function AppInfo() {
  const features = [
    {
      icon: <BrainCircuitIcon className="w-4 h-4" />,
      title: "Multiple AI Models",
      description: "OpenAI, Anthropic and Groq via Vercel AI SDK",
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      title: "Multimodal",
      description: "Interact with images and files via Cloudflare Storage",
    },
    {
      icon: <GlobeIcon className="w-4 h-4" />,
      title: "Web Search",
      description: "Real-time web search with content analysis",
    },
    {
      icon: <FileTextIcon className="w-4 h-4" />,
      title: "Canvas",
      description: "Generate and edit documents with AI",
    },
  ];

  return (
    <motion.div
      key="overview"
      className="w-full max-w-3xl mx-auto px-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="rounded-2xl bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-sm border shadow-sm">
        <div className="p-4 space-y-3">
          {/* Title */}
          <div className="text-center space-y-1">
            <h1 className="text-xl font-semibold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Chat Suite
            </h1>
            <p className="text-sm text-muted-foreground/80">
              A powerful chatbot with multi-model support and smart browsing
              capabilities
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex gap-3 p-3 rounded-xl bg-white/60 hover:bg-white/90 border border-border/40 hover:border-border/80 transition-all duration-300 hover:shadow-sm"
              >
                <div className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground/90 group-hover:text-foreground leading-none mb-1 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground leading-tight transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
