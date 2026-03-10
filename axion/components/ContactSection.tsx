import Image from "next/image";
import Link from "next/link";
import "./ContactSection.css";
import type { ContactData } from "@/lib/queries/contact";

interface Props {
    data: ContactData;
}

export default function ContactSection({ data }: Props) {
    const imgSrc = data.image?.node?.sourceUrl || data.fallbackImage;
    const imgAlt = data.image?.node?.altText || "Contact Axion";

    return (
        <section className="contact-section">
            <div className="contact-container">
                {/* Left: Nested Image Frames */}
                <div className="contact-image-area">
                    <div
                        className="contact-frame-outer"
                        style={{ backgroundImage: `url(${imgSrc})` }}
                    >
                        <div
                            className="contact-frame-middle"
                            style={{ backgroundImage: `url(${imgSrc})` }}
                        >
                            <div className="contact-frame-inner">
                                <Image
                                    src={imgSrc}
                                    alt={imgAlt}
                                    width={340}
                                    height={440}
                                    className="contact-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="contact-right">
                    <div className="contact-label">
                        <span className="contact-label-bar" />
                        <span className="contact-label-text">{data.labelText}</span>
                    </div>
                    <h2 className="contact-heading">{data.heading}</h2>
                    <p className="contact-desc">{data.description}</p>

                    <h3 className="contact-highlights-title">{data.highlightsTitle}</h3>
                    <div className="contact-pills">
                        {data.highlights.map((h: string, i: number) => (
                            <span key={i} className="contact-pill">{h}</span>
                        ))}
                    </div>

                    <Link href={data.buttonUrl || "#"} className="contact-cta-btn">
                        {data.buttonLabel}
                    </Link>
                </div>
            </div>
        </section>
    );
}
