import Link from "next/link";

interface FooterStyle {
  bgColor: string;
  textColor: string;
}

interface CompanyConfig {
  name: string;
  theme: string;
  homeUrl: string;
  appUrl: string;
  description: string;
  logo: string;
  navbarLinks: { label: string; href: string }[];
}

export default function Footer({
  footerConfig,
  companyConfig,
}: {
  footerConfig: FooterStyle;
  companyConfig: CompanyConfig;
}) {
  return (
    <div className="bg-muted/50 border-t border-border/50">
      <footer className="md:ml-12 footer p-10">
        <aside>
          <Link href="#" className="flex items-center">
            <img src={companyConfig.logo} alt="Logo" className="h-8 w-8" />
            <span className="text-lg font-bold ml-2 text-foreground">
              {companyConfig.name}
            </span>
          </Link>

          <p className="max-w-sm text-sm text-muted-foreground">
            {companyConfig.description}
          </p>
        </aside>
        <nav>
          <h6 className="footer-title text-foreground opacity-80">Services</h6>
          <a className="link link-hover text-muted-foreground">Branding</a>
          <a className="link link-hover text-muted-foreground">Design</a>
          <a className="link link-hover text-muted-foreground">Marketing</a>
          <a className="link link-hover text-muted-foreground">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title text-foreground opacity-80">Company</h6>
          <a className="link link-hover text-muted-foreground">About us</a>
          <a className="link link-hover text-muted-foreground">Contact</a>
          <a className="link link-hover text-muted-foreground">Jobs</a>
          <a className="link link-hover text-muted-foreground">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title text-foreground opacity-80">Legal</h6>
          <a className="link link-hover text-muted-foreground">Terms of use</a>
          <a className="link link-hover text-muted-foreground">
            Privacy policy
          </a>
          <a className="link link-hover text-muted-foreground">Cookie policy</a>
        </nav>
      </footer>
      <div className="md:ml-12 text-xs mt-12 flex justify-between flex-col md:flex-row gap-y-2 items-center p-4 text-muted-foreground border-t border-border/50">
        <div>
          Copyright © {new Date().getFullYear()} - All Rights Reserved by{" "}
          {companyConfig.name}.
        </div>
      </div>
    </div>
  );
}
