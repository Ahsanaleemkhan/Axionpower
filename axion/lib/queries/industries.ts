import { fetchGraphQL } from "@/lib/graphql";

// ── GraphQL Query ──
const INDUSTRIES_QUERY = `
  query GetIndustriesSection {
    allIndustry(first: 1) {
      nodes {
        industriesSection {
          sectionBgColor
          labelText
          introHeading
          industriesList {
            title
            subtitle
            description
            image {
              node {
                sourceUrl
                altText
              }
            }
            features {
              text
            }
            buttonLabel
            buttonUrl
            imageTitle
            imageButtonLabel
          }
        }
      }
    }
  }
`;

// ── TypeScript Interfaces ──
export interface IndustryItem {
    title: string;
    subtitle: string;
    description: string;
    image: { node: { sourceUrl: string; altText: string } } | null;
    fallbackImage: string;
    features: string[];
    buttonLabel: string;
    buttonUrl: string;
    imageTitle: string;
    imageButtonLabel: string;
}

export interface IndustriesData {
    sectionBgColor: string;
    labelText: string;
    introHeading: string;
    industries: IndustryItem[];
}

// ── Default values ──
export const INDUSTRIES_DEFAULTS: IndustriesData = {
    sectionBgColor: "#f8f9fa",
    labelText: "Industries We Serve",
    introHeading:
        '<span class="grey-text">Axion Critical Power Solutions provides mission-critical battery</span> solutions across a range of industries, ensuring continuous uptime, regulatory compliance, and reliable performance.',
    industries: [
        {
            title: "Data Centers & Colocation Power Solutions",
            subtitle: "Always-On Power for Always-On Infrastructure",
            description:
                "Data centers and colocation facilities cannot afford downtime. Axion Critical Power Solutions delivers resilient, scalable, and compliant battery solutions to keep mission-critical infrastructure running 24/7. Our focus on VRLA and wet cell battery systems, lifecycle support, and technical expertise ensures uptime, reliability, and safety.",
            image: null,
            fallbackImage: "/data-center.png",
            features: [
                "VRLA and wet cell batteries for critical infrastructure",
                "Preventive maintenance, monitoring, & lifecycle management",
                "Compliance with electrical, safety, & environmental standards",
                "Integration with UPS, DC power plants, & backup systems",
            ],
            buttonLabel: "Explore Data Center Power Solutions",
            buttonUrl: "/industries/data-centers",
            imageTitle: "",
            imageButtonLabel: "",
        },
        {
            title: "Reliable Battery Systems for Mission-Critical Telecom Networks",
            subtitle: "",
            description:
                "Telecommunications networks require uninterrupted power to maintain connectivity, service quality, and emergency communications. Axion Critical Power Solutions provides VRLA and flooded battery systems, engineering support, and lifecycle management to ensure reliable, compliant, and predictable performance across telecom infrastructure.",
            image: null,
            fallbackImage: "/telecom-power.png",
            features: [
                "VRLA and flooded batteries for central offices, cell sites, and data hubs",
                "Engineering guidance for sizing, redundancy, and system integration",
                "Maintenance, monitoring, and emergency response services",
                "Compliance with telecom, electrical, and environmental standards",
            ],
            buttonLabel: "",
            buttonUrl: "/industries/telecom",
            imageTitle: "Telecommunications Power Solutions",
            imageButtonLabel: "Explore Telecommunications Battery Solutions",
        },
        {
            title: "Reliable Battery Systems for Utility & Substation Applications",
            subtitle: "",
            description:
                "Utility and substation environments require battery systems that provide long-term reliability, predictable performance, and compliance with industry standards. Axion Critical Power Solutions delivers VRLA and flooded battery systems, along with engineering support, lifecycle services, and technical guidance, to ensure mission-critical DC power applications perform safely and efficiently.",
            image: null,
            fallbackImage: "/utility-substation.png",
            features: [
                "VRLA and flooded batteries for substations and utility infrastructure",
                "Technical consultation for battery sizing, configuration, and system integration",
                "Maintenance, monitoring, and end-of-life support",
                "Compliance with IEEE, utility, and environmental standards",
            ],
            buttonLabel: "",
            buttonUrl: "/industries/utilities",
            imageTitle: "Utilities & Substations Power Solutions",
            imageButtonLabel: "Explore Utility & Substation Battery Solutions",
        },
        {
            title: "Reliable Battery Systems for Healthcare Facilities",
            subtitle: "",
            description:
                "Healthcare facilities require uninterrupted power to protect life-safety systems, critical medical equipment, and essential operations. Axion Critical Power Solutions delivers reliable VRLA and wet cell battery systems, along with technical consultation, monitoring, and lifecycle support, to ensure mission-critical healthcare environments remain powered, safe, and compliant.",
            image: null,
            fallbackImage: "/healthcare-power.png",
            features: [
                "VRLA and wet cell batteries for hospitals and medical centers",
                "Engineering support for system sizing, redundancy, and UPS integration",
                "Maintenance, monitoring, and emergency response services",
                "Compliance with healthcare and electrical safety standards",
            ],
            buttonLabel: "",
            buttonUrl: "/industries/healthcare",
            imageTitle: "Healthcare Power Solutions",
            imageButtonLabel: "Explore Healthcare Power Solutions",
        },
        {
            title: "Reliable Battery Systems for Industrial & Critical Infrastructure",
            subtitle: "",
            description:
                "Industrial and infrastructure facilities require uninterrupted power for process control, safety systems, and critical operations. Axion Critical Power Solutions provides VRLA and wet cell battery systems along with technical consultation, monitoring, and lifecycle support to ensure durable, reliable, and compliant power for demanding industrial environments.",
            image: null,
            fallbackImage: "/industrial-power.png",
            features: [
                "VRLA and wet cell batteries for industrial and infrastructure systems",
                "Engineering support for sizing, redundancy, and UPS/DC integration",
                "Maintenance, monitoring, and emergency response services",
                "Compliance with electrical, safety, and environmental standards",
            ],
            buttonLabel: "",
            buttonUrl: "/industries/industrial",
            imageTitle: "Industrial & Infrastructure Power Solutions",
            imageButtonLabel: "Explore Industrial & Infrastructure Power Solutions",
        },
    ],
};

