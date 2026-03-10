import { fetchGraphQL } from "@/lib/graphql";

// ── GraphQL Query — fetches hero post by slug from "heros" CPT ──
const HERO_QUERY_BY_SLUG = `
  query GetHeroBySlug($slug: String!) {
    heros(where: { name: $slug }, first: 1) {
      nodes {
        heroSection {
          backgroundImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          backgroundImageMobile {
            node {
              sourceUrl
              altText
            }
          }
          overlayColor
          overlayOpacity
          headingText
          headingTag
          headingColor
          headingFontSize
          headingFontSizeMobile
          subheadingText
          subheadingColor
          subheadingFontSize
          subheadingFontSizeMobile
          sectionMinHeight
          contentAlignment
          contentMaxWidth
          ctaPrimary {
            label
            url
            openInNewTab
            icon {
              node {
                sourceUrl
                altText
              }
            }
            gradientStartColor
            gradientEndColor
            gradientDirection
            textColor
            fontSize
            borderRadius
            hoverGradientStart
            hoverGradientEnd
          }
          ctaSecondary {
            label
            url
            openInNewTab
            backgroundColor
            textColor
            fontSize
            borderColor
            borderRadius
            hoverBackgroundColor
            hoverTextColor
          }
        }
      }
    }
  }
`;

const HERO_QUERY_FIRST = `
  query GetHeroFirst {
    heros(first: 1) {
      nodes {
        heroSection {
          backgroundImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          backgroundImageMobile {
            node {
              sourceUrl
              altText
            }
          }
          overlayColor
          overlayOpacity
          headingText
          headingTag
          headingColor
          headingFontSize
          headingFontSizeMobile
          subheadingText
          subheadingColor
          subheadingFontSize
          subheadingFontSizeMobile
          sectionMinHeight
          contentAlignment
          contentMaxWidth
          ctaPrimary {
            label
            url
            openInNewTab
            icon {
              node {
                sourceUrl
                altText
              }
            }
            gradientStartColor
            gradientEndColor
            gradientDirection
            textColor
            fontSize
            borderRadius
            hoverGradientStart
            hoverGradientEnd
          }
          ctaSecondary {
            label
            url
            openInNewTab
            backgroundColor
            textColor
            fontSize
            borderColor
            borderRadius
            hoverBackgroundColor
            hoverTextColor
          }
        }
      }
    }
  }
`;

// ── TypeScript Interfaces ──
export interface HeroImageNode {
  sourceUrl: string;
  altText: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}

export interface HeroCTAPrimary {
  label: string;
  url: string;
  openInNewTab: boolean;
  icon?: { node: { sourceUrl: string; altText: string } } | null;
  gradientStartColor: string;
  gradientEndColor: string;
  gradientDirection: string;
  textColor: string;
  fontSize: number;
  borderRadius: number;
  hoverGradientStart: string;
  hoverGradientEnd: string;
}

export interface HeroCTASecondary {
  label: string;
  url: string;
  openInNewTab: boolean;
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  borderColor: string;
  borderRadius: number;
  hoverBackgroundColor: string;
  hoverTextColor: string;
}

export interface HeroData {
  backgroundImage: { node: HeroImageNode } | null;
  backgroundImageMobile?: { node: HeroImageNode } | null;
  overlayColor: string;
  overlayOpacity: number;
  headingText: string;
  headingTag: string;
  headingColor: string;
  headingFontSize: number;
  headingFontSizeMobile: number;
  subheadingText: string;
  subheadingColor: string;
  subheadingFontSize: number;
  subheadingFontSizeMobile: number;
  sectionMinHeight: number;
  contentAlignment: string;
  contentMaxWidth: number;
  ctaPrimary: HeroCTAPrimary;
  ctaSecondary: HeroCTASecondary;
}

