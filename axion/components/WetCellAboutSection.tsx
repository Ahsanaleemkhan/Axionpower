import "./WetCellAboutSection.css";

interface WetCellAboutProps {
    label?: string;
    description?: string;
}

export default function WetCellAboutSection({
    label = "Wet Cell (Flooded) Lead-Acid Batteries",
    description = "Wet Cell (Flooded) batteries provide reliable, long-lasting power for mission-critical DC systems. Axion Critical Power Solutions supplies flooded battery solutions for industrial, utility, and substation applications where longevity, durability, and deep-cycle performance are essential. We also support clients with technical consultation, system sizing, and lifecycle management.",
}: WetCellAboutProps) {
    return (
        <section className="wetcell-about-section">
            <div className="wetcell-about-content">
                <div className="wetcell-about-label">{label}</div>
                <p className="wetcell-about-desc">{description}</p>
            </div>
        </section>
    );
}
