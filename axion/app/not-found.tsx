import Link from "next/link";
import "./not-found.css";

export default function NotFound() {
    return (
        <section className="notfound">
            {/* Animated background elements */}
            <div className="notfound-bg-glow notfound-bg-glow--1" />
            <div className="notfound-bg-glow notfound-bg-glow--2" />
            <div className="notfound-bg-grid" />

            <div className="notfound-content">
                {/* Big 404 number */}
                <h1 className="notfound-code">
                    <span className="notfound-code-4">4</span>
                    <span className="notfound-code-0">
                        <svg viewBox="0 0 120 120" className="notfound-bolt-ring">
                            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(14,165,233,0.25)" strokeWidth="3" />
                            <circle cx="60" cy="60" r="54" fill="none" stroke="#0EA5E9" strokeWidth="3" strokeDasharray="80 260" className="notfound-bolt-ring-arc" />
                        </svg>
                        <svg viewBox="0 0 24 24" fill="none" className="notfound-bolt-icon">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#0EA5E9" />
                        </svg>
                    </span>
                    <span className="notfound-code-4">4</span>
                </h1>

                {/* Tagline */}
                <h2 className="notfound-title">Power Connection Lost</h2>
                <p className="notfound-desc">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back on track.
                </p>

                {/* Buttons */}
                <div className="notfound-actions">
                    <Link href="/" className="notfound-btn notfound-btn--primary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
                        </svg>
                        Back to Home
                    </Link>
                    <Link href="/contact" className="notfound-btn notfound-btn--secondary">
                        Contact Support
                    </Link>
                </div>

                {/* Subtle brand */}
                <p className="notfound-brand">AXION CRITICAL POWER SOLUTIONS</p>
            </div>
        </section>
    );
}
