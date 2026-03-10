import Image from "next/image";
import "./CabinetsEngineeredSection.css";

interface CabinetsEngineeredProps {
    label?: string;
    description?: string;
    image?: string;
}

export default function CabinetsEngineeredSection({
    label = "Engineered Cabinet Solutions for Critical Power",
    description = "Axion provides factory-assembled battery cabinets that integrate seamlessly with leading UPS platforms. Selection is based on system requirements such as UPS model, runtime, room layout, ventilation, and seismic considerations.\nOur technical team works closely with engineers, contractors, and end users to ensure cabinet solutions meet operational, safety, and compliance standards.",
    image = "/images/cabinet-engineer.png",
}: CabinetsEngineeredProps) {
    return (
        <section className="cabinets-eng-section">
            <div className="cabinets-eng-container">
                <div className="cabinets-eng-text">
                    <div className="cabinets-eng-label">{label}</div>
                    <p className="cabinets-eng-desc">
                        {description.split("\n").map((line, i) => (
                            <span key={i}>
                                {line}
                                {i < description.split("\n").length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                </div>
                <div className="cabinets-eng-image">
                    <div className="cabinets-eng-bolt top-left" />
                    <Image
                        src={image}
                        alt="Engineer inspecting battery cabinet"
                        width={500}
                        height={400}
                        className="cabinets-eng-img"
                    />
                    <div className="cabinets-eng-bolt bottom-right" />
                </div>
            </div>
        </section>
    );
}
