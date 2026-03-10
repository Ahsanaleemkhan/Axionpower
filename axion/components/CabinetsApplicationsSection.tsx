import Image from "next/image";
import "./CabinetsApplicationsSection.css";

interface AppCard {
    title: string;
    description: string;
    image: string;
}

const DEFAULT_CARDS: AppCard[] = [
    {
        title: "Data Center UPS Systems",
        description: "Supporting continuous IT operations and redundancy",
        image: "/images/app-datacenter.png",
    },
    {
        title: "Telecommunications",
        description: "Ensuring network continuity and uptime",
        image: "/images/app-telecom.png",
    },
    {
        title: "Healthcare Facilities",
        description: "Powering life-safety and essential electrical systems",
        image: "/images/app-healthcare.png",
    },
    {
        title: "Commercial & Industrial UPS Installations",
        description: "Reliable backup for critical operations",
        image: "/images/app-industrial.png",
    },
];

function ArrowIcon() {
    return (
        <span className="cab-app-card-arrow">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
        </span>
    );
}

interface CabinetsApplicationsProps {
    label?: string;
    heading?: string;
    cards?: AppCard[];
}

export default function CabinetsApplicationsSection({
    label = "Typical Applications",
    heading = "Battery cabinets are deployed across critical infrastructure, including",
    cards = DEFAULT_CARDS,
}: CabinetsApplicationsProps) {
    return (
        <section className="cab-apps">
            <div className="cab-apps-inner">
                <div className="cab-apps-label">
                    <span className="cab-apps-label-bar" />
                    <span className="cab-apps-label-text">{label}</span>
                </div>

                <h2 className="cab-apps-heading">{heading}</h2>

                <div className="cab-apps-grid">
                    {cards.map((card, i) => (
                        <div key={i} className="cab-app-card">
                            <div className="cab-app-card-img">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className="cab-app-card-overlay" />
                            <div className="cab-app-card-content">
                                <h3 className="cab-app-card-title">{card.title}</h3>
                                <div className="cab-app-card-bottom">
                                    <p className="cab-app-card-desc">{card.description}</p>
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
