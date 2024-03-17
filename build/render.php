<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$react_unique_id = wp_unique_id('app-id-');
$product_id = $attributes['productId'];
$product = wc_get_product($product_id);

if (!$product) {
	echo '<div>Product not found.</div>';
	return;
} else {
	// Retrieve the global 'color' attribute.
	$color_terms = wc_get_product_terms($product->get_id(), 'pa_color', array('fields' => 'names'));
	// If there are any color terms assigned to the product, implode them into a string.
	$color = !empty($color_terms) ? implode(', ', $color_terms) : '';
	// Assuming $product is an instance of WC_Product
	$featured_image_id = $product->get_image_id(); // ID of the featured image
	$gallery_image_ids = $product->get_gallery_image_ids(); // IDs of gallery images
	// Check if there is a featured image and prepend it to the gallery image IDs array
	if ($featured_image_id) {
		array_unshift($gallery_image_ids, $featured_image_id);
	}
	// Convert image IDs to URLs
	$image_urls = array_map(function ($id) {
		return wp_get_attachment_url($id);
	}, $gallery_image_ids); // $gallery_image_ids now possibly includes the featured image ID at the start

}

$product_data = array(
	'title' => $product->get_name(),
	'price' => $product->get_price(),
	'color' => $color,
	'imageUrls' => $image_urls,
);

?>
<div id="<?php echo esc_attr($react_unique_id); ?>" class="react-container">
	<script type="application/json" class="product-data">
		<?php echo wp_json_encode($product_data); ?>
	</script>
</div>