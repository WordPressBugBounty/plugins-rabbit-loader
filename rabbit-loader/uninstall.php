<?php
/**
 * RabbitLoader v5 intentionally leaves the existing RabbitLoader connection
 * option in place on uninstall. The option is shared with the existing
 * RabbitLoader runtime and deleting it here could destroy a valid connection
 * during a rebuild/migration.
 */

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

delete_transient('rabbitloader_trans_overview_data');
