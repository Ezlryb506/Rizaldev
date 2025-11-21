import HeroSection from "@/components/HeroSection";
import dynamic from "next/dynamic";

// Defer hydration of below-the-fold sections to reduce main-thread work for LCP
const TechStackSection = dynamic(() => import("@/components/TechStackSection"), {
  loading: () => null,
});
const ServicesSection = dynamic(() => import("@/components/ServicesSection"), {
  loading: () => null,
});
const ProjectsSection = dynamic(() => import("@/components/ProjectsSection"), {
  loading: () => null,
});
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  loading: () => null,
});

export default function Home() {
  return (
    <main className="page-with-sticky-header">
      <HeroSection />
      <TechStackSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
