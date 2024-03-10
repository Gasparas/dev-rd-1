<?php

/**
 * Plugin Name:       Rd Shop Product
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
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

// WooCommerce

// add_action('wp_loaded', function () {
// 	// Ensure WooCommerce is active and initialized
// 	if (function_exists('WC')) {
// 		// Function to get total cart quantity
// 		function get_total_cart_quantity()
// 		{
// 			return WC()->cart->get_cart_contents_count();
// 		}
// 	}
// 	$test122 = "122";
// });


// Rest API

// add_action('woocommerce_init', 'register_custom_route');

// function register_custom_route()
// {
	// add_action('rest_api_init', function () {
	// 	register_rest_route('mycustom/v1', '/cart-item-quantity/(?P<id>\d+)', array(
	// 		'methods' => 'GET',
	// 		'callback' => 'get_cart_item_quantity_by_id',
	// 		'permission_callback' => '__return_true', // Make sure to implement proper permission checks for production use
	// 	));
	// });
	// function get_cart_item_quantity_by_id()
	// {
	// 	// get_total_cart_quantity();
	// 	// $quantity = WC()->cart->get_cart_contents_count();
	// 	$quantity = 33;

	// 	return new WP_REST_Response(array('quantity' => $quantity), 200);
	// }
	// $test = WC()->cart->get_cart_contents_count();
// }

