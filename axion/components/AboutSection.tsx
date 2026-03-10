import Link from "next/link";
import "./AboutSection.css";
import type { AboutData } from "@/lib/queries/about";

interface Props {
    data: AboutData;
}

export default function AboutSection({ data }: Props) {
    const btn = data.button;

    return (
        <section
            className="about-section"
            style={{ background: data.sectionBgColor }}
        >
            <div className="about-container">
                {/* ── Top: Two-column layout ── */}
                <div className="about-top">
                    {/* Left Column */}
                    <div className="about-left">
                        <div className="about-label">
                            <span
                                className="about-label-bar"
                                style={{ background: data.labelBarColor }}
                            />
                            <span
                                className="about-label-text"
                                style={{
                                    color: data.labelColor,
                                    fontSize: `${data.labelFontSize}px`,
                                }}
                            >
                                {data.labelText}
                            </span>
                        </div>
                        {(() => {
                            const HeadingTag = (data.headingTag || 'h2') as React.ElementType;
                            return (
                                <HeadingTag
                                    className="about-heading"
                                    style={{
                                        color: data.headingColor,
                                        fontSize: `clamp(${data.headingFontSizeMobile}px, 4vw, ${data.headingFontSize}px)`,
                                    }}
                                >
                                    {data.headingText.split("\n").map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            {i < data.headingText.split("\n").length - 1 && <br />}
                                        </span>
                                    ))}
                                </HeadingTag>
                            );
                        })()}
                        <Link
                            href={btn.url || "/about"}
                            className="about-btn"
                            style={{
                                background: btn.bgColor,
                                color: btn.textColor,
                                fontSize: `${btn.fontSize}px`,
                                borderRadius: `${btn.borderRadius}px`,
                            }}
                        >
                            {btn.label}
                        </Link>
                    </div>

                    {/* Right Column */}
                    <div className="about-right">
                        <p
                            className="about-description"
                            style={{
                                color: data.descriptionColor,
                                fontSize: `${data.descriptionFontSize}px`,
                            }}
                        >
                            {data.description1}
                        </p>
                        <p
                            className="about-description about-focus"
                            style={{
                                color: data.descriptionColor,
                                fontSize: `${data.descriptionFontSize}px`,
                            }}
                        >
                            {data.description2}
                        </p>
                        {(() => {
                            const ApproachTag = (data.approachTitleTag || 'h3') as React.ElementType;
                            return (
                                <ApproachTag
                                    className="about-approach-title"
                                    style={{
                                        color: data.approachTitleColor,
                                        fontSize: `${data.approachTitleFontSize}px`,
                                    }}
                                >
                                    {data.approachTitle}
                                </ApproachTag>
                            );
                        })()}
                        <div className="about-tags">
                            {data.approachTags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="about-tag"
                                    style={{
                                        color: data.tagTextColor,
                                        borderColor: data.tagBorderColor,
                                        fontSize: `${data.tagFontSize}px`,
                                    }}
                                >
                                    {tag.tagText}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Bottom: Stats Row ── */}
                <div
                    className="about-stats"
                    style={{ borderTopColor: data.statDividerColor }}
                >
                    {data.stats.map((stat, i) => (
                        <div
                            key={i}
                            className="about-stat"
                            style={{ borderLeftColor: data.statDividerColor }}
                        >
                            <span
                                className="stat-value"
                                style={{
                                    color: data.statValueColor,
                                    fontSize: `${data.statValueFontSize}px`,
                                }}
                            >
                                {stat.statValue}
                            </span>
                            <span
                                className="stat-desc"
                                style={{
                                    color: data.statDescColor,
                                    fontSize: `${data.statDescFontSize}px`,
                                }}
                            >
                                {stat.statDescription}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
