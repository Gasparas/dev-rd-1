<?php

/**
 * Plugin Name:       Rd Shop Product 2
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.4.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rd-shop-product-2
 *
 * @package           create-block
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

// AJAX
// include_once('ajax.php');

// REST API
add_filter('woocommerce_store_api_disable_nonce_check', '__return_true');

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

/**
 * Blocks
 */
function rd_register_multiple_blocks()
{

	// Register blocks in the format $dir => $render_callback.
	$blocks = array(
		'product-display' => '',
		'total-cart'  => '',
		'step-indicator'  => '',
		'coupon-form'  => '',
		'conditional-wrapper'  => 'dynamic_container_render_callback',
	);

	foreach ($blocks as $dir => $render_callback) {
		$args = array();
		if (!empty($render_callback)) {
			$args['render_callback'] = $render_callback;
		}
		register_block_type(__DIR__ . '/build/' . $dir, $args);
	}
}
add_action('init', 'rd_register_multiple_blocks');

/**
 * Callbacks
 */
function dynamic_container_render_callback($attributes, $content)
{
	$roles_string = isset($attributes['roles']) ? $attributes['roles'] : '';
	$roles_array = array_map('trim', explode(',', $roles_string));

	if (is_user_logged_in() && is_user_in_roles($roles_array)) {
		return '<div class="sticky top-1">' . $content . '</div>';
	} elseif (!is_user_logged_in() && in_array('visitor', $roles_array)) {
		return '<div class="sticky top-1">' . $content . '</div>';
	}
}

/**
 * Helper functions
 */
function is_user_in_roles($roles = [])
{
	if (is_user_logged_in()) {
		$user = wp_get_current_user();
		foreach ((array) $roles as $role) {
			if (in_array($role, (array) $user->roles)) {
				return true;
			}
		}
	}
	return false;
}

function convert_skus_to_ids($skus)
{
	$product_ids = array();

	foreach ($skus as $sku) {
		$product = wc_get_product_id_by_sku($sku);
		if ($product) {
			$product_ids[] = $product; // Assuming you want integer IDs
		}
	}

	return $product_ids;
}

/**
 * Affiliate custom role
 */
// Hook into the 'init' action to ensure all features are loaded
add_action('init', 'my_custom_roles_add_custom_role');

function my_custom_roles_add_custom_role()
{
	// Add a custom role with the 'read' capability
	add_role('affiliate', 'Affiliate', array(
		'read' => true, // True allows this capability
		'edit_posts' => false, // False denies this capability
		// Add other capabilities as needed
	));
}

// Use the 'register_deactivation_hook' to remove the role when the plugin is deactivated
register_deactivation_hook(__FILE__, 'my_custom_roles_remove_custom_role');

function my_custom_roles_remove_custom_role()
{
	// remove_role('affiliate_role');
}

/**
 * Scripts
 */
// function rd_enqueue_scripts() {
//     wp_enqueue_script(
//         'your-plugin-zustand-store',
//         plugins_url( '/src/store.js', __FILE__ ),
//         array(), // Dependencies, if any
//         '1.2.0',
//         true // In footer
//     );

//     // Hook into the script_loader_tag filter.
//     add_filter('script_loader_tag', 'add_type_attribute' , 10, 3);
// }

// function add_type_attribute($tag, $handle, $src) {
//     // Check if the handle matches our enqueued script.
//     if ( 'your-plugin-zustand-store' === $handle ) {
//         // Modify the script tag by adding type="module".
//         $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
//     }
//     return $tag;
// }

// add_action( 'wp_enqueue_scripts', 'rd_enqueue_scripts' );
