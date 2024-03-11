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