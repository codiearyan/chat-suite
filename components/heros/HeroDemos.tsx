"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-background p-4 text-center pt-16 md:pt-18 flex flex-col items-center">
      <div className="max-w-3xl mx-auto px-4 md:px-0">
        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight mb-2 text-foreground">
          Experience{" "}
          <span className="bg-primary text-primary-foreground px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
            AI-powered conversations
          </span>{" "}
          with ChatSuite
        </h2>
        <p className="mt-4 md:mt-8 text-muted-foreground max-w-[600px] mx-auto">
          Transform your ideas into reality with our advanced AI chat platform.
          Get instant answers, creative solutions, and smart assistance for all
          your needs.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center mt-8 gap-4">
        <Link href="/chat" passHref>
          <Button
            className={cn(
              "bg-primary hover:bg-primary/90 w-64 text-primary-foreground rounded-lg",
              "transform-gpu transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
            )}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Start Chatting
          </Button>
        </Link>
        <Link href="#pricing" passHref>
          <Button variant="ghost" className="w-64">
            <Sparkles className="w-4 h-4 mr-2" />
            View Plans
          </Button>
        </Link>
      </div>
    </section>
  );
}
