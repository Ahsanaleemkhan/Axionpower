import { fetchGraphQL } from "@/lib/graphql";

// ── GraphQL Query ──
const FAQ_QUERY = `
  query GetFaqSection {
    allFaq(first: 1) {
      nodes {
        faqSection {
          bgColor
          labelText
          heading
          introText
          faqsList {
            question
            answersList {
              text
            }
          }
        }
      }
    }
  }
`;

// ── TypeScript Interfaces ──
export interface FaqItem {
    question: string;
    answers: string[];
}

export interface FaqData {
    bgColor: string;
    labelText: string;
    heading: string;
    introText: string;
    faqs: FaqItem[];
}

// ── Default values ──
export const FAQ_DEFAULTS: FaqData = {
    bgColor: "#f8f9fa",
    labelText: "Frequently Asked Questions",
    heading: "Answers for Critical Power Battery Systems",
    introText:
        '<span class="blue-text">Have questions about VRLA or flooded (wet cell)</span> batteries? Axion Critical Power Solutions provides clear, reliable answers to common questions about battery performance, maintenance, warranties, and end-of-life management.',
    faqs: [
        {
            question: "How long do VRLA and flooded (wet cell) batteries last?",
            answers: [
                "VRLA batteries generally last 5–12 years, depending on load, temperature, and operating conditions.",
                "Flooded (wet cell) batteries typically last 10–20 years with proper maintenance and monitoring.",
                "Lifecycle planning, periodic testing, and environmental controls help maximize performance and predictability.",
            ],
        },
        {
            question: "What maintenance is required for VRLA and wet cell batteries?",
            answers: [
                "VRLA batteries are largely maintenance-free but should be inspected periodically for voltage, temperature, and visual signs of wear.",
                "Flooded (wet cell) batteries require regular electrolyte checks, cleaning, terminal maintenance, and periodic equalization charging to ensure long-term reliability.",
            ],
        },
        {
            question: "What are typical lead times for battery orders?",
            answers: [
                "Lead times depend on battery type, size, quantity, and project requirements. Axion coordinates with manufacturers to provide accurate delivery schedules, typically ranging 2–8 weeks depending on inventory availability and project complexity.",
            ],
        },
        {
            question: "What warranties are offered on batteries?",
            answers: [
                "VRLA and wet cell batteries come with manufacturer warranties covering defects in materials and workmanship.",
                "Warranty periods vary by battery type, manufacturer, and application.",
                "Axion ensures that documentation, compliance, and warranty claims are supported throughout the system lifecycle.",
            ],
        },
        {
            question: "How should batteries be disposed of or recycled?",
            answers: [
                "Axion provides environmentally responsible battery recycling in coordination with certified partners, ensuring compliance with federal, provincial, and local regulations. This minimizes environmental impact while supporting safe disposal.",
            ],
        },
    ],
};

// ── Merge helper ──
function mergeWithDefaults(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
): FaqData {
    return {
        bgColor: data.bgColor || FAQ_DEFAULTS.bgColor,
        labelText: data.labelText || FAQ_DEFAULTS.labelText,
        heading: data.heading || FAQ_DEFAULTS.heading,
        introText: data.introText || FAQ_DEFAULTS.introText,
        faqs: data.faqsList?.length
            ? data.faqsList.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (f: any, i: number) => ({
                    question: f.question || FAQ_DEFAULTS.faqs[i]?.question || "",
                    answers: f.answersList?.length
                        ? f.answersList.map((a: { text: string }) => a.text)
                        : FAQ_DEFAULTS.faqs[i]?.answers || [],
                })
            )
            : FAQ_DEFAULTS.faqs,
    };
}

// ── Data Fetcher ──
export async function getFaqData(): Promise<FaqData> {
    // ── Try Axion CMS first ──
    try {
        const { getAxionSection } = await import("@/lib/queries/axion-cms");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ax = await getAxionSection<any>("home", "faq");
        if (ax && (ax.heading || ax.faqs)) {
            const merged = { ...FAQ_DEFAULTS };
            if (ax.heading) merged.heading = ax.heading;
            if (Array.isArray(ax.faqs) && ax.faqs.length > 0) {
                merged.faqs = ax.faqs.map((f: { question: string; answer: string }) => ({
                    question: f.question,
                    answers: [f.answer],
                }));
            }
            return merged;
        }
    } catch (e) { console.log("Axion CMS faq not available", e); }

    // ── Fallback: old ACF ──
    try {
        const data = await fetchGraphQL<{
            allFaq: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                nodes: { faqSection: any }[];
            };
        }>(FAQ_QUERY);

        const node = data?.allFaq?.nodes?.[0];
        if (!node?.faqSection) return FAQ_DEFAULTS;

        return mergeWithDefaults(node.faqSection);
    } catch (error) {
        console.error("Failed to fetch FAQ data:", error);
        return FAQ_DEFAULTS;
    }
}
