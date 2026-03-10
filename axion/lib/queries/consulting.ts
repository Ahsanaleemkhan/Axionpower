import { fetchGraphQL } from "@/lib/graphql";

// ── GraphQL Query ──
const CONSULTING_QUERY = `
  query GetConsultingSection {
    allConsulting(first: 1) {
      nodes {
        consultingSection {
          labelText
          heading
          description
          buttonLabel
          buttonUrl
          image {
            node {
              sourceUrl
              altText
            }
          }
          tooltipsList {
            text
          }
        }
      }
    }
  }
`;

// ── TypeScript Interfaces ──
export interface ConsultingData {
  labelText: string;
  heading: string;
  description: string;
  buttonLabel: string;
  buttonUrl: string;
  image: { node: { sourceUrl: string; altText: string } } | null;
  fallbackImage: string;
  tooltips: string[];
}

// ── Default values ──
export const CONSULTING_DEFAULTS: ConsultingData = {
  labelText: "Consulting Engineer Hub",
  heading: "Technical Support for Specifiers & Engineers",
  description:
    "Axion Critical Power Solutions provides a dedicated hub for consulting engineers, specifiers, and project managers. Access technical guidance, basis-of-design resources, and ready-to-use specification language to streamline critical power project design, documentation, and approval.",
  buttonLabel: "Visit Our Consulting Engineer Hub",
  buttonUrl: "/consulting",
  image: null,
  fallbackImage: "/consulting-engineers.png",
  tooltips: [
    "Specification support and project guidance for VRLA and flooded batteries",
    "Basis-of-design documentation and selection criteria",
    "Ready-to-use cut sheets and datasheets for battery systems",
    "CSI / MasterFormat language templates for consistent documentation",
  ],
};

// ── Merge helper ──
function mergeWithDefaults(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): ConsultingData {
  return {
    labelText: data.labelText || CONSULTING_DEFAULTS.labelText,
    heading: data.heading || CONSULTING_DEFAULTS.heading,
    description: data.description || CONSULTING_DEFAULTS.description,
    buttonLabel: data.buttonLabel || CONSULTING_DEFAULTS.buttonLabel,
    buttonUrl: data.buttonUrl || CONSULTING_DEFAULTS.buttonUrl,
    image: data.image || CONSULTING_DEFAULTS.image,
    fallbackImage: CONSULTING_DEFAULTS.fallbackImage,
    tooltips: data.tooltipsList?.length
      ? data.tooltipsList.map((t: { text: string }) => t.text)
      : CONSULTING_DEFAULTS.tooltips,
  };
}

// ── Data Fetcher ──
export async function getConsultingData(): Promise<ConsultingData> {
  // ── Try Axion CMS first ──
  try {
    const { getAxionSection } = await import("@/lib/queries/axion-cms");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ax = await getAxionSection<any>("home", "consulting");
    if (ax && (ax.heading || ax.label)) {
      const merged = { ...CONSULTING_DEFAULTS };
      if (ax.label) merged.labelText = ax.label;
      if (ax.heading) merged.heading = ax.heading;
      if (ax.description) merged.description = ax.description;
      if (ax.image_url) merged.image = { node: { sourceUrl: ax.image_url, altText: ax.heading || "" } };
      if (Array.isArray(ax.points)) {
        merged.tooltips = ax.points.map((p: { title: string }) => p.title);
      }
      return merged;
    }
  } catch (e) { console.log("Axion CMS consulting not available", e); }

  // ── Fallback: old ACF ──
  try {
    const data = await fetchGraphQL<{
      allConsulting: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nodes: { consultingSection: any }[];
      };
    }>(CONSULTING_QUERY);

    const node = data?.allConsulting?.nodes?.[0];
    if (!node?.consultingSection) return CONSULTING_DEFAULTS;

    return mergeWithDefaults(node.consultingSection);
  } catch (error) {
    console.error("Failed to fetch consulting data:", error);
    return CONSULTING_DEFAULTS;
  }
}
