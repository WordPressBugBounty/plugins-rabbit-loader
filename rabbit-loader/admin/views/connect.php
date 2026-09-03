<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="wrap rl6-wrap rl6-connect-wrap">
    <header class="rl6-header rl6-header-connect">
        <img
            src="<?php echo esc_url(RL5_URL . 'assets/logo-dark.svg'); ?>"
            class="rl6-logo rl6-logo-large"
            alt="RabbitLoader"
        >
    </header>

    <div class="rl6-connect-shell">
        <div class="rl6-connect-copy">
            <span class="rl6-eyebrow">WordPress optimization</span>
            <h1>Connect RabbitLoader</h1>
            <p>
                Sign in to your RabbitLoader account to connect this WordPress website.
                Your existing RabbitLoader account, plan and website data will be used.
            </p>

            <button id="rl5-connect-button" class="rl6-button rl6-button-primary rl6-button-large" type="button">
                Connect RabbitLoader
            </button>

            <div id="rl5-connect-status" class="rl6-connect-status" role="status" aria-live="polite"></div>
        </div>

        <div class="rl6-connect-side">
            <div class="rl6-connect-feature">
                <span>1</span>
                <div><strong>Connect</strong><small>Sign in to RabbitLoader.</small></div>
            </div>
            <div class="rl6-connect-feature">
                <span>2</span>
                <div><strong>Choose mode</strong><small>Select your optimization profile.</small></div>
            </div>
            <div class="rl6-connect-feature">
                <span>3</span>
                <div><strong>Improve</strong><small>RabbitLoader optimizes your site.</small></div>
            </div>
        </div>
    </div>
</div>
