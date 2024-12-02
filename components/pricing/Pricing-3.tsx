import { CheckCircle2 } from "lucide-react";
import { getLandingPagePlans } from "@/config/pricing";

export default function Pricing() {
  const pricingInfo = getLandingPagePlans();

  return (
    <div
      id="pricing"
      className="mx-auto px-4 py-24 sm:px-6 lg:px-8 w-full gap-16 sm:gap-y-24 flex flex-col bg-background"
    >
      <div className="text-center flex flex-col items-center">
        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight mb-2">
          Choose Your Plan
        </h2>
        <p className="mt-4 md:mt-8 text-base text-muted-foreground max-w-xl mx-auto">
          Select the perfect plan for your needs. Upgrade or downgrade anytime
          as your requirements change.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {pricingInfo.map((plan, index) => (
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
                  Most Popular
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
                        plan.special ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-4 block w-full px-4 py-2.5 text-sm font-semibold rounded-lg text-center transition-all duration-200 ${
                  plan.special
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
