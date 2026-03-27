import { HeroSection } from "@/components/interiors/hero-section";
import { AboutSection } from "@/components/interiors/about-section";
import { ServicesSection } from "@/components/interiors/services-section";
import { ProjectsSection } from "@/components/interiors/projects-section";
import { GallerySection } from "@/components/interiors/gallery-section";
import { CategoriesSection } from "@/components/interiors/categories-section";
import { Footer } from "@/components/footer";

export default function InteriorsPage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
      <ServicesSection />
      <ProjectsSection />
      <GallerySection />
      <Footer />
    </>
  );
}
