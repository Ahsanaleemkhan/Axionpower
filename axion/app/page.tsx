import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ComplianceSection from "@/components/ComplianceSection";
import ProductsSection from "@/components/ProductsSection";
import ServicesSection from "@/components/ServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import EngineeringSection from "@/components/EngineeringSection";
import ConsultingSection from "@/components/ConsultingSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import GetInTouchSection from "@/components/GetInTouchSection";
import { getHeroData } from "@/lib/queries/hero";
import { getAboutData } from "@/lib/queries/about";
import { getComplianceData } from "@/lib/queries/compliance";
import { getProductsData } from "@/lib/queries/products";
import { getServicesData } from "@/lib/queries/services";
import { getIndustriesData } from "@/lib/queries/industries";
import { getEngineeringData } from "@/lib/queries/engineering";
import { getConsultingData } from "@/lib/queries/consulting";
import { getFaqData } from "@/lib/queries/faq";
import { getContactData } from "@/lib/queries/contact";

export default async function HomePage() {
  const [heroData, aboutData, complianceData, productsData, servicesData, industriesData, engineeringData, consultingData, faqData, contactData] = await Promise.all([
    getHeroData(),
    getAboutData(),
    getComplianceData(),
    getProductsData(),
    getServicesData(),
    getIndustriesData(),
    getEngineeringData(),
    getConsultingData(),
    getFaqData(),
    getContactData(),
  ]);

  return (
    <main>
      <HeroSection data={heroData} />
      <AboutSection data={aboutData} />
      <ComplianceSection data={complianceData} />
      <ProductsSection data={productsData} />
      <ServicesSection data={servicesData} />
      <IndustriesSection data={industriesData} />
      <EngineeringSection data={engineeringData} />
      <ConsultingSection data={consultingData} />
      <FaqSection data={faqData} />
      <ContactSection data={contactData} />
      <GetInTouchSection />
    </main>
  );
}
