<?php
if (!defined('ABSPATH')) {
    exit;
}

$dashboard = isset($dashboard) && is_array($dashboard) ? $dashboard : [];
$ok = !empty($dashboard['ok']);
$used = $ok ? (float) $dashboard['pageviews_used'] : 0;
$quota = $ok ? (float) $dashboard['pageviews_quota'] : 0;
$percent = $ok ? (float) $dashboard['pageviews_percent'] : 0;
?>
<section class="rl6-page-heading">
    <div>
        <span class="rl6-eyebrow">Account usage</span>
        <h1>Usage</h1>
        <p>Page-view allowance, plan information and the 30-day usage trend.</p>
    </div>
</section>

<div class="rl6-usage-top">
    <section class="rl6-card rl6-usage-summary">
        <span class="rl6-metric-label">Page views this period</span>
        <div class="rl6-usage-number">
            <strong><?php echo esc_html($ok ? number_format_i18n($used) : '—'); ?></strong>
            <span>/ <?php echo esc_html($ok ? number_format_i18n($quota) : '—'); ?></span>
        </div>
        <div class="rl6-progress rl6-progress-large"><span style="width:<?php echo esc_attr($percent); ?>%"></span></div>
        <p><?php echo esc_html($percent); ?>% of the current page-view allowance used.</p>
    </section>

    <section class="rl6-card rl6-usage-summary">
        <span class="rl6-metric-label">Bandwidth</span>
        <div class="rl6-usage-number"><strong>Unlimited</strong></div>
        <p>Unlimited bandwidth is included with all RabbitLoader accounts.</p>
    </section>

    <section class="rl6-card rl6-usage-summary">
        <span class="rl6-metric-label">Current plan</span>
        <div class="rl6-usage-number"><strong><?php echo esc_html($ok ? $dashboard['plan_title'] : '—'); ?></strong></div>
        <p>
            <?php echo !empty($dashboard['plan_end_date'])
                ? 'Current cycle ends ' . esc_html($dashboard['plan_end_date'])
                : 'Plan details from your RabbitLoader account.'; ?>
        </p>
    </section>
</div>

<section class="rl6-card rl6-section-card">
    <div class="rl6-section-title-row">
        <div>
            <span class="rl6-eyebrow">Last 30 days</span>
            <h2>Page Views</h2>
        </div>
    </div>

    <div class="rl6-chart-placeholder">
        <div class="rl6-chart-grid">
            <span></span><span></span><span></span><span></span>
        </div>
        <div class="rl6-chart-message">
            <strong>30-day trend UI is ready</strong>
            <p>The old UI used the RabbitLoader page-view trend endpoint. Historical data wiring is the next functional step.</p>
        </div>
    </div>
</section>
