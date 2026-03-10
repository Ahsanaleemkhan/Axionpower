import WetCellHeroSection from "@/components/WetCellHeroSection";
import WetCellAboutSection from "@/components/WetCellAboutSection";
import WetCellApplicationsSection from "@/components/WetCellApplicationsSection";
import WetCellKeyBenefitsSection from "@/components/WetCellKeyBenefitsSection";
import WetCellWhyChooseSection from "@/components/WetCellWhyChooseSection";
import GetInTouchSection from "@/components/GetInTouchSection";
import {
    getWetCellHeroData,
    getWetCellAboutData,
    getWetCellApplicationsData,
    getWetCellKeyBenefitsData,
    getWetCellWhyChooseData,
} from "@/lib/queries/wet-cell-batteries";

export const metadata = {
    title: "Wet Cell (Flooded) Batteries | Axion Critical Power Solutions",
    description:
        "High-capacity Wet Cell (Flooded) batteries for utility substations, industrial DC power plants, and large-scale UPS systems. Extended service life and superior deep-discharge recovery.",
};

export default async function WetCellBatteriesPage() {
    // Fetch all 5 sections in parallel from Axion CMS plugin
    const [hero, about, applications, keyBenefits, whyChoose] = await Promise.all([
        getWetCellHeroData(),
        getWetCellAboutData(),
        getWetCellApplicationsData(),
        getWetCellKeyBenefitsData(),
        getWetCellWhyChooseData(),
    ]);

    return (
        <main>
            <WetCellHeroSection data={hero} />
            <WetCellAboutSection
                label={about?.label}
                description={about?.description}
            />
            <WetCellApplicationsSection
                label={applications?.label}
                heading={applications?.heading}
                cards={applications?.cards}
            />
            <WetCellKeyBenefitsSection
                heading={keyBenefits?.heading}
                cards={keyBenefits?.cards}
            />
            <WetCellWhyChooseSection
                headingLine1={whyChoose?.headingLine1}
                headingHighlight={whyChoose?.headingHighlight}
                headingLine3={whyChoose?.headingLine3}
                cards={whyChoose?.cards}
            />
            <GetInTouchSection />
        </main>
    );
}
