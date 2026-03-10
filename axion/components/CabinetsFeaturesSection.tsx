import Image from "next/image";
import "./CabinetsFeaturesSection.css";

interface CabinetsFeaturesProps {
    label?: string;
    features?: { text: string; bold?: boolean }[];
    image?: string;
}

const DEFAULT_FEATURES = [
    { text: "Seismic and non-seismic options", bold: true },
    { text: "Heavy-duty welded steel construction" },
    { text: "Hinged, lockable front doors for security" },
    { text: "Factory-applied, chip-resistant powder-coat finishes" },
    { text: "Integrated cooling and airflow management" },
    { text: "Mobility options such as heavy-duty casters (model dependent)" },
];

export default function CabinetsFeaturesSection({
    label = "Engineered Cabinet Solutions for Critical Power",
    features = DEFAULT_FEATURES,
    image = "/images/seismic-map.png",
}: CabinetsFeaturesProps) {
    return (
        <section className="cabinets-feat-section">
            <div className="cabinets-feat-container">
                <div className="cabinets-feat-text">
                    <div className="cabinets-feat-label">{label}</div>
                    <ul className="cabinets-feat-list">
                        {features.map((item, i) => (
                            <li key={i} className={item.bold ? "bold" : ""}>
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="cabinets-feat-image">
                    <Image
                        src={image}
                        alt="Seismic map visualization"
                        width={420}
                        height={340}
                        className="cabinets-feat-img"
                    />
                    <div className="cabinets-feat-pad bottom-right" />
                </div>
            </div>
        </section>
    );
}
