<?php
/**
 * Axion CMS – Battery Cabinets Page Config
 * Defines all sections and fields for the Stationary Battery Cabinets page
 */
if (!defined('ABSPATH'))
    exit;

return [
    'slug' => 'battery-cabinets',
    'label' => 'Battery Cabinets',
    'sections' => [

        // ═══════════════════════════════════════
        // HERO SECTION
        // ═══════════════════════════════════════
        'hero' => [
            'label' => 'Hero Section',
            'icon' => '🎯',
            'fields' => [
                ['name' => 'background_image', 'label' => 'Background Image', 'type' => 'image', 'description' => 'Recommended: 1920×1080px'],
                ['name' => 'heading', 'label' => 'Heading Text', 'type' => 'text', 'default' => 'STATIONARY BATTERY'],
                ['name' => 'heading_highlight', 'label' => 'Heading Highlight (blue)', 'type' => 'text', 'default' => 'CABINETS'],
                ['name' => 'description', 'label' => 'Description', 'type' => 'textarea', 'rows' => 4, 'default' => 'Axion Critical Power Solutions provides robust, purpose-built stationary battery cabinets designed to house and protect critical battery systems.'],
                ['name' => 'cta_text', 'label' => 'CTA Button Text', 'type' => 'text', 'default' => 'Speak with an Expert'],
                ['name' => 'cta_link', 'label' => 'CTA Button Link', 'type' => 'text', 'default' => '#contact'],
                [
                    'name' => 'highlights',
                    'label' => 'Key Highlights',
                    'type' => 'repeater',
                    'sub_fields' => [
                        ['name' => 'text', 'label' => 'Text', 'type' => 'text'],
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
                ['name' => 'label_text', 'label' => 'Label Text', 'type' => 'text', 'default' => 'Stationary Battery Cabinets'],
                ['name' => 'description', 'label' => 'Description', 'type' => 'textarea', 'rows' => 5, 'default' => 'Purpose-built battery cabinets engineered for safety, thermal management, and code compliance.'],
            ],
        ],

        // ═══════════════════════════════════════
        // ENGINEERED SECTION
        // ═══════════════════════════════════════
        'engineered' => [
            'label' => 'Engineered Section',
            'icon' => '🔧',
            'fields' => [
                ['name' => 'label_text', 'label' => 'Label Text', 'type' => 'text', 'default' => 'Engineered Cabinet Solutions for Critical Power'],
                ['name' => 'description', 'label' => 'Description', 'type' => 'textarea', 'rows' => 6, 'default' => "Axion provides factory-assembled battery cabinets that integrate seamlessly with leading UPS platforms. Selection is based on system requirements such as UPS model, runtime, room layout, ventilation, and seismic considerations.\nOur technical team works closely with engineers, contractors, and end users to ensure cabinet solutions meet operational, safety, and compliance standards."],
                ['name' => 'image', 'label' => 'Section Image', 'type' => 'image', 'description' => 'Image of engineer / cabinet (right side)'],
            ],
        ],

        // ═══════════════════════════════════════
        // KEY BENEFITS SECTION
        // ═══════════════════════════════════════
        'key-benefits' => [
            'label' => 'Key Benefits',
            'icon' => '⭐',
            'fields' => [
                ['name' => 'heading', 'label' => 'Heading', 'type' => 'text', 'default' => 'Key Benefits'],
                [
                    'name' => 'cards',
                    'label' => 'Benefit Cards',
                    'type' => 'repeater',
                    'sub_fields' => [
                        ['name' => 'title', 'label' => 'Title', 'type' => 'text'],
                        ['name' => 'description', 'label' => 'Description', 'type' => 'text'],
                        ['name' => 'image', 'label' => 'Image', 'type' => 'image'],
                    ]
                ],
            ],
        ],

        // ═══════════════════════════════════════
        // FEATURES SECTION
        // ═══════════════════════════════════════
        'features' => [
            'label' => 'Features List',
            'icon' => '📝',
            'fields' => [
                ['name' => 'label_text', 'label' => 'Label Text', 'type' => 'text', 'default' => 'Engineered Cabinet Solutions for Critical Power'],
                [
                    'name' => 'features',
                    'label' => 'Feature Items',
                    'type' => 'repeater',
                    'sub_fields' => [
                        ['name' => 'text', 'label' => 'Feature Text', 'type' => 'text'],
                        ['name' => 'bold', 'label' => 'Bold (first item)?', 'type' => 'select', 'choices' => ['0' => 'No', '1' => 'Yes'], 'default' => '0'],
                    ]
                ],
                ['name' => 'image', 'label' => 'Section Image', 'type' => 'image', 'description' => 'Image shown on the right side'],
            ],
        ],

        // ═══════════════════════════════════════
        // TYPICAL APPLICATIONS SECTION
        // ═══════════════════════════════════════
        'applications' => [
            'label' => 'Typical Applications',
            'icon' => '📱',
            'fields' => [
                ['name' => 'label', 'label' => 'Label Text', 'type' => 'text', 'default' => 'Typical Applications'],
                ['name' => 'heading', 'label' => 'Heading', 'type' => 'text', 'default' => 'Battery cabinets are deployed across critical infrastructure, including'],
                [
                    'name' => 'cards',
                    'label' => 'Application Cards',
                    'type' => 'repeater',
                    'sub_fields' => [
                        ['name' => 'title', 'label' => 'Title', 'type' => 'text'],
                        ['name' => 'description', 'label' => 'Description', 'type' => 'text'],
                        ['name' => 'image', 'label' => 'Image', 'type' => 'image'],
                    ]
                ],
            ],
        ],

        // ═══════════════════════════════════════
        // AXION'S APPROACH SECTION
        // ═══════════════════════════════════════
        'approach' => [
            'label' => "Axion's Approach",
            'icon' => '🎯',
            'fields' => [
                ['name' => 'label_text', 'label' => 'Label Text', 'type' => 'text', 'default' => "Axion's Approach"],
                ['name' => 'description', 'label' => 'Description', 'type' => 'textarea', 'rows' => 4, 'default' => "Axion takes a system-level approach to battery cabinets, ensuring proper alignment between batteries, cabinets, UPS systems, and site conditions.\nSupport includes"],
                [
                    'name' => 'items',
                    'label' => 'Timeline Items',
                    'type' => 'repeater',
                    'sub_fields' => [
                        ['name' => 'title', 'label' => 'Title', 'type' => 'text'],
                        ['name' => 'image', 'label' => 'Image', 'type' => 'image', 'description' => 'Oval image (recommended 320×240px)'],
                    ]
                ],
            ],
        ],

        // ═══════════════════════════════════════
        // WHY CHOOSE US SECTION
        // ═══════════════════════════════════════
        'why-choose' => [
            'label' => 'Why Choose Us',
            'icon' => '👍',
            'fields' => [
                ['name' => 'heading_line1', 'label' => 'Heading Line 1', 'type' => 'text', 'default' => 'Why'],
                ['name' => 'heading_highlight', 'label' => 'Heading Highlight (blue)', 'type' => 'text', 'default' => 'Choose'],
                ['name' => 'heading_line3', 'label' => 'Heading Line 3', 'type' => 'text', 'default' => 'Us?'],
                [
                    'name' => 'cards',
                    'label' => 'Reason Cards',
                    'type' => 'repeater',
                    'sub_fields' => [
                        ['name' => 'number', 'label' => 'Number', 'type' => 'text'],
                        ['name' => 'text', 'label' => 'Description', 'type' => 'textarea', 'rows' => 2],
                        ['name' => 'variant', 'label' => 'Style', 'type' => 'select', 'choices' => ['white' => 'White', 'blue' => 'Blue'], 'default' => 'white'],
                    ]
                ],
            ],
        ],
    ],
];
