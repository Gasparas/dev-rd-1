<?php

/**
 * Plugin Name:       Royal Denta Shop
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.12
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
		'checkout-bar'  => '',
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
		return '<div id="conditional-wrapper" class="sticky top-1">' . $content . '</div>';
	} elseif (!is_user_logged_in() && in_array('visitor', $roles_array)) {
		return '<div id="conditional-wrapper" class="sticky top-1">' . $content . '</div>';
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


// recalculate products prices includes cart quantity and applied coupons
add_filter('woocommerce_get_price_html', 'yf_recalc_product_price_with_coupon_data', 10, 2);
function yf_recalc_product_price_with_coupon_data($price, $product)
{
	/** @var WC_Product $product */
	if (!isset(WC()->cart)) return $price;
	$applied_coupons = WC()->cart->get_applied_coupons();
	$product_price = $product->get_price();
	$discount_amount = 0;
	$this_product_cart = array_filter(WC()->cart->get_cart(), fn($ci) => $ci['product_id'] == $product->get_id());
	$cart_product = reset($this_product_cart);
	if ($cart_product) {
		$product_price *= $cart_product['quantity'];
	}
	if (!$applied_coupons && $cart_product) {
		return wc_price($product_price);
	}
	if (!$applied_coupons) return $price;
	foreach ($applied_coupons as $coupon_code) {
		$coupon = new WC_Coupon($coupon_code);
		if ($coupon->is_valid_for_product($product)) {
			$discount_amount += $coupon->get_discount_amount($product_price);
		}
	}
	if (!$discount_amount) return $price;
	$sale_price = $product_price - $discount_amount;

	return sprintf(
		'<del aria-hidden="true">%s</del><br>%s<span aria-hidden="true" class="discount-amount"><br></span>',
		wc_price($product_price),
		wc_price($sale_price),
		wc_price($discount_amount)
	);
}


// move "product-display" render data logic to ajax request
function yf_get_block_product_display_data(WP_REST_Request $request)
{

	if (is_null(WC()->cart)) {
		wc_load_cart();
		yf_apply_empty_cart_coupons(false);
	}

	$skus = $request->get_param('skus');
	if (empty($skus)) {
		return new WP_Error('no_skus', 'No products skus', array('status' => 404));
	}

	$product_ids = []; // Initialize an array to hold the ids
	$products_data = []; // Initialize an array to hold the data for all products

	foreach ($skus as $sku) {
		$product = wc_get_product_id_by_sku($sku);
		if ($product) {
			$product_ids[] = $product; // Assuming you want integer IDs
		}
	}

	// Populate $products_data
	if (isset(WC()->cart)) {

		foreach ($product_ids as $product_id) {
			$product = wc_get_product($product_id); // Use trim to remove any whitespace from the ID

			if (!$product) {
				// Handle the case where a product is not found. For simplicity, continue to the next product ID.
				continue;
			}

			// Initialize counterValue as 0
			$counterValue = 0;

			// Check if the product is in the cart and update counterValue to the quantity
			foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
				if ($cart_item['product_id'] == $product_id) {
					$counterValue = $cart_item['quantity'];
					break; // Stop the loop once the product is found
				}
			}

			// Retrieve product details
			$color_terms = wc_get_product_terms($product->get_id(), 'pa_color', array('fields' => 'names'));
			$color = !empty($color_terms) ? implode(', ', $color_terms) : '';

			// Get the image URLs
			$featured_image_id = $product->get_image_id();
			$gallery_image_ids = $product->get_gallery_image_ids();
			if ($featured_image_id) {
				array_unshift($gallery_image_ids, $featured_image_id); // Prepend the featured image ID
			}

			$image_urls = array_map(function ($id) {
				return wp_get_attachment_url($id);
			}, $gallery_image_ids);

			// Compile the product data
			$product_data = [
				'id' => (int)$product_id,
				'title' => $product->get_name(),
				'price' => $product->get_price_html(),
				'regular_price' => $product->get_regular_price(),
				'sale_price' => $product->get_sale_price(),
				'color' => $color,
				'productDescription' => $product->get_description(),
				'imageUrls' => $image_urls,
				'min' => 0,
				'max' => 20,
				'counterValue' => $counterValue, // Set to the current quantity in the cart
			];

			// Append this product's data to the products data array
			$products_data[] = $product_data;
		}
	}

	return rest_ensure_response([
		'data' => $products_data,
	]);
}
add_action('rest_api_init', function () {
	register_rest_route('rd-shop-product/v1', '/block-product-display-data', array(
		'methods' => 'GET',
		'callback' => 'yf_get_block_product_display_data',
		'permission_callback' => '__return_true',
	));
});

