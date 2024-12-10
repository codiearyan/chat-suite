"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X, Play } from "lucide-react";

interface HeroVideoDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  animationStyle?: "from-top" | "from-center";
}

const HeroVideoDialog = ({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt,
  animationStyle = "from-top",
  className,
  ...props
}: HeroVideoDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const animations = {
    "from-top": {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    "from-center": {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    },
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <motion.button
          role="button"
          className={`relative block w-full overflow-hidden rounded-2xl border border-purple-500/20 
                     group hover:border-purple-500/40 transition-all duration-300 ${className}`}
          whileHover={{ scale: 1.02 }}
          {...Object.fromEntries(
            Object.entries(props).filter(([key]) => !key.startsWith("onDrag"))
          )}
        >
          {/* Thumbnail */}
          <div className="relative w-full">
            <img
              src={thumbnailSrc}
              alt={thumbnailAlt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center
                        shadow-lg shadow-purple-500/50 transition-transform duration-300 
                        group-hover:scale-110"
              whileHover={{ scale: 1.1 }}
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </motion.div>
          </div>
        </motion.button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          />
        </DialogPrimitive.Overlay>

        <DialogPrimitive.Content>
          <motion.div
            {...animations[animationStyle]}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 z-50 overflow-hidden rounded-2xl bg-slate-900 p-1 shadow-xl 
                       sm:inset-6 md:inset-8 lg:inset-12"
          >
            <div className="absolute right-2 top-2 z-10">
              <DialogPrimitive.Close className="rounded-full p-2 text-white hover:bg-white/10 transition-colors">
                <X className="h-6 w-6" />
              </DialogPrimitive.Close>
            </div>

            <div className="h-full w-full overflow-hidden rounded-xl">
              <iframe
                src={videoSrc}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default HeroVideoDialog;
