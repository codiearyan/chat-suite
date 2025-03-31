import { Metadata } from "next";
import Navbar from "@/components/navbars/Navbar-1";
import { companyConfig } from "@/config";

export const metadata: Metadata = {
  title: "Pricing - ChatSuite",
  description: "ChatSuite pricing plans - Coming Soon",
};

export default function PricingPage() {
  return (
    <>
      <Navbar
        companyConfig={companyConfig.company!}
        navbarConfig={companyConfig.navbarLanding!}
      />
      <main className="min-h-screen bg-background">
        <section className="relative overflow-hidden pt-24">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Pricing
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Our pricing section is coming soon. Stay tuned for updates!
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
