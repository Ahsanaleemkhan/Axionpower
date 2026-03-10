<?php
/**
 * Axion CMS – Form Submissions
 * REST endpoint to receive submissions + WP admin page to view them
 */

if (!defined('ABSPATH'))
    exit;

class Axion_Submissions
{
    private static $table_name;

    public static function init()
    {
        global $wpdb;
        self::$table_name = $wpdb->prefix . 'axion_submissions';

        // Create DB table on init
        add_action('admin_init', [__CLASS__, 'create_table']);

        // REST endpoint
        add_action('rest_api_init', [__CLASS__, 'register_routes']);

        // Admin menu
        add_action('admin_menu', [__CLASS__, 'register_menu']);

        // Handle delete / bulk delete
        add_action('admin_init', [__CLASS__, 'handle_actions']);
    }

    // ─── Create custom table ───
    public static function create_table()
    {
        global $wpdb;
        $table = self::$table_name;
        $charset = $wpdb->get_charset_collate();

        if ($wpdb->get_var("SHOW TABLES LIKE '$table'") === $table) {
            return;
        }

        $sql = "CREATE TABLE $table (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            form_type VARCHAR(100) NOT NULL DEFAULT '',
            fields LONGTEXT NOT NULL,
            submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            is_read TINYINT(1) NOT NULL DEFAULT 0,
            ip_address VARCHAR(45) DEFAULT '',
            PRIMARY KEY (id),
            KEY form_type (form_type),
            KEY submitted_at (submitted_at)
        ) $charset;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);
    }

    // ─── REST API routes ───
    public static function register_routes()
    {
        register_rest_route('axion/v1', '/contact-form', [
            'methods' => 'POST',
            'callback' => [__CLASS__, 'handle_submission'],
            'permission_callback' => '__return_true',
        ]);
    }

    // ─── Handle incoming form submission ───
    public static function handle_submission($request)
    {
        global $wpdb;

        $params = $request->get_json_params();
        $form_type = sanitize_text_field($params['form_type'] ?? 'Unknown');
        $fields = $params['fields'] ?? [];

        // Sanitize all field values
        $sanitized = [];
        foreach ($fields as $key => $value) {
            $sanitized[sanitize_text_field($key)] = sanitize_textarea_field($value);
        }

        if (empty($sanitized)) {
            return new \WP_REST_Response(['error' => 'No form data provided'], 400);
        }

        // Store in database
        $wpdb->insert(
            self::$table_name,
        [
            'form_type' => $form_type,
            'fields' => wp_json_encode($sanitized),
            'submitted_at' => current_time('mysql'),
            'is_read' => 0,
            'ip_address' => sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''),
        ],
        ['%s', '%s', '%s', '%d', '%s']
        );

        if ($wpdb->last_error) {
            return new \WP_REST_Response(['error' => 'Database error'], 500);
        }

        // Optional: send email notification
        $admin_email = get_option('admin_email');
        $subject = "New {$form_type} Submission – Axion";
        $body = "A new form submission has been received.\n\n";
        $body .= "Form Type: {$form_type}\n";
        $body .= "Submitted: " . current_time('mysql') . "\n\n";
        foreach ($sanitized as $key => $value) {
            $body .= ucfirst(str_replace(['_', '-'], ' ', $key)) . ": {$value}\n";
        }
        wp_mail($admin_email, $subject, $body);

        return new \WP_REST_Response(['success' => true, 'message' => 'Submission received'], 200);
    }

    // ─── Admin menu ───
    public static function register_menu()
    {
        $unread = self::get_unread_count();
        $badge = $unread > 0 ? " <span class='update-plugins count-{$unread}'><span class='plugin-count'>{$unread}</span></span>" : '';

        add_submenu_page(
            'axion-cms',
            'Form Submissions',
            'Submissions' . $badge,
            'manage_options',
            'axion-submissions',
        [__CLASS__, 'render_page']
        );
    }

    // ─── Get unread count ───
    private static function get_unread_count()
    {
        global $wpdb;
        return (int)$wpdb->get_var("SELECT COUNT(*) FROM " . self::$table_name . " WHERE is_read = 0");
    }

    // ─── Handle delete / mark read actions ───
    public static function handle_actions()
    {
        if (!current_user_can('manage_options'))
            return;

        // Single delete
        if (isset($_GET['axion_delete_submission']) && isset($_GET['_wpnonce'])) {
            if (wp_verify_nonce($_GET['_wpnonce'], 'axion_delete_submission')) {
                global $wpdb;
                $id = absint($_GET['axion_delete_submission']);
                $wpdb->delete(self::$table_name, ['id' => $id], ['%d']);
                wp_redirect(admin_url('admin.php?page=axion-submissions&deleted=1'));
                exit;
            }
        }

        // Bulk delete
        if (isset($_POST['axion_bulk_action']) && $_POST['axion_bulk_action'] === 'delete' && isset($_POST['_wpnonce'])) {
            if (wp_verify_nonce($_POST['_wpnonce'], 'axion_bulk_submissions')) {
                global $wpdb;
                $ids = array_map('absint', $_POST['submission_ids'] ?? []);
                if (!empty($ids)) {
                    $placeholders = implode(',', array_fill(0, count($ids), '%d'));
                    $wpdb->query($wpdb->prepare("DELETE FROM " . self::$table_name . " WHERE id IN ($placeholders)", ...$ids));
                }
                wp_redirect(admin_url('admin.php?page=axion-submissions&deleted=' . count($ids)));
                exit;
            }
        }

        // Mark as read
        if (isset($_GET['axion_mark_read']) && isset($_GET['_wpnonce'])) {
            if (wp_verify_nonce($_GET['_wpnonce'], 'axion_mark_read')) {
                global $wpdb;
                $id = absint($_GET['axion_mark_read']);
                $wpdb->update(self::$table_name, ['is_read' => 1], ['id' => $id], ['%d'], ['%d']);
                wp_redirect(admin_url('admin.php?page=axion-submissions'));
                exit;
            }
        }
    }

    // ─── Render admin page ───
    public static function render_page()
    {
        global $wpdb;

        // View single submission
        if (isset($_GET['view'])) {
            self::render_single(absint($_GET['view']));
            return;
        }

        // Filter by form type
        $where = '';
        $filter_type = '';
        if (!empty($_GET['form_type'])) {
            $filter_type = sanitize_text_field($_GET['form_type']);
            $where = $wpdb->prepare(" WHERE form_type = %s", $filter_type);
        }

        // Pagination
        $per_page = 20;
        $current_page = max(1, absint($_GET['paged'] ?? 1));
        $offset = ($current_page - 1) * $per_page;
        $total = (int)$wpdb->get_var("SELECT COUNT(*) FROM " . self::$table_name . $where);
        $total_pages = ceil($total / $per_page);

        $submissions = $wpdb->get_results(
            "SELECT * FROM " . self::$table_name . $where . " ORDER BY submitted_at DESC LIMIT $per_page OFFSET $offset"
        );

        // Get unique form types for filter
        $form_types = $wpdb->get_col("SELECT DISTINCT form_type FROM " . self::$table_name . " ORDER BY form_type");

?>
        <div class="wrap">
            <h1 style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:28px;">📨</span> Form Submissions
                <span style="background:#0EA5E9;color:#fff;padding:3px 12px;border-radius:20px;font-size:13px;font-weight:600;">
                    <?php echo $total; ?> total
                </span>
            </h1>

            <?php if (isset($_GET['deleted'])): ?>
                <div class="notice notice-success is-dismissible">
                    <p><?php echo absint($_GET['deleted']); ?> submission(s) deleted.</p>
                </div>
            <?php
        endif; ?>

            <!-- Filter bar -->
            <?php if (!empty($form_types)): ?>
                <div style="margin:15px 0;display:flex;gap:8px;flex-wrap:wrap;">
                    <a href="<?php echo admin_url('admin.php?page=axion-submissions'); ?>"
                       class="button <?php echo empty($filter_type) ? 'button-primary' : ''; ?>">
                        All
                    </a>
                    <?php foreach ($form_types as $type): ?>
                        <a href="<?php echo admin_url('admin.php?page=axion-submissions&form_type=' . urlencode($type)); ?>"
                           class="button <?php echo $filter_type === $type ? 'button-primary' : ''; ?>">
                            <?php echo esc_html($type); ?>
                        </a>
                    <?php
            endforeach; ?>
                </div>
            <?php
        endif; ?>

            <?php if (empty($submissions)): ?>
                <div style="text-align:center;padding:60px 20px;color:#666;">
                    <div style="font-size:48px;margin-bottom:10px;">📭</div>
                    <p style="font-size:16px;">No submissions yet.</p>
                    <p style="color:#999;">Form submissions from your website will appear here.</p>
                </div>
            <?php
        else: ?>

                <form method="POST">
                    <?php wp_nonce_field('axion_bulk_submissions'); ?>

                    <div style="margin:10px 0;display:flex;align-items:center;gap:10px;">
                        <select name="axion_bulk_action" style="min-width:140px;">
                            <option value="">Bulk Actions</option>
                            <option value="delete">Delete Selected</option>
                        </select>
                        <button type="submit" class="button">Apply</button>
                    </div>

                    <table class="wp-list-table widefat fixed striped" style="border-radius:8px;overflow:hidden;">
                        <thead>
                            <tr>
                                <td style="width:30px;padding:10px;">
                                    <input type="checkbox" id="axion-select-all" />
                                </td>
                                <th style="width:50px;">#</th>
                                <th>Form Type</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th style="width:180px;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($submissions as $sub):
                $fields = json_decode($sub->fields, true) ?: [];
                $name = $fields['fullName'] ?? $fields['name'] ?? $fields['full_name'] ?? '—';
                $email = $fields['email'] ?? $fields['Email'] ?? '—';
                $is_unread = !$sub->is_read;
?>
                                <tr style="<?php echo $is_unread ? 'background:#eef8ff;font-weight:600;' : ''; ?>">
                                    <td style="padding:10px;">
                                        <input type="checkbox" name="submission_ids[]" value="<?php echo $sub->id; ?>" />
                                    </td>
                                    <td><?php echo $sub->id; ?></td>
                                    <td>
                                        <span style="background:#e0f2fe;color:#0369a1;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:600;">
                                            <?php echo esc_html($sub->form_type); ?>
                                        </span>
                                    </td>
                                    <td><?php echo esc_html($name); ?></td>
                                    <td><?php echo esc_html($email); ?></td>
                                    <td>
                                        <?php echo date('M j, Y g:i A', strtotime($sub->submitted_at)); ?>
                                        <?php if ($is_unread): ?>
                                            <span style="color:#0EA5E9;font-size:11px;"> ● NEW</span>
                                        <?php
                endif; ?>
                                    </td>
                                    <td>
                                        <a href="<?php echo admin_url('admin.php?page=axion-submissions&view=' . $sub->id); ?>"
                                           class="button button-small">View</a>
                                        <a href="<?php echo wp_nonce_url(admin_url('admin.php?page=axion-submissions&axion_delete_submission=' . $sub->id), 'axion_delete_submission'); ?>"
                                           class="button button-small"
                                           style="color:#dc3545;"
                                           onclick="return confirm('Delete this submission?');">Delete</a>
                                    </td>
                                </tr>
                            <?php
            endforeach; ?>
                        </tbody>
                    </table>
                </form>

                <!-- Pagination -->
                <?php if ($total_pages > 1): ?>
                    <div style="margin:20px 0;display:flex;gap:5px;justify-content:center;">
                        <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                            <a href="<?php echo admin_url('admin.php?page=axion-submissions&paged=' . $i . ($filter_type ? '&form_type=' . urlencode($filter_type) : '')); ?>"
                               class="button <?php echo $i === $current_page ? 'button-primary' : ''; ?>"
                               style="min-width:36px;text-align:center;">
                                <?php echo $i; ?>
                            </a>
                        <?php
                endfor; ?>
                    </div>
                <?php
            endif; ?>

            <?php
        endif; ?>
        </div>

        <script>
        document.getElementById('axion-select-all')?.addEventListener('change', function() {
            document.querySelectorAll('input[name="submission_ids[]"]').forEach(cb => cb.checked = this.checked);
        });
        </script>
        <?php
    }

    // ─── Render single submission detail ───
    private static function render_single($id)
    {
        global $wpdb;
        $sub = $wpdb->get_row($wpdb->prepare("SELECT * FROM " . self::$table_name . " WHERE id = %d", $id));

        if (!$sub) {
            echo '<div class="wrap"><h1>Submission not found</h1><a href="' . admin_url('admin.php?page=axion-submissions') . '" class="button">← Back</a></div>';
            return;
        }

        // Mark as read
        if (!$sub->is_read) {
            $wpdb->update(self::$table_name, ['is_read' => 1], ['id' => $id], ['%d'], ['%d']);
        }

        $fields = json_decode($sub->fields, true) ?: [];

?>
        <div class="wrap">
            <div style="display:flex;align-items:center;gap:15px;margin-bottom:20px;">
                <a href="<?php echo admin_url('admin.php?page=axion-submissions'); ?>" class="button">← Back</a>
                <h1 style="margin:0;">Submission #<?php echo $sub->id; ?></h1>
                <span style="background:#e0f2fe;color:#0369a1;padding:4px 14px;border-radius:14px;font-size:13px;font-weight:600;">
                    <?php echo esc_html($sub->form_type); ?>
                </span>
            </div>

            <div style="background:#fff;border:1px solid #ddd;border-radius:12px;padding:30px;max-width:700px;">
                <div style="margin-bottom:20px;padding-bottom:15px;border-bottom:1px solid #eee;">
                    <small style="color:#999;">Submitted on</small>
                    <div style="font-size:15px;font-weight:600;color:#333;">
                        <?php echo date('F j, Y \a\t g:i A', strtotime($sub->submitted_at)); ?>
                    </div>
                </div>

                <?php if ($sub->ip_address): ?>
                    <div style="margin-bottom:20px;padding-bottom:15px;border-bottom:1px solid #eee;">
                        <small style="color:#999;">IP Address</small>
                        <div style="font-size:14px;color:#333;"><?php echo esc_html($sub->ip_address); ?></div>
                    </div>
                <?php
        endif; ?>

                <?php foreach ($fields as $key => $value): ?>
                    <div style="margin-bottom:18px;padding-bottom:15px;border-bottom:1px solid #f5f5f5;">
                        <small style="color:#999;text-transform:capitalize;">
                            <?php echo esc_html(str_replace(['_', '-'], ' ', $key)); ?>
                        </small>
                        <div style="font-size:15px;color:#1e293b;margin-top:4px;line-height:1.6;">
                            <?php echo nl2br(esc_html($value)); ?>
                        </div>
                    </div>
                <?php
        endforeach; ?>
            </div>

            <div style="margin-top:20px;display:flex;gap:10px;">
                <?php if (isset($fields['email']) || isset($fields['Email'])): ?>
                    <a href="mailto:<?php echo esc_attr($fields['email'] ?? $fields['Email']); ?>"
                       class="button button-primary">
                        📧 Reply via Email
                    </a>
                <?php
        endif; ?>
                <a href="<?php echo wp_nonce_url(admin_url('admin.php?page=axion-submissions&axion_delete_submission=' . $sub->id), 'axion_delete_submission'); ?>"
                   class="button"
                   style="color:#dc3545;"
                   onclick="return confirm('Delete this submission?');">
                    🗑️ Delete
                </a>
            </div>
        </div>
        <?php
    }
}
