import Image from "next/image";
import "./WetCellApplicationsSection.css";

interface AppCard {
    title: string;
    description: string;
    image: string;
}

const DEFAULT_CARDS: AppCard[] = [
    {
        title: "Utility Substations",
        description: "Reliable switchgear and protection system backup",
        image: "/images/app-utility.png",
    },
    {
        title: "Large-Scale UPS Systems",
        description: "Extended runtime for critical facility operations",
        image: "/images/app-datacenter.png",
    },
    {
        title: "Industrial DC Power Plants",
        description: "Continuous power for process control and safety systems",
        image: "/images/app-industrial.png",
    },
    {
        title: "Renewable Energy Storage",
        description: "Grid-tied and off-grid energy storage solutions",
        image: "/images/app-telecom.png",
    },
];

function ArrowIcon() {
    return (
        <span className="wetcell-app-card-arrow">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
        </span>
    );
}

interface WetCellApplicationsProps {
    label?: string;
    heading?: string;
    cards?: AppCard[];
}

export default function WetCellApplicationsSection({
    label = "Typical Applications",
    heading = "Wet cell batteries deliver proven performance in high-demand environments",
    cards = DEFAULT_CARDS,
}: WetCellApplicationsProps) {
    return (
        <section className="wetcell-apps">
            <div className="wetcell-apps-inner">
                <div className="wetcell-apps-label">
                    <span className="wetcell-apps-label-bar" />
                    <span className="wetcell-apps-label-text">{label}</span>
                </div>

                <h2 className="wetcell-apps-heading">{heading}</h2>

                <div className="wetcell-apps-grid">
                    {cards.map((card, i) => (
                        <div key={i} className="wetcell-app-card">
                            <div className="wetcell-app-card-img">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className="wetcell-app-card-overlay" />
                            <div className="wetcell-app-card-content">
                                <h3 className="wetcell-app-card-title">{card.title}</h3>
                                <div className="wetcell-app-card-bottom">
                                    <p className="wetcell-app-card-desc">{card.description}</p>
                                    <ArrowIcon />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
