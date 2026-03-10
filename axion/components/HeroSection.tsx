import Image from "next/image";
import type { HeroData } from "@/lib/queries/hero";
import HeroButtons from "./HeroButtons";

interface Props {
    data: HeroData;
}

export default function HeroSection({ data }: Props) {
    const overlayOpacityDecimal = (data.overlayOpacity ?? 60) / 100;

    const alignItems =
        data.contentAlignment === "left"
            ? "flex-start"
            : data.contentAlignment === "right"
                ? "flex-end"
                : "center";

    const textAlign = data.contentAlignment || "center";

    return (
        <section
            style={{
                position: "relative",
                minHeight: `${Math.max(data.sectionMinHeight || 100, 120)}vh`,
                paddingTop: "4rem",
                paddingBottom: "10rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            {/* ── Background Image (Desktop) ── */}
            {data.backgroundImage?.node?.sourceUrl && (
                <Image
                    src={data.backgroundImage.node.sourceUrl}
                    alt={data.backgroundImage.node.altText || "Hero background"}
                    fill
                    priority
                    quality={90}
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    className="hero-bg-desktop"
                />
            )}

            {/* ── Background Image (Mobile) ── */}
            {data.backgroundImageMobile?.node?.sourceUrl && (
                <Image
                    src={data.backgroundImageMobile.node.sourceUrl}
                    alt={
                        data.backgroundImageMobile.node.altText ||
                        "Hero background mobile"
                    }
                    fill
                    priority
                    quality={85}
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    className="hero-bg-mobile"
                />
            )}

            {/* ── Fallback if no images uploaded yet ── */}
            {!data.backgroundImage?.node?.sourceUrl && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(135deg, #0a0a2e 0%, #0d1b3e 50%, #0a1628 100%)",
                        zIndex: 0,
                    }}
                />
            )}

            {/* ── Overlay ── */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: data.overlayColor || "#000000",
                    opacity: overlayOpacityDecimal,
                    zIndex: 1,
                }}
            />

            {/* ── Content ── */}
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    maxWidth: `${data.contentMaxWidth || 800}px`,
                    width: "100%",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems,
                    textAlign: textAlign as React.CSSProperties["textAlign"],
                }}
            >
                {(() => {
                    const HeadingTag = (data.headingTag || 'h1') as React.ElementType;
                    return (
                        <HeadingTag
                            style={{
                                color: data.headingColor || "#FFFFFF",
                                fontSize: `clamp(${data.headingFontSizeMobile || 32}px, 5vw, ${data.headingFontSize || 56}px)`,
                                fontWeight: 700,
                                lineHeight: 1.15,
                                marginBottom: "1.25rem",
                            }}
                        >
                            {data.headingText || "Welcome"}
                        </HeadingTag>
                    );
                })()}

                <p
                    style={{
                        color: data.subheadingColor || "#CCCCCC",
                        fontSize: `clamp(${data.subheadingFontSizeMobile || 15}px, 2vw, ${data.subheadingFontSize || 18}px)`,
                        lineHeight: 1.7,
                        marginBottom: "2.5rem",
                        maxWidth: "680px",
                    }}
                >
                    {data.subheadingText || ""}
                </p>

                {/* CTA Buttons (Client Component for hover) */}
                {data.ctaPrimary && data.ctaSecondary && (
                    <HeroButtons
                        primary={data.ctaPrimary}
                        secondary={data.ctaSecondary}
                    />
                )}
            </div>
        </section>
    );
}
