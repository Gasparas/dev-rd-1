<?

/*
 * ajaxurl
 */
function rd_shop_ajaxurl()
{
    echo '<script type="text/javascript">
           var ajaxurl = "' . admin_url('admin-ajax.php') . '";
           var nonce = "' . wp_create_nonce('my_ajax_nonce') . '";
         </script>';
}
add_action('wp_head', 'rd_shop_ajaxurl');

/*
 * add_to_cart_request
 */
function add_to_cart_request()
{
    if (isset($_POST)) {
        $product_id = $_POST['product_id'];
        $quantity = $_POST['quantity'];
        WC()->cart->add_to_cart($product_id, $quantity);
    }

    die();
}
add_action('wp_ajax_add_to_cart_request', 'add_to_cart_request');
add_action('wp_ajax_nopriv_add_to_cart_request', 'add_to_cart_request');

/*
 * remove_from_cart_request
 */
function remove_from_cart_request()
{
    $product_id = isset($_POST['product_id']) ? intval($_POST['product_id']) : 0;

    if (!$product_id) {
        wp_send_json_error(array('error' => 'Invalid product ID'));
        wp_die();
    }

    foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
        if ($cart_item['product_id'] == $product_id) {
            $new_quantity = $cart_item['quantity'] - 1;
            if ($new_quantity > 0) {
                WC()->cart->set_quantity($cart_item_key, $new_quantity);
                wp_send_json_success(array('message' => 'Product quantity updated'));
            } else {
                // If the new quantity is 0 or less, remove the item from the cart.
                WC()->cart->remove_cart_item($cart_item_key);
                wp_send_json_success(array('message' => 'Product removed from cart'));
            }
            wp_die();
        }
    }

    wp_send_json_error(array('error' => 'Product not found in cart'));
    wp_die();
}
add_action('wp_ajax_remove_from_cart_request', 'remove_from_cart_request');
add_action('wp_ajax_nopriv_remove_from_cart_request', 'remove_from_cart_request');

/*
 * remove_from_cart_request
 */
function cart_get_total_request()
{

    if (function_exists('WC')) {
        $quantity = WC()->cart->get_cart_contents_count();
        wp_send_json_success(array('total_quantity' => $quantity));
        wp_die();
    } else {
        wp_send_json_error(array('message' => 'WooCommerce not active'));
        wp_die();
    }
}
add_action('wp_ajax_cart_get_total_request', 'cart_get_total_request');
add_action('wp_ajax_nopriv_cart_get_total_request', 'cart_get_total_request');

/*
 * send_php_to_js
 */

// Enqueue your script
// wp_enqueue_script('test-script', plugin_dir_url(__FILE__) . 'test.js', array('jquery'), '1.0', true);


add_action( 'plugins_loaded', 'my_plugin_override' );

function my_plugin_override() {
    $localized_data_2 = array(
        // 'ajax_url' => admin_url( 'admin-ajax.php' ),
        // 'nonce' => wp_create_nonce( 'my-nonce' ),
        'test' => 'test data',
    );
    wp_localize_script('create-block-rd-shop-product-view-script', 'testData', $localized_data_2);
}

function list_enqueued_scripts() {
    global $wp_scripts; // Access the global variable that holds all enqueued scripts

    if ( ! ( $wp_scripts instanceof WP_Scripts ) ) {
        return; // Exit if $wp_scripts is not set up correctly
    }

    echo '<ul>';
    foreach ( $wp_scripts->queue as $handle ) { // Loop through the queue to get handles of enqueued scripts
        $script = $wp_scripts->registered[$handle]; // Get the script object by handle

        // Output the script handle and source
        echo '<li><strong>' . esc_html( $handle ) . '</strong>: ' . esc_url( $script->src ) . '</li>';
    }
    echo '</ul>';
}

// add_action( 'wp_footer', 'list_enqueued_scripts', 100 ); // Hook into wp_footer
