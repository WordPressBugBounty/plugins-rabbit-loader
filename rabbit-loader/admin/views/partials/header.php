<?php
if (!defined('ABSPATH')) {
    exit;
}

$tab = isset($tab) ? $tab : 'dashboard';
$tabs = isset($tabs) && is_array($tabs) ? $tabs : [];
$domain = isset($domain) ? $domain : RL5_Settings::domain();
?>
<div class="wrap rl6-wrap">
    <header class="rl6-header">
        <div class="rl6-brand-block">
            <img
                src="<?php echo esc_url(RL5_URL . 'assets/logo-dark.svg'); ?>"
                class="rl6-logo"
                alt="RabbitLoader"
            >
            <div class="rl6-site-meta">
                <strong><?php echo esc_html($domain); ?></strong>
                <span>WordPress performance optimization</span>
            </div>
        </div>

        <div class="rl6-header-actions">
            <span class="rl6-status-pill rl6-status-success">
                <span class="rl6-status-dot"></span>
                Connected
            </span>
            <a
                href="https://dash.rabbitloader.com/"
                class="rl6-button rl6-button-secondary rl6-button-small"
                target="_blank"
                rel="noopener noreferrer"
            >
                Open Console
            </a>
        </div>
    </header>

    <nav class="rl6-tabs" aria-label="RabbitLoader sections">
        <?php foreach ($tabs as $tab_key => $tab_label) : ?>
            <a
                class="rl6-tab <?php echo $tab === $tab_key ? 'is-active' : ''; ?>"
                href="<?php echo esc_url(admin_url('admin.php?page=rabbitloader&tab=' . $tab_key)); ?>"
            >
                <?php echo esc_html($tab_label); ?>
            </a>
        <?php endforeach; ?>
    </nav>

    <main class="rl6-main">