// ── Merge helpers ──
function mergeIndustry(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any,
    def: IndustryItem
): IndustryItem {
    return {
        title: item.title || def.title,
        subtitle: item.subtitle || def.subtitle,
        description: item.description || def.description,
        image: item.image || def.image,
        fallbackImage: def.fallbackImage,
        features: item.features?.length
            ? item.features.map((f: { text: string }) => f.text)
            : def.features,
        buttonLabel: item.buttonLabel || def.buttonLabel,
        buttonUrl: item.buttonUrl || def.buttonUrl,
        imageTitle: item.imageTitle || def.imageTitle,
        imageButtonLabel: item.imageButtonLabel || def.imageButtonLabel,
    };
}

function mergeWithDefaults(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
): IndustriesData {
    const merged = { ...INDUSTRIES_DEFAULTS, ...data };
    if (data.industriesList?.length) {
        merged.industries = data.industriesList.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item: any, i: number) =>
                mergeIndustry(item, INDUSTRIES_DEFAULTS.industries[i] || INDUSTRIES_DEFAULTS.industries[0])
        );
    } else {
        merged.industries = INDUSTRIES_DEFAULTS.industries;
    }
    return merged;
}

// ── Data Fetcher ──
export async function getIndustriesData(): Promise<IndustriesData> {
    // ── Try Axion CMS first ──
    try {
        const { getAxionSection } = await import("@/lib/queries/axion-cms");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ax = await getAxionSection<any>("home", "industries");
        if (ax && (ax.heading || ax.label || ax.industries)) {
            const merged = { ...INDUSTRIES_DEFAULTS };
            if (ax.label) merged.labelText = ax.label;
            if (ax.heading) merged.introHeading = ax.heading;
            if (Array.isArray(ax.industries) && ax.industries.length > 0) {
                merged.industries = ax.industries.map((ind: { title: string; description: string; image_url?: string }, i: number) => {
                    const def = INDUSTRIES_DEFAULTS.industries[i] || INDUSTRIES_DEFAULTS.industries[0];
                    return {
                        ...def,
                        title: ind.title || def.title,
                        description: ind.description || def.description,
                        image: ind.image_url ? { node: { sourceUrl: ind.image_url, altText: ind.title } } : def.image,
                    };
                });
            }
            return merged;
        }
    } catch (e) { console.log("Axion CMS industries not available", e); }

    // ── Fallback: old ACF ──
    try {
        const data = await fetchGraphQL<{
            allIndustry: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                nodes: { industriesSection: any }[];
            };
        }>(INDUSTRIES_QUERY);

        const node = data?.allIndustry?.nodes?.[0];
        if (!node?.industriesSection) return INDUSTRIES_DEFAULTS;

        return mergeWithDefaults(node.industriesSection);
    } catch (error) {
        console.error("Failed to fetch industries data:", error);
        return INDUSTRIES_DEFAULTS;
    }
}
