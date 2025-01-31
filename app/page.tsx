import { Suspense } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { getSession } from "@/lib/db/cached-queries";
import { redirect } from "next/navigation";
import Hero from "@/components/landing/Hero";
import dynamic from "next/dynamic";

// Lazy load components below the fold
const Marquee = dynamic(() => import("@/components/landing/Marquee"));
const Benefits = dynamic(() => import("@/components/landing/Benefits"));
// const FoundersNote = dynamic(() => import("@/components/landing/FoundersNote"));
const Features = dynamic(() => import("@/components/landing/Features"));
const HowItWorks = dynamic(() => import("@/components/landing/HowItWorks"));
const Pricing = dynamic(() => import("@/components/pricing/Pricing-3"));
const ComparisonTable = dynamic(
  () => import("@/components/landing/ComparisonTable")
);
const Testimonials = dynamic(() => import("@/components/landing/Testimonials"));

export default async function Home() {
  const user = await getSession();

  if (user) {
    redirect("/chat");
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 to-slate-800" />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Suspense fallback={<div className="h-20" />}>
          <Marquee />
        </Suspense>
        <Suspense fallback={<div className="h-20" />}>
          <Benefits />
        </Suspense>
        {/* <Suspense fallback={<div className="h-20" />}>
          <FoundersNote />
        </Suspense> */}
        <Suspense fallback={<div className="h-20" />}>
          <ComparisonTable />
        </Suspense>
        <Suspense fallback={<div className="h-20" />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<div className="h-20" />}>
          <Features />
        </Suspense>
        <Suspense fallback={<div className="h-20" />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<div className="h-20" />}>
          <Pricing />
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}
