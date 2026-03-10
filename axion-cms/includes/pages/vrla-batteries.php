<?php
/**
 * Axion CMS – VRLA Batteries Page Config
 * Defines all sections and fields for the VRLA Batteries page
 */
if (!defined('ABSPATH'))
    exit;

return [
    'slug' => 'vrla-batteries',
    'label' => 'VRLA Batteries',
    'sections' => [

        // ═══════════════════════════════════════
        // HERO SECTION
        // ═══════════════════════════════════════
        'hero' => [
            'label' => 'Hero Section',
            'icon' => '🎯',
            'fields' => [
                ['name' => 'background_image', 'label' => 'Background Image', 'type' => 'image', 'description' => 'Recommended: 1920×1080px'],
                ['name' => 'heading', 'label' => 'Heading Text', 'type' => 'text', 'default' => 'VRLA Battery Solutions for Mission-Critical Power'],
                ['name' => 'subtitle', 'label' => 'Subtitle', 'type' => 'textarea', 'rows' => 3, 'default' => 'High-performance, low-maintenance sealed batteries engineered for reliability in demanding environments.'],
                ['name' => 'cta_text', 'label' => 'CTA Button Text', 'type' => 'text', 'default' => 'Request a Quote'],
                ['name' => 'cta_link', 'label' => 'CTA Button Link', 'type' => 'text', 'default' => '#contact'],
                [
                    'name' => 'highlights',
                    'label' => 'Highlight Tags',
                    'type' => 'repeater',
                    'sub_fields' => [
                        ['name' => 'text', 'label' => 'Text', 'type' => 'text'],
                    ]
                ],
                [
                    'name' => 'applications',
                    'label' => 'Application Tags',
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
                ['name' => 'label_text', 'label' => 'Label Text', 'type' => 'text', 'default' => 'VRLA (Valve-Regulated Lead-Acid) Batteries'],
                ['name' => 'description', 'label' => 'Description', 'type' => 'textarea', 'rows' => 5, 'default' => 'Our VRLA batteries are designed for standby and cyclic applications where reliability, safety, and space efficiency are essential.'],
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
                ['name' => 'heading', 'label' => 'Heading', 'type' => 'text', 'default' => 'VRLA batteries are widely used in critical environments, including'],
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
