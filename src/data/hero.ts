import type { SupportedLanguage } from "@/contexts/LanguageContext";

type HeroLanguageContent = {
  greeting: string;
  name: string;
  role: string;
  specialization: string;
  aiWorkflows: string;
  description: string;
  stats: {
    experience: string;
    projects: string;
  };
  cta: {
    consultation: string;
    download: string;
    waMessage: string;
  };
};

type HeroContent = Record<SupportedLanguage, HeroLanguageContent>;

export const heroContent: HeroContent = {
  en: {
    greeting: "Hello, I'm",
    name: "Arizal",
    role: "Fullstack Developer",
    specialization: "Specializing in",
    aiWorkflows: "AI-Assisted Workflows",
    description:
      "Leveraging AI-assisted workflows to architect, build, and deploy high-performance web applications with superior speed and quality. I combine cutting-edge technology with proven development practices to deliver exceptional digital solutions.",
    stats: {
      experience: "Years Experience",
      projects: "Projects Completed",
    },
    cta: {
      consultation: "Schedule Free Consultation",
      download: "Download CV",
      waMessage:
        "Hi Arizal, I'd like to schedule a consultation about web development services.",
    },
  },
  id: {
    greeting: "Halo, saya",
    name: "Arizal",
    role: "Fullstack Developer",
    specialization: "Spesialis di bidang",
    aiWorkflows: "Alur Kerja Berbantuan AI",
    description:
      "Menggunakan alur kerja berbantuan AI untuk merancang, membangun, dan menerapkan aplikasi web berkinerja tinggi dengan kecepatan dan kualitas unggul. Saya memadukan teknologi terbaru dengan praktik pengembangan teruji untuk menghadirkan solusi digital yang luar biasa.",
    stats: {
      experience: "Tahun Pengalaman",
      projects: "Proyek Selesai",
    },
    cta: {
      consultation: "Jadwalkan Konsultasi Gratis",
      download: "Unduh CV",
      waMessage:
        "Halo Arizal, saya ingin menjadwalkan konsultasi tentang layanan pengembangan web.",
    },
  },
};
