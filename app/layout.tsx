import { Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Providers from "./providers";
import "./globals.css";
import {
  defaultTitle,
  defaultDescription,
  companyConfig,
  defaultOgImage,
  favicon,
  defaultKeywords,
} from "@/config";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata = {
  title: `${defaultTitle}`,
  description: defaultDescription,
  keywords: defaultKeywords,
  icons: [{ rel: "icon", url: `${companyConfig.company.homeUrl}${favicon}` }],
  openGraph: {
    url: companyConfig.company.homeUrl,
    title: `${defaultTitle} | ${companyConfig.company.name}`,
    description: defaultDescription,
    images: [
      {
        url: `${companyConfig.company.homeUrl}${defaultOgImage}`,
        width: 800,
        height: 600,
        alt: `${companyConfig.company.name} logo`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <main
              className={`${outfit.className} overflow-hidden bg-background`}
            >
              {children}
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
