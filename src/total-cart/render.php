<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// $react_unique_id = wp_unique_id('app-id-');
$discount_steps_string = $attributes['discountSteps']; // Assuming this is a string like "36,32,27"
$discount_steps = array_map('intval', explode(',', $discount_steps_string)); // convert each element of the resulting array to an integer

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
<script type="application/json" class="discount-steps-data"><?php echo wp_json_encode($discount_steps); ?></script>