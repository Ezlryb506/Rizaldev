import type { Metadata } from "next";
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
    default: "Arizal Dev – Portfolio",
    template: "%s | Arizal Dev",
  },
  description: "Full-stack developer portfolio with modern web projects, services, and contact information.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      id: "/id",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Arizal Dev",
    title: "Arizal Dev – Portfolio",
    description: "Full-stack developer portfolio with modern web projects, services, and contact information.",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arizal Dev – Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arizal Dev – Portfolio",
    description: "Full-stack developer portfolio with modern web projects, services, and contact information.",
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
  const initialLanguage: SupportedLanguage = cookieLang === "id" || cookieLang === "en" ? cookieLang : "en";
  return (
    <html lang={initialLanguage} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* JSON-LD: Person & WebSite */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Arizal",
              url: SITE_URL,
              sameAs: [
                "https://github.com/Ezlryb506",
                // Tambahkan profile lain jika ada (LinkedIn, X, dsb.)
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Arizal Dev Portfolio",
              url: SITE_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
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
