import Image from "next/image";
import Link from "next/link";
import "./EngineeringSection.css";
import type { EngineeringData } from "@/lib/queries/engineering";

interface Props {
    data: EngineeringData;
}

export default function EngineeringSection({ data }: Props) {
    return (
        <section className="engineering-section" style={{ background: data.bgColor }}>
            {/* Decorative floating images */}
            <div className="eng-floating-images">
                {data.decorImages.map((img, i) => (
                    <Image
                        key={i}
                        src={img.image?.node?.sourceUrl || img.fallback}
                        alt={img.image?.node?.altText || `Engineering ${i + 1}`}
                        width={160}
                        height={120}
                        className={`eng-float-img pos-${i + 1}`}
                    />
                ))}
            </div>

            {/* Center content */}
            <div className="eng-content">
                <h2 className="eng-title">{data.title}</h2>
                <p className="eng-description">{data.description}</p>

                <h3 className="eng-highlights-title">{data.highlightsTitle}</h3>
                <div className="eng-highlights">
                    {data.highlights.map((h: string, i: number) => (
                        <span key={i} className="eng-pill">{h}</span>
                    ))}
                </div>

                <Link href={data.buttonUrl || "#"} className="eng-cta-btn">
                    {data.buttonLabel}
                </Link>
            </div>
        </section>
    );
}
