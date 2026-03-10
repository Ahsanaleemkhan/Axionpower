import Image from "next/image";
import Link from "next/link";
import "./ProductsSection.css";
import type { ProductsData, ProductCard } from "@/lib/queries/products";

interface Props {
    data: ProductsData;
}

function LightningBolt({ position, icon, color = "#0EA5E9" }: {
    position: "top-left" | "bottom-right";
    icon: { node: { sourceUrl: string; altText: string } } | null;
    color?: string;
}) {
    return (
        <div className={`bolt-pad ${position}`}>
            {icon?.node?.sourceUrl ? (
                <Image
                    src={icon.node.sourceUrl}
                    alt={icon.node.altText || "decoration"}
                    width={55}
                    height={110}
                    className="bolt-icon-img"
                    style={{ width: 55, height: "auto", objectFit: "contain" }}
                />
            ) : (
                <svg className="bolt-icon" viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 0L0 45h16L12 80l28-50H24L22 0z" fill={color} />
                </svg>
            )}
        </div>
    );
}

function ProductCardItem({ product, index }: { product: ProductCard; index: number }) {
    const isReversed = index % 2 === 1;
    const num = String(index + 1).padStart(2, "0");

    const textContent = (
        <div className="product-text">
            <span className="product-number">{num}</span>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>

            {product.highlights.length > 0 && (
                <>
                    <h4 className="product-highlights-title">Key Highlights</h4>
                    <div className="product-tags">
                        {product.highlights.map((h, i) => (
                            <span key={i} className="product-tag">{h}</span>
                        ))}
                    </div>
                </>
            )}

            {product.applications.length > 0 && (
                <>
                    <h4 className="product-apps-title">Typical Applications:</h4>
                    <div className="product-apps-tags product-tags">
                        {product.applications.map((a, i) => (
                            <span key={i} className="product-tag">{a}</span>
                        ))}
                    </div>
                </>
            )}

            <Link href={product.buttonUrl || "#"} className="product-learn-btn">
                {product.buttonLabel}
            </Link>
        </div>
    );

    const imageContent = (
        <div className="product-image-wrap">
            <LightningBolt position="top-left" icon={product.iconTop} color="#ffffff" />
            <Image
                src={product.image?.node?.sourceUrl || product.fallbackImage}
                alt={product.image?.node?.altText || product.name}
                width={520}
                height={400}
                className="product-image"
            />
            <LightningBolt position="bottom-right" icon={product.iconBottom} />
        </div>
    );

    return (
        <div className={`product-card${isReversed ? " reversed" : ""}`}>
            {textContent}
            {imageContent}
        </div>
    );
}

export default function ProductsSection({ data }: Props) {
    return (
        <>
            {/* ── Intro Block ── */}
            <section className="products-intro" style={{ background: data.introBgColor }}>
                <div className="products-intro-container">
                    <div className="products-label">
                        <span className="products-label-bar" style={{ background: data.labelBarColor }} />
                        <span className="products-label-text" style={{ color: data.labelColor }}>
                            {data.labelText}
                        </span>
                    </div>
                    <p
                        className="products-intro-heading"
                        style={{ color: data.introHeadingColor }}
                        dangerouslySetInnerHTML={{ __html: data.introHeading }}
                    />
                    <Link href={data.introButtonUrl || "/products"} className="products-intro-btn">
                        {data.introButtonLabel}
                    </Link>
                </div>
            </section>

            {/* ── Product Cards ── */}
            <section className="products-cards" style={{ background: data.cardsBgColor }}>
                <div className="products-cards-container">
                    {data.products.map((product, i) => (
                        <ProductCardItem key={i} product={product} index={i} />
                    ))}
                </div>
            </section>
        </>
    );
}
