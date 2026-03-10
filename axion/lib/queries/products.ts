import { fetchGraphQL } from "@/lib/graphql";

// ── GraphQL Query ──
const PRODUCTS_QUERY = `
  query GetProductsSection {
    products(first: 1) {
      nodes {
        productsSection {
          introBgColor
          labelText
          labelColor
          labelBarColor
          introHeading
          introHeadingColor
          introButtonLabel
          introButtonUrl
          cardsBgColor
          productsList {
            name
            description
            image {
              node {
                sourceUrl
                altText
              }
            }
            highlights {
              text
            }
            applications {
              text
            }
            buttonLabel
            buttonUrl
            iconTop {
              node {
                sourceUrl
                altText
              }
            }
            iconBottom {
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
export interface ProductCard {
    name: string;
    description: string;
    image: { node: { sourceUrl: string; altText: string } } | null;
    fallbackImage: string;
    highlights: string[];
    applications: string[];
    buttonLabel: string;
    buttonUrl: string;
    iconTop: { node: { sourceUrl: string; altText: string } } | null;
    iconBottom: { node: { sourceUrl: string; altText: string } } | null;
}

export interface ProductsData {
    introBgColor: string;
    labelText: string;
    labelColor: string;
    labelBarColor: string;
    introHeading: string;
    introHeadingColor: string;
    introButtonLabel: string;
    introButtonUrl: string;
    cardsBgColor: string;
    products: ProductCard[];
}

// ── Default values ──
export const PRODUCTS_DEFAULTS: ProductsData = {
    introBgColor: "#f5f5f5",
    labelText: "OUR PRODUCTS",
    labelColor: "#0EA5E9",
    labelBarColor: "#0EA5E9",
    introHeading:
        '<span class="grey-text">Axion Critical Power Solutions delivers reliable,</span> high-performance battery solutions for mission-critical power systems. Our products are engineered for safety, durability, and predictable performance across data centers, industrial sites, healthcare facilities, and utility applications.',
    introHeadingColor: "#0f172a",
    introButtonLabel: "VIEW MORE",
    introButtonUrl: "/products",
    cardsBgColor: "#0a0a14",
    products: [
        {
            name: "VRLA Batteries",
            description:
                "Axion Critical Power Solutions provides high-performance, low-maintenance VRLA (Valve-Regulated Lead-Acid) batteries for mission-critical applications. Sealed and reliable, they are ideal for UPS, DC power plants, and standby systems where space efficiency, predictable performance, and operational reliability are essential.",
            image: null,
            fallbackImage: "/vrla-batteries.png",
            highlights: [
                "Maintenance-free operation",
                "Compact footprint",
                "High power density",
                "Proven reliability in critical environments",
            ],
            applications: [
                "Data center UPS systems",
                "Telecom power systems",
                "Healthcare facilities",
                "Commercial and industrial UPS installations facilities",
            ],
            buttonLabel: "Learn More",
            buttonUrl: "/vrla-batteries",
            iconTop: null,
            iconBottom: null,
        },
        {
            name: "Wet Cell (Flooded) Batteries",
            description:
                "Axion Critical Power Solutions offers robust Wet Cell (Flooded Lead-Acid) batteries for large-scale, mission-critical DC power systems. Ideal for utility, substation, and industrial applications, these batteries deliver long life, durability, and reliable performance while being fully supported through the lifecycle from selection to replacement and recycling.",
            image: null,
            fallbackImage: "/wet-cell-batteries.png",
            highlights: [
                "Long design life",
                "Proven, field-tested technology",
                "Excellent deep-cycle performance",
                "Ideal for critical infrastructure",
            ],
            applications: [
                "Utility substations",
                "Power generation facilities",
                "Industrial DC systems",
                "Long-duration backup power systems",
            ],
            buttonLabel: "Learn More",
            buttonUrl: "/wet-cell-batteries",
            iconTop: null,
            iconBottom: null,
        },
        {
            name: "Stationary Battery Cabinets",
            description:
                "Axion Critical Power Solutions provides engineered stationary battery cabinet solutions designed to integrate seamlessly with UPS and DC power systems. Our cabinets are built for safety, durability, and optimal battery performance in mission-critical environments, including data centers, healthcare facilities, and industrial operations.",
            image: null,
            fallbackImage: "/battery-cabinets.png",
            highlights: [
                "Maintenance-free operation",
                "Compact footprint",
                "High power density",
                "Proven reliability in critical environments",
            ],
            applications: [],
            buttonLabel: "Learn More",
            buttonUrl: "/battery-cabinets",
            iconTop: null,
            iconBottom: null,
        },
    ],
};

// ── Merge helper ──
function mergeProduct(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    p: any,
    def: ProductCard
): ProductCard {
    return {
        name: p.name || def.name,
        description: p.description || def.description,
        image: p.image || def.image,
        fallbackImage: def.fallbackImage,
        highlights: p.highlights?.length
            ? p.highlights.map((h: { text: string }) => h.text)
            : def.highlights,
        applications: p.applications?.length
            ? p.applications.map((a: { text: string }) => a.text)
            : def.applications,
        buttonLabel: p.buttonLabel || def.buttonLabel,
        buttonUrl: p.buttonUrl || def.buttonUrl,
        iconTop: p.iconTop || def.iconTop,
        iconBottom: p.iconBottom || def.iconBottom,
    };
}

function mergeWithDefaults(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
): ProductsData {
    const merged = { ...PRODUCTS_DEFAULTS, ...data };
    if (data.productsList?.length) {
        merged.products = data.productsList.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (p: any, i: number) =>
                mergeProduct(p, PRODUCTS_DEFAULTS.products[i] || PRODUCTS_DEFAULTS.products[0])
        );
    } else {
        merged.products = PRODUCTS_DEFAULTS.products;
    }
    return merged;
}

// ── Data Fetcher ──
export async function getProductsData(): Promise<ProductsData> {
    // ── Try Axion CMS first ──
    try {
        const { getAxionSection } = await import("@/lib/queries/axion-cms");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ax = await getAxionSection<any>("home", "products");
        if (ax && (ax.heading || ax.label || ax.products)) {
            const merged = { ...PRODUCTS_DEFAULTS };
            if (ax.label) merged.labelText = ax.label;
            if (ax.heading) merged.introHeading = ax.heading;
            if (ax.description) merged.introHeading = ax.description;
            if (Array.isArray(ax.products) && ax.products.length > 0) {
                merged.products = ax.products.map((p: { title: string; description: string; image_url?: string; link?: string }, i: number) => {
                    const def = PRODUCTS_DEFAULTS.products[i] || PRODUCTS_DEFAULTS.products[0];
                    return {
                        ...def,
                        name: p.title || def.name,
                        description: p.description || def.description,
                        image: p.image_url ? { node: { sourceUrl: p.image_url, altText: p.title } } : def.image,
                        buttonUrl: p.link || def.buttonUrl,
                    };
                });
            }
            return merged;
        }
    } catch (e) { console.log("Axion CMS products not available", e); }

    // ── Fallback: old ACF ──
    try {
        const data = await fetchGraphQL<{
            products: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                nodes: { productsSection: any }[];
            };
        }>(PRODUCTS_QUERY);

        const node = data?.products?.nodes?.[0];
        if (!node?.productsSection) return PRODUCTS_DEFAULTS;

        return mergeWithDefaults(node.productsSection);
    } catch (error) {
        console.error("Failed to fetch products data:", error);
        return PRODUCTS_DEFAULTS;
    }
}
