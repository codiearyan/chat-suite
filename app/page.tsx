import { companyConfig } from "@/config";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { getSession } from "@/lib/db/cached-queries";
import { redirect } from "next/navigation";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import Benefits from "@/components/landing/Benefits";
import FoundersNote from "@/components/landing/FoundersNote";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import ComparisonTable from "@/components/landing/ComparisonTable";
import Testimonials from "@/components/landing/Testimonials";
import Background3D from "@/components/landing/Background3D";

export default async function Home() {
  const user = await getSession();

  if (user) {
    redirect("/chat");
  }

  return (
    <div className="relative min-h-screen">
      <Background3D />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Marquee />
        <Benefits />
        <FoundersNote />
        <ComparisonTable />
        <Testimonials />
        <Features />
        <HowItWorks />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
}
