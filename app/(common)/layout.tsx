import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-base-100">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
