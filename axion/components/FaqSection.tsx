import "./FaqSection.css";
import type { FaqData, FaqItem } from "@/lib/queries/faq";

interface Props {
    data: FaqData;
}

export default function FaqSection({ data }: Props) {
    return (
        <section className="faq-section" style={{ background: data.bgColor }}>
            <div className="faq-container">
                {/* Header Row */}
                <div className="faq-header">
                    <div className="faq-label">
                        <span className="faq-label-bar" />
                        <span className="faq-label-text">{data.labelText}</span>
                    </div>
                    <div className="faq-header-content">
                        <h2 className="faq-main-heading">{data.heading}</h2>
                        <p
                            className="faq-intro"
                            dangerouslySetInnerHTML={{ __html: data.introText }}
                        />
                    </div>
                </div>

                {/* FAQ Items */}
                <div className="faq-list">
                    {data.faqs.map((faq: FaqItem, i: number) => (
                        <div key={i} className="faq-item">
                            <div className="faq-question-side">
                                <span className="faq-number">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="faq-question">{faq.question}</h3>
                            </div>
                            <div className="faq-answer">
                                <ul>
                                    {faq.answers.map((a: string, j: number) => (
                                        <li key={j}>{a}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
