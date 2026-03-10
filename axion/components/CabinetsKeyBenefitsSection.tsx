import Image from "next/image";
import "./CabinetsKeyBenefitsSection.css";

interface BenefitCard {
    title: string;
    description: string;
    image: string;
}

const DEFAULT_CARDS: BenefitCard[] = [
    {
        title: "Seismic-Rated Construction",
        description: "Engineered to withstand Zone 4 seismic requirements",
        image: "/images/benefit-maintenance.png",
    },
    {
        title: "Integrated Ventilation",
        description: "Built-in thermal management for optimal battery life",
        image: "/images/benefit-compact.png",
    },
    {
        title: "Code-Compliant Designs",
        description: "Meets UL, NFPA, and IEEE standards out of the box",
        image: "/images/benefit-power.png",
    },
    {
        title: "Configurable Layouts",
        description: "Adaptable for VRLA, flooded, and lithium-ion systems",
        image: "/images/benefit-reliable.png",
    },
];

interface CabinetsKeyBenefitsProps {
    heading?: string;
    cards?: BenefitCard[];
}

export default function CabinetsKeyBenefitsSection({
    heading = "Key Benefits",
    cards = DEFAULT_CARDS,
}: CabinetsKeyBenefitsProps) {
    return (
        <section className="cabinets-benefits">
            <h2 className="cabinets-benefits-heading">{heading}</h2>

            <div className="cabinets-benefits-grid">
                {cards.map((card, i) => (
                    <div key={i} className="cabinets-benefit-card">
                        <div className="cabinets-benefit-card-img">
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="cabinets-benefit-card-body">
                            <h3 className="cabinets-benefit-card-title">{card.title}</h3>
                            <p className="cabinets-benefit-card-desc">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
