import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getLandingPagePlans, PlanFeatures } from "@/config/pricing";
import { getSession } from "@/lib/db/cached-queries";
import { PricingClient } from "@/components/pricing/PricingClient";
import { IconType } from "react-icons";
import { Video, Bot, Star, Check, X, ArrowRight } from "lucide-react";

const categoryIcons: Record<keyof PlanFeatures, React.ElementType> = {
  "Basic Features": Video,
  "AI Tools": Bot,
  Support: Star,
} as const;

export default async function ThanksPage() {
  const pricingInfo = getLandingPagePlans();
  const user = await getSession();
  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full p-6 md:p-8 space-y-8 px-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 dark:text-green-400" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Thank you for your purchase!
          </h1>

          <p className="text-muted-foreground text-lg">
            Welcome to ChatSuite by Pivot with AI
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <h2 className="font-semibold text-lg">
              What's included in your plan:
            </h2>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 shrink-0" />
                <span>Access to world-class AI models</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 shrink-0" />
                <span>Credits have been added to your account</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 shrink-0" />
                <span>
                  Advanced features including file attachments and web browsing
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 shrink-0" />
                <span>Priority email support for any questions</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <h2 className="text-xl font-semibold text-center mb-6">
              Need More Credits?
            </h2>
            <section className="py-4">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <PricingClient
                  plans={pricingInfo}
                  user={user}
                  categoryIcons={categoryIcons}
                />
              </div>
            </section>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-lg">Getting Started:</h2>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0 mt-0.5">
                  1
                </div>
                <span>Start a new chat by clicking the button below</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0 mt-0.5">
                  2
                </div>
                <span>
                  Choose between available models from the model selector
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0 mt-0.5">
                  3
                </div>
                <span>
                  Enable web browsing or upload files as needed for your tasks
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 space-y-4">
          <div className="flex justify-center">
            <Link href="/chat">
              <Button size="lg" className="w-full md:w-auto">
                Start Chatting Now
              </Button>
            </Link>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Need help? Contact us at{" "}
            <a
              href="mailto:support@pivotwith.ai"
              className="text-primary hover:underline"
            >
              support@pivotwith.ai
            </a>
            {" · "}
            <Link href="/refund" className="text-primary hover:underline">
              Refund Policy
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
