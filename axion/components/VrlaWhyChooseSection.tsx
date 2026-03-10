import "./VrlaWhyChooseSection.css";

interface WhyCard {
    number: string;
    text: string;
    variant: "white" | "blue";
}

const DEFAULT_CARDS: WhyCard[] = [
    {
        number: "01",
        text: "Technical consultation for sizing, specification, and system integration",
        variant: "white",
    },
    {
        number: "02",
        text: "Solutions aligned with industry standards and compliance requirements",
        variant: "blue",
    },
    {
        number: "03",
        text: "Integration with UPS and DC systems for mission-critical operations",
        variant: "white",
    },
    {
        number: "04",
        text: "Full lifecycle support, including preventive maintenance and replacement planning",
        variant: "white",
    },
];

interface VrlaWhyChooseProps {
    headingLine1?: string;
    headingHighlight?: string;
    headingLine3?: string;
    cards?: WhyCard[];
}

export default function VrlaWhyChooseSection({
    headingLine1 = "Why",
    headingHighlight = "Choose",
    headingLine3 = "Us?",
    cards = DEFAULT_CARDS,
}: VrlaWhyChooseProps) {
    return (
        <section className="vrla-why">
            <div className="vrla-why-inner">
                <h2 className="vrla-why-heading">
                    {headingLine1}
                    <span className="highlight">{headingHighlight}</span>
                    {headingLine3}
                </h2>

                <div className="vrla-why-grid">
                    {cards.map((card, i) => (
                        <div
                            key={i}
                            className={`vrla-why-card vrla-why-card--${card.variant}`}
                        >
                            <span className="vrla-why-card-num">{card.number}</span>
                            <p className="vrla-why-card-text">{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