// ── Default values ──
export const HERO_DEFAULTS: HeroData = {
  backgroundImage: { node: { sourceUrl: "/hero-bg.png", altText: "Axion Critical Power Solutions" } },
  backgroundImageMobile: null,
  overlayColor: "#000000",
  overlayOpacity: 50,
  headingText: "Reliable Battery Solutions for\nMission-Critical Power Systems",
  headingTag: "h1",
  headingColor: "#FFFFFF",
  headingFontSize: 38,
  headingFontSizeMobile: 24,
  subheadingText: "Axion Critical Power Solutions specializes in VRLA and wet cell batteries for critical power applications where reliability is non-negotiable.",
  subheadingColor: "#CCCCCC",
  subheadingFontSize: 16,
  subheadingFontSizeMobile: 14,
  sectionMinHeight: 100,
  contentAlignment: "center",
  contentMaxWidth: 800,
  ctaPrimary: {
    label: "Request a Quote",
    url: "/contact",
    openInNewTab: false,
    gradientStartColor: "#0EA5E9",
    gradientEndColor: "#0369a1",
    gradientDirection: "to right",
    textColor: "#FFFFFF",
    fontSize: 13,
    borderRadius: 50,
    hoverGradientStart: "#0284c7",
    hoverGradientEnd: "#075985",
  },
  ctaSecondary: {
    label: "Speak with an Expert",
    url: "/contact",
    openInNewTab: false,
    backgroundColor: "#000000",
    textColor: "#FFFFFF",
    fontSize: 13,
    borderColor: "#333333",
    borderRadius: 50,
    hoverBackgroundColor: "#FFFFFF",
    hoverTextColor: "#0f172a",
  },
};

// Helper: extract first value from array or string
function firstValue(
  val: string[] | string | undefined,
  fallback: string
): string {
  if (Array.isArray(val)) return val[0] || fallback;
  return val || fallback;
}

// ── Data Fetcher — tries Axion CMS first, falls back to old ACF ──
export async function getHeroData(slug?: string): Promise<HeroData> {
  // ── Try Axion CMS Plugin first ──
  try {
    const { getAxionSection } = await import("@/lib/queries/axion-cms");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const axion = await getAxionSection<any>("home", "hero");

    if (axion && axion.heading_text) {
      // Map flat Axion CMS data → nested HeroData format
      return {
        backgroundImage: axion.background_image_url
          ? { node: { sourceUrl: axion.background_image_url, altText: "Hero background" } }
          : null,
        backgroundImageMobile: axion.background_image_mobile_url
          ? { node: { sourceUrl: axion.background_image_mobile_url, altText: "Hero background mobile" } }
          : null,
        overlayColor: axion.overlay_color || "#000000",
        overlayOpacity: parseInt(axion.overlay_opacity || "60", 10),
        headingText: axion.heading_text || "Welcome",
        headingTag: axion.heading_tag || "h1",
        headingColor: "#FFFFFF",
        headingFontSize: 56,
        headingFontSizeMobile: 32,
        subheadingText: axion.subtitle_text || "",
        subheadingColor: "#CCCCCC",
        subheadingFontSize: 18,
        subheadingFontSizeMobile: 15,
        sectionMinHeight: 100,
        contentAlignment: "center",
        contentMaxWidth: 800,
        ctaPrimary: {
          label: axion.cta_text || "Explore Our Products",
          url: axion.cta_link || "#products",
          openInNewTab: false,
          gradientStartColor: "#0EA5E9",
          gradientEndColor: "#0369a1",
          gradientDirection: "to right",
          textColor: "#FFFFFF",
          fontSize: 16,
          borderRadius: 50,
          hoverGradientStart: "#0284c7",
          hoverGradientEnd: "#075985",
        },
        ctaSecondary: {
          label: axion.secondary_cta_text || "Contact Us",
          url: axion.secondary_cta_link || "#contact",
          openInNewTab: false,
          backgroundColor: "transparent",
          textColor: "#FFFFFF",
          fontSize: 16,
          borderColor: "#FFFFFF",
          borderRadius: 50,
          hoverBackgroundColor: "#FFFFFF",
          hoverTextColor: "#0f172a",
        },
      };
    }
  } catch (e) {
    console.log("Axion CMS not available, trying ACF fallback...", e);
  }

  // ── Fallback: old ACF query ──
  try {
    const query = slug ? HERO_QUERY_BY_SLUG : HERO_QUERY_FIRST;
    const variables = slug ? { slug } : undefined;

    const data = await fetchGraphQL<{
      heros: { nodes: { heroSection: HeroData }[] };
    }>(query, variables);

    const firstNode = data?.heros?.nodes?.[0];
    if (!firstNode) return HERO_DEFAULTS;

    const hero = firstNode.heroSection;

    // Normalize array fields to strings
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hero.contentAlignment = firstValue(hero.contentAlignment as any, "center");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hero.headingTag = firstValue(hero.headingTag as any, "h1");
    if (hero.ctaPrimary) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hero.ctaPrimary.gradientDirection = firstValue(hero.ctaPrimary.gradientDirection as any, "to right");
    }

    return hero;
  } catch (error) {
    console.error("Failed to fetch hero data:", error);
    return HERO_DEFAULTS;
  }
}

