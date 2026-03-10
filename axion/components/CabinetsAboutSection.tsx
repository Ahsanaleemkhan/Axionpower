import "./CabinetsAboutSection.css";

interface CabinetsAboutProps {
    label?: string;
    description?: string;
}

export default function CabinetsAboutSection({
    label = "Stationary Battery Cabinets",
    description = "Purpose-built battery cabinets engineered for safety, thermal management, and code compliance. Axion Critical Power Solutions designs and supplies stationary cabinets that protect and organize battery systems in mission-critical facilities, ensuring reliable performance and simplified maintenance access.",
}: CabinetsAboutProps) {
    return (
        <section className="cabinets-about-section">
            <div className="cabinets-about-content">
                <div className="cabinets-about-label">{label}</div>
                <p className="cabinets-about-desc">{description}</p>
            </div>
        </section>
    );
}
