import Image from "next/image";
import "./VrlaKeyBenefitsSection.css";

interface BenefitCard {
    title: string;
    description: string;
    image: string;
}

const DEFAULT_CARDS: BenefitCard[] = [
    {
        title: "Maintenance-Free Operation",
        description: "No need for regular electrolyte checks",
        image: "/images/benefit-maintenance.png",
    },
    {
        title: "Compact Footprint",
        description: "Ideal for space-constrained installations",
        image: "/images/benefit-compact.png",
    },
    {
        title: "High Power Density",
        description: "Delivers reliable power in a smaller form factor",
        image: "/images/benefit-power.png",
    },
    {
        title: "Proven Reliability:",
        description: "Field-tested in mission-critical environments",
        image: "/images/benefit-reliable.png",
    },
];

interface VrlaKeyBenefitsProps {
    heading?: string;
    cards?: BenefitCard[];
}

export default function VrlaKeyBenefitsSection({
    heading = "Key Benefits",
    cards = DEFAULT_CARDS,
}: VrlaKeyBenefitsProps) {
    return (
        <section className="vrla-benefits">
            <h2 className="vrla-benefits-heading">{heading}</h2>

            <div className="vrla-benefits-grid">
                {cards.map((card, i) => (
                    <div key={i} className="vrla-benefit-card">
                        <div className="vrla-benefit-card-img">
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="vrla-benefit-card-body">
                            <h3 className="vrla-benefit-card-title">{card.title}</h3>
                            <p className="vrla-benefit-card-desc">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
