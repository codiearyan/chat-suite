import { motion } from "framer-motion";
import {
  BrainCircuitIcon,
  GlobeIcon,
  FileTextIcon,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
export function AppInfo() {
  const features = [
    {
      icon: <BrainCircuitIcon className="w-4 h-4" />,
      title: "Multiple AI Models",
      description: "OpenAI, Anthropic, Groq and more",
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      title: "Multimodal",
      description: "Interact with images and files",
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
      <div className="rounded-2xl bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-sm border border-border/50 shadow-sm dark:shadow-lg dark:shadow-background/5">
        <div className="p-4 space-y-3">
          {/* Title */}
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image
                src="/chatsuite.jpg"
                alt="ChatSuite Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <h1 className="text-2xl font-inter-medium xs:text-3xl">
                CHATSUITE
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
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
                className="group flex gap-3 p-3 rounded-xl 
                  bg-background/50 hover:bg-background/80 
                  border border-border/50 hover:border-border 
                  transition-all duration-300 
                  hover:shadow-sm dark:hover:shadow-md dark:hover:shadow-background/5"
              >
                <div className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-foreground leading-none mb-1 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-tight transition-colors">
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
