import { fetchGraphQL } from "@/lib/graphql";

// ── GraphQL Query ──
const COMPLIANCE_QUERY = `
  query GetComplianceSection {
    compliances(first: 1) {
      nodes {
        complianceSection {
          sectionBgColor
          columns {
            heading
            headingTag
            headingColor
            headingFontSize
            image {
              node {
                sourceUrl
                altText
              }
            }
            description
            descriptionColor
            descriptionFontSize
            buttonLabel
            buttonUrl
            buttonBgColor
            buttonTextColor
            buttonFontSize
            buttonRadius
            buttonHoverBgColor
            highlightsTitle
            highlightsTitleTag
            highlightsTitleColor
            highlightsTitleFontSize
            highlights {
              text
            }
            highlightsTextColor
            highlightsTextFontSize
            highlightsIconColor
          }
          cardBgColor
          cardBorderColor
          cardBorderRadius
        }
      }
    }
  }
`;

// ── TypeScript Interfaces ──
export interface ComplianceHighlight {
    text: string;
}

export interface ComplianceColumn {
    heading: string;
    headingTag: string;
    headingColor: string;
    headingFontSize: number;
    image: { node: { sourceUrl: string; altText: string } } | null;
    description: string;
    descriptionColor: string;
    descriptionFontSize: number;
    buttonLabel: string;
    buttonUrl: string;
    buttonBgColor: string;
    buttonTextColor: string;
    buttonFontSize: number;
    buttonRadius: number;
    buttonHoverBgColor: string;
    highlightsTitle: string;
    highlightsTitleTag: string;
    highlightsTitleColor: string;
    highlightsTitleFontSize: number;
    highlights: ComplianceHighlight[];
    highlightsTextColor: string;
    highlightsTextFontSize: number;
    highlightsIconColor: string;
}

export interface ComplianceData {
    sectionBgColor: string;
    columns: ComplianceColumn[];
    cardBgColor: string;
    cardBorderColor: string;
    cardBorderRadius: number;
}

// ── Default values ──
const DEFAULT_COLUMN_1: ComplianceColumn = {
    heading: "Sustainability & Compliance",
    headingTag: "h2",
    headingColor: "#ffffff",
    headingFontSize: 30,
    image: null,
    description:
        "Axion Critical Power Solutions prioritizes environmental responsibility and regulatory compliance across the full lifecycle of every battery system. From recycling programs to safe handling and operational guidance, our solutions support sustainable, reliable, and responsible power system operations.",
    descriptionColor: "#cbd5e1",
    descriptionFontSize: 13,
    buttonLabel: "LEARN MORE",
    buttonUrl: "/sustainability",
    buttonBgColor: "#0EA5E9",
    buttonTextColor: "#ffffff",
    buttonFontSize: 11,
    buttonRadius: 50,
    buttonHoverBgColor: "#38BDF8",
    highlightsTitle: "Key Highlights:",
    highlightsTitleTag: "h3",
    highlightsTitleColor: "#ffffff",
    highlightsTitleFontSize: 15,
    highlights: [
        { text: "Environmentally responsible recycling programs" },
        { text: "Compliance with applicable environmental regulations" },
        { text: "Responsible sourcing of battery products" },
        { text: "Safe handling and installation guidance" },
    ],
    highlightsTextColor: "#cbd5e1",
    highlightsTextFontSize: 13,
    highlightsIconColor: "#0EA5E9",
};

const DEFAULT_COLUMN_2: ComplianceColumn = {
    heading: "Quality, Safety & Compliance",
    headingTag: "h2",
    headingColor: "#ffffff",
    headingFontSize: 30,
    image: null,
    description:
        "Axion Critical Power Solutions prioritizes quality, safety, and compliance across all battery solutions. We partner with trusted manufacturers and follow recognized industry standards to ensure reliable, safe, and long-lasting mission-critical power systems.",
    descriptionColor: "#cbd5e1",
    descriptionFontSize: 13,
    buttonLabel: "LEARN MORE",
    buttonUrl: "/quality",
    buttonBgColor: "#0EA5E9",
    buttonTextColor: "#ffffff",
    buttonFontSize: 11,
    buttonRadius: 50,
    buttonHoverBgColor: "#38BDF8",
    highlightsTitle: "Key Highlights:",
    highlightsTitleTag: "h3",
    highlightsTitleColor: "#ffffff",
    highlightsTitleFontSize: 15,
    highlights: [
        { text: "Adherence to industry standards and best practices" },
        { text: "Manufacturer quality assurance and verification" },
        { text: "Safe handling, installation, and maintenance guidance" },
        { text: "Environmental responsibility throughout the battery lifecycle" },
    ],
    highlightsTextColor: "#cbd5e1",
    highlightsTextFontSize: 13,
    highlightsIconColor: "#0EA5E9",
};

export const COMPLIANCE_DEFAULTS: ComplianceData = {
    sectionBgColor: "#0a0a14",
    columns: [DEFAULT_COLUMN_1, DEFAULT_COLUMN_2],
    cardBgColor: "#111827",
    cardBorderColor: "rgba(255, 255, 255, 0.06)",
    cardBorderRadius: 14,
};

// ── Merge helper ──
function mergeColumn(
    col: Partial<ComplianceColumn>,
    def: ComplianceColumn
): ComplianceColumn {
    const merged: ComplianceColumn = {
        ...def,
        ...col,
        highlights: col.highlights?.length ? col.highlights : def.highlights,
        image: col.image || def.image,
    };
    // Normalize select fields (WPGraphQL returns arrays)
    if (Array.isArray(merged.headingTag)) merged.headingTag = merged.headingTag[0] || "h2";
    if (Array.isArray(merged.highlightsTitleTag)) merged.highlightsTitleTag = merged.highlightsTitleTag[0] || "h3";
    return merged;
}

function mergeWithDefaults(data: Partial<ComplianceData>): ComplianceData {
    const merged = { ...COMPLIANCE_DEFAULTS, ...data };
    if (data.columns?.length) {
        merged.columns = data.columns.map((col, i) =>
            mergeColumn(col, i === 0 ? DEFAULT_COLUMN_1 : DEFAULT_COLUMN_2)
        );
    }
    return merged;
}

// ── Data Fetcher ──
export async function getComplianceData(): Promise<ComplianceData> {
    // ── Try Axion CMS first ──
    try {
        const { getAxionSection } = await import("@/lib/queries/axion-cms");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ax = await getAxionSection<any>("home", "compliance");
        if (ax && (ax.heading || ax.badges)) {
            return COMPLIANCE_DEFAULTS; // Use defaults with Axion CMS data when fields are added
        }
    } catch (e) { console.log("Axion CMS compliance not available", e); }

    // ── Fallback: old ACF ──
    try {
        const data = await fetchGraphQL<{
            compliances: {
                nodes: { complianceSection: Partial<ComplianceData> }[];
            };
        }>(COMPLIANCE_QUERY);

        const node = data?.compliances?.nodes?.[0];
        if (!node?.complianceSection) return COMPLIANCE_DEFAULTS;

        return mergeWithDefaults(node.complianceSection);
    } catch (error) {
        console.error("Failed to fetch compliance data:", error);
        return COMPLIANCE_DEFAULTS;
    }
}
