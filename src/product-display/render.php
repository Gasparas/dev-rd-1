<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$react_unique_id = wp_unique_id('app-id-');
$product_SKUs_string = $attributes['productSKUs'];
$product_SKUs_array = array_filter(array_map('trim', explode(',', $product_SKUs_string)));

// legacy code moved to api

?>
<div id="<?php echo esc_attr($react_unique_id); ?>" class="react-container" data-products_skus="<?= esc_attr(json_encode($product_SKUs_array)) ?>">
	<p>
		<!--react-container-->
	</p>
</div>
