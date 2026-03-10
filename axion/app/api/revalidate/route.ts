import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const KNOWN_PATHS = ["/", "/battery-cabinets", "/vrla-batteries", "/wet-cell-batteries"];

export async function POST(req: NextRequest) {
    const secret = req.headers.get("x-revalidate-secret");

    if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Revalidate all known page paths
        for (const path of KNOWN_PATHS) {
            revalidatePath(path);
        }

        return NextResponse.json({ revalidated: true, paths: KNOWN_PATHS });
    } catch (error) {
        console.error("Revalidation error:", error);
        return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
    }
}
