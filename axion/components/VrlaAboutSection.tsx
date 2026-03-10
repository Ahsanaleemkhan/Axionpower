import "./VrlaAboutSection.css";

interface VrlaAboutProps {
    label?: string;
    description?: string;
}

export default function VrlaAboutSection({
    label = "VRLA (Valve-Regulated Lead-Acid) Batteries",
    description = "VRLA batteries are sealed, maintenance-free solutions ideal for mission-critical power systems. Axion Critical Power Solutions offers VRLA batteries designed to deliver high performance, long service life, and reliable operation in UPS, DC power plants, and standby applications.",
}: VrlaAboutProps) {
    return (
        <section className="vrla-about-section">
            <div className="vrla-about-content">
                <div className="vrla-about-label">{label}</div>
                <p className="vrla-about-desc">{description}</p>
            </div>
        </section>
    );
}
