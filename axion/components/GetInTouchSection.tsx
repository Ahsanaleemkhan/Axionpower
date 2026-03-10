"use client";

import { useState, useEffect } from "react";
import "./GetInTouchSection.css";

// ── Types ──
interface FormField {
    name: string;
    label: string;
    type: "text" | "email" | "tel" | "textarea" | "select";
    required?: boolean;
    half?: boolean;
    options?: string[];
}

interface FormTab {
    label: string;
    fields: FormField[];
}

interface FormConfig {
    label: string;
    heading: string;
    buttonLabel: string;
    tabs: FormTab[];
}

// ── Default form configs (fallback if admin hasn't set up) ──
const DEFAULT_CONFIG: FormConfig = {
    label: "Get In Touch",
    heading: "Let's Work Together For Your\nNext Projects",
    buttonLabel: "Send Message",
    tabs: [
        {
            label: "Request a Quote",
            fields: [
                { name: "fullName", label: "Full Name", type: "text", required: true, half: true },
                { name: "email", label: "Email Address", type: "email", required: true, half: true },
                { name: "phone", label: "Phone", type: "tel", half: true },
                { name: "company", label: "Company / Organization", type: "select", half: true, options: ["Data Center", "Telecom Provider", "Healthcare Facility", "Utility Company", "Industrial Facility", "Government Agency", "Other"] },
                { name: "batteryType", label: "Battery Type Required", type: "select", half: true, options: ["VRLA", "Wet Cell / Flooded", "Lithium-Ion", "Not Sure"] },
                { name: "quantity", label: "Estimated Quantity", type: "text", half: true },
                { name: "projectTimeline", label: "Project Timeline", type: "text", half: true },
                { name: "budget", label: "Budget Range", type: "select", half: true, options: ["Under $10,000", "$10,000 - $50,000", "$50,000 - $100,000", "$100,000+", "Not Sure"] },
                { name: "message", label: "Project Details / Special Requirements", type: "textarea", required: true },
            ],
        },
        {
            label: "Technical Inquiry",
            fields: [
                { name: "fullName", label: "Full Name", type: "text", required: true, half: true },
                { name: "email", label: "Email Address", type: "email", required: true, half: true },
                { name: "phone", label: "Phone", type: "tel", half: true },
                { name: "jobTitle", label: "Job Title / Role", type: "text", half: true },
                { name: "company", label: "Company / Organization", type: "select", half: true, options: ["Data Center", "Telecom Provider", "Healthcare Facility", "Utility Company", "Industrial Facility", "Government Agency", "Other"] },
                { name: "inquiryTopic", label: "Inquiry Topic", type: "select", half: true, options: ["Battery Sizing & Selection", "UPS Integration", "Maintenance & Testing", "Environmental Requirements", "Compliance & Standards", "Other"] },
                { name: "message", label: "Technical Question / Details", type: "textarea", required: true },
            ],
        },
        {
            label: "General Information",
            fields: [
                { name: "fullName", label: "Full Name", type: "text", required: true, half: true },
                { name: "email", label: "Email Address", type: "email", required: true, half: true },
                { name: "phone", label: "Phone", type: "tel", half: true },
                { name: "company", label: "Company / Organization", type: "select", half: true, options: ["Data Center", "Telecom Provider", "Healthcare Facility", "Utility Company", "Industrial Facility", "Government Agency", "Other"] },
                { name: "message", label: "Message", type: "textarea", required: true },
            ],
        },
    ],
};

// ── SVG Icons ──
function FieldIcon({ type, name }: { type: string; name: string }) {
    if (name.includes("email") || name.includes("Email")) {
        return (
            <svg className="git-field-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
        );
    }
    if (type === "tel" || name.includes("phone") || name.includes("Phone")) {
        return (
            <svg className="git-field-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
        );
    }
    if (type === "textarea") {
        return (
            <svg className="git-field-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Z" />
            </svg>
        );
    }
    if (type === "select") {
        return (
            <svg className="git-field-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21" />
            </svg>
        );
    }
    return (
        <svg className="git-field-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
        </svg>
    );
}

export default function GetInTouchSection() {
    const [config, setConfig] = useState<FormConfig>(DEFAULT_CONFIG);
    const [activeTab, setActiveTab] = useState(0);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [formData, setFormData] = useState<Record<string, string>>({});

    // Fetch form config from WordPress on mount
    useEffect(() => {
        const wpUrl = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL?.replace("/graphql", "");
        if (!wpUrl) return;

        fetch(`${wpUrl}/wp-json/axion/v1/form-config?t=${Date.now()}`, { cache: "no-store" })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.tabs && data.tabs.length > 0) {
                    setConfig(data);
                }
            })
            .catch(() => {
                // Silently fall back to defaults
            });
    }, []);

    const currentForm = config.tabs[activeTab] || config.tabs[0];

    const handleTabChange = (i: number) => {
        setActiveTab(i);
        setFormData({});
        setStatus("idle");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    formType: currentForm.label,
                }),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({});
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 5000);
            }
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    // Group fields into rows
    const rows: FormField[][] = [];
    let halfBuffer: FormField[] = [];
    for (const field of currentForm.fields) {
        if (field.half) {
            halfBuffer.push(field);
            if (halfBuffer.length === 2) {
                rows.push([...halfBuffer]);
                halfBuffer = [];
            }
        } else {
            if (halfBuffer.length > 0) {
                rows.push([...halfBuffer]);
                halfBuffer = [];
            }
            rows.push([field]);
        }
    }
    if (halfBuffer.length > 0) rows.push([...halfBuffer]);

    // Parse heading with line breaks
    const headingParts = config.heading.split("\n");

    return (
        <div className="getintouch-section">
            <div className="getintouch-card">
                <p className="git-label">{config.label}</p>
                <h2 className="git-heading">
                    {headingParts.map((part, i) => (
                        <span key={i}>
                            {part}
                            {i < headingParts.length - 1 && <br />}
                        </span>
                    ))}
                </h2>

                {/* Tabs */}
                <div className="git-tabs">
                    {config.tabs.map((tab, i) => (
                        <button
                            key={i}
                            className={`git-tab ${activeTab === i ? "active" : ""}`}
                            onClick={() => handleTabChange(i)}
                            type="button"
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <form className="git-form" onSubmit={handleSubmit}>
                    {rows.map((row, ri) => (
                        <div key={`${activeTab}-${ri}`} className={`git-row ${row.length === 1 && !row[0].half ? "full" : ""}`}>
                            {row.map((field) => (
                                <div key={field.name} className="git-field">
                                    <FieldIcon type={field.type} name={field.name} />
                                    {field.type === "textarea" ? (
                                        <textarea
                                            name={field.name}
                                            placeholder={field.label}
                                            rows={3}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            required={field.required}
                                        />
                                    ) : field.type === "select" ? (
                                        <div className="git-select-wrap">
                                            <select
                                                name={field.name}
                                                value={formData[field.name] || ""}
                                                onChange={handleChange}
                                                required={field.required}
                                            >
                                                <option value="" disabled>{field.label}</option>
                                                {field.options?.map((opt, oi) => (
                                                    <option key={oi} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            placeholder={field.label}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            required={field.required}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Submit */}
                    <div className="git-submit-row">
                        <button type="submit" className="git-submit-btn" disabled={status === "sending"}>
                            {status === "sending" ? "Sending..." : config.buttonLabel}
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>

                        {status === "success" && (
                            <div className="git-status success">Your message has been sent successfully! We&apos;ll get back to you soon.</div>
                        )}
                        {status === "error" && (
                            <div className="git-status error">Something went wrong. Please try again later.</div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
