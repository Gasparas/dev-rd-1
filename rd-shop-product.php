<?php

/**
 * Plugin Name:       Rd Shop Product 2
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.3.0
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
function rd_register_multiple_blocks() {

	// Register blocks in the format $dir => $render_callback.
	$blocks = array(
		'product-display' => '', 
		'total-cart'  => '',
		'step-indicator'  => '',
	);

	foreach ( $blocks as $dir => $render_callback ) {
		$args = array();
		if ( ! empty( $render_callback ) ) {
			$args['render_callback'] = $render_callback;
		}
		register_block_type( __DIR__ . '/build/' . $dir, $args );
	}
}
add_action( 'init', 'rd_register_multiple_blocks' );

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
