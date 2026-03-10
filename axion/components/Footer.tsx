import Link from "next/link";
import "./Footer.css";
import type { FooterData, FooterLink } from "@/lib/queries/footer";

const DEFAULT_FOOTER: FooterData = {
    phone: "+1 (555) 000-0000",
    email: "info@axionpower.com",
    navLinks: [
        { label: "Home", url: "/" },
        { label: "Products", url: "/vrla-batteries" },
        { label: "Contact", url: "/contact" },
    ],
    legalLinks: [
        { label: "Privacy Policy", url: "/privacy" },
        { label: "Terms of Service", url: "/terms" },
    ],
    copyright: `© ${new Date().getFullYear()} Axion Critical Power Solutions. All rights reserved.`,
};

interface Props {
    data?: FooterData;
}

export default function Footer({ data = DEFAULT_FOOTER }: Props) {
    return (
        <footer className="footer-section">
            <div className="footer-container">
                {/* Left: Logo + Contact */}
                <div className="footer-brand">
                    <div className="footer-logo">
                        <p className="footer-logo-main">AXION</p>
                        <p className="footer-logo-sub">Critical Power Solutions</p>
                    </div>
                    <div className="footer-contact-info">
                        <a href={`tel:${data.phone}`} className="footer-phone">{data.phone}</a>
                        <a href={`mailto:${data.email}`} className="footer-email">{data.email}</a>
                    </div>
                </div>

                {/* Middle: Navigation */}
                <div className="footer-links-col">
                    <h3 className="footer-col-title">Navigation</h3>
                    <ul className="footer-links">
                        {data.navLinks.map((link: FooterLink, i: number) => (
                            <li key={i}>
                                <Link href={link.url || "#"}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: Legal */}
                <div className="footer-links-col">
                    <h3 className="footer-col-title">Legal</h3>
                    <ul className="footer-links">
                        {data.legalLinks.map((link: FooterLink, i: number) => (
                            <li key={i}>
                                <Link href={link.url || "#"}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <p className="footer-copyright">{data.copyright}</p>
            </div>
        </footer>
    );
}
