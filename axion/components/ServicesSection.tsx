import Image from "next/image";
import Link from "next/link";
import "./ServicesSection.css";
import type { ServicesData, ServiceItem } from "@/lib/queries/services";

interface Props {
    data: ServicesData;
}

function ArrowIcon() {
    return (
        <div className="service-card-arrow">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
        </div>
    );
}

function ServiceCard({ item }: { item: ServiceItem }) {
    const imgSrc = item.image?.node?.sourceUrl || item.fallbackImage || null;

    return (
        <div className="service-card">
            {/* Background image – hidden by default, shown on hover via CSS */}
            {imgSrc && (
                <div className="service-card-bg">
                    <Image
                        src={imgSrc}
                        alt={item.image?.node?.altText || item.title}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
            )}
            <div className="service-card-bg-overlay" />

            <div className="service-card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={item.buttonUrl || "#"} className="service-card-btn">
                    {item.buttonLabel}
                </Link>
            </div>
            <ArrowIcon />
        </div>
    );
}

export default function ServicesSection({ data }: Props) {
    return (
        <>
            {/* ── Intro Block ── */}
            <section
                className="services-intro"
                style={{ background: `linear-gradient(180deg, ${data.introBgColor} 0%, ${data.midBgColor} 100%)` }}
            >
                <div className="services-intro-container">
                    <div className="services-label">
                        <span className="services-label-bar" />
                        <span className="services-label-text">{data.labelText}</span>
                    </div>
                    <p className="services-intro-heading">{data.introHeading}</p>
                    <Link href={data.introButtonUrl || "/services"} className="services-intro-btn">
                        {data.introButtonLabel}
                    </Link>
                </div>
            </section>

            {/* ── Service Cards ── */}
            <section
                className="services-cards"
                style={{ background: `linear-gradient(180deg, ${data.midBgColor} 0%, ${data.bottomBgColor} 100%)` }}
            >
                <div className="services-cards-container">
                    {data.services.map((item, i) => (
                        <ServiceCard key={i} item={item} />
                    ))}
                </div>
            </section>
        </>
    );
}
