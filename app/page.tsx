import { companyConfig } from "@/config";
import Navbar from "@/components/navbars/Navbar-1";
import Footer from "@/components/footers/Footer-1";
import HeroDemos from "@/components/heros/HeroDemos";
import Pricing from "@/components/pricing/Pricing-3";
import { getSession } from "@/lib/db/cached-queries";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getSession();

  if (user) {
    redirect("/chat");
  }

  return (
    <div className="bg-base-100">
      <Navbar
        companyConfig={companyConfig.company!}
        navbarConfig={companyConfig.navbarLanding!}
      />
      <HeroDemos />
      <Pricing />
      <Footer
        companyConfig={companyConfig.company!}
        footerConfig={companyConfig.footerLanding!}
      />
    </div>
  );
}