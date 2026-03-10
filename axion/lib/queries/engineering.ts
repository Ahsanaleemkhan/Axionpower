import { fetchGraphQL } from "@/lib/graphql";

// ── GraphQL Query ──
const ENGINEERING_QUERY = `
  query GetEngineeringSection {
    allEngineering(first: 1) {
      nodes {
        engineeringSection {
          bgColor
          title
          description
          highlightsTitle
          highlightsList {
            text
          }
          buttonLabel
          buttonUrl
          decorImages {
            image {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  }
`;

// ── TypeScript Interfaces ──
export interface DecorImage {
  image: { node: { sourceUrl: string; altText: string } } | null;
  fallback: string;
}

export interface EngineeringData {
  bgColor: string;
  title: string;
  description: string;
  highlightsTitle: string;
  highlights: string[];
  buttonLabel: string;
  buttonUrl: string;
  decorImages: DecorImage[];
}

// ── Default values ──
export const ENGINEERING_DEFAULTS: EngineeringData = {
  bgColor: "#0a0a14",
  title: "Engineering Resources",
  description:
    "Axion Critical Power Solutions provides engineers, designers, and facility managers with technical resources to support informed decisions about mission-critical battery systems. From battery sizing and VRLA vs Wet Cell selection to UPS integration and environmental requirements, our guidance ensures reliable, compliant, and long-lasting power solutions.",
  highlightsTitle: "Key Highlights",
  highlights: [
    "Battery sizing guidelines and runtime calculations",
    "VRLA vs Wet Cell performance and lifecycle comparison",
    "UPS system integration and redundancy considerations",
    "Environmental and ventilation best practices",
    "Ready-to-use specification language for project documentation",
  ],
  buttonLabel: "Access Our Engineering Resources Library",
  buttonUrl: "/engineering-resources",
  decorImages: [
    { image: null, fallback: "/eng-1.png" },
    { image: null, fallback: "/eng-2.png" },
    { image: null, fallback: "/eng-3.png" },
    { image: null, fallback: "/eng-4.png" },
    { image: null, fallback: "/eng-5.png" },
    { image: null, fallback: "/eng-6.png" },
    { image: null, fallback: "/eng-3.png" },
  ],
};

// ── Merge helper ──
function mergeWithDefaults(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): EngineeringData {
  const merged: EngineeringData = {
    bgColor: data.bgColor || ENGINEERING_DEFAULTS.bgColor,
    title: data.title || ENGINEERING_DEFAULTS.title,
    description: data.description || ENGINEERING_DEFAULTS.description,
    highlightsTitle: data.highlightsTitle || ENGINEERING_DEFAULTS.highlightsTitle,
    highlights: data.highlightsList?.length
      ? data.highlightsList.map((h: { text: string }) => h.text)
      : ENGINEERING_DEFAULTS.highlights,
    buttonLabel: data.buttonLabel || ENGINEERING_DEFAULTS.buttonLabel,
    buttonUrl: data.buttonUrl || ENGINEERING_DEFAULTS.buttonUrl,
    decorImages: data.decorImages?.length
      ? data.decorImages.map((d: { image: DecorImage["image"] }, i: number) => ({
        image: d.image,
        fallback: ENGINEERING_DEFAULTS.decorImages[i]?.fallback || "/eng-1.png",
      }))
      : ENGINEERING_DEFAULTS.decorImages,
  };
  return merged;
}

// ── Data Fetcher ──
export async function getEngineeringData(): Promise<EngineeringData> {
  // ── Try Axion CMS first ──
  try {
    const { getAxionSection } = await import("@/lib/queries/axion-cms");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ax = await getAxionSection<any>("home", "engineering");
    if (ax && (ax.heading || ax.label)) {
      const merged = { ...ENGINEERING_DEFAULTS };
      if (ax.label) merged.title = ax.label;
      if (ax.heading) merged.title = ax.heading;
      if (ax.description) merged.description = ax.description;
      if (Array.isArray(ax.features)) {
        merged.highlights = ax.features.map((f: { title: string; description?: string }) => f.title || f.description || "");
      }
      return merged;
    }
  } catch (e) { console.log("Axion CMS engineering not available", e); }

  // ── Fallback: old ACF ──
  try {
    const data = await fetchGraphQL<{
      allEngineering: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nodes: { engineeringSection: any }[];
      };
    }>(ENGINEERING_QUERY);

    const node = data?.allEngineering?.nodes?.[0];
    if (!node?.engineeringSection) return ENGINEERING_DEFAULTS;

    return mergeWithDefaults(node.engineeringSection);
  } catch (error) {
    console.error("Failed to fetch engineering data:", error);
    return ENGINEERING_DEFAULTS;
  }
}

