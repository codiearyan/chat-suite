import { getLandingPagePlans } from "@/config/pricing";
import { createClient } from "@/lib/utils/supabase/server";
import { PricingClient } from "./PricingClient";

export default async function Pricing() {
  const pricingInfo = getLandingPagePlans();
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

      <PricingClient plans={pricingInfo} user={user} />
    </div>
  );
}
