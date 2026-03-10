import Image from "next/image";
import Link from "next/link";
import "./VrlaHeroSection.css";

interface VrlaHeroData {
    backgroundImage?: string;
    heading?: string;
    headingHighlight?: string;
    description?: string;
    keyHighlights?: string[];
    typicalApplications?: string[];
    ctaLabel?: string;
    ctaUrl?: string;
}

const DEFAULTS: VrlaHeroData = {
    backgroundImage: "/images/vrla-hero-bg.png",
    heading: "VRLA",
    headingHighlight: "BATTERIES",
    description:
        "Axion Critical Power Solutions provides high-performance, low-maintenance VRLA (Valve-Regulated Lead-Acid) batteries for mission-critical applications. Sealed and reliable, they are ideal for UPS, DC power plants, and standby systems where space efficiency, predictable performance, and operational reliability are essential.",
    keyHighlights: [
        "Maintenance-free operation",
        "High power density",
        "Proven reliability in critical environments",
        "Compact footprint",
    ],
    typicalApplications: [
        "Data center UPS systems",
        "Telecom power systems",
        "Healthcare facilities",
        "Commercial and industrial UPS installations facilities",
    ],
    ctaLabel: "Speak with an Expert",
    ctaUrl: "#contact",
};

function CircleIcon() {
    return (
        <span className="vrla-list-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </span>
    );
}

export default function VrlaHeroSection({ data }: { data?: VrlaHeroData }) {
    const d = { ...DEFAULTS, ...data };

    return (
        <section className="vrla-hero">
            {d.backgroundImage && (
                <div className="vrla-hero-bg">
                    <Image
                        src={d.backgroundImage}
                        alt="VRLA Batteries"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
            )}
            <div className="vrla-hero-overlay" />

            <div className="vrla-hero-content">
                <h1 className="vrla-hero-heading">
                    {d.heading} <span className="highlight">{d.headingHighlight}</span>
                </h1>

                <p className="vrla-hero-desc">{d.description}</p>

                <div className="vrla-hero-columns">
                    <div>
                        <h2 className="vrla-hero-col-title">Key Highlights</h2>
                        <ul className="vrla-hero-list">
                            {d.keyHighlights?.map((item, i) => (
                                <li key={i}>
                                    <CircleIcon />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Link href={d.ctaUrl || "#"} className="vrla-hero-cta">
                    {d.ctaLabel}
                </Link>
            </div>
        </section>
    );
}
