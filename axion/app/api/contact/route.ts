import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { formType, ...fields } = body;

        // ── Validate formType ──
        if (!formType || typeof formType !== "string") {
            return NextResponse.json(
                { error: "Form type is required." },
                { status: 400 }
            );
        }

        // ── Validate required fields ──
        const errors: string[] = [];

        if (!fields.fullName?.trim()) {
            errors.push("Full name is required.");
        } else if (fields.fullName.trim().length > 200) {
            errors.push("Full name must be under 200 characters.");
        }

        if (!fields.email?.trim()) {
            errors.push("Email address is required.");
        } else if (!EMAIL_REGEX.test(fields.email.trim())) {
            errors.push("Please enter a valid email address.");
        }

        if (fields.message && fields.message.length > 5000) {
            errors.push("Message must be under 5000 characters.");
        }

        if (errors.length > 0) {
            return NextResponse.json({ error: errors[0], errors }, { status: 400 });
        }

        // ── Forward to WordPress REST API ──
        const wpUrl = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL?.replace("/graphql", "");
        const wpRestUrl = `${wpUrl}/wp-json/axion/v1/contact-form`;

        try {
            const wpRes = await fetch(wpRestUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    form_type: formType,
                    fields,
                }),
            });

            if (!wpRes.ok) {
                console.warn("WordPress API returned:", wpRes.status);
            }
        } catch (wpError) {
            console.warn("Could not reach WordPress API:", wpError);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
