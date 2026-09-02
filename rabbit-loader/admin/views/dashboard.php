<?php
if (!defined('ABSPATH')) {
    exit;
}

$dashboard = isset($dashboard) && is_array($dashboard) ? $dashboard : [];
$ok = !empty($dashboard['ok']);

if (!function_exists('rl6_fmt_number')) {
    function rl6_fmt_number($value)
    {
        if (!is_numeric($value)) {
            return '—';
        }

        $value = (float) $value;

        if ($value >= 1000000) {
            return number_format_i18n($value / 1000000, 1) . 'M';
        }

        if ($value >= 1000) {
            return number_format_i18n($value / 1000, 1) . 'K';
        }

        return number_format_i18n($value, $value == floor($value) ? 0 : 1);
    }
}

$pageviews_used = $ok ? $dashboard['pageviews_used'] : 0;
$pageviews_quota = $ok ? $dashboard['pageviews_quota'] : 0;
$pageviews_percent = $ok ? $dashboard['pageviews_percent'] : 0;
?>
<section class="rl6-page-heading">
    <div>
        <span class="rl6-eyebrow">Overview</span>
        <h1>Dashboard</h1>
        <p>Performance, usage and the controls you need most often.</p>
    </div>

    <button type="button" id="rl5-refresh-dashboard" class="rl6-button rl6-button-secondary">
        Refresh data
    </button>
</section>

<?php if (!$ok) : ?>
    <div class="rl6-alert rl6-alert-error">
        <strong>RabbitLoader is connected, but dashboard data could not be loaded.</strong>
        <span><?php echo esc_html(!empty($dashboard['error']) ? $dashboard['error'] : 'Unknown API error.'); ?></span>
    </div>
<?php endif; ?>

<div class="rl6-metric-grid">
    <article class="rl6-card rl6-metric-card">
        <span class="rl6-metric-label">Current plan</span>
        <strong class="rl6-metric-value"><?php echo esc_html($ok ? $dashboard['plan_title'] : '—'); ?></strong>
        <div class="rl6-plan-benefit">
            <span class="dashicons dashicons-yes-alt"></span>
            <span><strong>Unlimited bandwidth</strong><small>Included with every RabbitLoader plan</small></span>
        </div>
    </article>

    <article class="rl6-card rl6-metric-card">
        <span class="rl6-metric-label">Page views</span>
        <strong class="rl6-metric-value">
            <?php echo esc_html(rl6_fmt_number($pageviews_used)); ?>
            <small>/ <?php echo esc_html(rl6_fmt_number($pageviews_quota)); ?></small>
        </strong>
        <div class="rl6-progress"><span style="width:<?php echo esc_attr($pageviews_percent); ?>%"></span></div>
        <span class="rl6-metric-note"><?php echo esc_html($pageviews_percent); ?>% of current allowance</span>
    </article>

    <article class="rl6-card rl6-metric-card">
        <span class="rl6-metric-label">Home Page Score</span>
        <strong class="rl6-metric-value"><?php echo esc_html($ok ? (string) $dashboard['best_score'] : '—'); ?></strong>
        <span class="rl6-metric-note">
            Average score <?php echo esc_html($ok ? (string) $dashboard['average_score'] : '—'); ?>
        </span>
    </article>

    <article class="rl6-card rl6-metric-card">
        <span class="rl6-metric-label">Unique pages</span>
        <strong class="rl6-metric-value"><?php echo esc_html($ok ? number_format_i18n($dashboard['canonical_url_count']) : '—'); ?></strong>
        <span class="rl6-metric-note">Pages detected by RabbitLoader</span>
    </article>

    <article class="rl6-card rl6-metric-card">
        <span class="rl6-metric-label">CSS reduction</span>
        <strong class="rl6-metric-value"><?php echo esc_html($ok ? rl6_fmt_number($dashboard['css_reduction']) . '%' : '—'); ?></strong>
        <span class="rl6-metric-note">Optimization overview</span>
    </article>

    <article class="rl6-card rl6-metric-card">
        <span class="rl6-metric-label">Image reduction</span>
        <strong class="rl6-metric-value"><?php echo esc_html($ok ? rl6_fmt_number($dashboard['image_compression']) . '%' : '—'); ?></strong>
        <span class="rl6-metric-note">Average image compression</span>
    </article>
</div>

<div class="rl6-dashboard-lower">
    <section class="rl6-card rl6-control-card">
        <div class="rl6-section-title-row">
            <div>
                <span class="rl6-eyebrow">Visibility control</span>
                <h2>ME Mode</h2>
            </div>
            <span class="rl6-status-pill rl6-status-neutral">Status not loaded yet</span>
        </div>

        <p>
            Use ME Mode for testing and debugging. Regular visitors continue to see the original pages;
            you can inspect RabbitLoader-optimized pages with <code>?rltest=1</code>.
        </p>

        <button
            type="button"
            class="rl6-button rl6-button-primary rl6-ui-preview"
            data-message="ME Mode is placed in the finished UI. Backend mode-state and toggle wiring comes after the UI is approved."
        >
            Enable ME Mode
        </button>
    </section>

    <section class="rl6-card rl6-control-card">
        <div class="rl6-section-title-row">
            <div>
                <span class="rl6-eyebrow">Cache control</span>
                <h2>Purge All Pages</h2>
            </div>
        </div>

        <p>
            Clear RabbitLoader's optimized page cache. The existing plugin flow warms pages again after a purge.
        </p>

        <button
            type="button"
            id="rl5-purge-all"
            class="rl6-button rl6-button-outline-danger"
        >
            Purge All Pages
        </button>
        <span id="rl5-purge-status" class="rl6-inline-status" role="status" aria-live="polite"></span>
    </section>
</div>
