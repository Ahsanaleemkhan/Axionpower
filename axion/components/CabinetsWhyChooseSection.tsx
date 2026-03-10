import "./CabinetsWhyChooseSection.css";

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

interface CabinetsWhyChooseProps {
    headingLine1?: string;
    headingHighlight?: string;
    headingLine3?: string;
    cards?: WhyCard[];
}

export default function CabinetsWhyChooseSection({
    headingLine1 = "Why",
    headingHighlight = "Choose",
    headingLine3 = "Us?",
    cards = DEFAULT_CARDS,
}: CabinetsWhyChooseProps) {
    return (
        <section className="cab-why">
            <div className="cab-why-inner">
                <h2 className="cab-why-heading">
                    {headingLine1}
                    <span className="highlight">{headingHighlight}</span>
                    {headingLine3}
                </h2>

                <div className="cab-why-grid">
                    {cards.map((card, i) => (
                        <div
                            key={i}
                            className={`cab-why-card cab-why-card--${card.variant}`}
                        >
                            <span className="cab-why-card-num">{card.number}</span>
                            <p className="cab-why-card-text">{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
