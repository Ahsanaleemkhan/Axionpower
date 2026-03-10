import "./WetCellWhyChooseSection.css";

interface WhyCard {
    number: string;
    text: string;
    variant: "white" | "blue";
}

const DEFAULT_CARDS: WhyCard[] = [
    {
        number: "01",
        text: "Expert guidance on cell sizing, rack configuration, and system design for flooded battery installations",
        variant: "white",
    },
    {
        number: "02",
        text: "Solutions engineered to meet IEEE, NFPA, and seismic compliance requirements",
        variant: "blue",
    },
    {
        number: "03",
        text: "Seamless integration with utility switchgear, DC plants, and large-scale UPS infrastructure",
        variant: "white",
    },
    {
        number: "04",
        text: "Comprehensive lifecycle support including preventive maintenance, watering systems, and cell replacement programs",
        variant: "white",
    },
];

interface WetCellWhyChooseProps {
    headingLine1?: string;
    headingHighlight?: string;
    headingLine3?: string;
    cards?: WhyCard[];
}

export default function WetCellWhyChooseSection({
    headingLine1 = "Why",
    headingHighlight = "Choose",
    headingLine3 = "Us?",
    cards = DEFAULT_CARDS,
}: WetCellWhyChooseProps) {
    return (
        <section className="wetcell-why">
            <div className="wetcell-why-inner">
                <h2 className="wetcell-why-heading">
                    {headingLine1}
                    <span className="highlight">{headingHighlight}</span>
                    {headingLine3}
                </h2>

                <div className="wetcell-why-grid">
                    {cards.map((card, i) => (
                        <div
                            key={i}
                            className={`wetcell-why-card wetcell-why-card--${card.variant}`}
                        >
                            <span className="wetcell-why-card-num">{card.number}</span>
                            <p className="wetcell-why-card-text">{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
