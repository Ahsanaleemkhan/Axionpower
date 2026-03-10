import { fetchGraphQL } from "@/lib/graphql";

// ── GraphQL Query ──
const CONTACT_QUERY = `
  query GetContactSection {
    allContact(first: 1) {
      nodes {
        contactSection {
          labelText
          heading
          description
          highlightsTitle
          highlightsList {
            text
          }
          buttonLabel
          buttonUrl
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
`;

// ── TypeScript Interfaces ──
export interface ContactData {
  labelText: string;
  heading: string;
  description: string;
  highlightsTitle: string;
  highlights: string[];
  buttonLabel: string;
  buttonUrl: string;
  image: { node: { sourceUrl: string; altText: string } } | null;
  fallbackImage: string;
}

// ── Default values ──
export const CONTACT_DEFAULTS: ContactData = {
  labelText: "Contact Axion Critical Power Solutions",
  heading: "Get Expert Guidance on Your Battery Systems",
  description:
    "Connect with Axion Critical Power Solutions to discuss your mission-critical power requirements, upcoming battery replacements, or technical inquiries. Our team provides engineering guidance, lifecycle support, and system recommendations to ensure reliable, compliant, and safe battery solutions.",
  highlightsTitle: "Key Highlights",
  highlights: [
    "Maintenance-free operation",
    "Compact footprint",
    "High power density",
    "Proven reliability in critical environments",
  ],
  buttonLabel: "Contact Axion Today",
  buttonUrl: "/contact",
  image: null,
  fallbackImage: "/contact-business.png",
};

// ── Merge helper ──
function mergeWithDefaults(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): ContactData {
  return {
    labelText: data.labelText || CONTACT_DEFAULTS.labelText,
    heading: data.heading || CONTACT_DEFAULTS.heading,
    description: data.description || CONTACT_DEFAULTS.description,
    highlightsTitle: data.highlightsTitle || CONTACT_DEFAULTS.highlightsTitle,
    highlights: data.highlightsList?.length
      ? data.highlightsList.map((h: { text: string }) => h.text)
      : CONTACT_DEFAULTS.highlights,
    buttonLabel: data.buttonLabel || CONTACT_DEFAULTS.buttonLabel,
    buttonUrl: data.buttonUrl || CONTACT_DEFAULTS.buttonUrl,
    image: data.image || CONTACT_DEFAULTS.image,
    fallbackImage: CONTACT_DEFAULTS.fallbackImage,
  };
}

// ── Data Fetcher ──
export async function getContactData(): Promise<ContactData> {
  // ── Try Axion CMS first ──
  try {
    const { getAxionSection } = await import("@/lib/queries/axion-cms");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ax = await getAxionSection<any>("home", "contact");
    if (ax && (ax.heading || ax.phone)) {
      const merged = { ...CONTACT_DEFAULTS };
      if (ax.heading) merged.heading = ax.heading;
      if (ax.description) merged.description = ax.description;
      if (ax.phone) merged.highlightsTitle = ax.phone;
      if (ax.email) merged.description = ax.description || merged.description;
      return merged;
    }
  } catch (e) { console.log("Axion CMS contact not available", e); }

  // ── Fallback: old ACF ──
  try {
    const data = await fetchGraphQL<{
      allContact: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nodes: { contactSection: any }[];
      };
    }>(CONTACT_QUERY);

    const node = data?.allContact?.nodes?.[0];
    if (!node?.contactSection) return CONTACT_DEFAULTS;

    return mergeWithDefaults(node.contactSection);
  } catch (error) {
    console.error("Failed to fetch contact data:", error);
    return CONTACT_DEFAULTS;
  }
}
