<?php
if (!defined('ABSPATH')) {
    exit;
}

$domain = isset($domain) ? $domain : RL5_Settings::domain();
$did = isset($did) ? $did : RL5_Settings::did();
?>
<section class="rl6-page-heading">
    <div>
        <span class="rl6-eyebrow">Configuration</span>
        <h1>Settings</h1>
        <p>Page rules, connection details and advanced WordPress controls.</p>
    </div>
</section>

<section class="rl6-card rl6-section-card">
    <div class="rl6-section-title-row rl6-section-title-wrap">
        <div>
            <span class="rl6-eyebrow">Optimization rules</span>
            <h2>Page Rules</h2>
            <p>Control where RabbitLoader should apply or exclude optimization.</p>
        </div>
        <button
            type="button"
            class="rl6-button rl6-button-primary rl6-ui-preview"
            data-message="Page Rules will reuse the existing RabbitLoader page-rule backend after the UI is approved."
        >
            + Add Page Rule
        </button>
    </div>

    <div class="rl6-table-wrap">
        <table class="rl6-table">
            <thead>
                <tr>
                    <th>URL pattern</th>
                    <th>Behavior</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr class="rl6-empty-row">
                    <td colspan="3">
                        <div class="rl6-empty-state">
                            <span class="dashicons dashicons-filter"></span>
                            <strong>Page Rules will appear here</strong>
                            <p>The old WordPress Settings tab mounted RabbitLoader's Page Rule component here.</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<section class="rl6-card rl6-section-card">
    <div class="rl6-section-title-row">
        <div>
            <span class="rl6-eyebrow">RabbitLoader account</span>
            <h2>Connection</h2>
        </div>
        <span class="rl6-status-pill rl6-status-success">
            <span class="rl6-status-dot"></span>
            Connected
        </span>
    </div>

    <div class="rl6-settings-grid">
        <div class="rl6-setting-item">
            <span>Website</span>
            <strong><?php echo esc_html($domain); ?></strong>
        </div>
        <div class="rl6-setting-item">
            <span>Domain ID</span>
            <strong class="rl6-mono"><?php echo esc_html($did); ?></strong>
        </div>
        <div class="rl6-setting-item">
            <span>Plugin version</span>
            <strong><?php echo esc_html(RL5_VERSION); ?></strong>
        </div>
    </div>

    <div class="rl6-card-actions">
        <a class="rl6-button rl6-button-secondary" href="https://dash.rabbitloader.com/" target="_blank" rel="noopener noreferrer">
            Open RabbitLoader Console
        </a>
        <button id="rl5-disconnect-button" type="button" class="rl6-button rl6-button-outline-danger">
            Disconnect
        </button>
    </div>
</section>
