<?php
/**
 * Axion CMS – 301 Redirect Manager
 * Manages URL redirects from the admin panel and intercepts requests.
 */

if (!defined('ABSPATH'))
    exit;

class Axion_Redirects
{

    private static $option_key = 'axion_redirects';

    public static function init()
    {
        add_action('admin_menu', [__CLASS__, 'register_menu']);
        add_action('admin_init', [__CLASS__, 'handle_save']);
        add_action('admin_init', [__CLASS__, 'handle_delete']);
        add_action('template_redirect', [__CLASS__, 'do_redirects']);
    }

    // ─── Register submenu ───
    public static function register_menu()
    {
        add_submenu_page(
            'axion-cms',
            'Redirects',
            '↪ Redirects',
            'manage_options',
            'axion-redirects',
            [__CLASS__, 'render_page']
        );
    }

    // ─── Get all redirects ───
    private static function get_redirects()
    {
        return get_option(self::$option_key, []);
    }

    // ─── Execute redirects on frontend ───
    public static function do_redirects()
    {
        if (is_admin())
            return;

        $redirects = self::get_redirects();
        if (empty($redirects))
            return;

        $current_path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

        foreach ($redirects as $redirect) {
            $from = trim($redirect['from'] ?? '', '/');
            if ($from === $current_path) {
                $code = intval($redirect['type'] ?? 301);
                wp_redirect($redirect['to'], $code);
                exit;
            }
        }
    }

    // ─── Handle save ───
    public static function handle_save()
    {
        if (!isset($_POST['axion_redirect_nonce']) || !wp_verify_nonce($_POST['axion_redirect_nonce'], 'axion_redirect_save'))
            return;
        if (!current_user_can('manage_options'))
            return;

        $from = sanitize_text_field($_POST['redirect_from'] ?? '');
        $to = esc_url_raw($_POST['redirect_to'] ?? '');
        $type = intval($_POST['redirect_type'] ?? 301);
        $note = sanitize_text_field($_POST['redirect_note'] ?? '');

        if (!$from || !$to)
            return;

        $redirects = self::get_redirects();
        $redirects[] = [
            'from' => $from,
            'to' => $to,
            'type' => $type,
            'note' => $note,
            'date' => current_time('Y-m-d H:i'),
        ];

        update_option(self::$option_key, $redirects);
        wp_safe_redirect(admin_url('admin.php?page=axion-redirects&saved=1'));
        exit;
    }

    // ─── Handle delete ───
    public static function handle_delete()
    {
        if (!isset($_GET['axion_delete_redirect']))
            return;
        if (!isset($_GET['_wpnonce']) || !wp_verify_nonce($_GET['_wpnonce'], 'axion_delete_redirect'))
            return;
        if (!current_user_can('manage_options'))
            return;

        $index = intval($_GET['axion_delete_redirect']);
        $redirects = self::get_redirects();

        if (isset($redirects[$index])) {
            array_splice($redirects, $index, 1);
            update_option(self::$option_key, $redirects);
        }

        wp_safe_redirect(admin_url('admin.php?page=axion-redirects&deleted=1'));
        exit;
    }

    // ─── Render admin page ───
    public static function render_page()
    {
        $redirects = self::get_redirects();

        echo '<div class="wrap axion-wrap">';
        echo '<h1 class="axion-title">↪ Redirect Manager</h1>';
        echo '<p style="color:#666;margin-bottom:1.5rem;">Manage 301/302 redirects. Old URLs will be automatically redirected to new ones.</p>';

        // Success notices
        if (isset($_GET['saved'])) {
            echo '<div class="axion-notice">✅ Redirect added successfully!</div>';
        }
        if (isset($_GET['deleted'])) {
            echo '<div class="axion-notice axion-notice--reset">🗑 Redirect removed.</div>';
        }

        // ── Add form ──
        echo '<div class="axion-section-edit" style="margin-bottom:2rem;">';
        echo '<h2 class="axion-section-title">➕ Add New Redirect</h2>';
        echo '<form method="post" class="axion-form">';
        wp_nonce_field('axion_redirect_save', 'axion_redirect_nonce');

        echo '<div style="display:grid;grid-template-columns:1fr 1fr auto auto;gap:1rem;align-items:end;">';

        // From
        echo '<div class="axion-field">';
        echo '<label class="axion-field__label">From URL Path</label>';
        echo '<p class="axion-field__desc">e.g. old-page or products/old-item</p>';
        echo '<input type="text" name="redirect_from" class="axion-input" placeholder="/old-page" required />';
        echo '</div>';

        // To
        echo '<div class="axion-field">';
        echo '<label class="axion-field__label">To URL</label>';
        echo '<p class="axion-field__desc">Full URL or relative path</p>';
        echo '<input type="text" name="redirect_to" class="axion-input" placeholder="https://example.com/new-page" required />';
        echo '</div>';

        // Type
        echo '<div class="axion-field">';
        echo '<label class="axion-field__label">Type</label>';
        echo '<select name="redirect_type" class="axion-input axion-select">';
        echo '<option value="301">301 (Permanent)</option>';
        echo '<option value="302">302 (Temporary)</option>';
        echo '</select>';
        echo '</div>';

        // Note
        echo '<div class="axion-field">';
        echo '<label class="axion-field__label">Note</label>';
        echo '<input type="text" name="redirect_note" class="axion-input" placeholder="Optional note" />';
        echo '</div>';

        echo '</div>';

        echo '<div style="margin-top:1rem;">';
        echo '<button type="submit" class="button button-primary">Add Redirect</button>';
        echo '</div>';

        echo '</form>';
        echo '</div>';

        // ── Existing redirects table ──
        echo '<div class="axion-section-edit">';
        echo '<h2 class="axion-section-title">📋 Active Redirects (' . count($redirects) . ')</h2>';

        if (empty($redirects)) {
            echo '<p style="color:#666;padding:1rem 0;">No redirects configured yet.</p>';
        } else {
            echo '<table class="widefat striped" style="margin-top:1rem;">';
            echo '<thead><tr><th>From</th><th>To</th><th>Type</th><th>Note</th><th>Date</th><th>Action</th></tr></thead>';
            echo '<tbody>';

            foreach ($redirects as $i => $r) {
                $delete_url = wp_nonce_url(
                    admin_url('admin.php?page=axion-redirects&axion_delete_redirect=' . $i),
                    'axion_delete_redirect'
                );
                echo '<tr>';
                echo '<td><code>' . esc_html($r['from']) . '</code></td>';
                echo '<td><a href="' . esc_url($r['to']) . '" target="_blank">' . esc_html($r['to']) . '</a></td>';
                echo '<td><span style="background:#' . ($r['type'] == 301 ? '0EA5E9' : 'f59e0b') . ';color:#fff;padding:2px 8px;border-radius:4px;font-size:12px;">' . esc_html($r['type']) . '</span></td>';
                echo '<td>' . esc_html($r['note'] ?? '—') . '</td>';
                echo '<td>' . esc_html($r['date'] ?? '—') . '</td>';
                echo '<td><a href="' . esc_url($delete_url) . '" onclick="return confirm(\'Delete this redirect?\');" style="color:#dc2626;">Delete</a></td>';
                echo '</tr>';
            }

            echo '</tbody></table>';
        }

        echo '</div>';
        echo '</div>';
    }
}
