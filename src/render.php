<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$unique_id = wp_unique_id('app-id-');
?>

<div id="<?php echo esc_attr($unique_id); ?>" class="app-container">
	<?php echo esc_attr($unique_id); ?>
</div>