import { fetchGraphQL } from "@/lib/graphql";

/**
 * Axion CMS – Generic data fetcher
 * Fetches section data from the Axion CMS plugin via WPGraphQL
 *
 * Usage:
 *   const data = await getAxionSection("home", "hero");
 *   const allData = await getAxionAllSections("home");
 */

// ── Query: single section ──
const SECTION_QUERY = `
  query GetAxionSection($page: String!, $section: String!) {
    axionPage(slug: $page) {
      section(slug: $section)
    }
  }
`;

// ── Query: all sections for a page ──
const ALL_SECTIONS_QUERY = `
  query GetAxionAllSections($page: String!) {
    axionPage(slug: $page) {
      allSections
    }
  }
`;

/**
 * Fetch a single section's data from Axion CMS
 * Returns parsed JSON object or null
 */
export async function getAxionSection<T = Record<string, unknown>>(
    pageSlug: string,
    sectionSlug: string
): Promise<T | null> {
    try {
        const result = await fetchGraphQL<{
            axionPage: { section: string } | null;
        }>(SECTION_QUERY, { page: pageSlug, section: sectionSlug });

        const json = result?.axionPage?.section;
        if (!json) return null;

        const parsed = JSON.parse(json);
        // Return null if empty object
        if (Object.keys(parsed).length === 0) return null;

        return parsed as T;
    } catch (error) {
        console.error(`Failed to fetch axion section ${pageSlug}/${sectionSlug}:`, error);
        return null;
    }
}

/**
 * Fetch all sections for a page from Axion CMS
 * Returns object with section slugs as keys, or null
 */
export async function getAxionAllSections(
    pageSlug: string
): Promise<Record<string, Record<string, unknown>> | null> {
    try {
        const result = await fetchGraphQL<{
            axionPage: { allSections: string } | null;
        }>(ALL_SECTIONS_QUERY, { page: pageSlug });

        const json = result?.axionPage?.allSections;
        if (!json) return null;

        return JSON.parse(json);
    } catch (error) {
        console.error(`Failed to fetch axion sections for ${pageSlug}:`, error);
        return null;
    }
}
