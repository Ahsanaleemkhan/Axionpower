import Image from "next/image";
import Link from "next/link";
import "./ComplianceSection.css";
import type { ComplianceData, ComplianceColumn } from "@/lib/queries/compliance";

interface Props {
    data: ComplianceData;
}

function CheckIcon({ color }: { color: string }) {
    return (
        <svg className="check-icon" width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke={color} strokeWidth="1.5" />
            <path d="M7.5 12.5l3 3 6-6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ColumnCard({ col, cardBgColor, cardBorderColor, cardBorderRadius }: {
    col: ComplianceColumn;
    cardBgColor: string;
    cardBorderColor: string;
    cardBorderRadius: number;
}) {
    return (
        <div className="compliance-column">
            {/* Heading */}
            {(() => {
                const HeadingTag = (col.headingTag || 'h2') as React.ElementType;
                return (
                    <HeadingTag
                        className="compliance-heading"
                        style={{
                            color: col.headingColor,
                            fontSize: `${col.headingFontSize}px`,
                        }}
                    >
                        {col.heading}
                    </HeadingTag>
                );
            })()}

            {/* Dark Card */}
            <div
                className="compliance-card"
                style={{
                    background: cardBgColor,
                    border: `1px solid ${cardBorderColor}`,
                    borderRadius: `${cardBorderRadius}px`,
                }}
            >
                <div className="card-image-wrap">
                    {col.image?.node?.sourceUrl ? (
                        <Image
                            src={col.image.node.sourceUrl}
                            alt={col.image.node.altText || col.heading}
                            width={240}
                            height={180}
                            className="card-image"
                        />
                    ) : (
                        <Image
                            src={col.heading.includes("Sustainability") ? "/sustainability.png" : "/quality.png"}
                            alt={col.heading}
                            width={240}
                            height={180}
                            className="card-image"
                        />
                    )}
                </div>
                <div className="card-content">
                    <p
                        className="card-description"
                        style={{
                            color: col.descriptionColor,
                            fontSize: `${col.descriptionFontSize}px`,
                        }}
                    >
                        {col.description}
                    </p>
                    <Link
                        href={col.buttonUrl || "#"}
                        className="card-button"
                        style={{
                            background: col.buttonBgColor,
                            color: col.buttonTextColor,
                            fontSize: `${col.buttonFontSize}px`,
                            borderRadius: `${col.buttonRadius}px`,
                        }}
                    >
                        {col.buttonLabel}
                    </Link>
                </div>
            </div>

            {/* Key Highlights */}
            <div className="highlights-section">
                {(() => {
                    const HlTag = (col.highlightsTitleTag || 'h3') as React.ElementType;
                    return (
                        <HlTag
                            className="highlights-title"
                            style={{
                                color: col.highlightsTitleColor,
                                fontSize: `${col.highlightsTitleFontSize}px`,
                            }}
                        >
                            {col.highlightsTitle}
                        </HlTag>
                    );
                })()}
                <ul className="highlights-list">
                    {col.highlights.map((item, j) => (
                        <li key={j} className="highlight-item">
                            <CheckIcon color={col.highlightsIconColor} />
                            <span
                                style={{
                                    color: col.highlightsTextColor,
                                    fontSize: `${col.highlightsTextFontSize}px`,
                                }}
                            >
                                {item.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function ComplianceSection({ data }: Props) {
    return (
        <section className="compliance-section" style={{ background: data.sectionBgColor }}>
            <div className="compliance-container">
                <div className="compliance-grid">
                    {data.columns.map((col, i) => (
                        <ColumnCard
                            key={i}
                            col={col}
                            cardBgColor={data.cardBgColor}
                            cardBorderColor={data.cardBorderColor}
                            cardBorderRadius={data.cardBorderRadius}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
