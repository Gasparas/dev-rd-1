<?php
function list_enqueued_scripts()
{
    global $wp_scripts; // Access the global variable that holds all enqueued scripts

    if (!($wp_scripts instanceof WP_Scripts)) {
        return; // Exit if $wp_scripts is not set up correctly
    }

    echo '<ul>';
    foreach ($wp_scripts->queue as $handle) { // Loop through the queue to get handles of enqueued scripts
        $script = $wp_scripts->registered[$handle]; // Get the script object by handle

        // Output the script handle and source
        echo '<li><strong>' . esc_html($handle) . '</strong>: ' . esc_url($script->src) . '</li>';
    }
    echo '</ul>';
}

add_action('wp_footer', 'list_enqueued_scripts', 100); // Hook into wp_footer
