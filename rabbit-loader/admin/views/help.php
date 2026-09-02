<?php
if (!defined('ABSPATH')) {
    exit;
}

$videos = [
    ['rJdgdkiADB4', 'Verification', 'Connect and verify your WordPress website.'],
    ['QGAuLgOjCu0', 'Purging Cache', 'Clear RabbitLoader optimization when you need a fresh build.'],
    ['ol4nuYuYTeM', 'ME Mode', 'Test optimized pages without changing what normal visitors see.'],
    ['lC0vWlugHJ4', 'Image Settings', 'Understand RabbitLoader image optimization controls.'],
    ['z6fuEHr6lYs', 'CSS Settings', 'Learn how RabbitLoader handles CSS optimization.'],
    ['QxwaDxtRw-I', 'Delegate Access', 'Give controlled access to another team member.'],
    ['uBPMn2mvnrs', 'Linking Cloudflare', 'Connect Cloudflare with RabbitLoader.'],
];
?>
<section class="rl6-page-heading">
    <div>
        <span class="rl6-eyebrow">Support</span>
        <h1>Help</h1>
        <p>Crash courses, support links and WordPress diagnostics.</p>
    </div>
</section>

<section class="rl6-card rl6-section-card">
    <div class="rl6-section-title-row">
        <div>
            <span class="rl6-eyebrow">Learn RabbitLoader</span>
            <h2>Crash Courses</h2>
        </div>
    </div>

    <div class="rl6-video-grid">
        <?php foreach ($videos as $video) : ?>
            <button type="button" class="rl6-video-card" data-video-id="<?php echo esc_attr($video[0]); ?>">
                <div class="rl6-video-thumb">
                    <img
                        loading="lazy"
                        src="<?php echo esc_url('https://img.youtube.com/vi/' . $video[0] . '/mqdefault.jpg'); ?>"
                        alt=""
                    >
                    <span class="rl6-play">▶</span>
                </div>
                <strong><?php echo esc_html($video[1]); ?></strong>
                <p><?php echo esc_html($video[2]); ?></p>
            </button>
        <?php endforeach; ?>
    </div>
</section>

<div class="rl6-help-grid">
    <section class="rl6-card rl6-section-card">
        <span class="rl6-eyebrow">Need more help?</span>
        <h2>Support</h2>
        <p>Open RabbitLoader for account-level settings, billing and support.</p>
        <div class="rl6-card-actions">
            <a class="rl6-button rl6-button-primary" href="https://dash.rabbitloader.com/" target="_blank" rel="noopener noreferrer">Open Console</a>
            <a class="rl6-button rl6-button-secondary" href="https://rabbitloader.com/" target="_blank" rel="noopener noreferrer">RabbitLoader.com</a>
        </div>
    </section>

    <section class="rl6-card rl6-section-card">
        <span class="rl6-eyebrow">WordPress</span>
        <h2>Diagnostics</h2>
        <dl class="rl6-diagnostics">
            <div><dt>Plugin</dt><dd><?php echo esc_html(RL5_VERSION); ?></dd></div>
            <div><dt>WordPress</dt><dd><?php echo esc_html(get_bloginfo('version')); ?></dd></div>
            <div><dt>PHP</dt><dd><?php echo esc_html(PHP_VERSION); ?></dd></div>
            <div><dt>Connection</dt><dd><span class="rl6-text-success">Connected</span></dd></div>
            <div><dt>Domain ID</dt><dd class="rl6-mono"><?php echo esc_html(RL5_Settings::did()); ?></dd></div>
        </dl>
        <button
            type="button"
            class="rl6-button rl6-button-secondary"
            id="rl6-copy-diagnostics"
            data-diagnostics="<?php echo esc_attr(wp_json_encode([
                'plugin' => RL5_VERSION,
                'wordpress' => get_bloginfo('version'),
                'php' => PHP_VERSION,
                'connection' => 'connected',
                'domain' => RL5_Settings::domain(),
                'domain_id' => RL5_Settings::did(),
            ])); ?>"
        >
            Copy diagnostics
        </button>
    </section>
</div>
