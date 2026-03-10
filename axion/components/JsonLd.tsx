/**
 * JSON-LD Structured Data Components
 * Adds Schema.org markup for rich search results
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://axion.ahsan-aleem.dev";

// ── Organization Schema (used on every page via layout) ──
export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Axion Critical Power Solutions",
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        description:
            "Reliable battery solutions for mission-critical power systems. VRLA and wet cell batteries backed by technical expertise and responsive support.",
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            availableLanguage: "English",
        },
        sameAs: [],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ── WebSite Schema (for sitelinks search box) ──
export function WebSiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Axion Critical Power Solutions",
        url: SITE_URL,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ── Product Schema (for product pages) ──
export function ProductSchema({
    name,
    description,
    image,
    url,
}: {
    name: string;
    description: string;
    image?: string;
    url: string;
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        image: image || `${SITE_URL}/og-image.jpg`,
        url,
        brand: {
            "@type": "Brand",
            name: "Axion Critical Power Solutions",
        },
        manufacturer: {
            "@type": "Organization",
            name: "Axion Critical Power Solutions",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ── BreadcrumbList Schema ──
export function BreadcrumbSchema({
    items,
}: {
    items: { name: string; url: string }[];
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ── LocalBusiness Schema ──
export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Axion Critical Power Solutions",
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        description:
            "Reliable battery solutions for mission-critical power systems.",
        address: {
            "@type": "PostalAddress",
            addressCountry: "US",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ── FAQ Schema (for FAQ sections → rich results in Google) ──
export function FAQSchema({
    questions,
}: {
    questions: { question: string; answer: string }[];
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: q.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ── Service Schema (for service pages) ──
export function ServiceSchema({
    name,
    description,
    url,
    provider,
}: {
    name: string;
    description: string;
    url: string;
    provider?: string;
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url,
        provider: {
            "@type": "Organization",
            name: provider || "Axion Critical Power Solutions",
            url: SITE_URL,
        },
        areaServed: {
            "@type": "Country",
            name: "US",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
