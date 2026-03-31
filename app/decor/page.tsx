import  {DecorHeroSection}  from "@/components/decor/hero-section";
import { FeaturesSection } from "@/components/decor/features-section";
import { ProductsSection } from "@/components/decor/products-section";
import { Footer } from "@/components/footer";

export default function DecorPage() {
  return (
    <>
      <DecorHeroSection />
      <FeaturesSection />
      <ProductsSection />
      <Footer />
    </>
  );
}
