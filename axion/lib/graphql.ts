const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL!;

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.warn(`GraphQL request failed with status ${res.status}`);
      return null as T;
    }

    const json = await res.json();

    if (json.errors) {
      console.warn("GraphQL warnings:", json.errors.map((e: { message: string }) => e.message).join(", "));
    }

    return json.data as T;
  } catch (error) {
    console.warn("GraphQL fetch failed:", error);
    return null as T;
  }
}