// fix empty cart coupon issue
/**
 * @return array
 */
function yf_get_empty_cart_coupons()
{
	return @json_decode(@base64_decode($_COOKIE['empty_cart_coupons'] ?? '')) ?: [];
}
/**
 * @param string|array  $coupon_code
 */
function yf_save_empty_cart_coupons($coupon_code)
{
	$empty_cart_coupons = yf_get_empty_cart_coupons();
	if (is_array($coupon_code)) {
		$empty_cart_coupons = $coupon_code;
	} elseif (!in_array($coupon_code, $empty_cart_coupons)) {
		$empty_cart_coupons[] = $coupon_code;
	}
	$empty_cart_coupons = array_values(array_filter($empty_cart_coupons));
	if ($empty_cart_coupons) {
		setcookie('empty_cart_coupons', base64_encode(json_encode($empty_cart_coupons)), time() + 3600, '/');
	} else {
		setcookie('empty_cart_coupons', null, -1, '/');
	}
}

/**
 * @param bool $reset
 */
function yf_apply_empty_cart_coupons($reset = true)
{
	$empty_cart_coupons = yf_get_empty_cart_coupons();
	if ($empty_cart_coupons) {
		foreach ($empty_cart_coupons as $cc) {
			WC()->cart->apply_coupon($cc);
		}
	}
	if ($reset) {
		yf_save_empty_cart_coupons([]);
	}
}

function remove_coupon_from_empty_cart_coupons($code)
{
	$empty_cart_coupons = yf_get_empty_cart_coupons();
	if (in_array($code, $empty_cart_coupons)) {
		$empty_cart_coupons = array_filter($empty_cart_coupons, fn($c) => $c != $code);
	}
	yf_save_empty_cart_coupons(array_values($empty_cart_coupons));
}

function woocommerce_add_to_cart_with_empty_cart_coupons()
{
	yf_apply_empty_cart_coupons();
}

add_action('woocommerce_applied_coupon', 'yf_save_empty_cart_coupons');
add_action('woocommerce_removed_coupon', 'remove_coupon_from_empty_cart_coupons');
add_action('woocommerce_add_to_cart', 'woocommerce_add_to_cart_with_empty_cart_coupons');


// manage cart coupons by step
// add_action('woocommerce_after_cart_item_quantity_update', 'manage_cart_coupons_by_step', 10, 4);
// function manage_cart_coupons_by_step($cart_item_key, $quantity, $old_quantity, \WC_Cart $cartInstance)
// {
// 	// set defaults
// 	$user_login_required = true;
// 	$coupon_steps = [
// 		'',
// 		'coupon-step-1',
// 		'coupon-step-2',
// 		'coupon-step-3',
// 		'coupon-step-4'
// 	];
// 	$step_products_count = [
// 		0,
// 		5,
// 		10,
// 		20,
// 		30
// 	];

