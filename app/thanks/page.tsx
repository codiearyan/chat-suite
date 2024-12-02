import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getThanksPagePlans } from "@/config/pricing";

export default function ThanksPage() {
  const additionalCredits = getThanksPagePlans();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full p-6 md:p-8 space-y-8">
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
            <div className="grid md:grid-cols-2 gap-6">
              {additionalCredits.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-xl shadow-lg bg-card relative flex flex-col ${
                    plan.special
                      ? "border-2 border-primary md:scale-[1.02] md:z-10"
                      : "border border-border"
                  }`}
                >
                  {plan.special && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full">
                        Best Value
                      </span>
                    </div>
                  )}
                  <div className="flex-1 p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{plan.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {plan.description}
                      </p>
                    </div>
                    <div className="flex items-baseline gap-x-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground text-sm">
                        {plan.period}
                      </span>
                    </div>
                    <ul className="space-y-2.5 text-sm">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-x-2">
                          <CheckCircle2
                            className={`h-4 w-4 ${
                              plan.special
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={plan.link}
                      className={`mt-4 block px-4 py-2 text-sm font-semibold rounded-lg text-center transition-all duration-200 ${
                        plan.special
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      }`}
                    >
                      {plan.buttonText}
                    </a>
                  </div>
                </div>
              ))}
            </div>
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
          </p>
        </div>
      </Card>
    </div>
  );
}
