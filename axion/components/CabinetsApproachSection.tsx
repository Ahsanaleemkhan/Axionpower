import Image from "next/image";
import "./CabinetsApproachSection.css";

interface ApproachItem {
    title: string;
    image: string;
}

const DEFAULT_ITEMS: ApproachItem[] = [
    {
        title: "Cabinet selection and\nconfiguration guidance",
        image: "/images/approach-guidance.png",
    },
    {
        title: "Coordination with\nbattery and UPS\nrequirements",
        image: "/images/approach-server.png",
    },
    {
        title: "Layout and space\nplanning assistance",
        image: "/images/approach-planning.png",
    },
    {
        title: "Compliance and safety\nconsiderations",
        image: "/images/cabinet-engineer.png",
    },
];

interface CabinetsApproachProps {
    label?: string;
    description?: string;
    items?: ApproachItem[];
}

export default function CabinetsApproachSection({
    label = "Axion's Approach",
    description = "Axion takes a system-level approach to battery cabinets, ensuring proper alignment between batteries, cabinets, UPS systems, and site conditions.\nSupport includes",
    items = DEFAULT_ITEMS,
}: CabinetsApproachProps) {
    return (
        <section className="cab-approach">
            <div className="cab-approach-inner">
                <div className="cab-approach-label">{label}</div>
                <p className="cab-approach-desc">
                    {description.split("\n").map((line, i) => (
                        <span key={i}>
                            {line}
                            {i < description.split("\n").length - 1 && <br />}
                        </span>
                    ))}
                </p>

                <div className="cab-approach-timeline">
                    <div className="cab-approach-line" />
                    {items.map((item, i) => (
                        <div key={i} className="cab-approach-item">
                            <div className="cab-approach-img-wrap">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={160}
                                    height={120}
                                    className="cab-approach-img"
                                />
                            </div>
                            <p className="cab-approach-item-title">
                                {item.title.split("\n").map((line, j) => (
                                    <span key={j}>
                                        {line}
                                        {j < item.title.split("\n").length - 1 && <br />}
                                    </span>
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
