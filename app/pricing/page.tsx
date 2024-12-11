import { Metadata } from "next";
import { getLandingPagePlans } from "@/config/pricing";
import { getSession } from "@/lib/db/cached-queries";
import { PricingClient } from "@/components/pricing/PricingClient";
import Navbar from "@/components/navbars/Navbar-1";
import { companyConfig } from "@/config";

export const metadata: Metadata = {
  title: "Pricing - ChatSuite",
  description:
    "Choose the perfect plan for your AI chat needs. Flexible pricing options for everyone.",
};

export default async function PricingPage() {
  const pricingInfo = getLandingPagePlans();
  const user = await getSession();

  return (
    <>
      <Navbar
        companyConfig={companyConfig.company!}
        navbarConfig={companyConfig.navbarLanding!}
      />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Simple, Transparent Pricing
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Get started with ChatSuite today. Choose the plan that best fits
                your needs. No hidden fees, cancel anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PricingClient plans={pricingInfo} user={user} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
                Frequently Asked Questions
              </h2>

              <div className="space-y-8">
                <div className="border-b border-border pb-8">
                  <h3 className="text-lg font-semibold mb-2">
                    What are credits?
                  </h3>
                  <p className="text-muted-foreground">
                    Credits are our in-platform currency used for AI
                    interactions. Each message or feature usage consumes a
                    specific number of credits depending on the AI model and
                    functionality used.
                  </p>
                </div>

                <div className="border-b border-border pb-8">
                  <h3 className="text-lg font-semibold mb-2">
                    Can I upgrade or downgrade my plan?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes! You can change your plan at any time. Credits are
                    flexible and can be purchased as needed. Unused credits
                    never expire.
                  </p>
                </div>

                <div className="border-b border-border pb-8">
                  <h3 className="text-lg font-semibold mb-2">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-muted-foreground">
                    We accept all major credit cards and debit cards through our
                    secure payment processor, Stripe.
                  </p>
                </div>

                <div className="pb-8">
                  <h3 className="text-lg font-semibold mb-2">
                    Need help choosing a plan?
                  </h3>
                  <p className="text-muted-foreground">
                    Contact our support team at support@chatsuite.com and we'll
                    help you select the best plan for your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl bg-primary/5 px-6 py-10 sm:px-12 sm:py-16">
              <div className="relative mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold tracking-tight">
                  Ready to get started?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Join thousands of users who are already experiencing the power
                  of AI with ChatSuite.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <a
                    href="/auth"
                    className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Get Started
                  </a>
                  <a
                    href="/chat"
                    className="rounded-lg bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm ring-1 ring-inset ring-border hover:bg-muted"
                  >
                    Try Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}