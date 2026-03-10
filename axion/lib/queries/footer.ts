import { fetchGraphQL } from "@/lib/graphql";

// ── GraphQL Query ──
const FOOTER_QUERY = `
  query GetFooterSection {
    allFooter(first: 1) {
      nodes {
        footerSection {
          phone
          email
          copyright
          navLinks {
            label
            url
          }
          legalLinks {
            label
            url
          }
        }
      }
    }
  }
`;

// ── TypeScript Interfaces ──
export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterData {
  phone: string;
  email: string;
  copyright: string;
  navLinks: FooterLink[];
  legalLinks: FooterLink[];
}

// ── Default values ──
export const FOOTER_DEFAULTS: FooterData = {
  phone: "020 3345 3310",
  email: "enquiries@energy-park.co.uk",
  copyright: "© 2025 Axion Critical Power Solutions. All rights reserved.",
  navLinks: [
    { label: "Solutions", url: "/solutions" },
    { label: "About Us", url: "/about" },
    { label: "How We Work", url: "/how-we-work" },
    { label: "EV Funding", url: "/ev-funding" },
    { label: "Cost Saving Calculator", url: "/calculator" },
    { label: "Case Studies", url: "/case-studies" },
    { label: "News", url: "/news" },
    { label: "Contact", url: "/contact" },
  ],
  legalLinks: [
    { label: "Terms & Conditions", url: "/terms" },
    { label: "Privacy Policy", url: "/privacy" },
    { label: "Modern Slavery Policy", url: "/modern-slavery" },
    { label: "ESG Policy", url: "/esg" },
    { label: "Sustainability Policy", url: "/sustainability" },
    { label: "Our quality and compliance standards", url: "/compliance" },
    { label: "Committed to Data Transparency", url: "/data-transparency" },
  ],
};

// ── Merge helper ──
function mergeWithDefaults(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): FooterData {
  return {
    phone: data.phone || FOOTER_DEFAULTS.phone,
    email: data.email || FOOTER_DEFAULTS.email,
    copyright: data.copyright || FOOTER_DEFAULTS.copyright,
    navLinks: data.navLinks?.length
      ? data.navLinks
      : FOOTER_DEFAULTS.navLinks,
    legalLinks: data.legalLinks?.length
      ? data.legalLinks
      : FOOTER_DEFAULTS.legalLinks,
  };
}

// ── Data Fetcher ──
export async function getFooterData(): Promise<FooterData> {
  // ── Try Axion CMS first ──
  try {
    const { getAxionSection } = await import("@/lib/queries/axion-cms");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ax = await getAxionSection<any>("home", "footer");
    if (ax && (ax.phone || ax.email || ax.copyright)) {
      const merged = { ...FOOTER_DEFAULTS };
      if (ax.phone) merged.phone = ax.phone;
      if (ax.email) merged.email = ax.email;
      if (ax.copyright) merged.copyright = ax.copyright;
      if (Array.isArray(ax.nav_links)) {
        merged.navLinks = ax.nav_links.map((l: { label: string; url: string }) => ({ label: l.label, url: l.url }));
      }
      if (Array.isArray(ax.legal_links)) {
        merged.legalLinks = ax.legal_links.map((l: { label: string; url: string }) => ({ label: l.label, url: l.url }));
      }
      return merged;
    }
  } catch (e) { console.log("Axion CMS footer not available", e); }

  // ── Fallback: old ACF ──
  try {
    const data = await fetchGraphQL<{
      allFooter: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nodes: { footerSection: any }[];
      };
    }>(FOOTER_QUERY);

    const node = data?.allFooter?.nodes?.[0];
    if (!node?.footerSection) return FOOTER_DEFAULTS;

    return mergeWithDefaults(node.footerSection);
  } catch (error) {
    console.error("Failed to fetch footer data:", error);
    return FOOTER_DEFAULTS;
  }
}
