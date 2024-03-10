console.log('ajax-call');

jQuery(document).ready(function ($) {
    $.ajax({
        url: ajaxurl,
        type: 'GET',
        data: {
            action: 'send_php_to_js', // This should match the action hook in PHP
        },
        success: function (response) {
            var data = JSON.parse(response);
            console.log(data.variable); // This will log "Hello from PHP!"
        },
        error: function (error) {
            console.log(error);
        }
    });
});
