"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const TEXT = {
    title: language === "id" ? "Halaman Tidak Ditemukan" : "Page Not Found",
    description:
      language === "id"
        ? "Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan."
        : "Sorry, the page you are looking for doesn’t exist or might have been moved.",
    back: language === "id" ? "Kembali" : "Go Back",
    home: language === "id" ? "Ke Beranda" : "Go Home",
    contact: language === "id" ? "Chat WhatsApp" : "Chat WhatsApp",
  } as const;

  const handleBack = () => {
    try {
      router.back();
    } catch (_) {
      router.push("/");
    }
  };

  const handleWhatsApp = () => {
    const message =
      language === "id"
        ? "Halo, saya menemukan halaman 404 di website Anda. Mohon bantuannya."
        : "Hi, I found a 404 page on your website. Need assistance, please.";
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6288809635936?text=${encoded}`, "_blank");
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-10 shadow-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--accent-bg)] border border-[var(--accent-primary)] text-[var(--accent-primary)] mb-6">
            <span className="text-2xl font-black">404</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
            {TEXT.title}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
            {TEXT.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 bg-[var(--bg-primary)] text-[var(--text-primary)] border-2 border-[var(--border-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-bg)]"
            >
              <ArrowLeft className="h-4 w-4" /> {TEXT.back}
            </Button>
            <Button asChild className="inline-flex items-center gap-2 project-btn primary">
              <Link href="/">
                <Home className="h-4 w-4" /> {TEXT.home}
              </Link>
            </Button>
            <Button
              type="button"
              onClick={handleWhatsApp}
              variant="outline"
              className="inline-flex items-center gap-2 whatsapp-btn"
            >
              <MessageCircle className="h-4 w-4" /> {TEXT.contact}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
