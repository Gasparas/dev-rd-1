<?php

/**
 * Plugin Name:       Rd Shop Product
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.2.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rd-shop-product
 *
 * @package           create-block
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

include_once('ajax.php');

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function rd_shop_product_rd_shop_product_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'rd_shop_product_rd_shop_product_block_init');

// 
add_filter( 'woocommerce_store_api_disable_nonce_check', '__return_true' );

// function my_custom_data_for_blocks() {
//     // Check if the current screen is the block editor.
//     if ( ! is_admin() ) {
//         return;
//     }

//     // Data you want to pass to your script
//     $script_data = sprintf(
//         'var myCustomData = %s;',
//         json_encode([
//             'nonce' => wp_create_nonce('wc_store_api'),
//             'api_root' => esc_url_raw(rest_url('wc/store')),
//         ])
//     );

//     // Attach the data to your block script
//     wp_add_inline_script('create-block-rd-shop-product', $script_data, 'before');
// }
// add_action('enqueue_block_editor_assets', 'my_custom_data_for_blocks');

