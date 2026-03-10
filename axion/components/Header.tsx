"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "./Header.css";

interface SubLink {
    label: string;
    href: string;
}

interface NavItem {
    label: string;
    href: string;
    children?: SubLink[];
}

const NAV_LINKS: NavItem[] = [
    { label: "HOME", href: "/" },
    { label: "ABOUT US", href: "/about" },
    {
        label: "PRODUCT",
        href: "/product",
        children: [
            { label: "VRLA Batteries", href: "/vrla-batteries" },
            { label: "Wet Cell Batteries", href: "/wet-cell-batteries" },
            { label: "Stationary Battery Cabinets", href: "/battery-cabinets" },
        ],
    },
    { label: "SERVICES", href: "/services" },
    { label: "CONTACT", href: "/contact" },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
    const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = () => setOpenDropdown(null);
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    const handleMouseEnter = (label: string) => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        setOpenDropdown(label);
    };

    const handleMouseLeave = () => {
        dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 200);
    };

    return (
        <header className="site-header">
            {/* ── Blue accent line at top ── */}
            <div className="header-accent-line" />

            <div className="header-inner">
                {/* ── Logo ── */}
                <Link href="/" className="header-logo">
                    <span className="logo-title">AXION</span>
                    <span className="logo-subtitle">CRITICAL POWER SOLUTIONS</span>
                </Link>

                {/* ── Desktop Nav ── */}
                <nav className="header-nav">
                    {NAV_LINKS.map((link) =>
                        link.children ? (
                            <div
                                key={link.href}
                                className="nav-dropdown"
                                onMouseEnter={() => handleMouseEnter(link.label)}
                                onMouseLeave={handleMouseLeave}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Link href={link.href} className="nav-link nav-link-dropdown">
                                    {link.label}
                                    <svg
                                        className={`dropdown-chevron ${openDropdown === link.label ? "open" : ""}`}
                                        width="10"
                                        height="10"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </Link>
                                <div className={`dropdown-menu ${openDropdown === link.label ? "active" : ""}`}>
                                    {link.children.map((sub) => (
                                        <Link key={sub.href} href={sub.href} className="dropdown-item">
                                            {sub.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link key={link.href} href={link.href} className="nav-link">
                                {link.label}
                            </Link>
                        )
                    )}
                </nav>

                {/* ── CTA Button ── */}
                <Link href="/contact" className="header-cta">
                    Get In Touch
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>

                {/* ── Mobile Hamburger ── */}
                <button
                    className="mobile-toggle"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`hamburger ${mobileOpen ? "open" : ""}`}>
                        <span />
                        <span />
                        <span />
                    </span>
                </button>
            </div>

            {/* ── Mobile Sidebar Overlay ── */}
            <div
                className={`mobile-overlay ${mobileOpen ? "active" : ""}`}
                onClick={() => setMobileOpen(false)}
            />

            {/* ── Mobile Sidebar (slides from right) ── */}
            <div className={`mobile-sidebar ${mobileOpen ? "active" : ""}`}>
                <div className="mobile-sidebar-header">
                    <Link href="/" className="header-logo" onClick={() => setMobileOpen(false)}>
                        <span className="logo-title" style={{ color: "#fff" }}>AXION</span>
                        <span className="logo-subtitle" style={{ color: "rgba(255,255,255,0.6)" }}>CRITICAL POWER SOLUTIONS</span>
                    </Link>
                    <button
                        className="mobile-close"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="mobile-sidebar-nav">
                    {NAV_LINKS.map((link) =>
                        link.children ? (
                            <div key={link.href} className="mobile-dropdown">
                                <button
                                    className="mobile-link mobile-link-dropdown"
                                    onClick={() =>
                                        setMobileDropdown(mobileDropdown === link.label ? null : link.label)
                                    }
                                >
                                    {link.label}
                                    <svg
                                        className={`dropdown-chevron ${mobileDropdown === link.label ? "open" : ""}`}
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>
                                <div
                                    className={`mobile-sub-menu ${mobileDropdown === link.label ? "active" : ""}`}
                                >
                                    {link.children.map((sub) => (
                                        <Link
                                            key={sub.href}
                                            href={sub.href}
                                            className="mobile-link mobile-sub-link"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {sub.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="mobile-link"
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </Link>
                        )
                    )}
                </nav>

                <Link
                    href="/contact"
                    className="header-cta mobile-cta"
                    onClick={() => setMobileOpen(false)}
                >
                    Get In Touch
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* ── Bottom border line ── */}
            <div className="header-bottom-line" />
        </header>
    );
}
