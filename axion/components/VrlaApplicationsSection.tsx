import Image from "next/image";
import "./VrlaApplicationsSection.css";

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
        <span className="vrla-app-card-arrow">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
        </span>
    );
}

interface VrlaApplicationsProps {
    label?: string;
    heading?: string;
    cards?: AppCard[];
}

export default function VrlaApplicationsSection({
    label = "Typical Applications",
    heading = "VRLA batteries are widely used in critical environments, including",
    cards = DEFAULT_CARDS,
}: VrlaApplicationsProps) {
    return (
        <section className="vrla-apps">
            <div className="vrla-apps-inner">
                <div className="vrla-apps-label">
                    <span className="vrla-apps-label-bar" />
                    <span className="vrla-apps-label-text">{label}</span>
                </div>

                <h2 className="vrla-apps-heading">{heading}</h2>

                <div className="vrla-apps-grid">
                    {cards.map((card, i) => (
                        <div key={i} className="vrla-app-card">
                            <div className="vrla-app-card-img">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className="vrla-app-card-overlay" />
                            <div className="vrla-app-card-content">
                                <h3 className="vrla-app-card-title">{card.title}</h3>
                                <div className="vrla-app-card-bottom">
                                    <p className="vrla-app-card-desc">{card.description}</p>
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
