import { companyConfig } from "@/config";
import Navbar from "@/components/navbars/Navbar-1";
import Footer from "@/components/footers/Footer-1";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-base-100">
      <Navbar
        companyConfig={companyConfig.company!}
        navbarConfig={companyConfig.navbarLanding!}
      />
      {children}
      <Footer
        companyConfig={companyConfig.company!}
        footerConfig={companyConfig.footerLanding!}
      />
    </div>
  );
}
