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
      description:
        "Choose from leading AI models for optimal performance and cost",
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      title: "Visual Intelligence",
      description:
        "Process images, PDFs, documents (DOCX), text files, and CSV data with instant analysis",
    },
    {
      icon: <GlobeIcon className="w-4 h-4" />,
      title: "Web Search",
      description:
        "Get real-time insights with smart web browsing and fact-checking",
    },
    {
      icon: <FileTextIcon className="w-4 h-4" />,
      title: "Canvas",
      description:
        "Create, edit, and collaborate on AI-powered documents seamlessly",
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
        <div className=" space-y-2 my-1">
          {/* Title */}
          <div className="text-center">
            <div className="flex items-center  flex-col justify-center ">
              <Image
                src="/chatsuite_nobg.png"
                alt="ChatSuite Logo"
                width={70}
                height={70}
                className="object-contain"
              />
              <h1 className="text-2xl font-bold font-inter-medium xs:text-3xl">
                CHATSUITE
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Your Intelligent AI Companion for Visual Analysis, Web Research,
              and Content Creation
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 mx-2">
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
