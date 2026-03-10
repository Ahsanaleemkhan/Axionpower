import VrlaHeroSection from "@/components/VrlaHeroSection";
import VrlaAboutSection from "@/components/VrlaAboutSection";
import VrlaApplicationsSection from "@/components/VrlaApplicationsSection";
import VrlaKeyBenefitsSection from "@/components/VrlaKeyBenefitsSection";
import VrlaWhyChooseSection from "@/components/VrlaWhyChooseSection";
import GetInTouchSection from "@/components/GetInTouchSection";
import {
    getVrlaHeroData,
    getVrlaAboutData,
    getVrlaApplicationsData,
    getVrlaKeyBenefitsData,
    getVrlaWhyChooseData,
} from "@/lib/queries/vrla-batteries";

export const metadata = {
    title: "VRLA Batteries | Axion Critical Power Solutions",
    description:
        "High-performance, low-maintenance VRLA (Valve-Regulated Lead-Acid) batteries for mission-critical applications. Ideal for UPS, DC power plants, and standby systems.",
};

export default async function VrlaBatteriesPage() {
    // Fetch all 5 sections in parallel from Axion CMS plugin
    const [hero, about, applications, keyBenefits, whyChoose] = await Promise.all([
        getVrlaHeroData(),
        getVrlaAboutData(),
        getVrlaApplicationsData(),
        getVrlaKeyBenefitsData(),
        getVrlaWhyChooseData(),
    ]);

    return (
        <main>
            <VrlaHeroSection data={hero} />
            <VrlaAboutSection
                label={about?.label}
                description={about?.description}
            />
            <VrlaApplicationsSection
                label={applications?.label}
                heading={applications?.heading}
                cards={applications?.cards}
            />
            <VrlaKeyBenefitsSection
                heading={keyBenefits?.heading}
                cards={keyBenefits?.cards}
            />
            <VrlaWhyChooseSection
                headingLine1={whyChoose?.headingLine1}
                headingHighlight={whyChoose?.headingHighlight}
                headingLine3={whyChoose?.headingLine3}
                cards={whyChoose?.cards}
            />
            <GetInTouchSection />
        </main>
    );
}
