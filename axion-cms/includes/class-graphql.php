<?php
/**
 * Axion CMS – WPGraphQL Integration
 * Registers custom GraphQL types and resolvers for all Axion pages/sections.
 * Data reads from wp_options (where Axion_Admin stores it).
 */

if (!defined('ABSPATH'))
    exit;

class Axion_GraphQL
{

    public static function init()
    {
        add_action('graphql_register_types', [__CLASS__, 'register_types']);
    }

    public static function register_types()
    {
        // ── Root query field: axionPage(slug: "home") ──
        register_graphql_field('RootQuery', 'axionPage', [
            'type' => 'AxionPage',
            'description' => 'Get Axion CMS data for a specific page',
            'args' => [
                'slug' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Page slug, e.g. "home" or "vrla-batteries"',
                ],
            ],
            'resolve' => function ($root, $args) {
                return ['slug' => sanitize_text_field($args['slug'])];
            },
        ]);

        // ── AxionPage type ──
        register_graphql_object_type('AxionPage', [
            'description' => 'An Axion CMS page with section data',
            'fields' => [
                'slug' => ['type' => 'String'],
                'section' => [
                    'type' => 'String',
                    'description' => 'Get JSON data for a specific section',
                    'args' => [
                        'slug' => [
                            'type' => ['non_null' => 'String'],
                            'description' => 'Section slug, e.g. "hero" or "about"',
                        ],
                    ],
                    'resolve' => function ($page, $args) {
                        $page_slug    = $page['slug'];
                        $section_slug = sanitize_text_field($args['slug']);
                        $option_key   = 'axion_' . $page_slug . '_' . $section_slug;
                        $data         = get_option($option_key, []);

                        // If section has never been saved, serve plugin defaults
                        if (empty($data)) {
                            $data = Axion_Admin::get_section_defaults($page_slug, $section_slug);
                        }

                        // Resolve image IDs to URLs
                        $data = self::resolve_images($data);

                        return json_encode($data);
                    },
                ],
                'allSections' => [
                    'type' => 'String',
                    'description' => 'Get all section data as JSON',
                    'resolve' => function ($page) {
                        global $wpdb;
                        $prefix  = 'axion_' . $page['slug'] . '_';
                        $results = $wpdb->get_results(
                            $wpdb->prepare(
                                "SELECT option_name, option_value FROM {$wpdb->options} WHERE option_name LIKE %s",
                                $prefix . '%'
                            )
                        );

                        $sections = [];
                        foreach ($results as $row) {
                            $section_slug            = str_replace($prefix, '', $row->option_name);
                            $data                    = maybe_unserialize($row->option_value);
                            if (is_array($data)) {
                                $data = self::resolve_images($data);
                            }
                            $sections[$section_slug] = $data;
                        }

                        return json_encode($sections);
                    },
                ],
            ],
        ]);
    }

    /**
     * Returns true only for field names that are genuinely image fields.
     *
     * Matches:  "image", "*_image", "*_image_mobile", "*_bg", "*_background"
     * Rejects:  "bg_color", "overlay_opacity", "image_count", "background_color"
     */
    private static function is_image_field($key)
    {
        return (bool) preg_match('/^image$|_image(_|$)|_bg$|_background$/', $key);
    }

    /**
     * Recursively resolve image attachment IDs to URLs.
     * Appends a `{field}_url` key for each resolved image.
     */
    private static function resolve_images($data)
    {
        if (!is_array($data))
            return $data;

        foreach ($data as $key => &$value) {
            if (is_array($value)) {
                // Repeater: array of row arrays
                if (isset($value[0]) && is_array($value[0])) {
                    foreach ($value as &$row) {
                        $row = self::resolve_images($row);
                    }
                } else {
                    $value = self::resolve_images($value);
                }
            } elseif (is_numeric($value) && (int) $value > 0 && self::is_image_field($key)) {
                $url = wp_get_attachment_url((int) $value);
                if ($url) {
                    $data[$key . '_url'] = $url;
                }
            }
        }

        return $data;
    }
}
