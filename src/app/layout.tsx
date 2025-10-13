import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { cookies } from "next/headers";
import type { SupportedLanguage } from "@/contexts/LanguageContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AccentColorProvider } from "@/contexts/AccentColorContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Self-host Inter to avoid render-blocking from Google Fonts CSS
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arizal Winangun - Fullstack Developer",
    template: "%s | Arizal Winangun",
  },
  description:
    "Portfolio of Arizal Winangun, a fullstack/frontend developer delivering fast, SEO-friendly websites built with Next.js, React, and TypeScript. Available for company profile, landing page, ecommerce, and custom web app projects.",
  keywords: [
    "Arizal Winangun",
    "Fullstack Developer",
    "Frontend Developer",
    "Jasa pembuatan website",
    "Web developer Indonesia",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      id: "/id",
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Arizal Winangun",
    title: "Arizal Winangun - Fullstack Developer",
    description:
      "Fullstack/Frontend Developer. Jasa pembuatan website cepat, SEO-friendly dengan Next.js + React.",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arizal Winangun - Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arizal Winangun - Fullstack Developer",
    description:
      "Fullstack/Frontend Developer. Jasa pembuatan website cepat, SEO-friendly.",
    images: ["/og-image.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read language cookie on the server to align SSR and CSR
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value as SupportedLanguage | undefined;
  const initialLanguage: SupportedLanguage =
    cookieLang === "id" || cookieLang === "en" ? cookieLang : "en";
  return (
    <html lang={initialLanguage} suppressHydrationWarning>
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* JSON-LD: Person & WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Arizal Winangun",
              jobTitle: "Fullstack Developer",
              url: SITE_URL,
              sameAs: [
                "https://github.com/Ezlryb506",
                "https://www.linkedin.com/in/arizal-winangun-319a67386/"
              ],
              knowsAbout: [
                "Next.js",
                "React",
                "TypeScript",
                "Frontend Development",
                "Fullstack Development",
                "SEO"
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Arizal Winangun Portfolio",
              url: SITE_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AccentColorProvider>
            <LanguageProvider initialLanguage={initialLanguage}>
              <Header />
              {children}
              <Footer />
              <Toaster />
            </LanguageProvider>
          </AccentColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111113" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};


