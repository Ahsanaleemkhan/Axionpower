import Image from "next/image";
import Link from "next/link";
import "./WetCellHeroSection.css";

interface WetCellHeroData {
    backgroundImage?: string;
    heading?: string;
    headingHighlight?: string;
    description?: string;
    keyHighlights?: string[];
    ctaLabel?: string;
    ctaUrl?: string;
}

const DEFAULTS: WetCellHeroData = {
    backgroundImage: "/images/wetcell-hero-bg.png",
    heading: "WET CELL",
    headingHighlight: "BATTERIES",
    description:
        "Axion Critical Power Solutions delivers robust, high-capacity Wet Cell (Flooded) batteries engineered for the most demanding stationary power applications. With superior cycling capability and extended service life, flooded batteries remain the preferred choice for utility substations, large-scale UPS systems, and industrial DC power plants.",
    keyHighlights: [
        "Extended service life (20+ years)",
        "Superior deep-discharge recovery",
        "High cycling capability",
        "Cost-effective for large installations",
    ],
    ctaLabel: "Speak with an Expert",
    ctaUrl: "#contact",
};

function CircleIcon() {
    return (
        <span className="wetcell-list-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </span>
    );
}

export default function WetCellHeroSection({ data }: { data?: WetCellHeroData }) {
    const d = { ...DEFAULTS, ...data };

    return (
        <section className="wetcell-hero">
            {d.backgroundImage && (
                <div className="wetcell-hero-bg">
                    <Image
                        src={d.backgroundImage}
                        alt="Wet Cell Batteries"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
            )}
            <div className="wetcell-hero-overlay" />

            <div className="wetcell-hero-content">
                <h1 className="wetcell-hero-heading">
                    {d.heading} <span className="highlight">{d.headingHighlight}</span>
                </h1>

                <p className="wetcell-hero-desc">{d.description}</p>

                <div className="wetcell-hero-columns">
                    <div>
                        <h2 className="wetcell-hero-col-title">Key Highlights</h2>
                        <ul className="wetcell-hero-list">
                            {d.keyHighlights?.map((item, i) => (
                                <li key={i}>
                                    <CircleIcon />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Link href={d.ctaUrl || "#"} className="wetcell-hero-cta">
                    {d.ctaLabel}
                </Link>
            </div>
        </section>
    );
}
