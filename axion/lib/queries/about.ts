import { fetchGraphQL } from "@/lib/graphql";

// ── GraphQL Query — fetches first about post from "abouts" CPT ──
const ABOUT_QUERY = `
  query GetAboutSection {
    abouts(first: 1) {
      nodes {
        aboutSection {
          sectionBgColor
          labelText
          labelColor
          labelFontSize
          labelBarColor
          headingText
          headingTag
          headingColor
          headingFontSize
          headingFontSizeMobile
          button {
            label
            url
            bgColor
            textColor
            fontSize
            borderRadius
            hoverBgColor
          }
          description1
          description2
          descriptionColor
          descriptionFontSize
          approachTitle
          approachTitleTag
          approachTitleColor
          approachTitleFontSize
          approachTags {
            tagText
          }
          tagTextColor
          tagBorderColor
          tagFontSize
          stats {
            statValue
            statDescription
          }
          statValueColor
          statValueFontSize
          statDescColor
          statDescFontSize
          statDividerColor
        }
      }
    }
  }
`;

// ── TypeScript Interfaces ──
export interface AboutButton {
  label: string;
  url: string;
  bgColor: string;
  textColor: string;
  fontSize: number;
  borderRadius: number;
  hoverBgColor: string;
}

export interface AboutTag {
  tagText: string;
}

export interface AboutStat {
  statValue: string;
  statDescription: string;
}

export interface AboutData {
  sectionBgColor: string;
  labelText: string;
  labelColor: string;
  labelFontSize: number;
  labelBarColor: string;
  headingText: string;
  headingTag: string;
  headingColor: string;
  headingFontSize: number;
  headingFontSizeMobile: number;
  button: AboutButton;
  description1: string;
  description2: string;
  descriptionColor: string;
  descriptionFontSize: number;
  approachTitle: string;
  approachTitleTag: string;
  approachTitleColor: string;
  approachTitleFontSize: number;
  approachTags: AboutTag[];
  tagTextColor: string;
  tagBorderColor: string;
  tagFontSize: number;
  stats: AboutStat[];
  statValueColor: string;
  statValueFontSize: number;
  statDescColor: string;
  statDescFontSize: number;
  statDividerColor: string;
}

// ── Default values (matching current hardcoded content) ──
export const ABOUT_DEFAULTS: AboutData = {
  sectionBgColor: "#f5f5f5",
  labelText: "ABOUT US",
  labelColor: "#64748b",
  labelFontSize: 13,
  labelBarColor: "#0EA5E9",
  headingText: "Powering Critical\nSystems with Proven\nBattery Technology",
  headingTag: "h2",
  headingColor: "#0f172a",
  headingFontSize: 38,
  headingFontSizeMobile: 28,
  button: {
    label: "ABOUT US",
    url: "/about",
    bgColor: "#0EA5E9",
    textColor: "#FFFFFF",
    fontSize: 12,
    borderRadius: 50,
    hoverBgColor: "#0284C7",
  },
  description1:
    "Axion Critical Power Solutions provides dependable battery technologies designed to support uninterrupted power in mission-critical environments. We supply high-performance VRLA and flooded (wet cell) battery solutions, backed by technical expertise, responsive support, and a strong understanding of critical power systems.",
  description2:
    "Our focus is simple: deliver reliable, compliant, and long-term battery solutions that protect critical infrastructure.",
  descriptionColor: "#475569",
  descriptionFontSize: 14,
  approachTitle: "Our Approach",
  approachTitleTag: "h3",
  approachTitleColor: "#0f172a",
  approachTitleFontSize: 18,
  approachTags: [
    { tagText: "Reliability First" },
    { tagText: "Technical Integrity First" },
    { tagText: "Safety & Compliance" },
    { tagText: "Accountability" },
    { tagText: "Customer Partnership" },
  ],
  tagTextColor: "#334155",
  tagBorderColor: "#d1d5db",
  tagFontSize: 13,
  stats: [
    { statValue: "15,000+", statDescription: "Clients ranging from 1 to 15,000+ employees" },
    { statValue: "13,000+", statDescription: "Medium and large enterprise clients" },
    { statValue: "50,000+", statDescription: "Payslips being produced and distributed every month" },
    { statValue: "7 Million+", statDescription: "7 Million+ In BACS payments processed each month" },
  ],
  statValueColor: "#0f172a",
  statValueFontSize: 30,
  statDescColor: "#64748b",
  statDescFontSize: 12,
  statDividerColor: "#e2e8f0",
};

// ── Merge helper: fill missing fields with defaults ──
function mergeWithDefaults(data: Partial<AboutData>): AboutData {
  const merged: AboutData = {
    ...ABOUT_DEFAULTS,
    ...data,
    button: { ...ABOUT_DEFAULTS.button, ...(data.button || {}) },
    approachTags: data.approachTags?.length ? data.approachTags : ABOUT_DEFAULTS.approachTags,
    stats: data.stats?.length ? data.stats : ABOUT_DEFAULTS.stats,
  };
  // Normalize select fields (WPGraphQL returns arrays for select fields)
  if (Array.isArray(merged.headingTag)) merged.headingTag = merged.headingTag[0] || "h2";
  if (Array.isArray(merged.approachTitleTag)) merged.approachTitleTag = merged.approachTitleTag[0] || "h3";
  return merged;
}

// ── Data Fetcher ──
export async function getAboutData(): Promise<AboutData> {
  // ── Try Axion CMS first ──
  try {
    const { getAxionSection } = await import("@/lib/queries/axion-cms");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ax = await getAxionSection<any>("home", "about");
    if (ax && (ax.heading || ax.label_text)) {
      return mergeWithDefaults({
        labelText: ax.label_text,
        headingText: ax.heading,
        description1: ax.description_left,
        description2: ax.description_right,
        button: { ...ABOUT_DEFAULTS.button, label: ax.button_text, url: ax.button_link },
        approachTags: Array.isArray(ax.approach_tags) ? ax.approach_tags.map((t: { tag: string }) => ({ tagText: t.tag })) : undefined,
        stats: Array.isArray(ax.stats) ? ax.stats.map((s: { number: string; label: string }) => ({ statValue: s.number, statDescription: s.label })) : undefined,
      });
    }
  } catch (e) { console.log("Axion CMS about not available", e); }

  // ── Fallback: old ACF ──
  try {
    const data = await fetchGraphQL<{
      abouts: { nodes: { aboutSection: Partial<AboutData> }[] };
    }>(ABOUT_QUERY);

    const firstNode = data?.abouts?.nodes?.[0];
    if (!firstNode?.aboutSection) return ABOUT_DEFAULTS;

    return mergeWithDefaults(firstNode.aboutSection);
  } catch (error) {
    console.error("Failed to fetch about data:", error);
    return ABOUT_DEFAULTS;
  }
}
