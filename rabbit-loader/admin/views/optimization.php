<?php
if (!defined('ABSPATH')) {
    exit;
}

$dashboard = isset($dashboard) && is_array($dashboard) ? $dashboard : [];
$ok = !empty($dashboard['ok']);
$url_count = $ok ? (int) $dashboard['canonical_url_count'] : 0;
$optimized_count = $ok ? (int) $dashboard['optimized_url_count'] : 0;
?>
<section class="rl6-page-heading">
    <div>
        <span class="rl6-eyebrow">Site optimization</span>
        <h1>Optimization</h1>
        <p>Review the URLs RabbitLoader has detected and optimized for this website.</p>
    </div>
</section>

<section class="rl6-card rl6-section-card rl6-section-card-first">
    <div class="rl6-section-title-row rl6-section-title-wrap">
        <div>
            <span class="rl6-eyebrow">Pages</span>
            <h2>Optimized URLs</h2>
            <p>
                <?php if ($ok) : ?>
                    RabbitLoader currently reports <?php echo esc_html(number_format_i18n($optimized_count)); ?>
                    optimized out of <?php echo esc_html(number_format_i18n($url_count)); ?> detected URLs.
                <?php else : ?>
                    URL summary data is currently unavailable.
                <?php endif; ?>
            </p>
        </div>

        <div class="rl6-url-tools">
            <label class="rl6-search">
                <span class="dashicons dashicons-search"></span>
                <input type="search" placeholder="Search URLs" disabled>
            </label>
            <button type="button" class="rl6-button rl6-button-secondary" disabled>Status</button>
        </div>
    </div>

    <div class="rl6-table-wrap">
        <table class="rl6-table">
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Status</th>
                    <th>Mobile</th>
                    <th>Desktop</th>
                    <th>Last optimized</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr class="rl6-empty-row">
                    <td colspan="6">
                        <div class="rl6-empty-state">
                            <span class="dashicons dashicons-list-view"></span>
                            <strong>URL-level data connection comes next</strong>
                            <p>
                                The old WordPress UI used RabbitLoader's shared URL List component.
                                This table is now in its final location and will be wired without changing the layout.
                            </p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>
