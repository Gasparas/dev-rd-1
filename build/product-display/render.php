<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$react_unique_id = wp_unique_id('app-id-');
$product_SKUs_string = $attributes['productSKUs'];
$product_SKUs_array = array_filter(array_map('trim', explode(',', $product_SKUs_string)));
$product_ids = []; // Initialize an array to hold the ids
$products_data = []; // Initialize an array to hold the data for all products

foreach ($product_SKUs_array as $sku) {
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
};


?>
<div id="<?php echo esc_attr($react_unique_id); ?>" class="react-container">
	<script type="application/json" class="product-data">
		<?php echo wp_json_encode($products_data); ?>
	</script>
	<p>
		react-container
	</p>
</div>