import Image from "next/image";
import Link from "next/link";
import "./CabinetsHeroSection.css";

interface CabinetsHeroData {
    backgroundImage?: string;
    heading?: string;
    headingHighlight?: string;
    description?: string;
    keyHighlights?: string[];
    ctaLabel?: string;
    ctaUrl?: string;
}

const DEFAULTS: CabinetsHeroData = {
    backgroundImage: "/images/vrla-hero-bg.png",
    heading: "STATIONARY BATTERY",
    headingHighlight: "CABINETS",
    description:
        "Axion Critical Power Solutions provides robust, purpose-built stationary battery cabinets designed to house and protect critical battery systems. Engineered for safety, ventilation, and easy maintenance access, our cabinets support VRLA, flooded, and lithium-ion installations across data centers, telecom facilities, and industrial environments.",
    keyHighlights: [
        "Seismic-rated construction",
        "Integrated ventilation and thermal management",
        "Configurable for all battery chemistries",
        "Code-compliant designs (UL, NFPA, IEEE)",
    ],
    ctaLabel: "Speak with an Expert",
    ctaUrl: "#contact",
};

function CircleIcon() {
    return (
        <span className="cabinets-list-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </span>
    );
}

export default function CabinetsHeroSection({ data }: { data?: CabinetsHeroData }) {
    const d = { ...DEFAULTS, ...data };

    return (
        <section className="cabinets-hero">
            {d.backgroundImage && (
                <div className="cabinets-hero-bg">
                    <Image
                        src={d.backgroundImage}
                        alt="Stationary Battery Cabinets"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
            )}
            <div className="cabinets-hero-overlay" />

            <div className="cabinets-hero-content">
                <h1 className="cabinets-hero-heading">
                    {d.heading} <span className="highlight">{d.headingHighlight}</span>
                </h1>

                <p className="cabinets-hero-desc">{d.description}</p>

                <div className="cabinets-hero-columns">
                    <div>
                        <h2 className="cabinets-hero-col-title">Key Highlights</h2>
                        <ul className="cabinets-hero-list">
                            {d.keyHighlights?.map((item, i) => (
                                <li key={i}>
                                    <CircleIcon />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Link href={d.ctaUrl || "#"} className="cabinets-hero-cta">
                    {d.ctaLabel}
                </Link>
            </div>
        </section>
    );
}
