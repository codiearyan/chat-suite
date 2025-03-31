import { CheckCircle2 } from "lucide-react";
import { getPaymentPlans } from "@/config/pricing";

export default function PaymentModal({ userEmail }: { userEmail: string }) {
  const pricingInfo = getPaymentPlans(userEmail);

  return (
    <section className="w-full">
      <div className="w-full mx-auto text-center">
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
        <p>If you want more credits, just dm me on X at @codiearyan</p>
      </div>
    </section>
  );
}
