<?php
/**
 * Plugin Name: Axion CMS
 * Description: Custom content management for Axion Critical Power Solutions. Manages page sections and fields with a clean admin UI and GraphQL support.
 * Version: 1.0.0
 * Author: Axion
 * Text Domain: axion-cms
 */

if (!defined('ABSPATH'))
    exit;

define('AXION_CMS_VERSION', '1.0.0');
define('AXION_CMS_PATH', plugin_dir_path(__FILE__));
define('AXION_CMS_URL', plugin_dir_url(__FILE__));

// ─── Includes ───
require_once AXION_CMS_PATH . 'includes/class-fields.php';
require_once AXION_CMS_PATH . 'includes/class-admin.php';
require_once AXION_CMS_PATH . 'includes/class-graphql.php';
require_once AXION_CMS_PATH . 'includes/class-submissions.php';
require_once AXION_CMS_PATH . 'includes/class-redirects.php';

// ─── Init ───
add_action('plugins_loaded', function () {
    Axion_Admin::init();
    Axion_GraphQL::init();
    Axion_Submissions::init();
    Axion_Redirects::init();
});

// ─── Admin CSS ───
add_action('admin_enqueue_scripts', function ($hook) {
    if (strpos($hook, 'axion-cms') === false)
        return;

    wp_enqueue_media();

    wp_enqueue_style(
        'axion-cms-admin',
        AXION_CMS_URL . 'assets/admin.css',
    [],
        AXION_CMS_VERSION
    );

    wp_enqueue_script(
        'axion-cms-admin',
        AXION_CMS_URL . 'assets/admin.js',
    ['jquery'],
        AXION_CMS_VERSION,
        true
    );
});
