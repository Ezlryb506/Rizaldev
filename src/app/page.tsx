import HeroSection from "@/components/HeroSection";
import TechStackSection from "@/components/TechStackSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TechStackSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
