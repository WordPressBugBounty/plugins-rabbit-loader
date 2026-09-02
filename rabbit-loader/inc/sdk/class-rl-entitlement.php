<?php

if (!defined('ABSPATH')) {
    exit;
}

final class RL5_Entitlement
{
    public static function dashboard_data($force = false)
    {
        $did = RL5_Settings::did();
        $cache_key = 'rl5_dashboard_' . md5($did);

        if (!$force) {
            $cached = get_transient($cache_key);
            if (is_array($cached)) {
                return $cached;
            }
        }

        $api = new RL5_API();
        $response = $api->overview();

        if (is_wp_error($response)) {
            return [
                'ok' => false,
                'error' => $response->get_error_message(),
                'error_code' => $response->get_error_code(),
                'domain' => RL5_Settings::domain(),
                'did' => RL5_Settings::did(),
            ];
        }

        $data = !empty($response['data']) && is_array($response['data']) ? $response['data'] : [];
        $bill = !empty($data['bill']) && is_array($data['bill']) ? $data['bill'] : [];
        $usage = !empty($bill['usage']) && is_array($bill['usage']) ? $bill['usage'] : [];
        $limits = !empty($data['plan_limits']) && is_array($data['plan_limits']) ? $data['plan_limits'] : [];
        $plan = !empty($data['plan_details']) && is_array($data['plan_details']) ? $data['plan_details'] : [];
        $speed = !empty($data['speed_score']) && is_array($data['speed_score']) ? $data['speed_score'] : [];
        $domain_details = !empty($data['domain_details']) && is_array($data['domain_details']) ? $data['domain_details'] : [];

        $pageviews_used = self::number($usage, ['pageviews_ctr', 'pageviews']);
        $pageviews_quota = self::number($limits, ['pageviews_ctr', 'pageviews']);
        $bandwidth_used = self::number($usage, ['bandwidth_gb']);
        $bandwidth_quota = self::number($limits, ['bandwidth_gb']);

        $normalized = [
            'ok' => true,
            'domain' => !empty($domain_details['host']) ? (string) $domain_details['host'] : RL5_Settings::domain(),
            'did' => RL5_Settings::did(),
            'plan_title' => !empty($plan['title']) ? (string) $plan['title'] : (!empty($plan['ptitle']) ? (string) $plan['ptitle'] : 'Unknown'),
            'plan_end_date' => !empty($bill['end_date']) ? (string) $bill['end_date'] : '',
            'pageviews_used' => $pageviews_used,
            'pageviews_quota' => $pageviews_quota,
            'pageviews_percent' => self::percent($pageviews_used, $pageviews_quota),
            'bandwidth_used' => $bandwidth_used,
            'bandwidth_quota' => $bandwidth_quota,
            'bandwidth_percent' => self::percent($bandwidth_used, $bandwidth_quota),
            'canonical_url_count' => (int) self::number($speed, ['canonical_url_count']),
            'optimized_url_count' => (int) self::number($speed, ['optimized_url_count']),
            'best_score' => self::score($speed, 'max_score'),
            'average_score' => self::score($speed, 'avg_score'),
            'css_reduction' => self::number($data, ['css_size_pp']),
            'image_compression' => self::number($data, ['image_comp_avg_cp']),
            'home_page_url_id' => !empty($data['home_page_url_id']) ? (string) $data['home_page_url_id'] : '',
            'plan_limits' => $limits,
        ];

        set_transient($cache_key, $normalized, 60);

        return $normalized;
    }

    private static function number($source, $keys)
    {
        if (!is_array($source)) {
            return 0;
        }

        foreach ($keys as $key) {
            if (array_key_exists($key, $source) && $source[$key] !== '' && $source[$key] !== null && is_numeric($source[$key])) {
                return (float) $source[$key];
            }
        }

        return 0;
    }

    private static function score($source, $key)
    {
        $value = self::number($source, [$key]);
        if ($value > 0 && $value <= 1) {
            $value *= 100;
        }
        return (int) round($value);
    }

    private static function percent($used, $quota)
    {
        if ($quota <= 0) {
            return 0;
        }

        return min(100, max(0, round(($used / $quota) * 100, 1)));
    }
}
