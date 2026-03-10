import { getAxionSection } from "@/lib/queries/axion-cms";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = any;

const FALLBACK_IMG = "/images/benefit-maintenance.png";

function val<T>(v: T): T | undefined {
    if (v === null || v === undefined) return undefined;
    if (typeof v === "string" && !v.trim()) return undefined;
    if (typeof v === "number" && v === 0) return undefined;
    if (Array.isArray(v) && v.length === 0) return undefined;
    return v;
}

function compact<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v !== undefined)
    ) as Partial<T>;
}

function img(raw: Raw, field: string): string | undefined {
    return val(raw?.[field + "_url"] || raw?.[field] || "");
}

// ═══════════════════════════════
// HERO
// ═══════════════════════════════
export interface VrlaHeroData {
    backgroundImage?: string;
    heading?: string;
    headingHighlight?: string;
    description?: string;
    keyHighlights?: string[];
    typicalApplications?: string[];
    ctaLabel?: string;
    ctaUrl?: string;
}

export async function getVrlaHeroData(): Promise<Partial<VrlaHeroData> | undefined> {
    const ax = await getAxionSection<Raw>("vrla-batteries", "hero");
    if (!ax) return undefined;

    const highlights = Array.isArray(ax.highlights)
        ? ax.highlights.map((h: Raw) => h.text as string).filter(Boolean)
        : [];

    const applications = Array.isArray(ax.applications)
        ? ax.applications.map((a: Raw) => a.text as string).filter(Boolean)
        : [];

    // VRLA hero has a single heading field (no split highlight).
    // We pass heading as-is and leave headingHighlight out entirely so the
    // component uses its own default (e.g. "BATTERIES").
    // compact() removes undefined keys so { ...DEFAULTS, ...data } works correctly.
    return compact({
        backgroundImage: img(ax, "background_image"),
        heading: val(ax.heading),
        // headingHighlight deliberately omitted — component default takes over
        description: val(ax.subtitle),
        keyHighlights: val(highlights),
        typicalApplications: val(applications),
        ctaLabel: val(ax.cta_text),
        ctaUrl: val(ax.cta_link),
    });
}

// ═══════════════════════════════
// ABOUT
// ═══════════════════════════════
export async function getVrlaAboutData(): Promise<{ label?: string; description?: string } | undefined> {
    const ax = await getAxionSection<Raw>("vrla-batteries", "about");
    if (!ax) return undefined;
    return {
        label: val(ax.label_text),
        description: val(ax.description),
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

export async function getVrlaApplicationsData(): Promise<{
    label?: string;
    heading?: string;
    cards?: AppCard[];
} | undefined> {
    const ax = await getAxionSection<Raw>("vrla-batteries", "applications");
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
// KEY BENEFITS
// ═══════════════════════════════
export interface BenefitCard {
    title: string;
    description: string;
    image: string;
}

export async function getVrlaKeyBenefitsData(): Promise<{ heading?: string; cards?: BenefitCard[] } | undefined> {
    const ax = await getAxionSection<Raw>("vrla-batteries", "key-benefits");
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
// WHY CHOOSE US
// ═══════════════════════════════
export async function getVrlaWhyChooseData(): Promise<{
    headingLine1?: string;
    headingHighlight?: string;
    headingLine3?: string;
    cards?: { number: string; text: string; variant: "white" | "blue" }[];
} | undefined> {
    const ax = await getAxionSection<Raw>("vrla-batteries", "why-choose");
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
