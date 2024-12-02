import Section from "@/components/Section";
import { CheckCircle2 } from "lucide-react";
import { getPaymentPlans } from "@/config/pricing";

export default function PaymentModal({ userEmail }: { userEmail: string }) {
  const pricingInfo = getPaymentPlans(userEmail);

  return (
    <Section>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight mb-2">
          You're out of
          <span className="bg-primary text-primary-foreground px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
            credits
          </span>
        </h2>
        <p className="mt-4 md:mt-8 text-base text-muted-foreground max-w-xl mx-auto">
          Purchase more credits to continue using ChatSuite. Each message costs
          1 credit.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.link}
                  className={`mt-4 block px-4 py-2.5 text-sm font-semibold rounded-lg text-center transition-all duration-200 ${
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

        <p className="mt-8 text-sm text-muted-foreground">
          Need help? Contact us at{" "}
          <a
            href="mailto:support@pivotwith.ai"
            className="text-primary hover:underline"
          >
            support@pivotwith.ai
          </a>
        </p>
      </div>
    </Section>
  );
}
