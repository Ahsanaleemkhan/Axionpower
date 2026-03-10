<?php
/**
 * Axion CMS – Home Page Config
 * Defines all sections and fields for the Home page.
 * Default values here are served via GraphQL when a section has not yet been saved,
 * so the Next.js frontend never needs hardcoded fallback content.
 */
if (!defined('ABSPATH'))
    exit;

return [
    'slug' => 'home',
    'label' => 'Home',
    'sections' => [

        // ═══════════════════════════════════════
        // HERO SECTION
        // ═══════════════════════════════════════
        'hero' => [
            'label' => 'Hero Section',
            'icon' => '🎯',
            'fields' => [
                ['name' => 'background_image', 'label' => 'Background Image (Desktop)', 'type' => 'image', 'description' => 'Recommended: 1920×1080px'],
                ['name' => 'background_image_mobile', 'label' => 'Background Image (Mobile)', 'type' => 'image', 'description' => 'Recommended: 768×1024px'],
                ['name' => 'overlay_color', 'label' => 'Overlay Color', 'type' => 'text', 'default' => '#000000', 'placeholder' => '#000000'],
                ['name' => 'overlay_opacity', 'label' => 'Overlay Opacity (%)', 'type' => 'text', 'default' => '60', 'placeholder' => '0-100'],
                ['name' => 'heading_text', 'label' => 'Heading Text', 'type' => 'text', 'default' => 'Reliable Battery Solutions for Mission-Critical Power Systems'],
                ['name' => 'heading_tag', 'label' => 'Heading Tag (SEO)', 'type' => 'select', 'choices' => ['h1' => 'H1', 'h2' => 'H2', 'h3' => 'H3'], 'default' => 'h1'],
                ['name' => 'subtitle_text', 'label' => 'Subtitle Text', 'type' => 'textarea', 'rows' => 3, 'default' => 'Axion Critical Power Solutions specializes in VRLA and wet cell batteries for critical power applications where reliability is non-negotiable.'],
                ['name' => 'badge_text', 'label' => 'Badge/Label Text', 'type' => 'text', 'default' => ''],
                ['name' => 'cta_text', 'label' => 'CTA Button Text', 'type' => 'text', 'default' => 'Request a Quote'],
                ['name' => 'cta_link', 'label' => 'CTA Button Link', 'type' => 'text', 'default' => '/contact'],
                ['name' => 'secondary_cta_text', 'label' => 'Secondary CTA Text', 'type' => 'text', 'default' => 'Speak with an Expert'],
                ['name' => 'secondary_cta_link', 'label' => 'Secondary CTA Link', 'type' => 'text', 'default' => '/contact'],
                [
                    'name' => 'stats',
                    'label' => 'Stats',
                    'type' => 'repeater',
                    'default_rows' => [
                        ['number' => '500+', 'label' => 'Installations Completed'],
                        ['number' => '15+', 'label' => 'Years of Experience'],
                        ['number' => '24/7', 'label' => 'Technical Support'],
                    ],
                    'sub_fields' => [
                        ['name' => 'number', 'label' => 'Number', 'type' => 'text'],
                        ['name' => 'label', 'label' => 'Label', 'type' => 'text'],
                    ]
                ],
            ],
        ],

        // ═══════════════════════════════════════
        // ABOUT SECTION
        // ═══════════════════════════════════════
        'about' => [
            'label' => 'About Section',
            'icon' => '📋',
            'fields' => [
                ['name' => 'bg_color', 'label' => 'Background Color', 'type' => 'text', 'default' => '#0369a1', 'placeholder' => '#0369a1'],
                ['name' => 'label_text', 'label' => 'Label Text', 'type' => 'text', 'default' => 'ABOUT US'],
                ['name' => 'heading', 'label' => 'Heading', 'type' => 'text', 'default' => 'Powering Critical Systems with Proven Battery Technology'],
                ['name' => 'description_left', 'label' => 'Description (Left Column)', 'type' => 'textarea', 'rows' => 5, 'default' => 'Axion Critical Power Solutions provides dependable battery technologies designed to support uninterrupted power in mission-critical environments. We supply high-performance VRLA and flooded (wet cell) battery solutions, backed by technical expertise, responsive support, and a strong understanding of critical power systems.'],
                ['name' => 'description_right', 'label' => 'Description (Right Column)', 'type' => 'textarea', 'rows' => 5, 'default' => 'Our focus is simple: deliver reliable, compliant, and long-term battery solutions that protect critical infrastructure.'],
                ['name' => 'button_text', 'label' => 'Button Text', 'type' => 'text', 'default' => 'ABOUT US'],
                ['name' => 'button_link', 'label' => 'Button Link', 'type' => 'text', 'default' => '/about'],
                [
                    'name' => 'approach_tags',
                    'label' => 'Approach Tags',
                    'type' => 'repeater',
                    'default_rows' => [
                        ['tag' => 'Reliability First'],
                        ['tag' => 'Technical Integrity'],
                        ['tag' => 'Safety & Compliance'],
                        ['tag' => 'Accountability'],
                        ['tag' => 'Customer Partnership'],
                    ],
                    'sub_fields' => [
                        ['name' => 'tag', 'label' => 'Tag', 'type' => 'text'],
                    ]
                ],
                [
                    'name' => 'stats',
                    'label' => 'Stats',
                    'type' => 'repeater',
                    'default_rows' => [
                        ['number' => '500+', 'label' => 'Battery Systems Deployed'],
                        ['number' => '15+', 'label' => 'Years of Experience'],
                        ['number' => '24/7', 'label' => 'Technical Support Available'],
                    ],
                    'sub_fields' => [
                        ['name' => 'number', 'label' => 'Number', 'type' => 'text'],
                        ['name' => 'label', 'label' => 'Label', 'type' => 'text'],
                    ]
                ],
            ],
        ],

        // ═══════════════════════════════════════
        // COMPLIANCE SECTION
        // ═══════════════════════════════════════
        'compliance' => [
            'label' => 'Compliance Section',
            'icon' => '🛡️',
            'fields' => [
                ['name' => 'heading', 'label' => 'Heading', 'type' => 'text', 'default' => 'Sustainability & Compliance'],
                ['name' => 'description', 'label' => 'Description', 'type' => 'textarea', 'rows' => 4, 'default' => 'Axion Critical Power Solutions prioritizes environmental responsibility and regulatory compliance across the full lifecycle of every battery system. From recycling programs to safe handling and operational guidance, our solutions support sustainable, reliable, and responsible power system operations.'],
                [
                    'name' => 'badges',
                    'label' => 'Compliance Badges',
                    'type' => 'repeater',
                    'default_rows' => [],
                    'sub_fields' => [
                        ['name' => 'title', 'label' => 'Title', 'type' => 'text'],
                        ['name' => 'description', 'label' => 'Description', 'type' => 'text'],
                        ['name' => 'image', 'label' => 'Badge Image', 'type' => 'image'],
                    ]
                ],
            ],
        ],

        // ═══════════════════════════════════════
        // PRODUCTS SECTION
        // ═══════════════════════════════════════
        'products' => [
            'label' => 'Products Section',
            'icon' => '🔋',
            'fields' => [
                ['name' => 'label', 'label' => 'Label', 'type' => 'text', 'default' => 'OUR PRODUCTS'],
                ['name' => 'heading', 'label' => 'Heading', 'type' => 'text', 'default' => 'Axion Critical Power Solutions delivers reliable, high-performance battery solutions for mission-critical power systems.'],
                ['name' => 'description', 'label' => 'Description', 'type' => 'textarea', 'rows' => 3, 'default' => 'Our products are engineered for safety, durability, and predictable performance across data centers, industrial sites, healthcare facilities, and utility applications.'],
                [
                    'name' => 'products',
                    'label' => 'Product Cards',
                    'type' => 'repeater',
                    'default_rows' => [
                        ['title' => 'VRLA Batteries', 'description' => 'High-performance, low-maintenance sealed batteries for UPS and standby systems.', 'image' => 0, 'link' => '/vrla-batteries'],
                        ['title' => 'Wet Cell Batteries', 'description' => 'Long-life flooded batteries for large-scale critical infrastructure.', 'image' => 0, 'link' => '/wet-cell-batteries'],
                        ['title' => 'Stationary Battery Cabinets', 'description' => 'Purpose-built cabinets engineered for safety and optimal battery performance.', 'image' => 0, 'link' => '/battery-cabinets'],
                    ],
                    'sub_fields' => [
                        ['name' => 'title', 'label' => 'Title', 'type' => 'text'],
                        ['name' => 'description', 'label' => 'Description', 'type' => 'text'],
                        ['name' => 'image', 'label' => 'Image', 'type' => 'image'],
                        ['name' => 'link', 'label' => 'Link', 'type' => 'text'],
                    ]
                ],
            ],
        ],

        // ═══════════════════════════════════════
        // SERVICES SECTION
        // ═══════════════════════════════════════
        'services' => [
            'label' => 'Services Section',
            'icon' => '⚡',
            'fields' => [
                ['name' => 'label', 'label' => 'Label', 'type' => 'text', 'default' => 'Our Services'],
                ['name' => 'heading', 'label' => 'Heading', 'type' => 'text', 'default' => 'Axion Critical Power Solutions offers comprehensive services to ensure your critical power systems remain reliable, compliant, and optimized throughout their lifecycle.'],
                [
                    'name' => 'services',
                    'label' => 'Service Cards',
                    'type' => 'repeater',
                    'default_rows' => [
                        ['title' => 'Maintenance and Monitoring', 'description' => 'Keep your UPS and DC power systems performing at peak efficiency with proactive maintenance and battery health monitoring. Axion helps prevent unexpected downtime and extends system life.', 'bg_image' => 0, 'button_text' => 'Schedule Maintenance & Monitoring', 'button_link' => '/services/maintenance'],
                        ['title' => 'Emergency Support and Service Contracts', 'description' => 'Rapid response for urgent power issues. Our service contracts provide priority support, emergency replacements, and expert guidance to restore uptime quickly.', 'bg_image' => 0, 'button_text' => 'Request Emergency Support', 'button_link' => '/services/emergency'],
                        ['title' => 'Replacement and Upgrades', 'description' => 'Plan and execute battery replacements or system upgrades with minimal disruption. Axion coordinates lifecycle transitions for VRLA and flooded batteries in mission-critical environments.', 'bg_image' => 0, 'button_text' => 'Plan Replacement & Upgrades', 'button_link' => '/services/replacement'],
                        ['title' => 'Safety Training and Documentation', 'description' => 'Ensure your teams handle batteries safely and effectively. Axion provides training, operational manuals, and compliance documentation to reduce risk.', 'bg_image' => 0, 'button_text' => 'Access Safety Training & Documentation', 'button_link' => '/services/training'],
                    ],
                    'sub_fields' => [
                        ['name' => 'title', 'label' => 'Title', 'type' => 'text'],
                        ['name' => 'description', 'label' => 'Description', 'type' => 'text'],
                        ['name' => 'bg_image', 'label' => 'Background Image (hover)', 'type' => 'image', 'description' => 'Shown on hover. Recommended: 1200×400px'],
                        ['name' => 'button_text', 'label' => 'Button Text', 'type' => 'text'],
                        ['name' => 'button_link', 'label' => 'Button Link', 'type' => 'text'],
                    ]
                ],
            ],
        ],

        // ═══════════════════════════════════════
        // INDUSTRIES SECTION
        // ═══════════════════════════════════════
        'industries' => [
            'label' => 'Industries Section',
            'icon' => '🏭',
            'fields' => [
                ['name' => 'label', 'label' => 'Label', 'type' => 'text', 'default' => 'Industries We Serve'],
                ['name' => 'heading', 'label' => 'Heading', 'type' => 'text', 'default' => 'Axion Critical Power Solutions provides mission-critical battery solutions across a range of industries.'],
                [
                    'name' => 'industries',
                    'label' => 'Industry Cards',
                    'type' => 'repeater',
                    'default_rows' => [
                        ['title' => 'Data Centers & Colocation Power Solutions', 'description' => 'Data centers and colocation facilities cannot afford downtime. Axion delivers resilient, scalable, and compliant battery solutions to keep mission-critical infrastructure running 24/7.', 'image' => 0],
                        ['title' => 'Telecommunications Networks', 'description' => 'Telecommunications networks require uninterrupted power to maintain connectivity and service quality. Axion provides VRLA and flooded battery systems with full lifecycle management.', 'image' => 0],
                        ['title' => 'Utility & Substation Applications', 'description' => 'Utility and substation environments require battery systems that provide long-term reliability, predictable performance, and compliance with industry standards.', 'image' => 0],
                        ['title' => 'Healthcare Facilities', 'description' => 'Healthcare facilities require uninterrupted power to protect life-safety systems, critical medical equipment, and essential operations.', 'image' => 0],
                        ['title' => 'Industrial & Critical Infrastructure', 'description' => 'Industrial facilities require uninterrupted power for process control, safety systems, and critical operations. Axion provides durable, reliable, and compliant power solutions.', 'image' => 0],
                    ],
                    'sub_fields' => [
                        ['name' => 'title', 'label' => 'Title', 'type' => 'text'],
                        ['name' => 'description', 'label' => 'Description', 'type' => 'text'],
                        ['name' => 'image', 'label' => 'Image', 'type' => 'image'],
                    ]
                ],
            ],
        ],

        // ═══════════════════════════════════════
        // ENGINEERING SECTION
        // ═══════════════════════════════════════
        'engineering' => [
            'label' => 'Engineering Section',
            'icon' => '🔧',
            'fields' => [
                ['name' => 'label', 'label' => 'Label', 'type' => 'text', 'default' => 'Engineering Resources'],
                ['name' => 'heading', 'label' => 'Heading', 'type' => 'text', 'default' => 'Engineering Resources'],
                ['name' => 'description', 'label' => 'Description', 'type' => 'textarea', 'rows' => 4, 'default' => 'Axion Critical Power Solutions provides engineers, designers, and facility managers with technical resources to support informed decisions about mission-critical battery systems. From battery sizing and VRLA vs Wet Cell selection to UPS integration and environmental requirements, our guidance ensures reliable, compliant, and long-lasting power solutions.'],
                ['name' => 'image', 'label' => 'Section Image', 'type' => 'image'],
                [
                    'name' => 'features',
                    'label' => 'Features',
                    'type' => 'repeater',
                    'default_rows' => [
                        ['title' => 'Battery sizing guidelines and runtime calculations', 'description' => ''],
                        ['title' => 'VRLA vs Wet Cell performance and lifecycle comparison', 'description' => ''],
                        ['title' => 'UPS system integration and redundancy considerations', 'description' => ''],
                        ['title' => 'Environmental and ventilation best practices', 'description' => ''],
                        ['title' => 'Ready-to-use specification language for project documentation', 'description' => ''],
                    ],
                    'sub_fields' => [
                        ['name' => 'title', 'label' => 'Title', 'type' => 'text'],
                        ['name' => 'description', 'label' => 'Description', 'type' => 'text'],
                    ]
                ],
            ],
        ],

        // ═══════════════════════════════════════
        // CONSULTING SECTION
        // ═══════════════════════════════════════
        'consulting' => [
            'label' => 'Consulting Section',
            'icon' => '💼',
            'fields' => [
                ['name' => 'label', 'label' => 'Label', 'type' => 'text', 'default' => 'Consulting Engineer Hub'],
                ['name' => 'heading', 'label' => 'Heading', 'type' => 'text', 'default' => 'Technical Support for Specifiers & Engineers'],
                ['name' => 'description', 'label' => 'Description', 'type' => 'textarea', 'rows' => 4, 'default' => 'Axion Critical Power Solutions provides a dedicated hub for consulting engineers, specifiers, and project managers. Access technical guidance, basis-of-design resources, and ready-to-use specification language to streamline critical power project design, documentation, and approval.'],
                ['name' => 'image', 'label' => 'Section Image', 'type' => 'image'],
                [
                    'name' => 'points',
                    'label' => 'Consulting Points',
                    'type' => 'repeater',
                    'default_rows' => [
                        ['title' => 'Specification support and project guidance for VRLA and flooded batteries', 'description' => ''],
                        ['title' => 'Basis-of-design documentation and selection criteria', 'description' => ''],
                        ['title' => 'Ready-to-use cut sheets and datasheets for battery systems', 'description' => ''],
                        ['title' => 'CSI / MasterFormat language templates for consistent documentation', 'description' => ''],
                    ],
                    'sub_fields' => [
                        ['name' => 'title', 'label' => 'Title', 'type' => 'text'],
                        ['name' => 'description', 'label' => 'Description', 'type' => 'text'],
                    ]
                ],
            ],
        ],

        // ═══════════════════════════════════════
        // FAQ SECTION
        // ═══════════════════════════════════════
        'faq' => [
            'label' => 'FAQ Section',
            'icon' => '❓',
            'fields' => [
                ['name' => 'heading', 'label' => 'Heading', 'type' => 'text', 'default' => 'Frequently Asked Questions'],
                [
                    'name' => 'faqs',
                    'label' => 'FAQ Items',
                    'type' => 'repeater',
                    'default_rows' => [
                        ['question' => 'How long do VRLA and flooded (wet cell) batteries last?', 'answer' => 'VRLA batteries generally last 5–12 years, depending on load, temperature, and operating conditions. Flooded (wet cell) batteries typically last 10–20 years with proper maintenance and monitoring.'],
                        ['question' => 'What maintenance is required for VRLA and wet cell batteries?', 'answer' => 'VRLA batteries are largely maintenance-free but should be inspected periodically for voltage, temperature, and visual signs of wear. Flooded batteries require regular electrolyte checks, cleaning, terminal maintenance, and periodic equalization charging.'],
                        ['question' => 'What are typical lead times for battery orders?', 'answer' => 'Lead times depend on battery type, size, quantity, and project requirements. Typically ranging 2–8 weeks depending on inventory availability and project complexity.'],
                        ['question' => 'What warranties are offered on batteries?', 'answer' => 'VRLA and wet cell batteries come with manufacturer warranties covering defects in materials and workmanship. Axion ensures that documentation and warranty claims are supported throughout the system lifecycle.'],
                        ['question' => 'How should batteries be disposed of or recycled?', 'answer' => 'Axion provides environmentally responsible battery recycling in coordination with certified partners, ensuring compliance with federal, provincial, and local regulations.'],
                    ],
                    'sub_fields' => [
                        ['name' => 'question', 'label' => 'Question', 'type' => 'text'],
                        ['name' => 'answer', 'label' => 'Answer', 'type' => 'textarea', 'rows' => 3],
                    ]
                ],
            ],
        ],

        // ═══════════════════════════════════════
        // CONTACT SECTION
        // ═══════════════════════════════════════
        'contact' => [
            'label' => 'Contact Section',
            'icon' => '📞',
            'fields' => [
                ['name' => 'heading', 'label' => 'Heading', 'type' => 'text', 'default' => 'Get Expert Guidance on Your Battery Systems'],
                ['name' => 'description', 'label' => 'Description', 'type' => 'textarea', 'rows' => 3, 'default' => 'Connect with Axion Critical Power Solutions to discuss your mission-critical power requirements, upcoming battery replacements, or technical inquiries. Our team provides engineering guidance, lifecycle support, and system recommendations.'],
                ['name' => 'phone', 'label' => 'Phone', 'type' => 'text', 'default' => ''],
                ['name' => 'email', 'label' => 'Email', 'type' => 'text', 'default' => ''],
                ['name' => 'address', 'label' => 'Address', 'type' => 'textarea', 'rows' => 2, 'default' => ''],
            ],
        ],

        // ═══════════════════════════════════════
        // GET IN TOUCH SECTION
        // ═══════════════════════════════════════
        'getintouch' => [
            'label' => 'Get In Touch Form',
            'icon' => '✉️',
            'fields' => [
                ['name' => 'label', 'label' => 'Label', 'type' => 'text', 'default' => 'Get In Touch'],
                ['name' => 'heading', 'label' => 'Heading', 'type' => 'text', 'default' => "Let's Work Together For Your Next Projects"],
                ['name' => 'button_label', 'label' => 'Submit Button Text', 'type' => 'text', 'default' => 'Send Message'],
            ],
        ],

        // ═══════════════════════════════════════
        // FOOTER
        // ═══════════════════════════════════════
        'footer' => [
            'label' => 'Footer',
            'icon' => '🔻',
            'fields' => [
                ['name' => 'phone', 'label' => 'Phone', 'type' => 'text', 'default' => ''],
                ['name' => 'email', 'label' => 'Email', 'type' => 'text', 'default' => ''],
                ['name' => 'copyright', 'label' => 'Copyright Text', 'type' => 'text', 'default' => '© 2025 Axion Critical Power Solutions. All rights reserved.'],
                [
                    'name' => 'nav_links',
                    'label' => 'Navigation Links',
                    'type' => 'repeater',
                    'default_rows' => [
                        ['label' => 'About Us', 'url' => '/about'],
                        ['label' => 'Products', 'url' => '/#products'],
                        ['label' => 'Services', 'url' => '/#services'],
                        ['label' => 'Industries', 'url' => '/#industries'],
                        ['label' => 'Contact', 'url' => '/#contact'],
                    ],
                    'sub_fields' => [
                        ['name' => 'label', 'label' => 'Label', 'type' => 'text'],
                        ['name' => 'url', 'label' => 'URL', 'type' => 'text'],
                    ]
                ],
                [
                    'name' => 'legal_links',
                    'label' => 'Legal Links',
                    'type' => 'repeater',
                    'default_rows' => [
                        ['label' => 'Terms & Conditions', 'url' => '/terms'],
                        ['label' => 'Privacy Policy', 'url' => '/privacy'],
                    ],
                    'sub_fields' => [
                        ['name' => 'label', 'label' => 'Label', 'type' => 'text'],
                        ['name' => 'url', 'label' => 'URL', 'type' => 'text'],
                    ]
                ],
            ],
        ],
    ],
];