// 	// get steps data from front pag block
// 	try {
// 		$front_page_id = get_option('page_on_front');
// 		if ($front_page_id) {
// 			$front_page = get_post($front_page_id);
// 			if ($front_page) {
// 				$blocks = parse_blocks($front_page->post_content);
// 				$discount_block_data = [];
// 				foreach ($blocks as $b) {
// 					if ($b['blockName'] == 'create-block/rd-total-cart') {
// 						$discount_block_data = $b['attrs'];
// 						if (!empty($b['attrs']['roles']) && mb_strpos($b['attrs']['roles'], 'visitor') !== false) {
// 							$user_login_required = false;
// 						}
// 						break;
// 					}
// 					if (empty($b['innerBlocks'])) continue;
// 					foreach ($b['innerBlocks'] as $sb) {
// 						if ($sb['blockName'] == 'create-block/rd-total-cart') {
// 							$discount_block_data = $sb['attrs'];
// 							if (!empty($sb['attrs']['roles']) && mb_strpos($sb['attrs']['roles'], 'visitor') !== false) {
// 								$user_login_required = false;
// 							} elseif (!empty($b['attrs']['roles']) && mb_strpos($b['attrs']['roles'], 'visitor') !== false) {
// 								$user_login_required = false;
// 							}
// 							break 2;
// 						}
// 					}
// 				}
// 				if (!empty($discount_block_data['discountSteps'])) {
// 					$discount_block_steps = array_map(
// 						fn($s) => (int)trim($s),
// 						explode(',', $discount_block_data['discountSteps'])
// 					);
// 					if ($discount_block_steps) {
// 						$step_products_count = [0, ...$discount_block_steps];
// 					}
// 				}
// 			}
// 		}
// 	} catch (\Exception $e) {
// 		//
// 	}

// 	if ($user_login_required && !is_user_logged_in()) return;

// 	// get needed coupon
// 	$finished_steps = array_filter($step_products_count, fn($s) => $cartInstance->get_cart_contents_count() >= $s);
// 	$needed_coupon_index = $finished_steps ? count($finished_steps) - 1 : 0;
// 	$needed_coupon = $coupon_steps[$needed_coupon_index] ?? end($coupon_steps);
// 	$applied_coupons_by_steps = array_filter($cartInstance->get_applied_coupons(), fn($c) => mb_strpos($c, 'coupon-step') !== false);

// 	//remove coupons
// 	if (!$needed_coupon && $applied_coupons_by_steps) {
// 		foreach ($applied_coupons_by_steps as $c) {
// 			$cartInstance->remove_coupon($c);
// 		}
// 	}

// 	// change applied coupon
// 	elseif ($applied_coupons_by_steps && !in_array($needed_coupon, $applied_coupons_by_steps)) {
// 		foreach ($applied_coupons_by_steps as $c) {
// 			$cartInstance->remove_coupon($c);
// 		}
// 		$cartInstance->apply_coupon($needed_coupon);
// 	}

// 	// apply new coupon
// 	elseif (!$applied_coupons_by_steps && $needed_coupon) {
// 		$cartInstance->apply_coupon($needed_coupon);
// 	}

// 	// clean empty cart coupons
// 	$empty_cart_coupons = array_values(array_filter(yf_get_empty_cart_coupons(), fn($c) => !in_array($c, $coupon_steps)));
// 	yf_save_empty_cart_coupons($empty_cart_coupons);
// }

/**
 * Custom endpoints
 */

class WC_Custom_Endpoints
{
	public function __construct()
	{
		add_action('rest_api_init', array($this, 'register_custom_endpoints'));
	}

	/**
	 * Register custom endpoints.
	 */
	public function register_custom_endpoints()
	{
		register_rest_route('custom/v1', '/shipping-methods', array(
			'methods' => 'GET',
			'callback' => array($this, 'get_shipping_methods'),
			'permission_callback' => '__return_true', // Allow unauthenticated access
		));
	}

	/**
	 * Callback to get shipping methods.
	 *
	 * @return WP_REST_Response
	 */
	public function get_shipping_methods()
	{
		$shipping_zone = new WC_Shipping_Zone(1); // Replace with appropriate zone ID
		$shipping_methods = $shipping_zone->get_shipping_methods(true);

		$methods = array();
		foreach ($shipping_methods as $method) {
			if ('flat_rate' === $method->id) {
				$methods[] = array(
					'id' => $method->id,
					'title' => $method->get_title(),
					'cost' => $method->get_instance_option('cost'),
				);
			}
		}

		return new WP_REST_Response($methods, 200);
	}
}

// Instantiate the class
new WC_Custom_Endpoints();
