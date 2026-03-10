import CabinetsHeroSection from "@/components/CabinetsHeroSection";
import CabinetsAboutSection from "@/components/CabinetsAboutSection";
import CabinetsEngineeredSection from "@/components/CabinetsEngineeredSection";
import CabinetsKeyBenefitsSection from "@/components/CabinetsKeyBenefitsSection";
import CabinetsFeaturesSection from "@/components/CabinetsFeaturesSection";
import CabinetsApplicationsSection from "@/components/CabinetsApplicationsSection";
import CabinetsApproachSection from "@/components/CabinetsApproachSection";
import CabinetsWhyChooseSection from "@/components/CabinetsWhyChooseSection";
import GetInTouchSection from "@/components/GetInTouchSection";
import { ProductSchema, BreadcrumbSchema } from "@/components/JsonLd";
import {
    getCabinetsHeroData,
    getCabinetsAboutData,
    getCabinetsEngineeredData,
    getCabinetsKeyBenefitsData,
    getCabinetsFeaturesData,
    getCabinetsApplicationsData,
    getCabinetsApproachData,
    getCabinetsWhyChooseData,
} from "@/lib/queries/battery-cabinets";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://axion.ahsan-aleem.dev";

export const metadata = {
    title: "Stationary Battery Cabinets | Axion Critical Power Solutions",
    description:
        "Purpose-built stationary battery cabinets engineered for safety, ventilation, and code compliance. Designed for VRLA, flooded, and lithium-ion installations.",
    keywords: [
        "battery cabinets",
        "stationary battery cabinets",
        "UPS battery cabinets",
        "seismic battery cabinets",
        "critical power cabinets",
        "battery enclosures",
        "Axion",
    ],
    openGraph: {
        title: "Stationary Battery Cabinets | Axion Critical Power Solutions",
        description:
            "Purpose-built stationary battery cabinets engineered for safety, ventilation, and code compliance.",
        url: `${SITE_URL}/battery-cabinets`,
        images: [
            {
                url: `${SITE_URL}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: "Axion Stationary Battery Cabinets",
            },
        ],
    },
    twitter: {
        card: "summary_large_image" as const,
        title: "Stationary Battery Cabinets | Axion",
        description:
            "Purpose-built battery cabinets for safety, ventilation, and code compliance.",
        images: [`${SITE_URL}/og-image.jpg`],
    },
    alternates: {
        canonical: `${SITE_URL}/battery-cabinets`,
    },
};

export default async function BatteryCabinetsPage() {
    // Fetch all 8 sections in parallel from Axion CMS plugin
    const [hero, about, engineered, keyBenefits, features, applications, approach, whyChoose] =
        await Promise.all([
            getCabinetsHeroData(),
            getCabinetsAboutData(),
            getCabinetsEngineeredData(),
            getCabinetsKeyBenefitsData(),
            getCabinetsFeaturesData(),
            getCabinetsApplicationsData(),
            getCabinetsApproachData(),
            getCabinetsWhyChooseData(),
        ]);

    return (
        <main>
            <ProductSchema
                name="Stationary Battery Cabinets"
                description="Purpose-built stationary battery cabinets engineered for safety, ventilation, and code compliance. Designed for VRLA, flooded, and lithium-ion installations."
                url={`${SITE_URL}/battery-cabinets`}
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: SITE_URL },
                    { name: "Products", url: `${SITE_URL}/product` },
                    { name: "Battery Cabinets", url: `${SITE_URL}/battery-cabinets` },
                ]}
            />
            <CabinetsHeroSection data={hero} />
            <CabinetsAboutSection
                label={about?.label}
                description={about?.description}
            />
            <CabinetsEngineeredSection
                label={engineered?.label}
                description={engineered?.description}
                image={engineered?.image || undefined}
            />
            <CabinetsKeyBenefitsSection
                heading={keyBenefits?.heading}
                cards={keyBenefits?.cards}
            />
            <CabinetsFeaturesSection
                label={features?.label}
                features={features?.features}
                image={features?.image || undefined}
            />
            <CabinetsApplicationsSection
                label={applications?.label}
                heading={applications?.heading}
                cards={applications?.cards}
            />
            <CabinetsApproachSection
                label={approach?.label}
                description={approach?.description}
                items={approach?.items}
            />
            <CabinetsWhyChooseSection
                headingLine1={whyChoose?.headingLine1}
                headingHighlight={whyChoose?.headingHighlight}
                headingLine3={whyChoose?.headingLine3}
                cards={whyChoose?.cards}
            />
            <GetInTouchSection />
        </main>
    );
}
