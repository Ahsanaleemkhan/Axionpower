import { getAxionSection } from "@/lib/queries/axion-cms";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = any;

const FALLBACK_IMG = "/images/benefit-maintenance.png";

// ─── val(): convert empty string / 0 / empty array / null → undefined
// so components always fall back to their own DEFAULTS for unchanged fields.
function val<T>(v: T): T | undefined {
    if (v === null || v === undefined) return undefined;
    if (typeof v === "string" && !v.trim()) return undefined;
    if (typeof v === "number" && v === 0) return undefined;
    if (Array.isArray(v) && v.length === 0) return undefined;
    return v;
}

// ─── compact(): strip keys whose value is undefined.
// Required for hero components that merge via { ...DEFAULTS, ...data }
// because { ...DEFAULTS, key: undefined } DOES override the default.
function compact<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v !== undefined)
    ) as Partial<T>;
}

// ─── img(): resolve image URL from Axion CMS, returns undefined if none
function img(raw: Raw, field: string): string | undefined {
    return val(raw?.[field + "_url"] || raw?.[field] || "");
}

// ═══════════════════════════════
// HERO
// ═══════════════════════════════
export interface CabinetsHeroData {
    backgroundImage?: string;
    heading?: string;
    headingHighlight?: string;
    description?: string;
    keyHighlights?: string[];
    ctaLabel?: string;
    ctaUrl?: string;
}

export async function getCabinetsHeroData(): Promise<Partial<CabinetsHeroData> | undefined> {
    const ax = await getAxionSection<Raw>("battery-cabinets", "hero");
    if (!ax) return undefined;

    const highlights = Array.isArray(ax.highlights)
        ? ax.highlights.map((h: Raw) => h.text as string).filter(Boolean)
        : [];

    // compact() is critical here: CabinetsHeroSection does { ...DEFAULTS, ...data }
    // so undefined keys must be removed or they overwrite component DEFAULTS.
    return compact({
        backgroundImage: img(ax, "background_image"),
        heading: val(ax.heading),
        headingHighlight: val(ax.heading_highlight),
        description: val(ax.description),
        keyHighlights: val(highlights),
        ctaLabel: val(ax.cta_text),
        ctaUrl: val(ax.cta_link),
    });
}

// ═══════════════════════════════
// ABOUT
// Destructuring defaults — undefined prop → component default kicks in.
// ═══════════════════════════════
export async function getCabinetsAboutData(): Promise<{ label?: string; description?: string } | undefined> {
    const ax = await getAxionSection<Raw>("battery-cabinets", "about");
    if (!ax) return undefined;
    return {
        label: val(ax.label_text),
        description: val(ax.description),
    };
}

// ═══════════════════════════════
// ENGINEERED
// ═══════════════════════════════
export async function getCabinetsEngineeredData(): Promise<{ label?: string; description?: string; image?: string } | undefined> {
    const ax = await getAxionSection<Raw>("battery-cabinets", "engineered");
    if (!ax) return undefined;
    return {
        label: val(ax.label_text),
        description: val(ax.description),
        image: img(ax, "image"),
    };
}

// ═══════════════════════════════
// KEY BENEFITS
// ═══════════════════════════════
export interface BenefitCard {
    title: string;
    description: string;
    image: string;
}

export async function getCabinetsKeyBenefitsData(): Promise<{ heading?: string; cards?: BenefitCard[] } | undefined> {
    const ax = await getAxionSection<Raw>("battery-cabinets", "key-benefits");
    if (!ax) return undefined;

    const cards = Array.isArray(ax.cards) && ax.cards.length > 0
        ? ax.cards.map((c: Raw) => ({
            title: c.title || "",
            description: c.description || "",
            image: img(c, "image") || FALLBACK_IMG,
        }))
        : undefined;

    return {
        heading: val(ax.heading),
        cards,
    };
}

// ═══════════════════════════════
// FEATURES
// ═══════════════════════════════
export async function getCabinetsFeaturesData(): Promise<{
    label?: string;
    features?: { text: string; bold?: boolean }[];
    image?: string;
} | undefined> {
    const ax = await getAxionSection<Raw>("battery-cabinets", "features");
    if (!ax) return undefined;

    const features = Array.isArray(ax.features) && ax.features.length > 0
        ? ax.features.map((f: Raw, i: number) => ({
            text: f.text || "",
            bold: i === 0 || f.bold === "1" || f.bold === true,
        }))
        : undefined;

    return {
        label: val(ax.label_text),
        features,
        image: img(ax, "image"),
    };
}

// ═══════════════════════════════
// APPLICATIONS
// ═══════════════════════════════
export interface AppCard {
    title: string;
    description: string;
    image: string;
}

export async function getCabinetsApplicationsData(): Promise<{
    label?: string;
    heading?: string;
    cards?: AppCard[];
} | undefined> {
    const ax = await getAxionSection<Raw>("battery-cabinets", "applications");
    if (!ax) return undefined;

    const cards = Array.isArray(ax.cards) && ax.cards.length > 0
        ? ax.cards.map((c: Raw) => ({
            title: c.title || "",
            description: c.description || "",
            image: img(c, "image") || FALLBACK_IMG,
        }))
        : undefined;

    return {
        label: val(ax.label),
        heading: val(ax.heading),
        cards,
    };
}

// ═══════════════════════════════
// APPROACH
// ═══════════════════════════════
export async function getCabinetsApproachData(): Promise<{
    label?: string;
    description?: string;
    items?: { title: string; image: string }[];
} | undefined> {
    const ax = await getAxionSection<Raw>("battery-cabinets", "approach");
    if (!ax) return undefined;

    const items = Array.isArray(ax.items) && ax.items.length > 0
        ? ax.items.map((item: Raw) => ({
            title: item.title || "",
            image: img(item, "image") || FALLBACK_IMG,
        }))
        : undefined;

    return {
        label: val(ax.label_text),
        description: val(ax.description),
        items,
    };
}

// ═══════════════════════════════
// WHY CHOOSE US
// ═══════════════════════════════
export async function getCabinetsWhyChooseData(): Promise<{
    headingLine1?: string;
    headingHighlight?: string;
    headingLine3?: string;
    cards?: { number: string; text: string; variant: "white" | "blue" }[];
} | undefined> {
    const ax = await getAxionSection<Raw>("battery-cabinets", "why-choose");
    if (!ax) return undefined;

    const cards = Array.isArray(ax.cards) && ax.cards.length > 0
        ? ax.cards.map((c: Raw) => ({
            number: c.number || "",
            text: c.text || "",
            variant: (c.variant === "blue" ? "blue" : "white") as "white" | "blue",
        }))
        : undefined;

    return {
        headingLine1: val(ax.heading_line1),
        headingHighlight: val(ax.heading_highlight),
        headingLine3: val(ax.heading_line3),
        cards,
    };
}
