import { fetchGraphQL } from "@/lib/graphql";

// ── GraphQL Query ──
const SERVICES_QUERY = `
  query GetServicesSection {
    services(first: 1) {
      nodes {
        servicesSection {
          introBgColor
          midBgColor
          bottomBgColor
          labelText
          introHeading
          introButtonLabel
          introButtonUrl
          servicesList {
            title
            description
            image {
              node {
                sourceUrl
                altText
              }
            }
            buttonLabel
            buttonUrl
            isFeatured
          }
        }
      }
    }
  }
`;

// ── TypeScript Interfaces ──
export interface ServiceItem {
    title: string;
    description: string;
    image: { node: { sourceUrl: string; altText: string } } | null;
    fallbackImage: string;
    buttonLabel: string;
    buttonUrl: string;
    isFeatured: boolean;
}

export interface ServicesData {
    introBgColor: string;
    midBgColor: string;
    bottomBgColor: string;
    labelText: string;
    introHeading: string;
    introButtonLabel: string;
    introButtonUrl: string;
    services: ServiceItem[];
}

// ── Default values ──
export const SERVICES_DEFAULTS: ServicesData = {
    introBgColor: "#0284c7",
    midBgColor: "#0369a1",
    bottomBgColor: "#0c4a6e",
    labelText: "Our Services",
    introHeading:
        "Axion Critical Power Solutions offers comprehensive services to ensure your critical power systems remain reliable, compliant, and optimized throughout their lifecycle. From preventive maintenance to emergency support, we help you maximize uptime and minimize operational risk.",
    introButtonLabel: "VIEW MORE",
    introButtonUrl: "/services",
    services: [
        {
            title: "Maintenance and Monitoring",
            description:
                "Keep your UPS and DC power systems performing at peak efficiency with proactive maintenance and battery health monitoring. Axion helps prevent unexpected downtime and extends system life.",
            image: null,
            fallbackImage: "/maintenance-monitoring.png",
            buttonLabel: "Schedule Maintenance & Monitoring",
            buttonUrl: "/services/maintenance",
            isFeatured: false,
        },
        {
            title: "Emergency Support and Service Contracts",
            description:
                "Rapid response for urgent power issues. Our service contracts provide priority support, emergency replacements, and expert guidance to restore uptime quickly.",
            image: null,
            fallbackImage: "/maintenance-monitoring.png",
            buttonLabel: "Request Emergency Support",
            buttonUrl: "/services/emergency",
            isFeatured: false,
        },
        {
            title: "Replacement and Upgrades",
            description:
                "Plan and execute battery replacements or system upgrades with minimal disruption. Axion coordinates lifecycle transitions for VRLA and flooded batteries in mission-critical environments.",
            image: null,
            fallbackImage: "/maintenance-monitoring.png",
            buttonLabel: "Plan Replacement & Upgrades",
            buttonUrl: "/services/replacement",
            isFeatured: false,
        },
        {
            title: "Safety Training and Documentation",
            description:
                "Ensure your teams handle batteries safely and effectively. Axion provides training, operational manuals, and compliance documentation to reduce risk and support long-term reliability.",
            image: null,
            fallbackImage: "/maintenance-monitoring.png",
            buttonLabel: "Access Safety Training & Documentation",
            buttonUrl: "/services/training",
            isFeatured: false,
        },
    ],
};

// ── Merge helper ──
function mergeService(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    s: any,
    def: ServiceItem
): ServiceItem {
    return {
        title: s.title || def.title,
        description: s.description || def.description,
        image: s.image || def.image,
        fallbackImage: def.fallbackImage,
        buttonLabel: s.buttonLabel || def.buttonLabel,
        buttonUrl: s.buttonUrl || def.buttonUrl,
        isFeatured: s.isFeatured ?? def.isFeatured,
    };
}

function mergeWithDefaults(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
): ServicesData {
    const merged = { ...SERVICES_DEFAULTS, ...data };
    if (data.servicesList?.length) {
        merged.services = data.servicesList.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (s: any, i: number) =>
                mergeService(s, SERVICES_DEFAULTS.services[i] || SERVICES_DEFAULTS.services[0])
        );
    } else {
        merged.services = SERVICES_DEFAULTS.services;
    }
    return merged;
}

// ── Data Fetcher ──
export async function getServicesData(): Promise<ServicesData> {
    // ── Try Axion CMS first ──
    try {
        const { getAxionSection } = await import("@/lib/queries/axion-cms");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ax = await getAxionSection<any>("home", "services");
        if (ax && (ax.heading || ax.label || ax.services)) {
            const merged = { ...SERVICES_DEFAULTS };
            if (ax.label) merged.labelText = ax.label;
            if (ax.heading) merged.introHeading = ax.heading;
            if (Array.isArray(ax.services) && ax.services.length > 0) {
                merged.services = ax.services.map((s: { title: string; description: string; bg_image_url?: string; button_text?: string; button_link?: string }, i: number) => {
                    const def = SERVICES_DEFAULTS.services[i] || SERVICES_DEFAULTS.services[0];
                    return {
                        ...def,
                        title: s.title || def.title,
                        description: s.description || def.description,
                        image: s.bg_image_url ? { node: { sourceUrl: s.bg_image_url, altText: s.title } } : def.image,
                        buttonLabel: s.button_text || def.buttonLabel,
                        buttonUrl: s.button_link || def.buttonUrl,
                    };
                });
            }
            return merged;
        }
    } catch (e) { console.log("Axion CMS services not available", e); }

    // ── Fallback: old ACF ──
    try {
        const data = await fetchGraphQL<{
            services: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                nodes: { servicesSection: any }[];
            };
        }>(SERVICES_QUERY);

        const node = data?.services?.nodes?.[0];
        if (!node?.servicesSection) return SERVICES_DEFAULTS;

        return mergeWithDefaults(node.servicesSection);
    } catch (error) {
        console.error("Failed to fetch services data:", error);
        return SERVICES_DEFAULTS;
    }
}
