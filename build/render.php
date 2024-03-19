<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$react_unique_id = wp_unique_id('app-id-');
$product_ids_string = $attributes['productId']; // Assuming this is a string like "36,32,27"
$product_ids = explode(',', $product_ids_string); // Convert the string to an array of IDs
$products_data = []; // Initialize an array to hold the data for all products

foreach ($product_ids as $product_id) {
	$product = wc_get_product(trim($product_id)); // Use trim to remove any whitespace from the ID

	if (!$product) {
		// Handle the case where a product is not found. For simplicity, continue to the next product ID.
		continue;
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
		'id' => $product_id,
		'title' => $product->get_name(),
		'price' => $product->get_price(),
		'color' => $color,
		'productDescription' => $product->get_description(),
		'imageUrls' => $image_urls,
		'min' => 0,
		'max' => 20,
		'counterValue' => 0,
	];

	// Append this product's data to the products data array
	$products_data[] = $product_data;
}

?>
<div id="<?php echo esc_attr($react_unique_id); ?>" class="react-container">
	<script type="application/json" class="product-data">
		<?php echo wp_json_encode($products_data); ?>
	</script>
	<p>
		react-container
	</p>
</div>