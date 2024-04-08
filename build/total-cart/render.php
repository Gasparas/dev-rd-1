<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$discount_steps_string = $attributes['discountSteps']; // Assuming this is a string like "36,32,27"
$discount_steps = array_map('intval', explode(',', $discount_steps_string)); // convert each element of the resulting array to an integer

$discount_percentages_string = $attributes['discountPercentages']; // Assuming this is a string like "36,32,27"
$discount_percentages = explode(',', $discount_percentages_string); // Convert to array of strings

// Compile the product data
$data = [
    'steps' => $discount_steps,
    'percs' => $discount_percentages,
];

// Append this product's data to the products data array
$total_cart_data = $data;

?>
<div id="root-total-cart" style="
    position: fixed;
    width: 85%;
    bottom: 5px;
    left: 50%;
    transform: translate(-50%, 0);
">
	<p>
		total-cart container
	</p>
</div>
<script type="application/json" class="total-cart-data"><?php echo wp_json_encode($total_cart_data); ?></script>