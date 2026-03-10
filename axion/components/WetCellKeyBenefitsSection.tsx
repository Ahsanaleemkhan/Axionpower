import Image from "next/image";
import "./WetCellKeyBenefitsSection.css";

interface BenefitCard {
    title: string;
    description: string;
    image: string;
}

const DEFAULT_CARDS: BenefitCard[] = [
    {
        title: "Extended Service Life",
        description: "20+ year design life for long-term installations",
        image: "/images/benefit-maintenance.png",
    },
    {
        title: "Superior Deep-Discharge Recovery",
        description: "Excellent recovery from deep discharge cycles",
        image: "/images/benefit-compact.png",
    },
    {
        title: "High Cycling Capability",
        description: "Built for frequent charge/discharge operations",
        image: "/images/benefit-power.png",
    },
    {
        title: "Field-Serviceable Design",
        description: "Individual cells can be inspected and maintained",
        image: "/images/benefit-reliable.png",
    },
];

interface WetCellKeyBenefitsProps {
    heading?: string;
    cards?: BenefitCard[];
}

export default function WetCellKeyBenefitsSection({
    heading = "Key Benefits",
    cards = DEFAULT_CARDS,
}: WetCellKeyBenefitsProps) {
    return (
        <section className="wetcell-benefits">
            <h2 className="wetcell-benefits-heading">{heading}</h2>

            <div className="wetcell-benefits-grid">
                {cards.map((card, i) => (
                    <div key={i} className="wetcell-benefit-card">
                        <div className="wetcell-benefit-card-img">
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="wetcell-benefit-card-body">
                            <h3 className="wetcell-benefit-card-title">{card.title}</h3>
                            <p className="wetcell-benefit-card-desc">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
