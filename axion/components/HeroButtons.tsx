"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HeroCTAPrimary, HeroCTASecondary } from "@/lib/queries/hero";

interface Props {
    primary: HeroCTAPrimary;
    secondary: HeroCTASecondary;
}

export default function HeroButtons({ primary, secondary }: Props) {
    const [primaryHover, setPrimaryHover] = useState(false);
    const [secondaryHover, setSecondaryHover] = useState(false);

    // Build gradient from backend values
    const primaryGradient = primaryHover
        ? `linear-gradient(${primary.gradientDirection}, ${primary.hoverGradientStart || primary.gradientStartColor}, ${primary.hoverGradientEnd || primary.gradientEndColor})`
        : `linear-gradient(${primary.gradientDirection}, ${primary.gradientStartColor}, ${primary.gradientEndColor})`;

    const linkTarget = (openInNew: boolean) =>
        openInNew ? "_blank" : "_self";

    return (
        <div
            style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            {/* ── Primary CTA (Gradient Button) ── */}
            {primary.label && (
                <Link
                    href={primary.url || "#"}
                    target={linkTarget(primary.openInNewTab)}
                    rel={primary.openInNewTab ? "noopener noreferrer" : undefined}
                    onMouseEnter={() => setPrimaryHover(true)}
                    onMouseLeave={() => setPrimaryHover(false)}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.85rem 2rem",
                        background: primaryGradient,
                        color: primary.textColor || "#FFFFFF",
                        borderRadius: `${primary.borderRadius || 50}px`,
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: `${primary.fontSize || 15}px`,
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        transform: primaryHover ? "translateY(-2px)" : "none",
                        boxShadow: primaryHover
                            ? "0 8px 25px rgba(14, 165, 233, 0.35)"
                            : "0 4px 15px rgba(14, 165, 233, 0.2)",
                    }}
                >
                    {primary.label}
                    {primary.icon?.node?.sourceUrl && (
                        <Image
                            src={primary.icon.node.sourceUrl}
                            alt={primary.icon.node.altText || ""}
                            width={20}
                            height={20}
                            style={{ filter: "brightness(0) invert(1)" }}
                        />
                    )}
                </Link>
            )}

            {/* ── Secondary CTA (Outlined Button) ── */}
            {secondary.label && (
                <Link
                    href={secondary.url || "#"}
                    target={linkTarget(secondary.openInNewTab)}
                    rel={secondary.openInNewTab ? "noopener noreferrer" : undefined}
                    onMouseEnter={() => setSecondaryHover(true)}
                    onMouseLeave={() => setSecondaryHover(false)}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.85rem 2rem",
                        backgroundColor: secondaryHover
                            ? secondary.hoverBackgroundColor || secondary.backgroundColor
                            : secondary.backgroundColor || "#1a1a2e",
                        color: secondaryHover
                            ? secondary.hoverTextColor || secondary.textColor
                            : secondary.textColor || "#FFFFFF",
                        border: `1.5px solid ${secondary.borderColor || "#333333"}`,
                        borderRadius: `${secondary.borderRadius || 50}px`,
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: `${secondary.fontSize || 15}px`,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        transform: secondaryHover ? "translateY(-2px)" : "none",
                        boxShadow: secondaryHover
                            ? "0 10px 30px rgba(255, 0, 0, 0.45)"
                            : "0 6px 20px rgba(255, 0, 0, 0.3)",
                    }}
                >
                    {secondary.label}
                </Link>
            )}
        </div>
    );
}
