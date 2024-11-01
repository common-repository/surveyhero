<?php
/**
 * Plugin Name: SurveyHero
 * Plugin URI: https://surveyhero.com
 * Description: Embed surveys from SurveyHero into your WordPress website.
 * Author: enuvo
 * Author URI: https://enuvo.ch
 * Version: 1.0.5
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Only load if Gutenberg is available.
if (!function_exists('register_block_type')) {
    return;
}

/**
 * Enqueue assets for backend
 */
function surveyhero_embed_editor_assets()
{
    // Styles
    wp_enqueue_style(
        'surveyhero-embed-editor-css',
        plugins_url('dist/editor.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime(wp_normalize_path(plugin_dir_path(__FILE__) . 'dist/editor.css'))
    );

    // Scripts
    wp_enqueue_script(
        'surveyhero-embed-editor-js',
        plugins_url('dist/editor.js', __FILE__),
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),
        filemtime(wp_normalize_path(plugin_dir_path(__FILE__) . 'dist\editor.js')),
        true
    );
}

add_action('enqueue_block_editor_assets', 'surveyhero_embed_editor_assets');

/**
 * Enqueue assets for frontend
 */
if (!is_admin()) {
    function surveyhero_embed_front_assets()
    {
        $css_path = wp_normalize_path(plugin_dir_path(__FILE__) . 'dist\front.css');

        // Styles (only loaded when there is content)
        if (filesize($css_path) !== '0') {
            wp_enqueue_style(
                'surveyhero-embed-front-css',
                plugins_url('dist/front.css', __FILE__),
                null,
                filemtime($css_path)
            );
        }

        // Scripts
        wp_enqueue_script(
            'surveyhero-embed-front-js',
            plugins_url('dist/front.js', __FILE__),
            array('wp-blocks', 'wp-element', 'jquery'),
            filemtime(wp_normalize_path(plugin_dir_path(__FILE__) . 'dist\front.js')),
            true
        );
    }

    add_action('enqueue_block_assets', 'surveyhero_embed_front_assets');
}
